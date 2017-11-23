import React, { Component } from 'react';
import { authUser, signOutUser } from './libs/awsLib';
import Routes from './Routes';
import Header from './containers/Header';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isAuthenticated: false,
      user: null,
    };
  }

  async componentDidMount() {
    try {
      const token = await authUser();
      if (token) {
        this.setState({ token: token });
        this.userHasAuthenticated(true);
      }
    } catch (e) {
      alert(e);
    }
  }

  userHasAuthenticated = authenticated => {
    this.setState({ isAuthenticated: authenticated });
  };

  handleLogout = event => {
    signOutUser();
    this.userHasAuthenticated(false);
  };

  render() {
    const { isAuthenticated, token } = this.state;
    return (
      <div className="App">
        <Header />
        <Routes
          isAuthenticated={isAuthenticated}
          userHasAuthenticated={this.userHasAuthenticated}
          token={token}
        />
      </div>
    );
  }
}

export default App;
