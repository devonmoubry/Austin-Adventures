import React from "react";
import { connect } from "react-redux";
import { Route, Link, NavLink } from "react-router-dom";
import container from "../containers/all.js";
import _ from "lodash";
import mapboxgl from 'mapbox-gl';
import Mapbox from 'react-redux-mapbox-gl';
// API
import trailsAPI from "../models/trailsAPI.json";
import brunchAPI from "../models/brunch_bunch_api.json"
// components
import BrunchInfo from "./brunch_info.js"
import FoodSearchResultsList from "./food_search_results_list.js"
// actions
import getFavoriteRestaurants from "../actions/get_favorite_restaurants.js"

class HikeComponent extends React.Component {
  constructor(props) {
    super(props)

    this.getHike = this.getHike.bind(this)
    this.getMap = this.getMap.bind(this)
    this.mapStyle = this.mapStyle.bind(this)
    this.mapOptions = this.mapOptions.bind(this)
    this.putHikeAreaOnTheMap = this.putHikeAreaOnTheMap.bind(this)
    this.getBrunch = this.getBrunch.bind(this)
    this.state = {}
  }

  getHike() {
    const id = this.props.match.params.id;
    const clickId = Number(id);
    const hikes = trailsAPI.places;
    // https://lodash.com/docs/4.17.4#filter
    let theHike = _.filter(hikes, { 'unique_id': clickId });
    return theHike[0];
  }

  getMap(map) {
    this.map = map;
  }

  mapStyle() {
    return {
      width: '100%',
      height: '50vh'
    }
  }

  mapOptions(hike) {
    return {
      style: 'mapbox://styles/mapbox/outdoors-v10',
      center: [hike['lon'], hike['lat']],
      zoom: 11
    }
  }

  putHikeAreaOnTheMap() {
    this.map.on('load', function() {
      const hike = this.getHike();
      const coordinates = [hike['lon'], hike['lat']];
      const id = hike.unique_id;

      const hikeFeatures = [{
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
      }];

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

      this.map.on('click', 'places', function (e) {
        const componentType = e.features[0].properties.type;
        if (componentType != 'brunch') { return; }

        const brunch = this.getBrunch(e.features[0].properties.id);
        const brunchCoordinates = e.features[0].geometry.coordinates;
        var directions = new MapboxDirections({
          container: 'directions',
          accessToken: this.props.reducer.mapBoxAccessToken
        });

        this.map.addControl(directions);

        directions.setOrigin(coordinates);
        directions.setDestination(brunchCoordinates);
        this.setState({currentBrunch: brunch})
      }.bind(this));

    }.bind(this));

  }

  getBrunch(id) {
    const brunches = brunchAPI.places;
    // https://lodash.com/docs/4.17.4#filter
    let theBrunch = _.filter(brunches, { 'id': id });
    return theBrunch[0];
  }

  componentDidMount() {
    this.putHikeAreaOnTheMap();
    const usertoken = this.props.reducer.usertoken;
    const ownerId = this.props.reducer.ownerId;
    this.props.dispatch(getFavoriteRestaurants(usertoken, ownerId));
  }

  render() {
    const hike = this.getHike();
    const brunch = this.state.currentBrunch;
    let currentBrunchHTML = <div className="brunch-sign">2. Choose a brunch  <i className="fa fa-cutlery" aria-hidden="true"></i></div>
    if (this.state.currentBrunch != undefined) {
      currentBrunchHTML = <BrunchInfo hike={hike} brunch={brunch} history={this.props.history}/>
    }

    return (
      <div className="hike-card-container">
        <div className="hike-info">
          <h1>{hike['name']} - {hike['city']}, {hike['state']}</h1>
        </div>
        <div className="buttons">
          <Link className="link-button button" to="/search"><i className="fa fa-chevron-left" aria-hidden="true"></i>Back to map</Link>
        </div>
        {currentBrunchHTML}
        <Mapbox
          mapboxgl={mapboxgl}
          accessToken={this.props.reducer.mapBoxAccessToken}
          style= {this.mapStyle()}
          getMap={this.getMap}
          options={this.mapOptions(hike)} //mapbox://styles/mapbox/outdoors-v10
        />
        <FoodSearchResultsList restaurants={brunchAPI.places}/>
      </div>
    );
  }
}

export default connect(container.allState)(HikeComponent);
