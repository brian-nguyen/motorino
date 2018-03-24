import React, { Component } from 'react';

class Camera extends Component {
  enableCamera = () => {
    var video = document.getElementById('video');

    // Get access to the camera
    if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia({ video: true }).then(function(stream) {
            video.src = window.URL.createObjectURL(stream);
            video.play();
        });
    }
  }

  takePicture = () => {
    var canvas = document.getElementById('canvas');
    var context = canvas.getContext('2d');
    var video = document.getElementById('video');

    // Take the picture and convert canvas to image
    context.drawImage(video, 0, 0, 640, 480);

    // Get OCR data
    canvas.toBlob((blob) => this.props.getImageInformation(blob));
  }

  render() {
    console.log(this.props);
    return (
      <div className="Camera">
        <video id="video" width="640" height="480" autoPlay></video>
        <button id="enable" onClick={this.enableCamera}>Enable OCR</button>
        <button id="snap" onClick={this.takePicture}>Take Picture</button>
        <canvas id="canvas" width="640" height="480"></canvas>
      </div>
    );
  }
}

export default Camera;
