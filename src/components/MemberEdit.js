import React, { Component } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import { toast } from 'react-toastify';
import ApiService from '../libs/api-service';
import SelectCountry from '../components/SelectCountry';

export class MemberEdit extends Component {
  constructor(props) {
    super(props);
    this.api = new ApiService({ token: this.props.token });
    this.state = {
      updating: false,
      unsubscribing: false,
      updatedMember: {},
    };
  }

  componentWillReceiveProps(newProps) {
    this.api = new ApiService({ token: newProps.token || this.props.token });
  }

  subscribed() {
    const member = this.props.member;
    return member && member.subscription_status === 'subscribed';
  }

  updatedAttrs() {
    return Object.keys(this.state.updatedMember);
  }

  updateMember() {
    const member = this.props.member;
    this.setState(state => ({ ...state, updating: true }));
    this.api
      .updateMember(member.id, this.state.updatedMember)
      .then(
        () => toast.success('Member updated successfully'),
        () => toast.error('Error updating member')
      )
      .then(() => this.setState({ updating: false, updatedMember: {} }));
  }

  unsubscribeMember = e => {
    e.preventDefault();
    this.setState({ unsubscribing: true });
    this.api
      .unsubscribeMember(this.props.member.email)
      .then(
        success => {
          toast.success('Member unsubscribed successfully.');
          this.setState({ unsubscribing: false });
        },
        error => {
          toast.error('There was an error unsubscribing the member.');
          console.log('Unsubscribe error:', error);
        }
      )
      .then(() => this.setState({ unsubscribing: false }));
  };

  onSubmit = event => {
    event.preventDefault();
    if (this.updatedAttrs().length) {
      this.updateMember();
    }
  };

  onChange = data => {
    if (!data) return;

    this.setState(prevState => {
      return {
        ...prevState,
        updatedMember: {
          ...prevState.updatedMember,
          ...data,
        },
      };
    });
  };

  render() {
    const { member } = this.props;
    const { updatedMember, updating, unsubscribing } = this.state;

    return (
      <div className="MemberEdit is-clearfix">
        <form onSubmit={this.onSubmit}>
          <div className="columns is-multiline">
            <div id="MemberEdit-first-name" className="column is-half-tablet">
              <label className="label">First name</label>
              <div className="control">
                <input
                  type="text"
                  className="input"
                  placeholder="First name"
                  defaultValue={member.first_name}
                  required
                  onChange={({ target }) =>
                    this.onChange({ first_name: target.value })
                  }
                />
              </div>
            </div>

            <div id="MemberEdit-last-name" className="column is-half-tablet">
              <label className="label">Last Name</label>
              <div className="control">
                <input
                  type="text"
                  className="input"
                  placeholder="Last name"
                  defaultValue={member.last_name}
                  required
                  onChange={({ target }) =>
                    this.onChange({ last_name: target.value })
                  }
                />
              </div>
            </div>

            <div id="MemberEdit__email" className="column is-half-tablet">
              <label className="label">Email</label>
              <div className="control has-icons-left">
                <input
                  type="email"
                  className="input"
                  placeholder="example@example.com"
                  defaultValue={member.email}
                  required
                  onChange={({ target }) =>
                    this.onChange({ email: target.value })
                  }
                />
                <span className="icon is-small is-left">
                  <i className="fa fa-envelope" />
                </span>
              </div>
            </div>

            <div className="column is-half-tablet field">
              <label className="label">Postal code</label>
              <div className="control">
                <input
                  type="text"
                  className="input"
                  placeholder="Postal code"
                  defaultValue={member.postal}
                  required
                  onChange={({ target }) =>
                    this.onChange({ postal: target.value })
                  }
                />
              </div>
            </div>
            <div className="column is-half-tablet is-offset-half field">
              <label className="label">Country</label>
              <div className="control">
                <SelectCountry
                  value={updatedMember.country || member.country}
                  onChange={data => this.onChange({ country: data.value })}
                />
              </div>
            </div>
          </div>

          <div className="buttons is-pulled-right">
            <button
              className={classnames('button is-primary', {
                'is-loading': updating,
              })}
              type="submit"
              disabled={updating || !this.updatedAttrs().length}
            >
              Update
            </button>
          </div>

          <div className="buttons is-pulled-left">
            <button
              onClick={this.unsubscribeMember}
              className={classnames('button', {
                'is-danger': this.subscribed(),
                'is-loading': unsubscribing,
              })}
              disabled={unsubscribing || !this.subscribed()}
            >
              Unsubscribe
            </button>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  token: state.auth.token,
});

export default connect(mapStateToProps)(MemberEdit);
