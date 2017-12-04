import React, { Component } from 'react';
import Header from './Header';
import Box from '../components/Box';
import MemberEdit from '../components/MemberEdit';
import SubscriptionsTable from '../components/SubscriptionsTable/SubscriptionsTable';
import CustomersTable from '../components/CustomersTable';
import CreditCardsTable from '../components/CreditCardsTable';
import PaypalAccountsTable from '../components/PaypalAccountsTable';
import { getBraintreeData, getMember } from '../libs/backendClient';

import './MemberProfile.css';

export default class MemberProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      member: null,
      subscriptions: [],
      creditCards: [],
      paypalAccounts: [],
      customers: [],
      braintreeDataFetched: false,
    };
  }

  componentDidMount() {
    getMember(this.props.match.params.id)
      .then(data => {
        this.setState(prevState => {
          return { ...prevState, member: data };
        });
        this.fetchBraintreeData();
      })
      .catch(err => console.debug('Whoops!', err));
  }

  handleCancelledSubscription(cancelledSubscription) {
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
  }

  fetchBraintreeData() {
    getBraintreeData(this.state.member.email)
      .then(data => {
        this.setState(prevState => {
          prevState.subscriptions = prevState.subscriptions.concat(
            data.subscriptions
          );
          prevState.creditCards = prevState.creditCards.concat(
            data.paymentMethods.filter(p => {
              return p.type === 'CreditCard';
            })
          );
          prevState.paypalAccounts = prevState.paypalAccounts.concat(
            data.paymentMethods.filter(p => {
              return p.type === 'PayPalAccount';
            })
          );
          prevState.customers = prevState.customers.concat(data.customers);
          prevState.braintreeDataFetched = true;
          return prevState;
        });
      })
      .catch(error => {
        console.log('Something went wrong: ', error);
      });
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
          <Box className="MemberProfile-section">
            <h3> Customers </h3>
            <CustomersTable customers={this.state.customers} />
          </Box>
          <Box className="MemberProfile-section">
            <h3> Subscriptions </h3>
            <SubscriptionsTable
              handleCancelledSubscription={this.handleCancelledSubscription.bind(
                this
              )}
              subscriptions={this.state.subscriptions}
            />
          </Box>
          <Box className="MemberProfile-section">
            <h3> Credit Cards </h3>
            <CreditCardsTable creditCards={this.state.creditCards} />
          </Box>

          <Box className="MemberProfile-section">
            <h3> Paypal Accounts </h3>
            <PaypalAccountsTable paypalAccounts={this.state.paypalAccounts} />
          </Box>
        </div>
      </div>
    );
  }
}
