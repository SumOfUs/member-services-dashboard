import React from "react";
import { AuthRoute, PrivateRoute } from "./components/RouteComponents";
import { Switch } from "react-router-dom";
import Login from "./containers/Login"
import Dashboard from "./containers/Dashboard"

export default (props) => (
  <Switch>
     <AuthRoute
       path='/'
       exact
       Component={Login}
       userHasAuthenticated={props.userHasAuthenticated}
       isAuthenticated={props.isAuthenticated}
     />

     <PrivateRoute
       path='/dashboard'
       exact
       Component={Dashboard}
       isAuthenticated={props.isAuthenticated}
     />
  </Switch>
);
