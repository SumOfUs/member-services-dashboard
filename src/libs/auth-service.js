// @flow weak
import {
  CognitoUserPool,
  AuthenticationDetails,
  CognitoUser,
} from 'amazon-cognito-identity-js';
import reduce from 'lodash/reduce';
import config from '../config';

export function getUserPool() {
  return new CognitoUserPool({
    UserPoolId: config.cognito.USER_POOL_ID,
    ClientId: config.cognito.APP_CLIENT_ID,
  });
}

export function getCognitoUser({ username: Username, pool: Pool }) {
  return new CognitoUser({ Username, Pool });
}

export function transformAttributes(attrs) {
  return reduce(
    attrs,
    (result, attrs) => {
      return {
        ...result,
        [attrs.Name]: attrs.Value,
      };
    },
    {}
  );
}

export function getUserAttributes(user) {
  return new Promise((resolve, reject) => {
    user.getUserAttributes((err, attrs) => {
      if (err) return reject(err);
      return resolve(transformAttributes(attrs));
    });
  });
}

export function authenticate(user, details) {
  return new Promise((resolve, reject) => {
    user.authenticateUser(details, {
      onSuccess: data => {
        getUserAttributes(user).then(attr => {
          resolve({ user_attributes: attr, token: data });
        });
      },
      onFailure: reject,
      newPasswordRequired: (userAttributes, requiredAttributes) => {
        resolve({
          newPasswordRequired: true,
          userAttributes,
          requiredAttributes,
          user,
        });
      },
    });
  });
}

export function completeNewPasswordChallenge(user, newPassword) {
  return new Promise((resolve, reject) => {
    user.completeNewPasswordChallenge(newPassword, null, {
      onSuccess: resp => resolve(resp),
      onFailure: err => reject(err),
    });
  });
}

export function login(username, password) {
  return new Promise((resolve, reject) => {
    const credentials = new AuthenticationDetails({
      Username: username,
      Password: password,
    });
    const pool = getUserPool();

    const user = getCognitoUser({ username, pool });

    return authenticate(user, credentials)
      .then(onLoginSuccess, onLoginFailure)
      .then(resolve, reject);
  });
}

export function onLoginSuccess(data) {
  console.log('login success:', data);
  return Promise.resolve(data);
}

export function onLoginFailure(data) {
  console.log('onLoginFailure:', data);
  return Promise.reject(data);
}
