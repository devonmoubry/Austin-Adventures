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

  getImageURL(images) {
    if (images.length === 0) {
      return 'http://herniamovers.com/assets/boxes_packages/large/image_not_available.gif'
    } else {
      return 'the right photo'
    }
  }

  handleFav(event) {
    event.preventDefault();

    this.props.dispatch(favHike());
  }

  render() {

    return(
      <li className="search-result">
        <img tabIndex="0" />
        <p tabIndex="0">{}</p>
        <input className="submit-input" onClick={this.handleFav} type="submit" value="Favorite"></input>
      </li>
    )
  }
}

export default connect(container.allState)(SearchResult);
