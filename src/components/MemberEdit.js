// @flow weak
import React, { Component } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import { toast } from 'react-toastify';
import ApiService from '../libs/api-service';
import SelectCountry from '../components/SelectCountry';
import config from '../config';

type Props = {
  token: string,
  member: any,
  onUpdate: (attributes: any) => void,
};
export class MemberEdit extends Component<Props, *> {
  api: ApiService;
  constructor(props) {
    super(props);
    this.api = new ApiService({ token: this.props.token });
    this.state = {
      updating: false,
      unsubscribing: false,
      updatedMember: {},
      subscription_status: this.props.member.subscription_status,
      showDelete: true,
      deleting: false,
    };
  }

  componentWillReceiveProps(newProps) {
    this.api = new ApiService({ token: newProps.token || this.props.token });
  }

  subscribed() {
    return this.state.subscription_status === 'subscribed';
  }

  updatedAttrs() {
    return Object.keys(this.state.updatedMember);
  }

  updateMember() {
    const { id, email } = this.props.member;
    this.setState(state => ({ ...state, updating: true }));
    this.api
      .updateMember(id, email, this.state.updatedMember)
      .then(() => this.props.onUpdate(this.state.updatedMember))
      .then(() => this.setState({ updating: false, updatedMember: {} }))
      .then(() => toast.success('Member updated successfully'))
      .catch(error => {
        this.setState({ updating: false });
        toast.error('Error updating member');
        console.log(error);
      });
  }

  subjectAccessRequest = () => {
    this.api
      .subjectAccessRequest(this.props.member.email)
      .then(() =>
        toast.success(
          `Subject access request submitted - check the inbox for ${
            config.member_services.EMAIL
          }`
        )
      )
      .catch(error => {
        toast.error('Error requesting subject access data');
        console.log(error);
      });
  };

  unsubscribeMember = e => {
    e.preventDefault();
    this.setState({ unsubscribing: true });

    this.api
      .unsubscribeMember(this.props.member.email, this.props.member.lang)
      .then(
        success => {
          toast.success('Member unsubscribed successfully.');
          this.setState({
            unsubscribing: false,
            subscription_status: 'unsubscribed',
            showDelete: true,
          });
        },
        error => {
          toast.error('There was an error unsubscribing the member.');
          console.log('Unsubscribe error:', error);
        }
      )
      .then(() => this.setState({ unsubscribing: false }));
  };
  deleteMember = e => {
    if (window.confirm('Are you sure, you want to delete the member?')) {
      e.preventDefault();
      this.setState({ deleting: true });

      this.api
        .unsubscribeMember(this.props.member.email, this.props.member.lang)
        .then(
          success => {
            toast.success('Member deleted successfully.');
            this.setState({
              deleting: false,
              showDelete: false,
            });
          },
          error => {
            toast.error('There was an error deleting the member.');
            console.log('Delete error:', error);
          }
        )
        .then(() => this.setState({ deleting: false }));
    } else {
      return null;
    }
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
    const { updatedMember, updating, unsubscribing, deleting } = this.state;

    return (
      <div className="MemberEdit is-clearfix">
        <form onSubmit={this.onSubmit}>
          <div className="columns">
            <div id="MemberEdit__email" className="column is-half-tablet">
              <label className="label">Email</label>
              <div className="control has-icons-left">
                <input
                  type="email"
                  className="input"
                  placeholder="example@example.com"
                  defaultValue={member.email}
                  required
                  title="Email edits are temporarily disabled"
                  onChange={({ target }) =>
                    this.onChange({ email: target.value })
                  }
                />
                <span className="icon is-small is-left">
                  <i className="fa fa-envelope" />
                </span>
              </div>
            </div>
          </div>
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
            <div className="column is-half-tablet field">
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

            <button
              onClick={this.subjectAccessRequest}
              className="button is-primary"
            >
              Submit subject access request
            </button>
            {this.state.showDelete && (
              <button
                onClick={this.deleteMember}
                className={classnames('button', {
                  'is-danger': this.state.showDelete,
                  'is-loading': deleting,
                })}
                disabled={deleting}
              >
                Delete
              </button>
            )}
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
