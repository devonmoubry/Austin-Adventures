import React from "react";
import { connect } from "react-redux";
import { Route, Link, NavLink } from "react-router-dom";
import container from "../containers/all.js";
import _ from "lodash";

class BrunchComponent extends React.Component {
  constructor(props) {
    super(props)


    this.handleYelpButton = this.handleYelpButton.bind(this)
    this.getHike = this.getBrunch.bind(this)
  }

  getBrunch(id) {
    // iterate through this.props.searchResult
    console.log('brunches', this.props.reducer.foodSearchResults);
    const brunches = this.props.reducer.foodSearchResults;
    let theBrunch = _.filter(brunches, { 'id': id });
    return theBrunch[0];
  }

  handleYelpButton() {
    console.log('go to yelp page');
  }

  render() {
    console.log(this.props.match.params.id);
    const brunch = this.getBrunch(this.props.match.params.id);
    console.log('brunch', brunch);
    return (
      <div className="brunch-card-container">
        <h1>Austin Adventures</h1>
        <p><a href={'http://' + brunch['website']} target="_blank">{brunch['name']}</a> - {brunch['city']}, {brunch['state']} {brunch['zipcode']}</p>
        <p>{brunch['phone number']}</p>
        <p>{brunch['brunch']}</p>
        <p>{brunch['review']}</p>
        <button onClick={this.handleYelpButton} className="yelp-button" type="submit"><i className="fa fa-yelp" aria-hidden="true"></i></button>
      </div>
    );
  }
}

export default connect(container.allState)(BrunchComponent);
