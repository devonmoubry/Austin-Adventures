import React from "react";
import { connect } from "react-redux";
import { Route, Link, NavLink } from "react-router-dom";
import container from '../containers/all.js';

class NavBar extends React.Component {
  render() {
    let userLinks = <div className="user-links">
        <Link className="link-button user-button" to="/login">Login</Link>
        <Link className="link-button user-button" to="/signup">Sign up</Link>
      </div>
    if (this.props.reducer.usertoken !== null) {
      userLinks =  <div className="user-links">
          <Link className="link-button user-button" to="/">Logout</Link>
        </div>
    }
    return (
      <div className="navbar">
        <Link className="link-button" to="/"><h1 className="app-title">AUSTIN ADVENTURES</h1></Link>
        {userLinks}
      </div>
    );
  }
}

export default connect(container.allState)(NavBar);
