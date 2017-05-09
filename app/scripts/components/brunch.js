import React from "react";
import { connect } from "react-redux";
import { Route, Link, NavLink } from "react-router-dom";
import container from "../containers/all.js";

class BrunchComponent extends React.Component {
  constructor(props) {
    super(props)

  }
  render() {
    return (
      <div className="brunch-card-container">
        <h1>Austin Adventures</h1>
        <p>brunch['name']</p>
        <p>brunch['city']</p>
        <p>brunch['state']</p>
        <p>brunch['zipcode']</p>
        <p>brunch['phone number']</p>
        <p>brunch['brunch']</p>
        <p>brunch['review']</p>
        <p>brunch['website']</p>
        {brunch['id']}
        {brunch['coordinates']}
      </div>
    );
  }
}

export default connect(container.allState)(BrunchComponent);
