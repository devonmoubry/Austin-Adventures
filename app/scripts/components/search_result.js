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
        <input className="submit-input" onClick={this.handleFav} type="submit" value="Favorite"></input>
      </li>
    )
  }
}

export default connect(container.allState)(SearchResult);
