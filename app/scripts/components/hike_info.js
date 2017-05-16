import React from "react";
import { connect } from "react-redux";
import { Route, Link, NavLink } from "react-router-dom";
import container from "../containers/all.js";

class HikeInfo extends React.Component {
  constructor(props) {
    super(props)

    this.handleShareButton = this.handleShareButton.bind(this)
  }

  handleShareButton(event) {
    event.preventDefault();
    const brunchId = this.props.brunch.id;
    const hikeId = this.props.hike.unique_id;
    this.props.history.push(`/plan/${hikeId}/${brunchId}`);
  }

  render() {
    const hike = this.props.hike;
    return (
      <div className="hike-info-container">
      <h1>{hike['name']} - {hike['city']}, {hike['state']}</h1>
      <button className="share-button button" onClick={this.handleShareButton} type="submit"><i className="fa fa-map-o" aria-hidden="true"></i>Share your plan</button>
      </div>
    )
  }
}

export default connect(container.allState)(HikeInfo)
