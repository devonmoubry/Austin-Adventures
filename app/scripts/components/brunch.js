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
import HikeInfo from "./hike_info.js"

class BrunchComponent extends React.Component {
  constructor(props) {
    super(props)

    this.handleYelpButton = this.handleYelpButton.bind(this)
    this.getBrunch = this.getBrunch.bind(this)
    this.getMap = this.getMap.bind(this)
    this.mapStyle = this.mapStyle.bind(this)
    this.mapOptions = this.mapOptions.bind(this)
    this.putBrunchAreaOnTheMap = this.putBrunchAreaOnTheMap.bind(this)
    this.getHike = this.getHike.bind(this)
    this.state = {}
  }

  getBrunch() {
    // iterate through this.props.searchResult
    const id = this.props.match.params.id;
    const brunches = brunchAPI.places;
    // https://lodash.com/docs/4.17.4#filter
    let theBrunch = _.filter(brunches, { 'id': id });
    return theBrunch[0];
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
      height: '50vh'
    }
  }

  mapOptions(brunch) {
    return {
      style: 'mapbox://styles/mapbox/outdoors-v10',
      center: brunch.coordinates,
      zoom: 11
    }
  }

  putBrunchAreaOnTheMap() {
    this.map.on('load', function() {
      console.log('put the hike on the map');

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

      const brunch = this.getBrunch();
      const coordinates = brunch.coordinates;
      const id = brunch['id'];
      const brunchFeatures = [{
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
      }];

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
        if (componentType != 'hike') { return; }
        const hike = this.getHike(e.features[0].properties.id);

        const hikeCoordinates = e.features[0].geometry.coordinates;
        var directions = new MapboxDirections({
          container: 'directions',
          accessToken: this.props.reducer.mapBoxAccessToken
        });

        this.map.addControl(directions);

        console.log('Setting the origin and destination');
        directions.setOrigin(coordinates);
        directions.setDestination(hikeCoordinates);
        this.setState({currentHike: hike})
      }.bind(this));

    }.bind(this));

  }

  getHike(id) {
    const clickId = Number(id);
    const hikes = trailsAPI.places;
    // https://lodash.com/docs/4.17.4#filter
    let theHike = _.filter(hikes, { 'unique_id': clickId });
    return theHike[0];
  }

  componentDidMount() {
    this.putBrunchAreaOnTheMap();
  }

  render() {
    const brunch = this.getBrunch();
    let currentHikeHTML = <div className="hike-sign">2.  Choose a hike  ▲</div>
    if (this.state.currentHike != undefined) {
      currentHikeHTML = <HikeInfo hike={this.state.currentHike} />
    }

    return (
      <div className="brunch-card-container">
        <div className="brunch-info">
          <h1><a href={brunch['website']} target="_blank">{brunch['name']}</a> - {brunch['city']}, {brunch['state']} {brunch['zipcode']}</h1>
          <p>{brunch['phone number']}</p>
          <p>Brunch: {brunch['brunch']}</p>
        </div>
        <div className="buttons">
          <Link className="link-button button" to="/search"><i className="fa fa-chevron-left" aria-hidden="true"></i>Back to map</Link>
          <button className="yelp-button button" onClick={this.handleYelpButton} type="submit"><i className="fa fa-yelp" aria-hidden="true"></i>See yelp</button>
          <button className="share-button button" onClick={this.handleYelpButton} type="submit"><i className="fa fa-map-o" aria-hidden="true"></i>Share</button>
        </div>
        {currentHikeHTML}
        <Mapbox
          mapboxgl={mapboxgl}
          accessToken={this.props.reducer.mapBoxAccessToken}
          style= {this.mapStyle()}
          getMap={this.getMap}
          options={this.mapOptions(brunch)} //mapbox://styles/mapbox/outdoors-v10
        />
      </div>
    );
  }
}

export default connect(container.allState)(BrunchComponent);
