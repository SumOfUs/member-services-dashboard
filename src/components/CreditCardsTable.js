import React, { Component } from 'react';

export default class CreditCardsTable extends Component {
  render() {
    return (
      <table className="MemberProfile-table">
        <thead>
          <tr>
            <th> Card Type </th>
            <th> Cardholder Name</th>
            <th> Issuing Bank </th>
            <th> Last 4 Numbers </th>
            <th> Expiration Date </th>
          </tr>
        </thead>
        <tbody>
          {this.props.creditCards.map((card, index) => {
            return (
              <tr key={`creditCard-${index}`}>
                <td> {card.cardType} </td>
                <td> {card.cardholderName} </td>
                <td> {card.issuingBank} </td>
                <td> {card.last4} </td>
                <td> {`${card.expirationMonth}/${card.expirationYear}`} </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  }
}
