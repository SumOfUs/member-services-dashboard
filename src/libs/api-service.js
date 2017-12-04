// @flow weak
import axios from 'axios';
import config from '../config';

function createClient(options) {
  return axios.create({
    baseURL: options.baseURL || config.api.API_URL,
    // headers: {
    //   authorization: `Bearer ${options.token}`,
    // },
  });
}
export default class ApiService {
  constructor(options = {}) {
    this.client = createClient(options);
  }

  updateToken(token) {
    this.client = createClient({ token });
  }

  findMemberByEmail(email) {
    return this.client
      .get('/members', { params: { email } })
      .then(response => response.data.objects);
  }

  cancelSubscription(provider, id) {
    const path = `/payments-service/${provider}/subscriptions/${id}`;

    return this.client.delete(path).then(
      s => s,
      error => {
        console.error(error);
        return error;
      }
    );
  }

  updateMember(id, attrs) {
    return this.client.put(`/members/${id}/`, attrs).then(
      s => console.log(s),
      error => {
        console.error(error);
        return error;
      }
    );
  }

  fetchBraintreeData(member) {
    return this.client.get(`/members/`);
  }
}
