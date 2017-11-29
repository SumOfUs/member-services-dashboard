import { createReducer } from './create-reducer';

const initialState = {
  token: null,
  user: null,
};

const AUTH_REHYDRATE = '@app:auth:rehydrate';
const AUTH_SUCCESS = '@app:auth:success';
const AUTH_FAILURE = '@app:auth:failure';
const AUTH_LOGOUT = '@app:auth:logout';

const setAuth = (state, action) => ({
  ...state,
  token: action.tokens.accesToken.jwtToken,
});
const unsetAuth = () => initialState;
const authRehydrate = (state, action) => ({
  token: action.token,
  user: action.user,
});

// Auth Reducer
export default createReducer(initialState, {
  [AUTH_REHYDRATE]: authRehydrate,
  [AUTH_SUCCESS]: setAuth,
  [AUTH_FAILURE]: unsetAuth,
  [AUTH_LOGOUT]: unsetAuth,
});

// actions
export function rehydrate(data) {
  return {
    type: AUTH_REHYDRATE,
    user: data.user,
    token: data.token,
  };
}

export function loginSuccess(tokens) {
  return {
    type: AUTH_SUCCESS,
    tokens,
  };
}

export function loginFailure(error) {
  return {
    type: AUTH_FAILURE,
    error,
  };
}

export function logout() {
  return {
    type: AUTH_LOGOUT,
  };
}
