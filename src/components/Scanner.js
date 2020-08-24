import React, { Component } from "react";
import Quagga from "quagga";

class Scanner extends Component {
  render() {
    return (
      <div>
        <div id="interactive" className="viewport">
          <video
            className="videoCamera"
            autoPlay
            preload="auto"
            muted="1"
            playsInline
          ></video>
          <canvas
            className="drawingBuffer"
            style={{
              position: "absolute",
              top: 0,
              left: 0,
            }}
          ></canvas>
        </div>
        <div className="cta">
          <div>Scan a Benefit product, Gorgeous</div>
          <button
            onClick={this._onRandom.bind(this)}
            className="button on-random-btn"
          >
            Random
          </button>
        </div>
      </div>
    );
  }

  componentDidMount() {
    const constraints = {
      audio: false,
      video: {
        width: {
          // exact: 1920,
          exact: 1280,
        },
        height: {
          // exact: 1080,
          exact: 720,
        },
        frameRate: {
          exact: 15,
        },
        zoom: {
          exact: 2.0,
        },
        // facingMode: {
        //   exact: "environment",
        // },
      },
    };
    console.log(constraints);

    if (
      navigator.mediaDevices &&
      typeof navigator.mediaDevices.getUserMedia === "function"
    ) {
      navigator.mediaDevices.getUserMedia(constraints).then(
        (mediaStream) => {
          Quagga.init(
            {
              inputStream: {
                name: "Live",
                type: "LiveStream",
                constraints: constraints,
              },
              locator: {
                patchSize: "medium",
                halfSample: true,
              },
              numOfWorkers: 4,
              decoder: {
                readers: ["ean_reader"],
              },
              locate: true,
            },
            function () {
              try {
                Quagga.start();
              } catch (err) {
                document.write("You must allow camera access.<br/>" + err);
              }
            }
          );
          Quagga.onDetected(this._onDetected.bind(this));
          Quagga.onProcessed(function (result) {
            // This describes the (x,y) coords defining the box where a barcode is detected.
            console.log("onProcessed", result);
            const drawingCtx = Quagga.canvas.ctx.overlay;
            const drawingCanvas = Quagga.canvas.dom.overlay;

            if (result) {
              if (result.boxes) {
                console.log("Scanner box found...");
                drawingCtx.clearRect(
                  0,
                  0,
                  parseInt(drawingCanvas.getAttribute("width")),
                  parseInt(drawingCanvas.getAttribute("height"))
                );
                result.boxes
                  .filter((box) => box !== result.box)
                  .forEach((box) => {
                    Quagga.ImageDebug.drawPath(
                      box,
                      { x: 0, y: 1 },
                      drawingCtx,
                      { color: "green", lineWidth: 2 }
                    );
                  });
              }

              // Draw the box where a barcode was detected.
              if (result.box) {
                Quagga.ImageDebug.drawPath(
                  result.box,
                  { x: 0, y: 1 },
                  drawingCtx,
                  { color: "#00F", lineWidth: 2 }
                );
              }

              // Barcode was detected... trying to decode...
              if (result.codeResult && result.codeResult.code) {
                console.log("Barcode was detected... trying to decode...");
                Quagga.ImageDebug.drawPath(
                  result.line,
                  { x: "x", y: "y" },
                  drawingCtx,
                  { color: "red", lineWidth: 3 }
                );
              }
            }
          });
        },
        (err) => {
          console.log(err);
          document.write("You must allow camera access.<br/>" + err);
        }
      );
    } else {
      document.write("You must allow camera access.");
    }
  }

  componentWillUnmount() {
    Quagga.offDetected(this._onDetected.bind(this));
  }

  _onDetected(result) {
    console.log("onDetected", result);
    this.props.onDetected(result);
  }

  _onRandom() {
    this.props.onRandom();
  }
}

export default Scanner;
