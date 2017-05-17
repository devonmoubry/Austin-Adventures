import React from "react";
import { connect } from "react-redux";
import { Route, Link, NavLink } from "react-router-dom";
import container from "../containers/all.js";
//components
import Search from "./search.js"
import SearchResult from "./search_result.js"

class SearchResultsList extends React.Component {
  constructor(props) {
    super(props)

    this.handleSearchResults = this.handleSearchResults.bind(this)
  }

  handleSearchResults(hikes) {
    return hikes.map(function(hike) {
      return (
        <SearchResult key={hike.unique_id} hike={hike} role="alert"/>
      )
    })
  }

  render() {
    let hikes = this.props.hikes;
    if (hikes === null || hikes === undefined) {
      return (<span />)
    } else if (hikes.length > 0) {
      return(
        <div className="results-div">
          <h1 tabIndex="0">Hikes</h1>
          <ul>
            {this.handleSearchResults(hikes)}
          </ul>
        </div>
      )
    } else {
      return (
        <p>Bummer, no hikes found in this area. Please try a different area.</p>
      );
    }
  }
}

export default connect(container.allState)(SearchResultsList);
