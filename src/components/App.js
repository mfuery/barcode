import React, { Component } from 'react';
import Scanner from './Scanner';
import Result from './Result';
import Quagga from 'quagga';
import './styles.scss'
import {CATALOG} from "../data/catalog";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      scanning: true,
      result: null,
    };
    this._loadCatalog()

  }

  _loadCatalog() {
    let newCat = {};
    CATALOG.forEach((item) => {
      newCat[item.upc] = item
    });
    this.catalog = newCat
    // console.log(newCat)
  }

  _rescan() {
    this.setState({
      scanning: !this.state.scanning,
      result: null,
    });
  }

  _onDetected(result) {
    this.setState({
      scanning: false,
      result: this.catalog[result.codeResult.code] || null,
    });
    Quagga.stop();
  }

  render() {
    let result = '';
    let scanner = '';

    // this.state.scanning = false;

    if (this.state.scanning) {
      scanner = <Scanner onDetected={this._onDetected.bind(this)} />
    } else {
      result = <Result result={this.state.result}
                       onRescan={this._rescan.bind(this)}/>
    }

    return (
      <div className="app">
        {scanner}
        {result}
      </div>
    )
  }
}

export default App;
