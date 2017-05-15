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
    this.goToSignup = this.goToSignup.bind(this)
    this.state = {}
  }

  handleLogin(event) {
    event.preventDefault();
    const loginEmail = this.refs.loginEmail.value;
    const loginPassword = this.refs.loginPassword.value;
    this.props.dispatch(loginUser(loginEmail, loginPassword, function() {
      this.props.history.push('/search');
    }.bind(this), function(data) {
      this.setState({loginError: data.responseJSON.message})
    }.bind(this)));
  }

  goToSignup(event) {
    event.preventDefault();
    this.props.history.push('/signup');
  }

  render() {
    var errorHTML = <span></span>;
    if (this.state.loginError != undefined) {
      errorHTML = <p className="alert">{this.state.loginError}</p>
    }
    return (
      <main className="login-container">
        {errorHTML}
        <form id="user-login-form" className="login-form-container">
          <input className="text-input" type="text" ref="loginEmail" placeholder="@example.com" defaultValue="connor@example.com"></input>
          <input className="text-input" type="password" ref="loginPassword" placeholder="password" defaultValue="password"></input>
          <input onClick={this.handleLogin} className="submit-input" type="submit" value="SIGN IN"></input>
          <input onClick={this.goToSignup} className="nav-button" defaultValue="No Account? Sign up."></input>
        </form>
      </main>
    );
  }
}

export default connect(container.allState)(Login);
