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
            <Link className="link-button" to="/search"><i className="fa fa-times-circle" aria-hidden="true"></i></Link>
            <p>Choose a trail.</p>
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
