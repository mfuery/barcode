import React, {Component} from 'react';
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
      code: null
    };
    this._loadCatalog()
    window.addEventListener('keydown', this._onKeyDown.bind(this));
  }

  _loadCatalog() {
    let newCat = {};
    CATALOG.forEach((item) => {
      newCat[parseInt(item.upc)] = item
    });
    this.catalog = newCat
  }

  _rescan() {
    this.setState({
      scanning: !this.state.scanning,
      result: null,
      code: null,
    });
  }

  _onDetected(result) {
    const product = this.catalog[parseInt(result.codeResult.code)] || null;
    this.setState({
      scanning: false,
      result: product,
      code: result.codeResult.code,
    });
    if (product) {
      Quagga.stop();
    }
  }

  _onKeyDown(e) {
    if (e.key === 'r') {
      const index = Math.floor(Math.random() * CATALOG.length);
      console.log('item: ' + index)
      this.setState({
        scanning: false,
        result: CATALOG[index]
      });
    } else if (e.key === 's') {
      this.setState({
        scanning: false,
        result: CATALOG[0]
      });
    } else if (e.key === 'f') {
      this.setState({
        scanning: false,
        result: CATALOG[41]
      });
    }
  }

  render() {
    let result = '';
    let scanner = '';

    if (this.state.scanning) {
      scanner = <Scanner onDetected={this._onDetected.bind(this)}/>
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
