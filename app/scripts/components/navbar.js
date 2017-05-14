import React from "react";
import { connect } from "react-redux";
import { Route, Link, NavLink } from "react-router-dom";
import container from '../containers/all.js';

class NavBar extends React.Component {
  render() {
    return (
      <div className="navbar">
        <Link className="link-button" to="/"><h1 className="app-title">AUSTIN ADVENTURES</h1></Link>
        <Link className="link-button" to="/login">Sign In</Link>
        <Link className="link-button" to="/signup">Sign Up</Link>
      </div>
    );
  }
}

export default connect(container.allState)(NavBar);
