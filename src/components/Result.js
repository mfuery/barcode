import React, { Component } from 'react';

class Result extends Component {

  render() {
    const result = this.props.result;
    console.log('RESULT')
    console.log(result)

    if (!this.props.result) {
      // TODO Sorry, not found
      return (
        <div className={"no-result"}>
          <h1>Sorry, not found</h1>
        </div>
      );
    }

    return (
      <div className="result">
        <img className="image-cropper" src={result.img_box} />
        <h1>{result.name}</h1>
        <h2>{result.tagline}</h2>

        <button onClick={this.props.onRescan()} className="button">
          RESCAN
        </button>
      </div>
    );
  }
}

export default Result;
