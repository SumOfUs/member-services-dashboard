// @flow weak
import React, { Component } from 'react';
import Header from './Header';
import Box from '../components/Box';
import MemberEdit from '../components/MemberEdit';
import SubscriptionsList from '../components/Subscriptions/SubscriptionList';
import ApiService from '../libs/api-service';

import './MemberProfile.css';
type Props = {
  token: string,
  match: {
    params: {
      id: string,
    },
  },
};
type State = {
  member: ?any,
};
export default class MemberProfile extends Component<Props, State> {
  api: ApiService;
  constructor(props) {
    super(props);
    this.state = {
      member: null,
    };
    this.api = new ApiService({ token: props.token });
  }
  componentDidMount() {
    this.api
      .getMember(this.props.match.params.id)
      .then(member => this.setState({ member }))
      .catch(err => console.debug('Whoops!', err));
  }

  handleCancelledSubscription = cancelledSubscription => {
    // FIXME: make state immutable
    this.setState(prevState => {
      const subscriptions = prevState.subscriptions.map(subscription => {
        if (subscription.id === cancelledSubscription.id)
          subscription.status = 'Canceled';

        return subscription;
      });

      return {
        ...prevState,
        subscriptions: subscriptions,
      };
    });
  };

  onMemberUpdate = attributes => {
    this.setState(prevState => ({
      member: { ...prevState.member, ...attributes },
    }));
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
            <MemberEdit member={member} onUpdate={this.onMemberUpdate} />
          </Box>

          <SubscriptionsList member={member} />
        </div>
      </div>
    );
  }
}
