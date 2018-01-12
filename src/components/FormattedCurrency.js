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
    const { currency, amount } = this.props;
    try {
      const formatter = new Intl.NumberFormat(this.locale(), {
        style: 'currency',
        currency,
      });
      return formatter.format(amount);
    } catch (e) {
      return `${amount} ${currency}`;
    }
  }
  render() {
    return <span className="FormattedCurrency">{this.format()}</span>;
  }
}
