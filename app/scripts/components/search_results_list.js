import React from "react";
import { connect } from "react-redux";
import { Route, Link, NavLink } from "react-router-dom";
import container from "../containers/all.js";
//components
import SearchResult from "./search_result.js"

class SearchResultsList extends React.Component {
  constructor(props) {
    super(props)

    this.handleSearchResults = this.handleSearchResults.bind(this)
  }

  handleSearchResults(artists) {
    return hikes.map(function(hike) {
      return (
        <SearchResult key={hike.id} hike={hike} role="alert"/>
      )
    })
  }
  render() {
    let artists = this.props.searchResults;
    if (artists === null) {
      return (<span />)
    } else if (hikes.length > 0) {
      return(
        <div className="results-div">
          <h1 tabIndex="0">Results</h1>
          <ul>
            {this.handleSearchResults(hikes)}
          </ul>
        </div>
      )
    } else {
      return (
        <p>Bummer, no hikes found in this area. Please try a different area. Would you like to add a new hike?</p>
      );
    }
  }
}

export default connect(container.allState)(SearchResultsList);
