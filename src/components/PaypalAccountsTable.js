import React, { Component } from 'react';

export default class PaypalAccountsTable extends Component {
  render() {
    return (
      <table className="MemberProfile-table">
        <thead>
          <tr>
            <th> Email </th>
          </tr>
        </thead>
        <tbody>
          {this.props.paypalAccounts.map((account, index) => {
            return (
              <tr key={`paypalAccount-${index}`}>
                <td> {account.email} </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  }
}
