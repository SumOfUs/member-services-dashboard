import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { withRouter, Route, Redirect } from 'react-router-dom';

export class AuthenticatedRoute extends PureComponent {
  renderSwitch(props) {
    const { token, component: Component } = this.props;
    if (token) {
      return <Component {...props} />;
    }

    return (
      <Redirect
        to={{
          pathname: 'login',
          state: { from: props.location },
        }}
      />
    );
  }

  render() {
    const { component: Component, token, ...rest } = this.props;
    return (
      <Route
        {...rest}
        render={props => {
          return this.renderSwitch(props);
        }}
      />
    );
  }
}

const mapStateToProps = state => ({
  token: state.auth.token,
});
export default withRouter(connect(mapStateToProps)(AuthenticatedRoute));
