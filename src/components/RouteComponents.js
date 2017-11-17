import React from 'react';
import { Route, Redirect } from 'react-router-dom';

export const AuthRoute = ({ userHasAuthenticated, isAuthenticated, Component, ...rest }) => (
  <Route {...rest}
    render={ () =>
      isAuthenticated ? <Redirect to='/dashboard' /> : <Component userHasAuthenticated={userHasAuthenticated} />
    }
  />
);

export const PrivateRoute = ({ token, isAuthenticated, Component, ...rest }) => (
  <Route {...rest}
    render={ () =>
      isAuthenticated ? <Component token={token} /> : <Redirect to='/' />
    }
  />
);
