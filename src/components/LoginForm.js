import React, { Component } from 'react';
import { login } from '../libs/auth-service';
import isEmail from 'validator/lib/isEmail';
import classnames from 'classnames';

export default class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      error: '',
    };
  }

  onSubmit = event => {
    event.preventDefault();
    if (!this.validate() || this.state.loading) return;

    this.setState(
      state => ({ ...state, loading: true }),
      () => {
        login(this.props.email, this.props.password).then(
          response => {
            console.log('success - more success:', response);

            this.setState(state => ({ ...state, loading: false }));
            if (response.newPasswordRequired) {
              this.props.onNewPasswordRequired(response.user);
            } else this.props.onSuccess(response);
          },
          error => {
            this.setState(state => ({
              ...state,
              loading: false,
              error: error.message,
            }));
            this.props.onFailure(error);
          }
        );
      }
    );
  };

  validate() {
    return isEmail(this.props.email) && this.props.password;
  }

  errorMessage() {
    return <p className="field has-text-danger">{this.state.error}</p>;
  }
  render() {
    const { email, password, onChange } = this.props;
    const { error, loading } = this.state;
    return (
      <form onSubmit={this.onSubmit} className="form">
        {error && this.errorMessage()}
        <div className="field">
          <div className="control has-icons-left">
            <input
              className="input is-large"
              id="email"
              placeholder="Your email"
              autoFocus
              type="email"
              value={email}
              onChange={event => onChange({ email: event.target.value })}
            />
            <span className="icon is-small is-left">
              <i className="fa fa-envelope" />
            </span>
          </div>
        </div>
        <div className="field">
          <div className="control has-icons-left">
            <input
              className="input is-large"
              id="password"
              placeholder="Your password"
              value={password}
              onChange={event => onChange({ password: event.target.value })}
              type="password"
            />
            <span className="icon is-small is-left">
              <i className="fa fa-lock" />
            </span>
          </div>
        </div>
        {/* Does nothing at the moment */}
        <div className="field">
          <label className="checkbox" disabled>
            <input type="checkbox" disabled /> Remember me
          </label>
        </div>

        <button
          style={{ width: '100%' }}
          type="submit"
          disabled={!this.validate() || loading}
          onClick={this.onSubmit}
          className={classnames('button is-large is-info', {
            'is-loading': loading,
          })}
        >
          Login
        </button>
      </form>
    );
  }
}
