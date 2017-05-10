import React from "react";
import { connect } from "react-redux";
import { Route, Link, NavLink } from "react-router-dom";
import container from "../containers/all.js";

class BrunchInfo extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    console.log('what the hell is brunch? ', this.props);
    const brunch = this.props.brunch;
    return (
      <div className="brunch-info-container">
        <p><a href={'http://' + brunch['website']} target="_blank">{brunch['name']}</a> - {brunch['city']}, {brunch['state']} {brunch['zipcode']}</p>
        <p>{brunch['phone number']}</p>
        <p>Brunch: {brunch['brunch']}</p>
        <p>Review: {brunch['review']}</p>
      </div>
    )
  }
}

export default connect(container.allState)(BrunchInfo)
