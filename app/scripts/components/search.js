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
import brunchAPI from "../models/brunch_bunch_api.json"

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
      height : '100%'
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

      const hikes = trailsAPI.places;
      const hikeFeatures = hikes.map(function(hike) {
        const coordinates = [hike['lon'], hike['lat']];
        const id = hike.unique_id;

        return {
          'type': 'Feature',
          'properties': {
            'id': id,
            'type': 'hike',
            'icon': 'triangle' // https://github.com/mapbox/mapbox-gl-styles
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

        // 1. a React component for the hike (in a popover)
        const componentType = e.features[0].properties.type;
        if (componentType == 'brunch') {
          console.log('brunch bunch');
          return (
            this.props.history.push(`/brunch/${e.features[0].properties.id}`)
          )
        } else if (componentType == 'hike') {
          console.log('take a hike');
          return (
            this.props.history.push(`/hike/${e.features[0].properties.id}`)
          )
        } else {
          return (
            <span />
          )
        }
      }.bind(this));

      console.log('Finished putting hikes on the map!');
    }.bind(this));
  }

  componentDidMount() {
    this.putMarkersOnTheMap();
  }

  render() {
    return (
      <main>
        <Mapbox
          mapboxgl={mapboxgl}
          accessToken={this.props.reducer.mapBoxAccessToken}
          style= {this.mapStyle()}
          getMap={this.getMap}
          options={this.mapOptions()}
        />
      </main>
    );
  }
}

export default connect(container.allState)(Search);
