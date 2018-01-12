import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { authUser } from './libs/awsLib';
import { rehydrate } from './redux/auth';
import { ToastContainer } from 'react-toastify';

import LoadingScreen from './components/LoadingScreen';
import AuthenticatedRoute from './components/AuthenticatedRoute';
import Login from './containers/Login';
import MemberProfile from './containers/MemberProfile';
import MemberSearch from './containers/MemberSearch';

import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      componentError: false,
    };
  }
  async componentDidMount() {
    try {
      const data = await authUser();
      this.props.rehydrate(data);
      this.setState({ loading: false });
    } catch (e) {
      console.error(e);
    }
  }

  componentDidCatch(error, info) {
    this.setState({ componentError: true });
    console.log('App component caught an error', error);
    console.log('Error info:', info);
  }

  render() {
    if (this.state.componentError) {
      return <p>Error</p>;
    }
    if (this.state.loading) {
      return <LoadingScreen />;
    }
    return (
      <BrowserRouter>
        <div className="App">
          <ToastContainer autoClose={4000} />
          <Switch>
            <Route exact={true} path="/login" component={Login} />
            <AuthenticatedRoute
              exact
              path="/"
              component={MemberSearch}
              token={this.props.token}
            />
            <AuthenticatedRoute
              path="/member/:id"
              component={MemberProfile}
              token={this.props.token}
            />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default connect(
  state => ({
    token: state.auth.token,
  }),
  dispatch => ({
    rehydrate: user => dispatch(rehydrate(user)),
  })
)(App);
