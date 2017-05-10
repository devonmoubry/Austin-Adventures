import React from "react";
import { connect } from "react-redux";
import { Route, Link, NavLink } from "react-router-dom";
import container from "../containers/all.js";
import _ from "lodash";
import mapboxgl from 'mapbox-gl';
import Mapbox from 'react-redux-mapbox-gl';
//actions
import searchHikes from "../actions/search_hikes.js";
import searchRestaurants from "../actions/search_restaurants.js"

class BrunchComponent extends React.Component {
  constructor(props) {
    super(props)

    this.handleYelpButton = this.handleYelpButton.bind(this)
    this.getBrunch = this.getBrunch.bind(this)
    this.getMap = this.getMap.bind(this)
    this.mapStyle = this.mapStyle.bind(this)
    this.mapOptions = this.mapOptions.bind(this)
    this.putBrunchAreaOnTheMap = this.putBrunchAreaOnTheMap.bind(this)
  }

  getBrunch() {
    // iterate through this.props.searchResult
    const id = this.props.match.params.id;
    const brunches = this.props.reducer.foodSearchResults;
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
      width: '98%',
      height: '55%'
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

      const hikes = this.props.reducer.searchResults;
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
        if (componentType == 'hike') {
          return (
            this.props.history.push(`/hike/${e.features[0].properties.id}`)
          )
        } else {
          return (
            <span />
          )
        }

      }.bind(this));

    }.bind(this));

  }

  componentDidMount() {
    this.props.dispatch(searchHikes());
    this.props.dispatch(searchRestaurants());

    this.putBrunchAreaOnTheMap();
  }

  render() {
    const brunch = this.getBrunch(this.props.match.params.id);
    return (
      <div className="brunch-card-container">
        <h1>Austin Adventures</h1>
        <p><a href={'http://' + brunch['website']} target="_blank">{brunch['name']}</a> - {brunch['city']}, {brunch['state']} {brunch['zipcode']}</p>
        <p>{brunch['phone number']}</p>
        <p>Brunch: {brunch['brunch']}</p>
        <p>Review: {brunch['review']}</p>
        <button onClick={this.handleYelpButton} className="yelp-button" type="submit"><i className="fa fa-yelp" aria-hidden="true"></i></button>
        <Mapbox
          mapboxgl={mapboxgl}
          accessToken="pk.eyJ1IjoiZGV2b25tb3VicnkiLCJhIjoiY2oyOXA1cGl4MDAwMjJ3b2djdjh4cmV2cyJ9.ZrmYtWukYTSnSRnDgUJlcQ"
          style= {this.mapStyle()}
          getMap={this.getMap}
          options={this.mapOptions(brunch)} //mapbox://styles/mapbox/outdoors-v10
        />
      </div>
    );
  }
}

export default connect(container.allState)(BrunchComponent);
