import React, { Component } from "react";

class Result extends Component {
  _openBenefitSite() {
    window.open("https://fuery.io/", "_blank");
  }

  render() {
    let result = this.props.result;

    if (!result) {
      return (
        <div className="result-container">
          <div className="hero">
            <button
              onClick={this.props.onRescan}
              className="button"
              style={{ margin: "40px" }}
            >
              RESCAN
            </button>
            <h1>I don't know that barcode. Scan a Benefit product, babe.</h1>
            <h3>{this.props.code}</h3>
          </div>
        </div>
      );
    }

    const is_discounted = result.discounted_price < result.price;
    if (!result.price) {
      result.price = 0;
    }
    const avg_overall_rating = parseFloat(result.avg_overall_rating);
    const hashtag = (result.hashtag || "#benefitcosmetics").replace("#", "");
    const hashtag_url = "https://www.twitter.com/hashtag/" + hashtag;

    return (
      <div className="result-container">
        <div className="close-btn" onClick={this.props.onRescan}>
          <span>X</span>
        </div>
        <div className="hero" onClick={this._openBenefitSite.bind(this)}>
          <div className="product-image">
            {result.bestseller ? (
              <div className="bestseller-badge">&nbsp;</div>
            ) : (
              ""
            )}
            <div className="image-cropper clear">
              <img
                className="profile-pic"
                src={result.img_boxcomp}
                alt={result.product_description_title}
              />
            </div>
          </div>
          <h1>{result.parent_product_name}</h1>
          <h2>{result.statement_of_id}</h2>
        </div>

        <div className="highlights">
          {result.discounted_price && is_discounted ? (
            <div className="highlight" style={{ padding: 0 }}>
              <h1>${result.discounted_price.toFixed(2)}</h1>
              <h2 className="discounted">${result.price.toFixed(2)}</h2>
            </div>
          ) : (
            <div className="highlight">
              <h1>${result.price.toFixed(2)}</h1>
            </div>
          )}

          {result.avg_overall_rating > 3.0 ? (
            <div className="highlight last">
              <h1>{avg_overall_rating.toFixed(1)} / 5.0</h1>
            </div>
          ) : (
            ""
          )}
        </div>

        <div className="detail-body">
          <div className="headline">
            <h1>{result.product_description_title}</h1>
          </div>

          {result.tips_tricks_video_url ? (
            <div className="how-to-video">
              <iframe
                src={result.tips_tricks_video_url}
                title={result.product_description}
              />
            </div>
          ) : (
            ""
          )}

          {result.how_to_apply ? (
            <div className="how-to">
              <h2 style={{ textTransform: "uppercase" }}>
                {result.how_to_apply_title}
              </h2>
              <h3>{result.how_to_apply}</h3>
            </div>
          ) : (
            ""
          )}

          {result.dilemma_copy ? (
            <div className="dilemma">
              <h2>DILEMMA</h2>
              <h2>{result.dilemma_copy}</h2>
            </div>
          ) : (
            ""
          )}

          {result.beauty_tip ? (
            <div className="beauty-tip">
              <h2>BEAUTY TIP</h2>
              <h2>{result.beauty_tip}</h2>
            </div>
          ) : (
            ""
          )}

          <div className="thumbs">
            {result.img_comp ? (
              <div className="image-cropper">
                <img
                  className="thumbnail first"
                  src={result.img_comp}
                  alt={result.img_comp_alt_text}
                />
              </div>
            ) : (
              ""
            )}
            {result.img_hta_model ? (
              <div className="image-cropper">
                <img
                  className="thumbnail"
                  src={result.img_hta_model}
                  alt={result.img_hta_model_alt_text}
                />
              </div>
            ) : (
              ""
            )}
            {result.img_shade_swatch ? (
              <div className="image-cropper">
                <img
                  className="thumbnail last"
                  src={result.img_shade_swatch}
                  alt={result.shade_name}
                />
              </div>
            ) : (
              ""
            )}
          </div>

          <div className="headline">
            <h1>
              <a href={hashtag_url} target="_blank" rel="noopener noreferrer">
                #{hashtag}
              </a>
            </h1>
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
