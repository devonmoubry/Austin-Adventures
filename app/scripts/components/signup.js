import React from "react";
import { connect } from "react-redux";
import { Route, Link, NavLink } from "react-router-dom";
import container from "../containers/all.js";
//actions
import signupNewUser from "../actions/signup_new_user.js";

class Signup extends React.Component {
  constructor(props) {
    super(props)

    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(event) {
    event.preventDefault();
    const signupFullName = this.refs.signupFullName.value;
    const signupEmail = this.refs.signupEmail.value;
    const signupPassword = this.refs.signupPassword.value;
    this.props.dispatch(signupNewUser(signupFullName, signupEmail, signupPassword));
  }

  render() {
    return (
      <main className="signup-container">
        <h1>Sign up</h1>
        <form id="signup">
          <input className="text-input" type="text" ref="signupFullName" placeholder="FULL NAME"></input>
          <input className="text-input" type="text" ref="signupEmail" placeholder="VALID EMAIL"></input>
          <input className="text-input" type="password" ref="signupPassword" placeholder="CREATE PASSWORD"></input>
          <input onClick={this.handleSubmit} className="submit-input" type="submit" value="SIGNUP"></input>
        </form>
      </main>
    );
  }
}

export default connect(container.allState)(Signup);
