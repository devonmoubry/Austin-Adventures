import React from "react";
import { connect } from "react-redux";
import { Route, Link, NavLink } from "react-router-dom";
import container from "../containers/all.js";

class HikeComponent extends React.Component {
  constructor(props) {
    super(props)

  }

  getHike(id) {
    // iterate through this.propssearcResults
    //return hike;
  }

  render() {
    //const hike = getHike(this.props.urlstuff.id);

    return (
      <div className="hike-card-container">
        <h1>Austin Adventures</h1>
        <p>hike['name']</p>
        <p>hike['city']</p>
        <p>hike['state']</p>
        <p>hike['country']</p>
        <p>hike['directions']</p>
        <p>hike['description']</p>
      </div>
    );
  }
}

export default connect(container.allState)(HikeComponent);
