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
    window.addEventListener('keydown', this._onKeyDown.bind(this));
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

  _onKeyDown(e) {
    console.log(Math.floor(Math.random() * CATALOG.length))
    if (e.key === 'r') {
      this.setState({
        scanning: false,
        result: CATALOG[Math.floor(Math.random() * CATALOG.length)]
      });
    } else if (e.key === 's') {
      this.setState({
        scanning: false,
        result: {
          "sku": "EM42",
          "shade": "brown",
          "color": "",
          "img_shade": "http://img.benefitcosmetics.com/image/upload/f_auto,q_auto,fl_lossy/origin_files/us/en/sites/us/files/roller-lash-brown-swatch.png",
          "name": "roller lash curling mascara",
          "tagline": "super-curling & lifting mascara",
          "price": 25,
          "price_discounted": 25,
          "url": "https://www.benefitcosmetics.com/us/en/product/roller-lash",
          "bestseller": 1,
          "img_box": "http://img.benefitcosmetics.com/image/upload/f_auto,q_auto,fl_lossy/origin_files/us/en/sites/us/files/roller-lash-hero-reg.png",
          "img_comp": "http://img.benefitcosmetics.com/image/upload/f_auto,q_auto,fl_lossy/origin_files/us/en/sites/us/files/roller-lash-component.png",
          "how_to": "Ready for the hook & roll, gorgeous? Gently wiggle the wand from base of lashes to tip. Repeat across your lashline, making sure to catch every last lash. Curls just wanna have fun!",
          "video_url": "https://www.youtube.com/embed/cxGU91ymjpQ",
          "upc": "0602004079664"
        }
      });
    }
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
