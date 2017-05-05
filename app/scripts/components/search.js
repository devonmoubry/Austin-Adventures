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

    this.handleFoodSearch = this.handleFoodSearch.bind(this)

    this.getMap = this.getMap.bind(this)
    this.mapStyle = this.mapStyle.bind(this)
    this.mapOptions = this.mapOptions.bind(this)
    this.putMarkersOnTheMap = this.putMarkersOnTheMap.bind(this)
  }

  handleHikeSearch(event) {
    event.preventDefault();
    const hikeSearch = this.refs.hikeSearch.value;
    this.props.dispatch(searchHikes(hikeSearch));
  }

  handleFoodSearch() {
    this.props.dispatch(searchRestaurants(restaurantSearch));
  }

  getMap(map) {
    this.map = map;
  }

  mapStyle() {
    return {
      width : '100%',
      height : 400
    }
  }

  mapOptions() {
    return {
      style : 'mapbox://styles/mapbox/streets-v9',
      center: [-97.7780803, 30.2672225],
      zoom: 9
    }
  }

  putMarkersOnTheMap() {
    this.map.on('load', function () {
      console.log('Loaded map. Now putting hikes on map...');

      const hikes = this.props.reducer.searchResults;
      const features = hikes.map(function(hike) {
        const coordinates = [hike['lon'], hike['lat']];
        const popoverHtml = `
          <div class="popover">
            <strong>${hike['name']}</strong>
            <p>${hike['description']}</p>
          </div>
        `;

        return {
          'type': 'Feature',
          'properties': {
            'description': popoverHtml,
            'icon': 'triangle' // https://github.com/mapbox/mapbox-gl-styles
          },
          'geometry': {
            'type': 'Point',
            'coordinates': coordinates
          }
        }
      });

      // https://www.mapbox.com/mapbox-gl-js/example/geojson-markers/
      this.map.addLayer({
        "id": "places",
        "type": "symbol",
        "source": {
            "type": "geojson",
            "data": {
              "type": "FeatureCollection",
              "features": features
            }
        },
        "layout": {
          "icon-image": "{icon}-15",
          "icon-allow-overlap": true,
          "icon-size": 1
        }
      });

      // When a click event occurs on a feature in the places layer, open a popup at the
      // location of the feature, with description HTML from its properties.
      // Copied verbatim from: https://www.mapbox.com/mapbox-gl-js/example/popup-on-click/
      this.map.on('click', 'places', function (e) {
        console.log('Clicked on a hike icon!');
        new mapboxgl.Popup()
                    .setLngLat(e.features[0].geometry.coordinates)
                    .setHTML(e.features[0].properties.description)
                    .addTo(this.map);
      }.bind(this));

      console.log('Finished putting hikes on the map!');
    }.bind(this));
  }

  componentDidMount() {
    this.props.dispatch(searchHikes());
    this.props.dispatch(searchRestaurants());

    this.putMarkersOnTheMap();
  }

  render() {
    return (
      <main>
        <Mapbox
          mapboxgl={mapboxgl}
          accessToken="pk.eyJ1IjoiZGV2b25tb3VicnkiLCJhIjoiY2oyOXA1cGl4MDAwMjJ3b2djdjh4cmV2cyJ9.ZrmYtWukYTSnSRnDgUJlcQ"
          style= {this.mapStyle()}
          getMap={this.getMap}
          options={this.mapOptions()}
        />
        <SearchResultsList />
        <FoodSearchResultsList />
      </main>
    );
  }
}

export default connect(container.allState)(Search);
