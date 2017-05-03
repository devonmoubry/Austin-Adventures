import React from "react";
import { connect } from "react-redux";
import { Route, Link, NavLink } from "react-router-dom";
import container from "../containers/all.js";
//actions
import searchHikes from "../actions/search_hikes.js";
//components
import SearchResultsList from "./search_results_list.js"

class Search extends React.Component {
  constructor(props) {
    super(props)

    this.handleSearch = this.handleSearch.bind(this)
  }

  handleSearch(event) {
    event.preventDefault();
    const inputSearch = this.refs.inputSearch.value;
    this.props.dispatch(searchHikes(inputSearch));
  }

  render() {
    console.log(this.props.usertoken);
    return (
      <main>
        <div className="search-container">
          <i className="fa fa-search" aria-hidden="true"></i>
          <input className="text-input" type="text" ref="inputSearch" placeholder="Search for a zip code or address" autoFocus ></input>
          <input onClick={this.handleSearch} className="submit-input" type="submit"></input>
        </div>
        <SearchResultsList />
      </main>
    );
  }
}

export default connect(container.allState)(Search);
