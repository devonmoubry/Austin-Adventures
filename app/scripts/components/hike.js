import React from "react";
import { connect } from "react-redux";
import { Route, Link, NavLink } from "react-router-dom";
import container from "../containers/all.js";
import _ from "lodash";

class HikeComponent extends React.Component {
  constructor(props) {
    super(props)

    this.handleYelpButton = this.handleYelpButton.bind(this)
    this.getHike = this.getHike.bind(this)
  }

  getHike(id) {
    // iterate through this.props.searchResult
    const clickId = Number(id);
    const hikes = this.props.reducer.searchResults;
    let theHike = _.filter(hikes, { 'unique_id': clickId });
    return theHike[0];
  }

  handleYelpButton() {
    console.log('go to yelp page');
  }

  render() {
    const hike = this.getHike(this.props.match.params.id);
    console.log('hike', hike);
    return (
      <div className="hike-card-container">
        <h1>Austin Adventures</h1>
        <p>{hike['name']} - {hike['city']}, {hike['state']}</p>
        <p>{hike['directions']}</p>
        <p>{hike['description']}</p>
        <button onClick={this.handleYelpButton} className="yelp-button" type="submit"><i className="fa fa-yelp" aria-hidden="true"></i></button>
      </div>
    );
  }
}

export default connect(container.allState)(HikeComponent);
