import React from "react";
import { connect } from "react-redux";
import { Route, Link, NavLink } from "react-router-dom";
import container from "../containers/all.js";

class BrunchInfo extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    const brunch = this.props.brunch;
    return (
      <div className="brunch-info-container">
        <h1><a href={brunch['website']} target="_blank">{brunch['name']}</a> - {brunch['city']}, {brunch['state']} {brunch['zipcode']}</h1>
        <p>Brunch: {brunch['brunch']}</p>
        <button className="social-media-button button" onClick={this.handleSocialButton} type="submit"><i className="fa fa-foursquare" aria-hidden="true"></i>Foursquare</button>
        <button className="share-button button" onClick={this.handleShareButton} type="submit"><i className="fa fa-map-o" aria-hidden="true"></i>Share</button>
      </div>
    )
  }
}

export default connect(container.allState)(BrunchInfo)
