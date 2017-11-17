import React, { Component } from "react";
import { Nav, NavItem } from "react-bootstrap";
import { authUser, signOutUser } from "./libs/awsLib";
import Routes from "./Routes";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isAuthenticated: false,
      user: null
    };
  }

  async componentDidMount() {
    try {
      const token = await authUser()
      if (token) {
        this.setState({ token: token });
        this.userHasAuthenticated(true);
      }
    }
    catch(e) {
      alert(e);
    }
  }

  userHasAuthenticated = authenticated => {
    this.setState({ isAuthenticated: authenticated });
  }

  handleLogout = event => {
    signOutUser();
    this.userHasAuthenticated(false);
  }

  render() {
    return (
      <div className="App container">
        <Nav pullRight>
          {this.state.isAuthenticated
            ? <NavItem onClick={this.handleLogout}>Logout</NavItem> : ''
          }
        </Nav>
        <Routes
          isAuthenticated={this.state.isAuthenticated}
          userHasAuthenticated={this.userHasAuthenticated}
          token={this.state.token}
        />
      </div>
    );
  }
}

export default App;
