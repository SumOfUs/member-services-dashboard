// @flow weak
import axios from 'axios';
import config from '../config';
import type { Axios } from 'axios';

function createClient(options) {
  return axios.create({
    baseURL: options.baseURL || config.api.API_URL,
    headers: {
      authorization: options.token,
    },
  });
}

export default class ApiService {
  client: Axios;

  constructor(options = {}) {
    this.client = createClient(options);
  }

  updateToken(token) {
    this.client = createClient({ token });
  }

  getMember(id) {
    return this.client.get(`members/${id}`).then(response => response.data);
  }

  findMemberByEmail(email) {
    return this.client
      .get('/members', { params: { email } })
      .then(response => response.data.objects);
  }

  cancelSubscription(provider, id) {
    const path = `/payments-service/${provider}/subscriptions/${id}`;

    return this.client.delete(path).then(
      success => success,
      error => {
        console.error(error);
        return error;
      }
    );
  }

  updateMember(id, email, params) {
    const payload = {
      email: email,
      member: params,
    };
    return this.client.put(`/members/${id}/`, payload);
  }

  fetchBraintreeData(email: string) {
    return this.client.get('members/braintree_data', { params: { email } });
  }

  fetchGoCardlessSubscriptions(memberId: string) {
    return this.client.get(`members/${memberId}/gocardless_subscriptions`);
  }

  unsubscribeMember(email: string, langResource: string) {
    return this.client
      .post('/members/unsubscribe', { email: email, lang: langResource })
      .then(response => {
        return response.data.objects;
      });
  }
}
