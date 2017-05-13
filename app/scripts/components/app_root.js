import React from "react";
import { connect } from "react-redux";
import { Route, Link, NavLink } from "react-router-dom";
import container from '../containers/all.js';
//components
import NavBar from "./navbar.js";
import Search from "./search.js";

class AppRoot extends React.Component {
  render() {
    return (
      <main className="root-container">
        <Search />
      </main>
    );
  }
}

export default connect(container.allState)(AppRoot);
