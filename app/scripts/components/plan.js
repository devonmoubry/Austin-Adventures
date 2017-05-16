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
import HikeInfo from "./hike_info.js"
import FoursquareBrunchDetails from "../components/foursquare_brunch_details.js"
// actions
import getFoursquareBrunchDetails from "../actions/get_foursquare_brunch_details.js"

class PlanComponent extends React.Component {
  constructor(props) {
    super(props)

    this.getHike = this.getHike.bind(this)
    this.getBrunch = this.getBrunch.bind(this)
    this.getMap = this.getMap.bind(this)
    this.mapStyle = this.mapStyle.bind(this)
    this.mapOptions = this.mapOptions.bind(this)
    this.putMarkersOnTheMap = this.putMarkersOnTheMap.bind(this)
    this.state = {}
  }

  getHike() {
    const hikeId = this.props.match.params.hike_id;
    const clickId = Number(hikeId);
    const hikes = trailsAPI.places;
    // https://lodash.com/docs/4.17.4#filter
    let theHike = _.filter(hikes, { 'unique_id': clickId });
    return theHike[0];
  }

  getBrunch() {
    const brunchId = this.props.match.params.brunch_id;
    const brunches = brunchAPI.places;
    // https://lodash.com/docs/4.17.4#filter
    let theBrunch = _.filter(brunches, { 'id': brunchId });
    return theBrunch[0];
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
      const hike = this.getHike();
      const hikeCoordinates = [hike['lon'], hike['lat']];
      const hikeId = hike.unique_id;

      const hikeFeatures = [{
        'type': 'Feature',
        'properties': {
          'id': hikeId,
          'type': 'hike',
          'icon': 'triangle' // https://github.com/mapbox/mapbox-gl-styles
        },
        'geometry': {
          'type': 'Point',
          'coordinates': hikeCoordinates
        }
      }];

      const brunch = this.getBrunch();
      const brunchCoordinates = brunch.coordinates;
      const brunchId = brunch['id'];
      const brunchFeatures = [{
        'type': 'Feature',
        'properties': {
          'id': brunchId,
          'type': 'brunch',
          'icon': 'restaurant' // https://github.com/mapbox/mapbox-gl-styles
        },
        'geometry': {
          'type': 'Point',
          'coordinates': brunchCoordinates
        }
      }];

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

      setTimeout(function() {
        var directions = new MapboxDirections({
        container: 'directions',
        accessToken: this.props.reducer.mapBoxAccessToken
        });

        this.map.addControl(directions);
        directions.setOrigin(hikeCoordinates);
        directions.setDestination(brunchCoordinates);
      }.bind(this), 200);
    }.bind(this));
  }

  componentDidMount() {
    this.putMarkersOnTheMap();
    this.props.dispatch(getFoursquareBrunchDetails(this.getBrunch().foursquare_id, function(data) {
      this.setState({foursquareDetails: data.response.venue})
    }.bind(this)));
  }

  render() {
    const hike = this.getHike();
    const brunch = this.getBrunch();
    let brunchfoursquareDetails = <p>Loading details ...</p>;
    if(this.state.foursquareDetails != undefined) {
      brunchfoursquareDetails = <FoursquareBrunchDetails details={this.state.foursquareDetails}/>
    }

    return(
      <div className="the-adventure">
        <div className="hike-info">
          <h1>{hike['name']} - {hike['city']}, {hike['state']}</h1>
          <p>{hike['description']}</p>
          <p>Length: {hike.activities['length']}mi.</p>
        </div>
        <div className="brunch-info">
          <h1><a href={brunch['website']} target="_blank">{brunch['name']}</a> - {brunch['city']}, {brunch['state']} {brunch['zipcode']}</h1>
          <p>Brunch: {brunch['brunch']}</p>
          {brunchfoursquareDetails}
        </div>
        <Mapbox
          mapboxgl={mapboxgl}
          accessToken={this.props.reducer.mapBoxAccessToken}
          style= {this.mapStyle()}
          getMap={this.getMap}
          options={this.mapOptions()}
        />
      </div>
    )
  }
}

export default connect(container.allState)(PlanComponent)
