import React, { Component } from 'react';
import Header from './Header';
import Box from '../components/Box';
import MemberEdit from '../components/MemberEdit';
import SubscriptionsList from '../components/Subscriptions/SubscriptionList';
import { getMember } from '../libs/backendClient';

import './MemberProfile.css';

export default class MemberProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      member: null,
    };
  }
  componentDidMount() {
    getMember(this.props.match.params.id)
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

          <SubscriptionsList member={member} />
          {/*
          <Box className="MemberProfile-section">
            <h3> Customers </h3>
            <CustomersTable customers={this.state.customers} />
          </Box>
          <Box className="MemberProfile-section">
            <h3> Credit Cards </h3>
            <CreditCardsTable creditCards={this.state.creditCards} />
          </Box>

          <Box className="MemberProfile-section">
            <h3> Paypal Accounts </h3>
            <PaypalAccountsTable paypalAccounts={this.state.paypalAccounts} />
          </Box>
          */}
        </div>
      </div>
    );
  }
}
