import React, { Component } from "react";
import Quagga from "quagga";

export default class Scanner extends Component {
  constructor(props) {
    super(props);

    this.state = {
      width: 640,
      height: 480,
    };
  }

  updateWindowDimensions() {
    this.setState({
      width: window.innerWidth,
      height: window.innerHeight,
    });

    console.log(`Dimensions: (${this.state.width}, ${this.state.height})`);
  }

  componentDidMount() {
    const constraints = {
      audio: false,
      video: {
        width: {
          exact: 1280,
        },
        height: {
          exact: 720,
        },
        frameRate: {
          exact: 15,
        },
        zoom: {
          exact: 2.0,
        },
      },
    };
    console.log(constraints);

    window.addEventListener("resize", this.updateWindowDimensions.bind(this));
    this.updateWindowDimensions();

    if (
      navigator.mediaDevices &&
      typeof navigator.mediaDevices.getUserMedia === "function"
    ) {
      navigator.mediaDevices.getUserMedia(constraints).then(
        (mediaStream) => {
          try {
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
          } catch (err) {
            // Quagga throws an exception here, occasionally. Handle it by refreshing the page.
            window.location.reload();
          }
          Quagga.onDetected(this._onDetected.bind(this));
          Quagga.onProcessed(function (result) {
            // This describes the (x,y) coords defining the box where a barcode is detected.
            const drawingCtx = Quagga.canvas.ctx.overlay;
            const drawingCanvas = Quagga.canvas.dom.overlay;

            if (result) {
              if (result.boxes) {
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
                console.log("Barcode calculated: " + result.codeResult.code);
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
    // window.removeEventListener("resize", this.updateDimensions.bind(this));
  }

  _onDetected(result) {
    console.log("onDetected", result);
    this.props.onDetected(result);
  }

  _onRandom() {
    this.props.onRandom();
  }

  render() {
    return (
      <div>
        <div id="interactive" className="viewport">
          <video
            className="video-camera"
            autoPlay
            preload="auto"
            muted="1"
            playsInline
            width={this.state.width}
            style={{
              position: "absolute",
              top: 40,
              left: 0,
            }}
          ></video>
          <canvas
            className="drawingBuffer"
            width={this.state.width}
            style={{
              position: "absolute",
              top: 40,
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
}
