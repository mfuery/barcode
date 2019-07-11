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
        result: {
          "sku": "IB202",
          "position": 1,
          "shade_name": "jet black",
          "color_name": "",
          "img_shade_swatch": "http://img.benefitcosmetics.com/image/upload/f_auto,q_auto,fl_lossy/origin_files/us/en/sites/us/files/theyre-real-mascara-swatch-black4_7.png",
          "discounted_price": 25,
          "parent_product_id": "TARMASCARA",
          "parent_product_name": "they're real! lengthening mascara",
          "statement_of_id": "beyond mascara ",
          "price": 25,
          "product_url": "https://www.benefitcosmetics.com/us/en/product/theyre-real-lengthening-mascara",
          "meta_keywords": "mascara, lengthening mascara,  long eyelashes,  best mascara,  brown mascara,  blue mascara, mascara, mascara, mascara, mascara, mascara, mascara, mascara, mascara, mascara, mascara, mascara, mascara, mascara, mascara, mascara, mascara, mascara, mascara, whats new, mascara, eyes misbehavin', skimpy & sparse eyelashes, they're real collection",
          "keywords": "Eyes,Mascara,Bestsellers,They're Real Collection,Skimpy & Sparse Eyelashes,Eye Misbehavin',Eyes Misbehavin',Eye Bestsellers,Cult Classics,Cult Classics Collection,Bestsellers",
          "dilemma_category": "Eyes Misbehavin',Skimpy & Sparse Eyelashes",
          "category_rank": 6,
          "bestseller": 1,
          "collection": "They're Real! Collection,Holiday Gifts - Top Sellers,What We're Loving - Homepage,2017.03 Vacation Essentials,2017.04 Trending Now,2017.05 Friends & Family,2017.06 Top Bene-faves,2017.07 Top Sellers,2017.08 Never-Ending Summer,2017.11 - BF HP,Cartcollection,2017.11 - Pore Collection",
          "cross_sell_skus": "PRECI,THEPOIB184,BENETIIB78,GIMMEBROW,HIGLOBM40,HIGHBEIB39",
          "discontinued": null,
          "img_comp": "http://img.benefitcosmetics.com/image/upload/f_auto,q_auto,fl_lossy/origin_files/us/en/sites/us/files/theyre-real-mascara-component.png",
          "img_comp_alt_text": "Lengthen,  curl,  volumize eyelashes for drama beyond belief",
          "img_boxcomp": "http://img.benefitcosmetics.com/image/upload/f_auto,q_auto,fl_lossy/origin_files/us/en/sites/us/files/theyre-real-mascara-hero_3.png",
          "img_thumb": "http://img.benefitcosmetics.com/image/upload/f_auto,q_auto,fl_lossy/origin_files/us/en/sites/us/files/styles/thumbnail/public/theyre-real-mascara-component.png?itok=XNPBvWl1",
          "product_description_title": "Bigger,  bolder,  sexier lashes!",
          "product_description": "they're real!  lengthens, curls, volumizes, lifts and separates. Our jet black, long-wearing formula won’t smudge or dry out. A specially designed brush reveals lashes you never knew you had! 94% saw dramatic length & volume* 94% saw visible lift* 100% saw long-wearing results* *Results observed in a consumer panel survey ",
          "product_details": "8.5 g Net wt. 0.3 oz.  ",
          "ingredients": "WATER (AQUA), PARAFFIN, POLYBUTENE, STYRENE/ACRYLATES/AMMONIUM METHACRYLATE COPOLYMER, BEESWAX (CERA ALBA), BISDIGLYCERYL POLYACYLADIPATE2, C1836 ACID TRIGLYCERIDE, PALMITIC ACID, STEARIC ACID, TRIETHANOLAMINE, VP/EICOSENE COPOLYMER, ACACIA SENEGAL GUM, HYDROXYETHYLCELLULOSE, PHENOXYETHANOL, TETRASODIUM EDTA, BUTYLENE GLYCOL, CAPRYLYL GLYCOL, TOCOPHERYL ACETATE, SODIUM LAURETH12 SULFATE, GLYCERIN, POTASSIUM SORBATE, SERICIN, CALCIUM CHLORIDE, SODIUM HYALURONATE, TILIA TOMENTOSA BUD EXTRACT, CITRIC ACID, BHT, SORBIC ACID. [+/: IRON OXIDES (CI 77491, CI 77492, CI 77499), ULTRAMARINES (CI 77007), CHROMIUM OXIDE GREENS (CI 77288), CHROMIUM HYDROXIDE GREEN (CI 77289), TITANIUM DIOXIDE (CI 77891)]. N¬∞ 05827/N  ",
          "img_wwl_carousel": "http://img.benefitcosmetics.com/image/upload/f_auto,q_auto,fl_lossy/origin_files/us/en/sites/us/files/ET_Theyre_Real_Now_Wow-min.jpg,http://img.benefitcosmetics.com/image/upload/f_auto,q_auto,fl_lossy/origin_files/us/en/sites/us/files/theyre-real-mascara-whyweloveit-3_1.jpg,http://img.benefitcosmetics.com/image/upload/f_auto,q_auto,fl_lossy/origin_files/us/en/sites/us/files/theyre-real-multi-whyweloveit-2.jpg",
          "how_to_apply_title": "Beauty beyond belief!",
          "how_to_apply": "Lashes don’t lie...or do they? Take your pretty positions: Hold the wand horizontally and give the brush a wiggle from side to side & base to tip for maximum volume, length and lift. Flip your grip. Hold the wand vertically & stroke upward to curl and separate. Layer generously, as you wish.  ",
          "beauty_tip": "Dear doe-eyes: Use the domed tip to fan out corner lashes.  ",
          "img_hta_model": "http://img.benefitcosmetics.com/image/upload/f_auto,q_auto,fl_lossy/origin_files/us/en/sites/us/files/TAR-model%20how%20to%20apply%20image-min.png",
          "img_hta_model_alt_text": "tar how to apply image ",
          "tips_tricks_video_url": "https://www.youtube.com/embed/s8DjzEIwcW8",
          "avg_overall_rating": "4.00000",
          "hashtag": "realsies",
          "dilemma_copy": "Are your lashes for real? Yes! The length is beyond belief. Doe-eyed and daring,  you’ll see the lashes you never knew you had.",
          "upc": "0602004039200"
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
