import store from "./store.js";
import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { render } from "react-dom";
import { Provider } from "react-redux";

//components
import AppRoot from "./components/app_root.js";
import Login from "./components/login.js";
import Signup from "./components/signup.js";
import Search from "./components/search.js";
import BrunchComponent from "./components/brunch.js";
import HikeComponent from "./components/hike.js";
import NavBar from "./components/navbar.js"
import PlanComponent from "./components/plan.js"

export default function app() {
  render(
    <Provider store={store}>
      <Router>
        <div className="app-container">
          <NavBar />
          <Route exact path="/" component={Search} />
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
          <Route path="/search" component={Search} />
          <Route path="/brunch/:id" component={BrunchComponent} />
          <Route path="/hike/:id" component={HikeComponent} />
          <Route path="/plan/:hike_id/:brunch_id" component={PlanComponent} />
        </div>
      </Router>
    </Provider>,
    document.getElementById("app")
  );
}
