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
import SearchResultsList from "../components/search_results_list.js"
import FoursquareBrunchDetails from "../components/foursquare_brunch_details.js"
import HikeInfo from "./hike_info.js"
// actions
import getFoursquareBrunchDetails from "../actions/get_foursquare_brunch_details.js"
import getFavoriteHikes from "../actions/get_favorite_hikes.js"

class BrunchComponent extends React.Component {
  constructor(props) {
    super(props)

    this.getBrunch = this.getBrunch.bind(this)
    this.getMap = this.getMap.bind(this)
    this.mapStyle = this.mapStyle.bind(this)
    this.mapOptions = this.mapOptions.bind(this)
    this.putBrunchAreaOnTheMap = this.putBrunchAreaOnTheMap.bind(this)
    this.getHike = this.getHike.bind(this)
    this.state = {}
  }

  getBrunch() {
    const id = this.props.match.params.id;
    const brunches = brunchAPI.places;
    // https://lodash.com/docs/4.17.4#filter
    let theBrunch = _.filter(brunches, { 'id': id });
    return theBrunch[0];
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
    const usertoken = this.props.reducer.usertoken;
    const ownerId = this.props.reducer.ownerId;
    this.putBrunchAreaOnTheMap();
    this.props.dispatch(getFoursquareBrunchDetails(this.getBrunch().foursquare_id, function(data) {
      this.setState({foursquareDetails: data.response.venue})
    }.bind(this), function(data) {
      console.log('some error');
    }));
    this.props.dispatch(getFavoriteHikes(usertoken, ownerId));
  }

  render() {
    const brunch = this.getBrunch();
    const hike = this.state.currentHike;
    let currentHikeHTML = <div className="hike-sign">2.  Choose a hike  ▲</div>
    if (this.state.currentHike != undefined) {
      currentHikeHTML = <HikeInfo hike={hike} brunch={brunch} history={this.props.history}/>
    }
    let brunchfoursquareDetails = <p>Loading details ...</p>;
    let foursquareMenu = <i className="fa fa-foursquare" aria-hidden="true"></i>;
    if(this.state.foursquareDetails != undefined) {
      brunchfoursquareDetails = <FoursquareBrunchDetails details={this.state.foursquareDetails}/>
      foursquareMenu = <a href={this.state.foursquareDetails.canonicalUrl} className="social-media-button button" target="_blank" type="submit"><i className="fa fa-foursquare" aria-hidden="true"></i>Foursquare</a>
    }

    return (
      <div className="brunch-card-container">
        <div className="brunch-info">
          <h1><a href={brunch['website']} target="_blank">{brunch['name']}</a> - {brunch['city']}, {brunch['state']} {brunch['zipcode']}</h1>
          <p>Brunch: {brunch['brunch']}</p>
          {brunchfoursquareDetails}
          {foursquareMenu}
        </div>
        <div className="buttons">
          <Link className="link-button button" to="/search"><i className="fa fa-chevron-left" aria-hidden="true"></i>Back to map</Link>
        </div>
        {currentHikeHTML}
        <Mapbox
          mapboxgl={mapboxgl}
          accessToken={this.props.reducer.mapBoxAccessToken}
          style= {this.mapStyle()}
          getMap={this.getMap}
          options={this.mapOptions(brunch)} //mapbox://styles/mapbox/outdoors-v10
        />
        <SearchResultsList hikes={trailsAPI.places} />
      </div>
    );
  }
}

export default connect(container.allState)(BrunchComponent);
