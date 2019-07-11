import React, { Component } from 'react';
import Quagga from 'quagga';

class Scanner extends Component {

  render() {
    return (
      <div id='interactive' className='viewport'>
        <video
          className='videoCamera'
          autoPlay
          preload='auto'
          muted='1'
          playsInline>
        </video>
        <canvas
          className='drawingBuffer'
          style={{
            position: 'absolute',
            top: 0,
            left: 0
          }}>
          </canvas>
      </div>
    );
  }

  componentDidMount() {
    const constraints = {
      audio: false,
      video: true
    }

    if (navigator.mediaDevices && typeof navigator.mediaDevices.getUserMedia === 'function') {
      navigator.mediaDevices.getUserMedia(constraints).then(
        (mediaStream) => {
          Quagga.init({
            inputStream: {
              name: "Live",
              type : "LiveStream"
            },
            locator: {
              patchSize: "medium",
              halfSample: true
            },
            numOfWorkers: 2,
            decoder: {
              readers : [
                "ean_reader",
              ]
            },
            locate: true
          }, function() {
            try {
              Quagga.start();

            } catch(err) {
              document.write("You must allow camera access.<br/>" + err);
            }
          });
          Quagga.onDetected(this._onDetected.bind(this));
          Quagga.onProcessed(function(result) {
            const drawingCtx = Quagga.canvas.ctx.overlay;
            const drawingCanvas = Quagga.canvas.dom.overlay;

            if (result) {
              if (result.boxes) {
                drawingCtx.clearRect(0, 0, parseInt(drawingCanvas.getAttribute("width")), parseInt(drawingCanvas.getAttribute("height")));
                result.boxes.filter(box => box !== result.box).forEach(box => {
                  Quagga.ImageDebug.drawPath(box, {x: 0, y: 1}, drawingCtx, {color: "green", lineWidth: 2});
                });
              }

              if (result.box) {
                Quagga.ImageDebug.drawPath(result.box, {x: 0, y: 1}, drawingCtx, {color: "#00F", lineWidth: 2});
              }

              if (result.codeResult && result.codeResult.code) {
                Quagga.ImageDebug.drawPath(result.line, {x: 'x', y: 'y'}, drawingCtx, {color: 'red', lineWidth: 3});
              }
            }
          });
        }, (err) => {
          document.write("You must allow camera access.<br/>" + err);
        });
    } else {
      document.write("You must allow camera access.");
    }
  }

  componentWillUnmount() {
    Quagga.offDetected(this._onDetected.bind(this));
  }

  _onDetected(result) {
    this.props.onDetected(result);
  }
}

export default Scanner;
