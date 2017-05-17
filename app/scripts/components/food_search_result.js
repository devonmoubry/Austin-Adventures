import React from "react";
import { connect } from "react-redux";
import { Route, Link, NavLink } from "react-router-dom";
import container from "../containers/all.js";
//actions
import favRestaurant from "../actions/fav_restaurant.js"

import getFoursquareBrunchDetails from "../actions/get_foursquare_brunch_details.js"

class FoodSearchResult extends React.Component {
  constructor(props) {
    super(props)

    this.handleFavRestaurant = this.handleFavRestaurant.bind(this)
    this.state = {}
  }

  handleFavRestaurant(event) {
    event.preventDefault();
    const id = this.props.restaurant.id;
    const name = this.props.restaurant.name;
    const usertoken = this.props.usertoken;
    this.props.dispatch(favRestaurant(id, name, usertoken));
  }

  componentDidMount() {
    this.props.dispatch(getFoursquareBrunchDetails(this.props.restaurant.foursquare_id, function(data) {
      this.setState({foursquareDetails: data.response.venue})
    }.bind(this)));
  }

  render() {

    let brunchfoursquareDetails = <p>Loading details ...</p>;
    if(this.state.foursquareDetails != undefined) {
      const currency = "no price";
      if (this.state.foursquareDetails.attributes.groups != undefined && this.state.foursquareDetails.attributes.groups.length > 0) {
        currency = this.state.foursquareDetails.attributes.groups[0].summary
      }
      brunchfoursquareDetails = <li className="search-result">
              <p tabIndex="0">{this.props.restaurant.name}</p>
              <p>{currency}</p>
              <p>{this.props.restaurant.website}</p>
              <button className="submit-input" onClick={this.handleFavRestaurant} type="submit" value="Favorite"><i className="fa fa-heart-o" aria-hidden="true"></i></button>
            </li>
    }

    return(
      <div>{brunchfoursquareDetails}</div>
    )
  }
}

export default connect(container.allState)(FoodSearchResult);
