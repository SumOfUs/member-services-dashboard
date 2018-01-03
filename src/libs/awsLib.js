import { CognitoUserPool } from 'amazon-cognito-identity-js';
import reduce from 'lodash/reduce';
import config from '../config';

const authUser = async () => {
  const currentUser = getCurrentUser();

  if (currentUser === null) {
    return false;
  }

  try {
    const token = await getUserToken(currentUser);
    const attrs = await getUserAttributes(currentUser);
    const user = reduce(
      attrs,
      (result, { Name, Value }) => ({ ...result, [Name]: Value }),
      {}
    );
    return { token, user };
  } catch (e) {
    console.log('exception:', e);
  }
};

const getUserAttributes = async user => {
  return new Promise((resolve, reject) => {
    user.getUserAttributes((err, data) => {
      if (err) return reject(err);
      return resolve(data);
    });
  });
};
const signOutUser = () => {
  const currentUser = getCurrentUser();

  if (currentUser !== null) {
    currentUser.signOut();
  }
};

export { authUser, signOutUser, getUserAttributes };

const getUserToken = currentUser => {
  return new Promise((resolve, reject) => {
    currentUser.getSession(function(err, session) {
      if (err) {
        reject(err);
        return;
      }

      resolve(session.getIdToken().getJwtToken());
    });
  });
};

const getCurrentUser = () => {
  const userPool = new CognitoUserPool({
    UserPoolId: config.cognito.USER_POOL_ID,
    ClientId: config.cognito.APP_CLIENT_ID,
  });
  return userPool.getCurrentUser();
};
