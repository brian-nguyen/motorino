import React, { Component } from 'react';
import axios from 'axios';
import { API_KEY } from './API_KEY.js';

class Ocr extends Component {
  constructor(props) {
    super(props);
    this.state = {
      image: null,
    };
  }

  handleChangeImage = async (evt) => {
    var reader = new FileReader();
    var file = evt.target.files[0];
    reader.readAsDataURL(file);
    reader.onload = async function() {
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

  render() {
    return (
      <div className="Ocr">
        <input ref="file" type="file" name="file" 
                              className="upload-file" 
                              id="file"
                              onChange={this.handleChangeImage}
                              encType="multipart/form-data" 
                              required/>
      </div>
    );
  }
}

export default Ocr;
