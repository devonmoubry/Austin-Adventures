import React from "react";
import { connect } from "react-redux";
import { Route, Link, NavLink } from "react-router-dom";
import container from "../containers/all.js";
//actions
import favHike from "../actions/fav_hike.js"

class SearchResult extends React.Component {
  constructor(props) {
    super(props)

    this.handleFav = this.handleFav.bind(this)
  }

  handleFav(event) {
    event.preventDefault();
    const id = this.props.hike.unique_id;
    const name = this.props.hike.name;
    const usertoken = this.props.usertoken;
    this.props.dispatch(favHike(id, name, usertoken));
  }

  render() {

    return(
      <li className="search-result">
        <p tabIndex="0">{this.props.hike.name}</p>
        <button className="submit-input" onClick={this.handleFavRestaurant} type="submit" value="Favorite"><i className="fa fa-heart-o" aria-hidden="true"></i></button>
      </li>
    )
  }
}

export default connect(container.allState)(SearchResult);
