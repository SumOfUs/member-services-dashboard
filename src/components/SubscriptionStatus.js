import React, { PureComponent } from 'react';
import classnames from 'classnames';

export default class SubscriptionStatus extends PureComponent {
  render() {
    const className = classnames('tag', {
      'is-success': this.props.status === 'subscribed',
      'is-danger': this.props.status === 'unsubscribed',
      'is-warning': this.props.status === 'bounced',
      'is-light': this.props.status === 'never',
    });
    return <span className={className}>{this.props.status}</span>;
  }
}
