import React from "react";
import { connect } from "react-redux";
import { Route, Link, NavLink } from "react-router-dom";
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

export default AppRoot;
