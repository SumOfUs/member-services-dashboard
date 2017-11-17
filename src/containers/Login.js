import React, { Component } from "react";
import config from "../config";
import FirstLoginForm from '../components/FirstLoginForm';
import LoginForm from '../components/LoginForm';
import {
  CognitoUserPool,
  AuthenticationDetails,
  CognitoUser
} from "amazon-cognito-identity-js";
import "./Login.css";

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      firstLogin: false,
      cognitoUser: null
    };
  }

  getCognitoUser() {
    if (this.state.cognitoUser) {
      return this.state.cognitoUser;
    } else {
      let user = new CognitoUser({
        Username : this.state.email.trim(),
        Pool : this.getUserPool()
      });

      this.setState({cognitoUser: user});
      return user;
    }
  }

  getUserPool() {
    return new CognitoUserPool({
      UserPoolId: config.cognito.USER_POOL_ID,
      ClientId: config.cognito.APP_CLIENT_ID
    });
  }

  login(email, password) {
    let user = this.getCognitoUser();

    const authenticationData = { Username: email, Password: password };
    const authenticationDetails = new AuthenticationDetails(authenticationData);

    if (this.state.firstLogin) {
      return new Promise((resolve, reject) =>
        user.completeNewPasswordChallenge(this.state.password, null, {
          onSuccess: result => resolve(),
          onFailure: err => reject(err)
        })
      )
    }

    return new Promise((resolve, reject) =>
      user.authenticateUser(authenticationDetails, {
        onSuccess: result => resolve(),
        onFailure: err => reject(err),
        newPasswordRequired: (userAttributes, requiredAttributes) => {
          this.setState({firstLogin: true});
        }
      })
    );
  }

  validateForm() {
    return this.state.email.length > 0 && this.state.password.length > 0;
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  handleSubmit = async event => {
    event.preventDefault();

    try {
      await this.login(this.state.email, this.state.password);
      this.props.userHasAuthenticated(true);
    } catch (e) {
      alert(e);
    }
  }

  render() {
    return (
      <div className="Login">
        <form onSubmit={this.handleSubmit}>
        {
          this.state.firstLogin ?
          <FirstLoginForm {...this.state} handleChange={this.handleChange} /> :
          <LoginForm {...this.state} handleChange={this.handleChange} />
        }
        </form>
      </div>
    );
  }
}
