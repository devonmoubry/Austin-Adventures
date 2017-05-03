import React from "react";
import { connect } from "react-redux";
import { Route, Link, NavLink } from "react-router-dom";
import container from '../containers/all.js';
//components
import Search from './search.js'

class Welcome extends React.Component {
  render() {
    return (
      <main>
        <div className="welcome-container">
          <div className="welcome-text">
            <h1 className="app-title">Austin Adventures</h1>
            <p>Plan your weekend adventure by location.</p>
            <p>Choose a trail and find a brunch spot nearby.</p>
            <p>Enter a zip code or address.</p>
          </div>
        <Link className="link-button" to="/login">Please login.</Link>
        <Link className="link-button" to="/signup">New User? Please sign up!</Link>
        </div>
        <Search />
      </main>
    );
  }
}

export default connect(container.allState)(Welcome);
