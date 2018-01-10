// @flow

export type Subscription = GCSubscription | BTSubscription;

type Status = 'active' | 'canceled' | 'cancelled';
type BTCustomer = {
  firstName: string,
  lastName: string,
  email: string,
  createdAt: string,
};

type BTPaymentMethod = {
  type: string,
  email?: string,
  cardType?: string,
  cardholderName?: string,
  last4?: string,
  expirationMonth?: string,
  expirationYear?: string,
  issuingBank?: string,
};

type GCLink = {
  mandate: string,
};

type GCMetadata = {
  order_no: string,
};
export type GCSubscription = {
  provider: 'gocardless',
  createdAt: string,
  startDate: string,
  amount: number,
  id: string,
  currency: string,
  status: Status,
};

type GCUpcomingPayment = {
  charge_date: string,
  amount: number,
};

type BTStatusHistory = {
  status: string,
  balance: string,
  price: string,
};

export type BTSubscription = {
  provider: 'braintree',
  balance: string,
  billingPeriodEndDate: string,
  billingPeriodStartDate: string,
  createdAt: string,
  currentBillingCycle: number,
  daysPastDue: string,
  description: string,
  failureCount: number,
  firstBillingDate: string,
  id: string,
  merchantAccountId: string,
  nextBillingDate: string,
  nextBillingPeriodAmount: string,
  numberOfBillingCycles: string,
  amount: number,
  status: Status,
  statusHistory: BTStatusHistory[],
  transactions: BTTransaction[],
};

type BTTransaction = {
  status: string,
  currencyIsoCode: string,
  amount: string,
  createdAt: string,
  id: string,
  orderId: string,
  refundIds: any[],
  refundedTransactionId: string,
};
