import React, { Component } from 'react';

export default class SubscriptionsTable extends Component {
  render() {
    return (
      <table className="MemberProfile-table">
        <thead>
          <tr>
            <th> Provider </th>
            <th> Start Date </th>
            <th> Amount </th>
            <th> Status </th>
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
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  }
}
