import React from "react";
import { connect } from "react-redux";
import { Route, Link, NavLink } from "react-router-dom";
import container from "../containers/all.js";
//components
import FoodSearchResult from "./food_search_result.js"

class FoodSearchResultsList extends React.Component {
  constructor(props) {
    super(props)

    this.handleFoodSearchResults = this.handleFoodSearchResults.bind(this)
  }

  handleFoodSearchResults(restaurants) {
    return restaurants.map(function(restaurant) {
      return (
        <FoodSearchResult key={restaurant.id} restaurant={restaurant} role="alert"/>
      )
    })
  }
  render() {
    let restaurants = this.props.foodSearchResults;
    if (restaurants === null) {
      return (<span />)
    } else if (restaurants.length > 0) {
      return(
        <div className="results-div">
          <h1 tabIndex="0">Restaurants</h1>
          <ul>
            {this.handleFoodSearchResults(restaurants)}
          </ul>
        </div>
      )
    } else {
      return (
        <p>Bummer, no nosh here. Please try a different area.</p>
      );
    }
  }
}

export default connect(container.allState)(FoodSearchResultsList);
