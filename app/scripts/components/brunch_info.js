import React from "react";
import { connect } from "react-redux";
import { Route, Link, NavLink } from "react-router-dom";
import container from "../containers/all.js";
//components
import FoursquareBrunchDetails from "../components/foursquare_brunch_details.js"
import HikeComponent from "../components/hike.js"
//actions
import getFoursquareBrunchDetails from "../actions/get_foursquare_brunch_details.js"

class BrunchInfo extends React.Component {
  constructor(props) {
    super(props)

    this.handleShareButton = this.handleShareButton.bind(this)
    this.state = {}
  }

  handleShareButton(event) {
    event.preventDefault();
    const brunchId = this.props.brunch.id;
    const hikeId = this.props.hike.unique_id;
    this.props.history.push(`/plan/${hikeId}/${brunchId}`);
  }

  componentDidMount() {
    this.props.dispatch(getFoursquareBrunchDetails(this.props.brunch.foursquare_id, function(data) {
      this.setState({foursquareDetails: data.response.venue})
    }.bind(this)));
  }

  render() {
    const brunch = this.props.brunch;
    let brunchfoursquareDetails = <p>Loading details ...</p>;
    let foursquareMenu = <i className="fa fa-foursquare" aria-hidden="true"></i>;
    if(this.state.foursquareDetails != undefined) {
      brunchfoursquareDetails = <FoursquareBrunchDetails details={this.state.foursquareDetails}/>
      foursquareMenu = <a href={this.state.foursquareDetails.canonicalUrl} className="social-media-button button" target="_blank" type="submit"><i className="fa fa-foursquare" aria-hidden="true"></i>Foursquare</a>
    }
    return (
      <div className="brunch-info-container">
        <h1><a href={brunch['website']} target="_blank">{brunch['name']}</a> - {brunch['city']}, {brunch['state']} {brunch['zipcode']}</h1>
        <p>Brunch: {brunch['brunch']}</p>
        {brunchfoursquareDetails}
        {foursquareMenu}
        <button className="share-button button" onClick={this.handleShareButton} type="submit"><i className="fa fa-map-o" aria-hidden="true"></i>Share</button>
      </div>
    )
  }
}

export default connect(container.allState)(BrunchInfo)
