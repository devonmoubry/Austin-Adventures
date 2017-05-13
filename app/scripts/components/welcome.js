import React from "react";
import { connect } from "react-redux";
import { Route, Link, NavLink } from "react-router-dom";
import container from '../containers/all.js';

class Welcome extends React.Component {
  render() {
    return (
        
    );
  }
}

export default connect(container.allState)(Welcome);
