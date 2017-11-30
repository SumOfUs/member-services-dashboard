import React, { Component } from 'react';
import classnames from 'classnames';
import { connect } from 'react-redux';
import ApiService from '../libs/api-service';

export class SubscriptionsTable extends Component {
  constructor(props) {
    super(props);
    this.api = new ApiService({ token: this.props.token });
    this.state = {
      cancellingSubscription: false,
    };
  }

  onCancelSubscription(subscription) {
    this.setState(state => ({ ...state, cancellingSubscription: true }));
    this.api
      .cancelSubscription(subscription.provider, subscription.id)
      .then(
        success => console.log('Cancel Subscription'),
        error => console.error('ERROR UPDATING', error)
      )
      .then(() =>
        this.setState(state => ({ ...state, cancellingSubscription: false }))
      );
  }

  render() {
    const buttonClasses = classnames('button is-danger is-small', {
      'is-loading': this.state.cancellingSubscription,
    });

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
                  <button
                    className={buttonClasses}
                    disabled={this.state.cancellingSubscription}
                    onClick={this.onCancelSubscription.bind(this, subscription)}
                  >
                    Cancel
                  </button>
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
