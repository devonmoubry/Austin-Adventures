import React from "react";
import { connect } from "react-redux";
import { Route, Link, NavLink } from "react-router-dom";

class AppRoot extends React.Component {
  render() {
    return (
      <main>
        <h1>Hey, you.</h1>
        <p>Henry David Thoreau</p>
        <img src="../images/averie-woodard-123973.jpg" />
        <img src="../images/aaron-burden-75599.jpg" />
        <img src="../images/piyanut-suntaranil-223184.jpg" />
        <img src="../images/averie-woodard-123972.jpg" />
      </main>
    );
  }
}

export default AppRoot;
