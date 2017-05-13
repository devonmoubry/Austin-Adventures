import React from "react";
import { connect } from "react-redux";
import { Route, Link, NavLink } from "react-router-dom";
import container from '../containers/all.js';

class NavBar extends React.Component {
  render() {
    return (
      <div className="navbar">
        <Link className="link-button" to="/"><h1 className="app-title">AUSTIN ADVENTURES</h1></Link>
        <Link className="link-button" to="/login"><i className="fa fa-sign-in" aria-hidden="true"></i></Link>
        <Link className="link-button" to="/signup"><i className="fa fa-user-plus" aria-hidden="true"></i></Link>
      </div>
    );
  }
}

export default connect(container.allState)(NavBar);
