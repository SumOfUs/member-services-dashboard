// @flow weak
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import ApiService from '../../libs/api-service';
import SubscriptionItem from './SubscriptionItem';
import Loading from '../Loading';

import type { Subscription, GCSubscription, BTSubscription } from './types';

import './SubscriptionList.css';

type Props = {
  member: any,
  token: string,
};

type State = {
  btSubscriptions: BTSubscription[],
  gcSubscriptions: GCSubscription[],
  loadingBraintree: boolean,
  loadingGocardless: boolean,
};

export class SubscriptionList extends Component<Props, State> {
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
  }

  componentDidMount() {
    this.fetchSubscriptions();
  }

  get subscriptions(): Subscription[] {
    return [...this.state.btSubscriptions, ...this.state.gcSubscriptions];
  }

  fetchSubscriptions() {
    this.api
      .fetchBraintreeData(this.props.member.email)
      .then(response => {
        this.setState(s => ({
          loadingBraintree: false,
          btSubscriptions: response.data.subscriptions,
        }));
      })
      .catch(e => {
        console.error(e);
        this.setState(s => ({ loadingBraintree: false }));
      });
    this.api
      .fetchGoCardlessSubscriptions(this.props.member.id)
      .then(response =>
        this.setState({
          loadingGocardless: false,
          gcSubscriptions: response.data,
        })
      )
      .catch(e => {
        console.error(e);
        this.setState(s => ({ loadingGocardless: false }));
      });
  }

  onCancelSubscription = (subscription: Subscription) => {
    const { provider } = subscription;
    return this.api
      .cancelSubscription(subscription.provider, subscription.id)
      .then(
        result => {
          toast.success('Payment cancelled.');
          const updated = Object.assign({}, subscription, {
            status: 'canceled',
          });
          let key = 'btSubscriptions';
          if (provider === 'gocardless') key = 'gcSubscriptions';
          return this.setState(prevState => ({
            ...prevState,
            [key]: replaceInList(prevState[key], subscription, updated),
          }));
        },
        failure => toast.error('Could not cancel the subscription')
      );
  };

  renderEmpty() {
    return <p className="has-text-centered">No recurring donations</p>;
  }

  renderSubscriptions() {
    if (!this.isLoading() && this.subscriptions.length === 0) {
      return this.renderEmpty();
    }
    return this.subscriptions.map(subscription => (
      <SubscriptionItem
        key={subscription.id}
        subscription={subscription}
        onCancel={this.onCancelSubscription}
      />
    ));
  }

  isLoading(): boolean {
    return this.state.loadingBraintree || this.state.loadingGocardless;
  }

  render() {
    return (
      <div className="SubscriptionList">
        <h3 className="has-text-weight-semibold">Recurring Donations</h3>
        <div className="box">
          {this.isLoading() && (
            <p className="has-text-centered">
              <Loading loading={this.isLoading()} />
            </p>
          )}
          {!this.isLoading() && this.renderSubscriptions()}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  token: state.auth.token,
});

export default connect(mapStateToProps)(SubscriptionList);

function replaceInList<T>(list: T[], oldItem: T, newItem: T): T[] {
  return [
    ...list.slice(0, list.indexOf(oldItem)),
    newItem,
    ...list.slice(list.indexOf(oldItem) + 1),
  ];
}
