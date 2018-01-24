// @flow weak
import React, { Component } from 'react';
import classnames from 'classnames';
import format from 'date-fns/format';
import FormattedCurrency from '../FormattedCurrency';
import type { BTSubscription, GCSubscription } from './types';
import './SubscriptionItem.css';

interface SubscriptionView {
  id: string;
  provider: 'braintree' | 'gocardless';
  amount: number;
  currency: string;
  createdAt: string;
  endDate?: string;
  // FIXME: canceled typo?
  status: 'active' | 'canceled' | 'cancelled';
}

type Props = {
  subscription: BTSubscription | GCSubscription,
  onCancel: (subscription: BTSubscription | GCSubscription) => Promise<*>,
};

type State = {
  cancelling: boolean,
};
export default class SubscriptionItem extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { cancelling: false };
  }

  cancelSubscription = e => {
    e.preventDefault();
    if (this.isCancelDisabled()) return;
    if (window.confirm('Do you really want to cancel this subscription?')) {
      this.setState({ cancelling: true });
      return this.props
        .onCancel(this.props.subscription)
        .then(() => this.setState({ cancelling: false }))
        .catch(() => this.setState({ cancelling: false }));
    }
  };

  renderStatusIcon(status: string) {
    return (
      <span className={classnames(status)} title={status}>
        <i className="fa fa-circle" />
      </span>
    );
  }

  renderAmount(amount, currency) {
    return (
      <span>
        <FormattedCurrency amount={amount} currency={currency} />/month
      </span>
    );
  }

  renderDate(date: string) {
    return <span>created {format(date, 'DD.MM.YYYY')}</span>;
  }

  isCancelDisabled() {
    const { cancelling } = this.state;
    const { subscription } = this.props;
    return cancelling || subscription.status !== 'active';
  }

  render() {
    const { subscription } = this.props;
    switch (subscription.provider) {
      case 'braintree':
        return this.renderBTSubscription(subscription);
      case 'gocardless':
        return this.renderGCSubscription(subscription);
      default:
        return null;
    }
  }

  renderBTSubscription(s: BTSubscription) {
    return this.renderSubscription({
      id: s.id,
      provider: s.provider,
      createdAt: s.createdAt,
      amount: s.amount,
      currency: s.currency,
      status: s.status,
    });
  }

  renderGCSubscription(s: GCSubscription): React$Node {
    return this.renderSubscription({
      id: s.id,
      provider: s.provider,
      createdAt: s.createdAt,
      amount: s.amount,
      currency: s.currency,
      status: s.status,
    });
  }

  renderSubscription(data: SubscriptionView): React$Node {
    return (
      <div
        className={classnames('SubscriptionItem level is-mobile', [
          data.provider,
          data.status,
        ])}
      >
        <div className="level-left">
          <div className="SubscriptionItem-status level-item">
            {this.renderStatusIcon(data.status)}
          </div>
          <div className="SubscriptionItem-cancel level-item">
            {data.status === 'active' && this.renderCancelButton()}
          </div>
          <div className="SubscriptionItem-provider level-item is-hidden-mobile">
            {data.provider}
          </div>
          <div className="level-item">
            {this.renderAmount(data.amount, data.currency)}
          </div>
          <div className="SubscriptionItem-date level-item has-text-right has-text-grey">
            {this.renderDate(data.createdAt)}
          </div>
        </div>

        <div className="level-right">
          <div className="level-item">
            <code>{data.id}</code>
          </div>
        </div>
      </div>
    );
  }

  renderCancelButton() {
    const className = classnames({
      button: true,
      'is-loading': this.state.cancelling,
    });
    return (
      <a className={className} onClick={this.cancelSubscription}>
        <i className="fa fa-trash" />
      </a>
    );
  }
}
