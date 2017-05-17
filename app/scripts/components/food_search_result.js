import React from "react";
import { connect } from "react-redux";
import { Route, Link, NavLink } from "react-router-dom";
import container from "../containers/all.js";
//actions
import favRestaurant from "../actions/fav_restaurant.js"

class FoodSearchResult extends React.Component {
  constructor(props) {
    super(props)

    this.handleFavRestaurant = this.handleFavRestaurant.bind(this)
  }

  handleFavRestaurant(event) {
    event.preventDefault();
    const id = this.props.restaurant.id;
    const name = this.props.restaurant.name;
    const usertoken = this.props.usertoken;
    this.props.dispatch(favRestaurant(id, name, usertoken));
  }

  render() {

    return(
      <li className="search-result">
        <p tabIndex="0">{this.props.restaurant.name}</p>
        <p>{this.props.restaurant.price}</p>
        <p>{this.props.restaurant.webiste}</p>
        <button className="submit-input" onClick={this.handleFavRestaurant} type="submit" value="Favorite"><i className="fa fa-heart-o" aria-hidden="true"></i></button>
      </li>
    )
  }
}

export default connect(container.allState)(FoodSearchResult);
