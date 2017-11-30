import config from '../config';
import axios from 'axios';

const http = axios.create({
  baseURL: config.api.API_URL,
});

http.interceptors.response.use(
  response => {
    return response.data;
  },
  error => {
    if (error.response) {
      // Response received with status not successful
      return Promise.reject(error.response.status);
    } else if (error.request) {
      // The request was made but no response was received
      return Promise.reject(error);
    } else {
      // Something happened in setting up the request that triggered an Error
      return Promise.reject(error.message);
    }
  }
);

export function getBraintreeData(email) {
  return http.get('members/braintree_data', { params: { email } });
}

export function getMember(id) {
  return http.get(`members/${id}`);
}
