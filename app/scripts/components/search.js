import React from "react";
import { connect } from "react-redux";
import { Route, Link, NavLink } from "react-router-dom";
import container from "../containers/all.js";
import mapboxgl from 'mapbox-gl';
import Mapbox from 'react-redux-mapbox-gl';
//components
import SearchResult from "./search_result.js"
import SearchResultsList from "./search_results_list.js"
import FoodSearchResultsList from "./food_search_results_list.js"
import FoodSearchResult from "./food_search_result.js"
import BrunchComponent from "./brunch.js"
import HikeComponent from "./hike.js"
// API
import trailsAPI from "../models/trailsAPI.json";
import brunchAPI from "../models/brunch_bunch_api.json";

class Search extends React.Component {
  constructor(props) {
    super(props)

    this.getMap = this.getMap.bind(this)
    this.mapStyle = this.mapStyle.bind(this)
    this.mapOptions = this.mapOptions.bind(this)
    this.putMarkersOnTheMap = this.putMarkersOnTheMap.bind(this)
  }

  getMap(map) {
    this.map = map;
  }

  mapStyle() {
    return {
      width : '100%',
      height : '70%'
    }
  }

  mapOptions() {
    return {
      style : 'mapbox://styles/mapbox/streets-v9',
      center: [-97.85160793626352, 30.303049353095147],
      zoom: 9
    }
  }

  putMarkersOnTheMap() {
    this.map.on('load', function () {
      console.log('Loaded map. Now putting hikes on map...');

      const hikes = trailsAPI.places;
      const hikeFeatures = hikes.map(function(hike) {
        const coordinates = [hike['lon'], hike['lat']];
        const id = hike.unique_id;
        const length = hike.activities[0].length;

        return {
          'type': 'Feature',
          'properties': {
            'id': id,
            'type': 'hike',
            'icon': 'triangle', // https://github.com/mapbox/mapbox-gl-styles
            'length': length
          },
          'geometry': {
            'type': 'Point',
            'coordinates': coordinates
          }
        }
      });

      const brunches = brunchAPI.places;
      const brunchFeatures = brunches.map(function(brunch) {
        const coordinates = brunch.coordinates;
        const id = brunch['id'];
        return {
          'type': 'Feature',
          'properties': {
            'id': id,
            'type': 'brunch',
            'icon': 'restaurant' // https://github.com/mapbox/mapbox-gl-styles
          },
          'geometry': {
            'type': 'Point',
            'coordinates': coordinates
          }
        }
      });

      const features = hikeFeatures.concat(brunchFeatures);

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

        const componentType = e.features[0].properties.type;
        if (componentType == 'brunch') {
          console.log('brunch bunch');
            this.props.history.push(`/brunch/${e.features[0].properties.id}`)
        } else if (componentType == 'hike') {
          console.log('take a hike');
            this.props.history.push(`/hike/${e.features[0].properties.id}`)
        }
      }.bind(this));

      console.log('Finished putting hikes on the map!');
/*** hike length filter ***/
      var short = document.getElementById('filter-length-short'),
      medium = document.getElementById('filter-length-medium'),
      long = document.getElementById('filter-length-long'),
      hall = document.getElementById('filter-length-hall');

      short.onclick = function(e) {
        hall.className = '';
        medium.className = '';
        long.className = '';
        short.className = 'active';
        console.log('before setFilter in short');
        this.map.setFilter('places', ['any', ['<=', 'length', 3.0], ['==', 'type', 'brunch']] );
        return false;
      }.bind(this);
      medium.onclick = function(e) {
        hall.className = '';
        short.className = '';
        long.className = '';
        medium.className = 'active';
        this.map.setFilter('places', ['any', ['in','length', 4.0, 5.0, 6.0, 7.0, 8.0, 9.0], ['==', 'type', 'brunch']]);
        return false;
      }.bind(this);
      long.onclick = function(e) {
        hall.className = '';
        short.className = '';
        medium.className = '';
        long.className = 'active';
        this.map.setFilter('places', ['any', ['>=','length', 10.0], ['==', 'type', 'brunch']]);
        return false;
      }.bind(this);
      hall.onclick = function() {
        short.className = '';
        medium.className = '';
        long.className = '';
        hall.className = 'active';
        this.map.setFilter('places', ['any', ['==', 'type', 'hike'], ['==', 'type', 'brunch']]);
        return false;
      }.bind(this);

/*** brunch price filter ***/
      // var one = document.getElementsById('filter-price-one'),
      // two = document.getElementsById('filter-price-two'),
      // ball = document.getElementsById('filter-price-ball');

      // one.onclick = function(e) {
      //   ball.className = '';
      //   two.className = '';
      //   one.className = 'active';
      //   this.map.setFilter('places', ['any', ['==', 'price', '$'], ['==', 'type', 'hike']]);
      //   return false;
      // }.bind(this);
      // two.onclick = function(e) {
      //   one.className = '';
      //   all.className = '';
      //   two.className = 'active';
      //   this.map.setFilter('places', ['any', ['==', 'price', '$$'], ['==', 'type', 'hike']]);
      //   return false;
      // }.bind(this);
      // all.onclick = function() {
      //   one.className = '';
      //   two.className = '';
      //   all.className = 'active';
      //   this.map.setFilter('places', ['any', ['==', 'type', 'brunch'], ['==', 'type', 'hike']]);
      //   return false;
      // }.bind(this);

    }.bind(this));
  }

  componentDidMount() {
    this.putMarkersOnTheMap();
  }

  render() {
    return (
      <main>
        <div className="welcome-container">
          <div className="trail">1.  Choose a hike  ▲</div>
        </div>
        <div className="map-container">
          <nav id='filter-length-ui' className='filter-length-ui'>
            <a href='#' className='active' id='filter-length-hall'>All hike lengths</a>
            <a href='#' id='filter-length-short'>1-3 mi.</a>
            <a href='#' id='filter-length-medium'>4-9 mi.</a>
            <a href='#' id='filter-length-long'>10 mi.+</a>
          </nav>
          <nav id='filter-price-ui' className='filter-price-ui'>
            <a href='#' className='active' id='filter-price-ball'>All brunch prices</a>
            <a href='#' id='filter-one'>$</a>
            <a href='#' id='filter-two'>$$</a>
          </nav>
          <Mapbox
            mapboxgl={mapboxgl}
            accessToken={this.props.reducer.mapBoxAccessToken}
            style= {this.mapStyle()}
            getMap={this.getMap}
            options={this.mapOptions()}
          />
        </div>
        <SearchResultsList />
        <FoodSearchResultsList />
      </main>
    );
  }
}

export default connect(container.allState)(Search);
