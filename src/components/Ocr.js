import React, { Component } from 'react';
import axios from 'axios';
import { API_KEY } from './API_KEY.js';
import Camera from './Camera';

class Ocr extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imageInfo: null,
      price: null,
      mfr: null,
      skuId: null,
      showUploadInput: true,
    };
  }

  // fetchSKU using mfr
  fetchSKU = () => {
    axios.get('https://bizhacks.bbycastatic.ca/mobile-si/si/v3/products/search', {
      params: {
        query: this.state.mfr,
        lang: "en",
      }
    })
    .then( (response) => {
      var sku = response.data.searchApi.documents[0].skuId
      this.setState({skuId: sku})
      console.log(this.state.skuId);
      // console.log(response.data.searchApi.documents[0].skuId)
    })
    .catch( (error) => {
      console.log("Cannot find product");
    });
  }

  // findMFRandPrice sets the state's mfr and price to those found in the image
  findMFRandPrice = () => {
    if (this.state == null ||
      this.state.imageInfo == null ||
      this.state.imageInfo.data == null ||
      this.state.imageInfo.data.responses == null ||
      this.state.imageInfo.data.responses[0].textAnnotations == null ||
      this.state.imageInfo.data.responses[0].textAnnotations[0].description == null
    ) {
      throw "Cannot find flyer info"
    }
    var text = this.state.imageInfo.data.responses[0].textAnnotations[0].description.split("\n");
    var mfr;
    var price;
    for (var index = 0; index < text.length; index++) {
      var curr = text[index]
      if (curr.startsWith("#")) {
        mfr = curr.split(" ")[0]
      }

      if (curr.endsWith("99") && curr.length == 2 && price == null) {
        // 99 cents is separated from dollars
        price = text[index-1] + "." + curr.substring(text[index].length-2)
      } else if (curr.endsWith("99") && price == null) {
        // 99 cents is a part of the dollars
        price = text[index].substring(0, text[index].length-2) + "." + text[index].substring(text[index].length-2)
      }
    }

    if (mfr == null || price == null) {
      throw "Error parsing " + (mfr == null ? "mfr" : "price");
    }

    this.setState({
      mfr: mfr,
      price: price,
    })

    console.log(this.state.mfr);
    console.log(this.state.price);
    this.fetchSKU();
  }

  getImageInformation = async(file) => {
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = async () => {
      // Filter out unneeded information
      const content = reader.result.replace('data:image/png;base64,','');
      const request = {
        "requests": [
          {
            "image": {
              content
            },
            "features": [
              {
                "type":"TEXT_DETECTION"
              }
            ]
          }
        ]
      }
      let response = await axios.post('https://vision.googleapis.com/v1/images:annotate?key=' + API_KEY, request);
      this.setState({imageInfo: response})
      console.log(this.state.imageInfo)
      this.findMFRandPrice()

      // Update form state
      this.props.onSubmit({
        productName: this.state.mfr,
        price: this.state.price
      })
    }
  }

  chooseImage = async(evt) => {
    var file = evt.target.files[0];
    this.getImageInformation(file);
  }

  cameraActive = () => {
    this.setState({ showUploadInput: false });
  }

  render() {
    return (
      <div className="Ocr">
        {this.state.showUploadInput
        && <input
            ref="file" type="file" name="file" 
            className="upload-file" 
            id="file"
            onChange={this.chooseImage}
            encType="multipart/form-data" 
            required/>}
        <Camera getImageInformation={this.getImageInformation} isActive={this.cameraActive}/>
      </div>
    );
  }
}

export default Ocr;
