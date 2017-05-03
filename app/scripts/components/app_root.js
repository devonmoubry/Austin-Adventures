import React from "react";
import { connect } from "react-redux";
import { Route, Link, NavLink } from "react-router-dom";
import container from '../containers/all.js';
//components
import Welcome from "./welcome.js";

class AppRoot extends React.Component {
  render() {
    return (
      <main>
      <Welcome />
      </main>
    );
  }
}

export default connect(container.allState)(AppRoot);
