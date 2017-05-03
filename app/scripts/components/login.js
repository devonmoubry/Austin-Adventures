import React from "react";
import { connect } from "react-redux";
import { Route, Link, NavLink } from "react-router-dom";
import container from "../containers/all.js"
//actions
import loginUser from "../actions/login_user.js"

class Login extends React.Component {
  constructor(props) {
    super(props)

    this.handleLogin = this.handleLogin.bind(this)
  }

  handleLogin(history) {
    event.preventDefault();
    console.log(event);
    console.log('history', history);
    const loginEmail = this.refs.loginEmail.value;
    const loginPassword = this.refs.loginPassword.value;
    this.props.dispatch(loginUser(loginEmail, loginPassword));
    this.props.history.push('/welcome');
  }

  render() {
    return (
      <main className="login-container">
        <h1>Login</h1>
        <form id="user-login-form" className="login-form-container">
          <input className="text-input" type="text" ref="loginEmail" placeholder="@example.com" defaultValue="connor@example.com"></input>
          <input className="text-input" type="password" ref="loginPassword" placeholder="password" defaultValue="password"></input>
          <input onClick={this.handleLogin} className="submit-input" type="submit" value="LOGIN"></input>
        </form>
      </main>
    );
  }
}

export default connect(container.allState)(Login);
