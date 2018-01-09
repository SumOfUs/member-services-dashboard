// @flow weak
import React, { Component } from 'react';
import { connect } from 'react-redux';
import ApiService from '../../libs/api-service';
import SubscriptionItem from './SubscriptionItem';
import Loading from '../Loading';

import type { Subscription } from './types';

import './SubscriptionList.css';

type Props = {
  member: any,
  token: string,
};

type State = {
  loadingBraintree: boolean,
  loadingGocardless: boolean,
};

export class SubscriptionList extends Component<Props> {
  api: ApiService;

  constructor(props: Props) {
    super(props);
    this.api = new ApiService({ token: this.props.token });
    this.state = {
      btSubscriptions: [],
      gcSubscriptions: [],
      loadingBraintree: true,
      loadingGocardless: true,
    };
    this.api.fetchBraintreeData();
  }

  fetchData() {
    this.api.fetchBraintreeData(this.props.member.email).then(data =>
      this.setState({
        loadingBraintree: false,
        btSubscriptions: false,
      })
    );
    this.api.fetchGoCardlessSubscriptions(this.props.member.id).then(data =>
      this.setState({
        loadingGocardless: false,
        gcSubscriptions: data,
      })
    );
  }

  subscriptions() {
    return [...this.state.btSubscriptions, ...this.state.gcSubscriptions];
  }

  onCancelSubscription = async (subscription: Subscription) => {
    await this.api.cancelSubscription(subscription.provider, subscription.id);
    this.props.onCancel(subscription);
    return subscription;
  };

  renderEmpty() {
    return <p>No subscriptions</p>;
  }

  renderSubscriptions() {
    if (this.props.subscriptions.length === 0) return this.renderEmpty();
    return this.props.subscriptions.map(subscription => (
      <SubscriptionItem
        key={subscription.id}
        subscription={subscription}
        onCancel={this.onCancelSubscription}
      />
    ));
  }

  isLoading() {
    return this.state.loadingBraintree || this.state.loadingGocardless;
  }
  render() {
    if (!this.props.subscriptions) return <Loading />;
    return (
      <div className="SubscriptionList">
        <h3>
          Subscriptions
          {this.isLoading() && <Loading />}
        </h3>
        {!this.isLoading() && (
          <div className="box">{this.renderSubscriptions()}</div>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  token: state.auth.token,
});

export default connect(mapStateToProps)(SubscriptionList);
