import React, { PureComponent } from 'react';
import { completeNewPasswordChallenge } from '../libs/auth-service';
import { Redirect } from 'react-router-dom';

export default class NewPassword extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      newPassword: '',
      error: '',
      loading: false,
    };
  }

  onChange = event => {
    let newPassword = event.target.value;
    this.setState(prev => ({ ...prev, newPassword }));
  };

  onSubmit = e => {
    e.preventDefault();
    completeNewPasswordChallenge(this.props.user, this.state.newPassword).then(
      resp => {
        return <Redirect to="/" />;
      }
    );
  };

  render() {
    const { newPassword, error } = this.state;
    return (
      <form onSubmit={this.onSubmit} className="form">
        <div className="field">
          <div className="control">
            <label htmlFor="new-password">
              Almost there. You just need to change your password...
            </label>
            <input
              className="input is-large"
              placeholder="Please change your password"
              value={newPassword}
              onChange={this.onChange.bind(this)}
              type="password"
            />
            {error && <p className="has-text-warning">{error}</p>}
          </div>
        </div>
        <button className="button is-primary is-large" type="submit">
          Change password
        </button>
      </form>
    );
  }
}
