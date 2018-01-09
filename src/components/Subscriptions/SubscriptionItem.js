// @flow
import React, { Component } from 'react';
import classnames from 'classnames';
import format from 'date-fns/format';
import FormattedCurrency from '../FormattedCurrency';
import type { Subscription } from './types';
import './SubscriptionItem.css';

type Props = {
  subscription: Subscription,
  onCancel: (subscription: Subscription) => Promise<*>,
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
    this.setState({ cancelling: true });
    return this.props
      .onCancel(this.props.subscription)
      .then(() => this.setState({ cancelling: false }))
      .catch(() => this.setState({ cancelling: false }));
  };

  renderStatusIcon(status: string) {
    return (
      <span className={classnames(status)} title={status}>
        <i className="fa fa-circle" />
      </span>
    );
  }

  renderAmount() {
    const { subscription } = this.props;
    const amount = subscription.amount;
    const currency = subscription.currency || subscription.merchantAccountId;
    return (
      <span>
        <FormattedCurrency amount={amount} currency={currency} />/month
      </span>
    );
  }

  renderDate() {
    const { subscription } = this.props;
    const date = subscription.start_date || subscription.createdAt;
    return <span>created {format(date, 'DD.MM.YYYY')}</span>;
  }

  isCancelDisabled() {
    const { cancelling } = this.state;
    const { subscription } = this.props;
    return cancelling || subscription.status !== 'active';
  }

  render() {
    const { subscription } = this.props;
    const { provider, status } = subscription;
    return (
      <div
        className={`SubscriptionItem  level is-mobile ${provider} ${status}`}
      >
        <div className="level-left">
          <div className="SubscriptionItem-provider level-item is-hidden-mobile">
            {provider}
          </div>
          <div className="level-item">{this.renderAmount()}</div>
        </div>

        <div className="level-right">
          <div className="SubscriptionItem-date level-item has-text-right has-text-grey">
            {this.renderDate()}
          </div>
          <div className="SubscriptionItem-status level-item">
            {this.renderStatusIcon(status)}
            <span className="is-hidden-mobile status-label is-size-7">
              {status}
            </span>
          </div>
          <a
            className={classnames(
              'SubscriptionItem-cancel level-item has-text-centered button is-1',
              {
                'is-disabled': status !== 'active',
                'is-loading': this.state.cancelling,
              }
            )}
            className="SubscriptionItem-cancel level-item has-text-centered button is-1"
            onClick={this.cancelSubscription}
          >
            <i className="fa fa-trash" />
          </a>
        </div>
      </div>
    );
  }
}
