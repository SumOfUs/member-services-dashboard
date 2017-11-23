import React, { Component } from 'react';
import SelectCountry from '../components/SelectCountry';
import config from '../config';

export default class MemberProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      updating: false,
      member: null,
      updatedMember: {},
    };
  }

  componentDidMount() {
    fetch(`${config.api.API_URL}/members/${this.props.match.params.id}`)
      .then(resp => resp.json())
      .then(json => {
        this.setState(prevState => {
          return { ...prevState, member: json };
        });
        console.debug(json);
      })
      .catch(err => console.debug('Whoops!', err));
  }

  updateMember() {
    console.debug('Updating member with the following fields');
    console.debug(this.state.updatedMember);
    this.setState(
      prevState => {
        return { ...prevState, updating: true };
      },
      () => {
        // post to API
        // get response
        // update form?
        setTimeout(() => {
          console.log('Member updated');
          this.setState(prevState => ({ ...prevState, updating: false }));
        }, 3000);
      }
    );
  }

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

  onSubmit = event => {
    event.preventDefault();
    this.updateMember();
  };

  render() {
    const { updatedMember, updating, member } = this.state;
    if (!member) return 'Loading...';
    return (
      <div className="MemberProfile container">
        <h1>Member Profile</h1>
        <form onSubmit={this.onSubmit}>
          <div className="row">
            <div className="col-sm-6">
              <div className="form-group MemberProfile-first_name">
                <label htmlFor="member-first-name">First Name</label>
                <input
                  required
                  id="member-first-name"
                  onChange={({ target }) =>
                    this.onChange({ first_name: target.value })
                  }
                  type="text"
                  className="form-control"
                  placeholder="First name"
                  defaultValue={member.first_name}
                />
              </div>
            </div>
            <div className="col-sm-6">
              <div className="form-group MemberProfile-last_name">
                <label htmlFor="member-last-name">Last Name</label>
                <input
                  required
                  id="member-last-name"
                  onChange={({ target }) =>
                    this.onChange({ last_name: target.value })
                  }
                  type="text"
                  className="form-control"
                  placeholder="Last name"
                  defaultValue={member.last_name}
                />
              </div>
            </div>
          </div>

          <div className="form-group MemberProfile-email_name">
            <label htmlFor="member-email">Email</label>
            <div className="input-group">
              <span className="input-group-addon" id="basic-addon1">
                @
              </span>
              <input
                required
                id="member-email"
                onChange={({ target }) =>
                  this.onChange({ email: target.value })
                }
                type="email"
                className="form-control"
                placeholder="example@example.com"
                defaultValue={member.email}
              />
            </div>
          </div>

          <div className="row">
            <div className="col-sm-6">
              <div className="form-group MemberProfile-postal">
                <label htmlFor="member-postal">Postal code</label>
                <input
                  required
                  id="member-postal"
                  onChange={({ target }) =>
                    this.onChange({ postal: target.value })
                  }
                  type="text"
                  className="form-control"
                  placeholder="Postal code"
                  defaultValue={member.postal}
                />
              </div>
            </div>
            <div className="col-sm-6">
              <div className="form-group MemberProfile-postal">
                <label htmlFor="member-country">Country</label>
                <SelectCountry
                  value={updatedMember.country || member.country}
                  onChange={data => this.onChange({ country: data.value })}
                />
              </div>
            </div>
          </div>

          <button className="btn btn-primary" type="submit" disabled={updating}>
            {updating ? 'Updating...' : 'Update'}
          </button>
        </form>
      </div>
    );
  }
}
