import React, { Component } from 'react';

class Camera extends Component {
  enableCamera = function() {
    var video = document.getElementById('video');

    // Get access to the camera
    if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia({ video: true }).then(function(stream) {
            video.src = window.URL.createObjectURL(stream);
            video.play();
        });
    }
  }

  takePicture = function() {
    var canvas = document.getElementById('canvas');
    var context = canvas.getContext('2d');
    var video = document.getElementById('video');

    // Take the picture and convert canvas to image
    context.drawImage(video, 0, 0, 640, 480);
    var image = convertCanvasToImage(canvas);
  }

  render() {
    return (
      <div className="Camera">
        <video id="video" width="640" height="480" autoplay></video>
        <button id="enable" onClick={this.enableCamera}>Enable OCR</button>
        <button id="snap" onClick={this.takePicture}>Take Picture</button>
        <canvas id="canvas" width="640" height="480"></canvas>
      </div>
    );
  }
}

// Converts canvas to an image
function convertCanvasToImage(canvas) {
  var image = new Image();
  image.src = canvas.toDataURL("image/png");
  return image;
}

export default Camera;
