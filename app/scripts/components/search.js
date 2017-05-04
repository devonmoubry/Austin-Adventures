import React from "react";
import { connect } from "react-redux";
import { Route, Link, NavLink } from "react-router-dom";
import container from "../containers/all.js";
import mapboxgl from 'mapbox-gl';
import Mapbox from 'react-redux-mapbox-gl';

//actions
import searchHikes from "../actions/search_hikes.js";
import searchRestaurants from "../actions/search_restaurants.js"
//components

import SearchResult from "./search_result.js"
import SearchResultsList from "./search_results_list.js"
import FoodSearchResultsList from "./food_search_results_list.js"
import FoodSearchResult from "./food_search_result.js"

class Search extends React.Component {
  constructor(props) {
    super(props)

    this.mapStyle = this.mapStyle.bind(this)
    this.mapOptions = this.mapOptions.bind(this)
  }

  handleHikeSearch(event) {
    event.preventDefault();
    const hikeSearch = this.refs.hikeSearch.value;
    this.props.dispatch(searchHikes(hikeSearch));
  }

  handleFoodSearch(event) {
    event.preventDefault();
    console.log(event);
    console.log(this.refs.restaurantSearch.value);
    const restaurantSearch = this.refs.restaurantSearch.value;
    console.log(restaurantSearch);
    this.props.dispatch(searchRestaurants(restaurantSearch));
  }

  mapStyle() {
    return {
      width : '100%',
      height : 400
    }
  }

  mapOptions() {
    return {
      style : 'mapbox://styles/mapbox/dark-v9'
    }
  }

  render() {
    return (
      <main>
        <Mapbox
          mapboxgl={mapboxgl}
          accessToken="pk.eyJ1IjoiZGV2b25tb3VicnkiLCJhIjoiY2oyOXA1cGl4MDAwMjJ3b2djdjh4cmV2cyJ9.ZrmYtWukYTSnSRnDgUJlcQ"
          style= {this.mapStyle()}
          options={this.mapOptions()}
        />
      </main>
    );
  }
}

export default connect(container.allState)(Search);