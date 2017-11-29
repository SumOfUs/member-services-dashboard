import React, { Component } from 'react';
import Header from './Header';
import Box from '../components/Box';
import MemberEdit from '../components/MemberEdit';
import config from '../config';

export default class MemberProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      member: null,
    };
  }

  componentDidMount() {
    console.log('component mounted');
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

  onSubmit = event => {
    event.preventDefault();
    this.updateMember();
  };

  render() {
    const { member } = this.state;
    if (!member) return 'Loading...';
    return (
      <div className="MemberProfile">
        <Header />
        <div className="MemberProfile-content section">
          <h3 className="is-size-3 has-text-centered">Manage member</h3>
          <Box className="MemberProfile-edit-form">
            <MemberEdit member={member} />
          </Box>
          <Box className="MemberProfile-subscriptions">
            <h3>Subscriptions</h3>
          </Box>
        </div>
      </div>
    );
  }
}
