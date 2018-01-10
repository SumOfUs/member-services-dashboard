import React, { PureComponent } from 'react';
type Props = {
  amount: number,
  currency: string,
};
export default class FormattedCurrency extends PureComponent<Props> {
  locale() {
    return navigator.language || 'en-US';
  }

  format() {
    try {
      const formatter = new Intl.NumberFormat(this.locale(), {
        style: 'currency',
        currency: this.props.currency,
      });
      return formatter.format(this.props.amount);
    } catch (e) {
      return this.props.amount;
    }
  }
  render() {
    return <span className="FormattedCurrency">{this.format()}</span>;
  }
}
