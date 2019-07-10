import React, { Component } from 'react';

class Result extends Component {
  render() {
    const result = this.props.result;

    if (!result) {
      return null;
    }
    return (
      <div className="result-code">
        {result.codeResult.code}
      </div>
      // Format can be found with: result.codeResult.format
    );
  }
}

export default Result;
