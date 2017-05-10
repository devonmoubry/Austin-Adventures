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

class HikeComponent extends React.Component {
  constructor(props) {
    super(props)

    this.handleYelpButton = this.handleYelpButton.bind(this)
    this.getHike = this.getHike.bind(this)
    this.getMap = this.getMap.bind(this)
    this.mapStyle = this.mapStyle.bind(this)
    this.mapOptions = this.mapOptions.bind(this)
    this.putHikeAreaOnTheMap = this.putHikeAreaOnTheMap.bind(this)
    this.getBrunch = this.getBrunch.bind(this)
    this.state = {}
  }

  getHike() {
    // iterate through this.props.searchResult
    const id = this.props.match.params.id;
    const clickId = Number(id);
    const hikes = trailsAPI.places;
    // https://lodash.com/docs/4.17.4#filter
    let theHike = _.filter(hikes, { 'unique_id': clickId });
    return theHike[0];
  }

  handleYelpButton() {
    console.log('go to yelp page');
  }

  getMap(map) {
    this.map = map;
  }

  mapStyle() {
    return {
      width: '100%',
      height: '150px'
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
      console.log('put the hike on the map');

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

        console.log('Setting the origin and destination');
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
  }

  render() {
    const hike = this.getHike();
    let currentBrunchhtml = "Select a Restaurant"
    if (this.state.currentBrunch != undefined) {
      currentBrunchhtml = <BrunchInfo brunch={this.state.currentBrunch} />

    }
    return (
      <div className="hike-card-container">
        <h1>Austin Adventures</h1>
        <Link className="link-button" to="/search"><i className="fa fa-times-circle" aria-hidden="true"></i></Link>
        <p>{hike['name']} - {hike['city']}, {hike['state']}</p>
        <p>{hike['directions']}</p>
        <p>{hike['description']}</p>
        <button onClick={this.handleYelpButton} className="yelp-button" type="submit"><i className="fa fa-yelp" aria-hidden="true"></i></button>
        <Mapbox
          mapboxgl={mapboxgl}
          accessToken={this.props.reducer.mapBoxAccessToken}
          style= {this.mapStyle()}
          getMap={this.getMap}
          options={this.mapOptions(hike)} //mapbox://styles/mapbox/outdoors-v10
        />
        {currentBrunchhtml}
      </div>
    );
  }
}

export default connect(container.allState)(HikeComponent);
