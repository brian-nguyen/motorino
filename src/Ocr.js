import React, { Component } from 'react';

class Ocr extends Component {
  constructor(props) {
    super(props);
    this.state = {
      image: null,
    };
  }

  handleChangeImage = async (evt) => {
    console.log("Uploading");
    var reader = new FileReader();
    var file = evt.target.files[0];
    var self = this;
    reader.onload = (upload) => {
        this.setState({
            image: upload.target.result
        }, () => console.log(this.state.image, "uploaded"));
    };
    reader.readAsDataURL(file);
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
