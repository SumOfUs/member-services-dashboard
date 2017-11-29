import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Gravatar from 'react-gravatar';
import { Hero } from 'reactbulma';
import Logo from '../components/Logo/Logo';
import { logout } from '../redux/auth';
import './Header.css';

export class Header extends PureComponent {
  render() {
    return (
      <header className="Header hero">
        <Hero.Head>
          <nav id="navbar" className="navbar has-shadow">
            <div className="navbar-brand">
              <Link to="/" className="navbar-item">
                <Logo />
              </Link>
            </div>
            <div className="navbar-menu navbar-end">
              <div className="navbar-item has-dropdown is-hoverable">
                <a className="navbar-link">
                  <Gravatar email={this.props.email} size={32} />
                </a>
                <div className="navbar-dropdown is-right">
                  <a className="navbar-item" onClick={this.props.logout}>
                    Logout
                  </a>
                </div>
              </div>
            </div>
          </nav>
        </Hero.Head>
      </header>
    );
  }
}

export default connect(
  state => ({
    email: state.auth.user.email,
  }),
  dispatch => ({
    logout: () => dispatch(logout()),
  })
)(Header);
