import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { authUser } from './libs/awsLib';
import { rehydrate } from './redux/auth';

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

  render() {
    if (this.state.loading) {
      return <LoadingScreen />;
    }
    return (
      <BrowserRouter>
        <div className="App">
          <Switch>
            <Route path="/login" exact component={Login} />
            <AuthenticatedRoute exact path="/" component={MemberSearch} />
            <AuthenticatedRoute path="/member/:id" component={MemberProfile} />
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
