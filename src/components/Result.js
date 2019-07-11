import React, { Component } from 'react';

class Result extends Component {

  render() {
    let result = this.props.result;
    //  result = {
    //   "sku": "EM55",
    //   "shade": "purple",
    //   "color": "",
    //   "shade_img": "",
    //   "name": "BADgal BANG! 24 Hour Eye Pencil",
    //   "tagline": "Creamy, longwear eye liner",
    //   "price": 20,
    //   "price_discounted": 20,
    //   "url": "https://www.benefitcosmetics.com/us/en/product/bad-gal-bang-24-hour-eye-pencil",
    //   "bestseller": "",
    //   "img_box": "http://img.benefitcosmetics.com/image/upload/f_auto,q_auto,fl_lossy/origin_files/us/en/sites/us/files/Badgal-Black-Eye-Pencil-BoxComp.png",
    //   "img_comp": "http://img.benefitcosmetics.com/image/upload/f_auto,q_auto,fl_lossy/origin_files/us/en/sites/us/files/Badgal-Eye-Pencil-Black-Component-Size_1.png",
    //   "how_to": "Glide along lash line for instant definition. Quickly blend out with built-in smudger for a smoky effect.",
    //   "video_url": "",
    //   "upc": "0602004105479"
    // }
    console.log('RESULT')
    console.log(result)

    if (!result) {
      return (
        <div className="result-container">
          <div className="hero">
            <button onClick={this.props.onRescan}
                    className="button"
            style={{margin: "40px"}}>
              RESCAN
            </button>
            <h1>Sorry Gorgeous, I couldn't find that</h1>
            <h2></h2>
          </div>
        </div>
      );
    }

    return (
      <div className="result-container">
        <div className="hero">
          <div className="image-cropper">
            <img className="profile-pic" src={result.img_box} />
          </div>
          <h1>{result.name}</h1>
          <h2>{result.tagline}</h2>
        </div>

        <div className="highlights">
          <div className="highlight">
            <h1>90%</h1>
            <h2>saw dramatic volume</h2>
          </div>
          <div className="highlight">
            <h1>94%</h1>
            <h2>said it instantly lifted lashes</h2>
          </div>
          <div className="highlight">
            <h1>92%</h1>
            <h2>said it lengthens lashes</h2>
          </div>
        </div>

        <div className="detail-body">
          <div className="how-to-video">
            <iframe src={result.video_url} />
          </div>

          <div className="how-to">
            <h3>HOW TO APPLY</h3>
            <h3>{result.how_to}</h3>
          </div>

          <div className="thumbs">
            <img className="thumbnail" src={result.img_comp}/>
            <img className="thumbnail" src={result.img_comp}/>
            <img className="thumbnail" src={result.img_comp}/>
          </div>
        </div>

        <button onClick={this.props.onRescan} className="button">
          RESCAN
        </button>
      </div>
    );
  }
}

export default Result;
