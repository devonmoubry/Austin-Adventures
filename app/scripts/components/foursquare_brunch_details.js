import React from "react";
import { connect } from "react-redux";
import { Route, Link, NavLink } from "react-router-dom";
import container from "../containers/all.js";

class FoursquareBrunchDetails extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <div className="foursquare-brunch">
        <p>Price: {this.props.details.price.currency}</p>
        <p>{this.props.details.categories["0"].name}</p>
        <p>{this.props.details.location.formattedAddress["0"]}</p>
        <p>{this.props.details.location.formattedAddress["1"]}</p>
      </div>
    )
  }
}

export default connect(container.allState)(FoursquareBrunchDetails)
