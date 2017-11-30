import React, { Component } from 'react';

export default class CustomersTable extends Component {
  render() {
    return (
      <table className="MemberProfile-table">
        <thead>
          <tr>
            <th> Name </th>
            <th> Email </th>
            <th> Created At </th>
          </tr>
        </thead>
        <tbody>
          {this.props.customers.map((customer, index) => {
            return (
              <tr key={`subscription-${index}`}>
                <td> {`${customer.firstName} ${customer.lastName}`} </td>
                <td> {customer.email} </td>
                <td> {customer.createdAt} </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  }
}
