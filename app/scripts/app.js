import store from "./store.js";
import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { render } from "react-dom";
import { Provider } from "react-redux";
//components
import AppRoot from "./components/app_root.js";
import Login from "./components/login.js";
import Signup from "./components/signup.js";
import Welcome from "./components/welcome.js";
import Search from "./components/search.js";

export default function app() {
  render(
    <Provider store={store}>
      <Router>
        <div>
          <Route exact path="/" component={AppRoot} />
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
          <Route path="/welcome" component={Welcome} />
          <Route path="/welcome/search" component={Search} />
        </div>
      </Router>
    </Provider>,
    document.getElementById("app")
  );
}
