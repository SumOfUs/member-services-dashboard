import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Gravatar from 'react-gravatar';
import NewPassword from '../components/NewPassword';
import isEmail from 'validator/lib/isEmail';
import LoginForm from '../components/LoginForm';
import { rehydrate, loginSuccess, loginFailure } from '../redux/auth';
import './Login.css';

export class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      newPasswordRequired: false,
    };
  }

  onChange = data => {
    this.setState(prev => ({ ...prev, ...data }));
  };

  onNewPasswordRequired = user => {
    this.setState(prev => ({ ...prev, user, newPasswordRequired: true }));
  };

  validEmail() {
    if (isEmail(this.state.email)) return this.state.email;
    return '';
  }

  render() {
    const { email, password, newPasswordRequired } = this.state;
    if (this.props.token) {
      if (this.props.location.state) {
        return <Redirect to={this.props.location.state.from.pathname} />;
      } else {
        return <Redirect to="/" />;
      }
    }

    return (
      <section className="Login hero is-fullheight">
        <div className="hero-body">
          <div className="container">
            <div className="columns has-text-centered is-centered">
              <div className="column is-8-tablet is-half-desktop">
                <h3 className="title has-text-grey">Login</h3>
                <p className="subtitle has-text-grey">
                  Please login to proceed.
                </p>

                <div className="box">
                  <figure className="avatar">
                    <Gravatar email={this.validEmail()} size={128} />
                  </figure>
                  {newPasswordRequired ? (
                    <NewPassword
                      user={this.state.user}
                      onSuccess={this.props.loginSuccess}
                      onFailure={this.props.loginFailure}
                    />
                  ) : (
                    <LoginForm
                      onSuccess={this.props.loginSuccess}
                      onFailure={this.props.loginFailure}
                      onNewPasswordRequired={this.onNewPasswordRequired.bind(
                        this
                      )}
                      onChange={this.onChange}
                      email={email}
                      password={password}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

const mapStateToProps = state => ({
  token: state.auth.token,
});

const mapDispatchToProps = dispatch => ({
  rehydrate: data => dispatch(rehydrate(data)),
  loginSuccess: user => dispatch(loginSuccess(user)),
  loginFailure: error => dispatch(loginFailure(error)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
