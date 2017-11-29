import React, { PureComponent } from 'react';
import { completeNewPasswordChallenge } from '../libs/auth-service';

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
    this.setState(prev => ({ ...prev, newPasword: event.target.value }));
  };

  onSubmit = () => {
    console.log('new password:', this.state.newPassword);
    completeNewPasswordChallenge();
  };

  render() {
    const { newPassword, error } = this.state;
    return (
      <div className="NewPassword container">
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label htmlFor="new-password">
              Almost there. You just need to change your password...
            </label>
            <input
              id="new-password"
              placeholder="Please change your password"
              value={newPassword}
              onChange={this.onChange}
              type="password"
            />
            {error && <p className="has-text-warning">{error}</p>}
          </div>
          <button className="button is-primary is-large" type="submit">
            Change password
          </button>
        </form>
      </div>
    );
  }
}
