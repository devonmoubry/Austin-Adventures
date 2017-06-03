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
    this.hasFavoritedRestaurant = this.hasFavoritedRestaurant.bind(this)
    this.state = {}
  }

  handleFavRestaurant(event) {
    event.preventDefault();
    const id = this.props.restaurant.id;
    const name = this.props.restaurant.name;
    const usertoken = this.props.reducer.usertoken;
    const ownerId = this.props.reducer.ownerId;
    this.props.dispatch(favRestaurant(id, name, usertoken, ownerId));
  }

  hasFavoritedRestaurant(id) {
    if (this.props.reducer.favoriteRestaurants.length == 0) {
      return false;
    }
    var favRestaurantIds = this.props.reducer.favoriteRestaurants.map( function(favorite) {
      return favorite.id;
    });

    return favRestaurantIds.includes(id);
  }

  componentDidMount() {
    this.props.dispatch(getFoursquareBrunchDetails(this.props.restaurant.foursquare_id, function(data) {
      this.setState({foursquareDetails: data.response.venue})
    }.bind(this), function(data) {
      console.log('some error');
    }));
  }

  render() {
    let favoriteRestaurantsHTML = <button className="submit-input" onClick={this.handleFavRestaurant} type="submit" value="makeFavorite"><i className="fa fa-heart-o" aria-hidden="true"></i></button>

    if (this.hasFavoritedRestaurant(this.props.restaurant.id)) {
      favoriteRestaurantsHTML = <button className="submit-input" onClick={this.handleFavRestaurant} type="submit" value="isFavorite"><i className="fa fa-heart" aria-hidden="true"></i></button>
    }

    let brunchfoursquareDetails = <p>Loading details ...</p>;
    if(this.state.foursquareDetails != undefined) {
      const currency = "no price";
      if (this.state.foursquareDetails.attributes.groups != undefined && this.state.foursquareDetails.attributes.groups.length > 0) {
        currency = this.state.foursquareDetails.attributes.groups[0].summary
      }
      brunchfoursquareDetails =
              <a href={this.props.restaurant.website} target="_blank" tabIndex="0">{this.props.restaurant.name} {currency}</a>

    }

    return(
      <li className="search-result">
      {favoriteRestaurantsHTML}
      {brunchfoursquareDetails}
      </li>
    )
  }
}

export default connect(container.allState)(FoodSearchResult);
