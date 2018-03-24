import React, { Component } from 'react';
import axios from 'axios';
import { API_KEY } from './API_KEY.js';
import Camera from './Camera';

class Ocr extends Component {
  constructor(props) {
    super(props);
    this.state = {
      image: null,
    };
  }

  getImageInformation = async(file) => {
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = async function() {
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
