import React, { Component } from 'react';
import { connect } from 'react-redux';
import ApiService from '../../libs/api-service';
import CancelSubscriptionButton from './CancelSubscriptionButton';

export class SubscriptionsTable extends Component {
  constructor(props) {
    super(props);
    this.api = new ApiService({ token: this.props.token });

    this.state = {
      cancellingSubscriptionId: null,
    };
  }

  onCancelSubscription(subscription) {
    this.setState(state => ({
      ...state,
      cancellingSubscriptionId: subscription.id,
    }));

    this.api
      .cancelSubscription(subscription.provider, subscription.id)
      .then(
        success => this.props.handleCancelledSubscription(subscription),
        error => console.error('ERROR UPDATING', error)
      )
      .then(() =>
        this.setState(state => ({ ...state, cancellingSubscriptionId: null }))
      );
  }

  render() {
    return (
      <table className="table is-striped is-fullwidth">
        <thead>
          <tr>
            <th> Provider </th>
            <th> Start Date </th>
            <th> Amount </th>
            <th> Status </th>
            <th />
          </tr>
        </thead>
        <tbody>
          {this.props.subscriptions.map((subscription, index) => {
            return (
              <tr key={`subscription-${index}`}>
                <td>
                  {' '}
                  {subscription.provider.charAt(0).toUpperCase() +
                    subscription.provider.slice(1)}{' '}
                </td>
                <td> {subscription.createdAt} </td>
                <td> {subscription.price} </td>
                <td> {subscription.status} </td>
                <td>
                  {subscription.status === 'Active' && (
                    <CancelSubscriptionButton
                      subscription={subscription}
                      handleClick={this.onCancelSubscription.bind(this)}
                      cancellingSubscriptionId={
                        this.state.cancellingSubscriptionId
                      }
                    />
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  }
}

const mapStateToProps = state => ({
  token: state.auth.token,
});

export default connect(mapStateToProps)(SubscriptionsTable);
