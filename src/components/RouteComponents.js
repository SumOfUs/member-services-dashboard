import React from 'react';
import { Route, Redirect } from 'react-router-dom';

export const AuthRoute = ({
  userHasAuthenticated,
  isAuthenticated,
  Component,
  ...rest
}) => (
  <Route
    {...rest}
    render={() =>
      isAuthenticated ? (
        <Redirect to="/dashboard" />
      ) : (
        <Component userHasAuthenticated={userHasAuthenticated} />
      )
    }
  />
);

export const PrivateRoute = ({
  token,
  isAuthenticated,
  component: Component,
  ...rest
}) => {
  return (
    <Route
      {...rest}
      render={({ match }) =>
        isAuthenticated ? (
          <Component token={token} match={match} />
        ) : (
          <Redirect to="/" />
        )
      }
    />
  );
};
