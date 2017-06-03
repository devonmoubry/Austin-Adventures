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
    this.hasFavoritedHike = this.hasFavoritedHike.bind(this)
  }

  handleFav(event) {
    event.preventDefault();
    const id = this.props.hike.unique_id;
    const name = this.props.hike.name;
    const usertoken = this.props.reducer.usertoken;
    const ownerId = this.props.reducer.ownerId;
    this.props.dispatch(favHike(id, name, usertoken, ownerId));
  }

  hasFavoritedHike(id) {
    if (this.props.reducer.favoriteHikes.length == 0) {
      return false;
    }
    var favHikeIds = this.props.reducer.favoriteHikes.map( function(favorite) {
      return favorite.id;
    });

    return favHikeIds.includes(id);
  }

  render() {
    let favoriteHikesHTML = <button className="submit-input" onClick={this.handleFav} type="submit" value="Favorite"><i className="fa fa-heart-o" aria-hidden="true"></i></button>
    if (this.hasFavoritedHike(this.props.hike.unique_id)) {
      favoriteHikesHTML = <button className="submit-input" onClick={this.handleFav} type="submit" value="Favorite"><i className="fa fa-heart" aria-hidden="true"></i></button>
    }
    return(
      <li className="search-result">
        {favoriteHikesHTML}
        <p tabIndex="0">{this.props.hike.name}</p>
      </li>
    )
  }
}

export default connect(container.allState)(SearchResult);
