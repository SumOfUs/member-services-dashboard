import { CognitoUserPool } from "amazon-cognito-identity-js";
import config from "../config";

const authUser = async () => {
  const currentUser = getCurrentUser();

  if (currentUser === null) {
    return false;
  }

  await getUserToken(currentUser);

  return true;
}

const signOutUser = () => {
  const currentUser = getCurrentUser();

  if (currentUser !== null) {
    currentUser.signOut();
  }
}

export { authUser, signOutUser };

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
}

const getCurrentUser = () => {
  const userPool = new CognitoUserPool({
    UserPoolId: config.cognito.USER_POOL_ID,
    ClientId: config.cognito.APP_CLIENT_ID
  });
  return userPool.getCurrentUser();
}
