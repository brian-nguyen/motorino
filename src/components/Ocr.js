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
    };
  }

  // findMFRandPrice sets the state's mfr and price to those found in the image
  findMFRandPrice = () => {
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
    }
  }

  chooseImage = async(evt) => {
    var file = evt.target.files[0];
    this.getImageInformation(file);
  }

  render() {
    return (
      <div className="Ocr">
        <input ref="file" type="file" name="file" 
                              className="upload-file" 
                              id="file"
                              onChange={this.chooseImage}
                              encType="multipart/form-data" 
                              required/>
        <Camera getImageInformation={this.getImageInformation}/>
      </div>
    );
  }
}

export default Ocr;
