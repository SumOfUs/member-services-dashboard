import React from 'react';
import { AuthRoute, PrivateRoute } from './components/RouteComponents';

import Login from './containers/Login';
import Dashboard from './containers/Dashboard';
import MemberProfile from './containers/MemberProfile';

export default props => (
  <div>
    <AuthRoute
      path="/"
      exact
      Component={Login}
      userHasAuthenticated={props.userHasAuthenticated}
      isAuthenticated={props.isAuthenticated}
    />

    <PrivateRoute
      path="/dashboard"
      exact
      component={Dashboard}
      isAuthenticated={props.isAuthenticated}
      token={props.token}
    />
    <PrivateRoute
      path="/members/:id"
      isAuthenticated={props.isAuthenticated}
      exact
      component={MemberProfile}
      token={props.token}
    />
  </div>
);
