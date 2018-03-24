import React, { Component } from 'react';

class Camera extends Component {
  state = {
    showVideo: false,
    showCanvas: false
  };
  constructor(props) {
    super(props);
    this.props = props;
  }

  enableCamera = () => {
    this.props.isActive();
    this.setState(
      {showVideo: true},
      () => { 
        var video = document.getElementById('video');
        
        // Get access to the camera and stream camera feed
        if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
          navigator.mediaDevices.getUserMedia({ video: true }).then(function(stream) {
            video.src = window.URL.createObjectURL(stream);
            video.play();
          });
        }
      }
    );
  }

  takePicture = () => {
    this.setState(
      {showCanvas: true},
      () => {
        var canvas = document.getElementById('canvas');
        var context = canvas.getContext('2d');
        var video = document.getElementById('video');

        // Take the picture and convert canvas to image
        context.drawImage(video, 0, 0, 640, 480);
    
        // Get OCR data
        canvas.toBlob((blob) => this.props.getImageInformation(blob));
      });
  }

  render() {
    return (
      <div className="Camera d-flex flex-column align-items-center">
        {this.state.showVideo && <video id="video" width="640" height="480" autoPlay></video>}
        {!this.state.showVideo && <button id="enable" onClick={this.enableCamera} className="btn btn-dark w-25 m-3">Enable Camera</button>}
        {this.state.showVideo && <button id="snap" onClick={this.takePicture}>Take Picture</button>}
        {this.state.showCanvas && <canvas id="canvas" width="640" height="480"></canvas>}
      </div>
    );
  }
}

export default Camera;
