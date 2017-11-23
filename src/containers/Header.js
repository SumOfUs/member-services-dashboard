import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../components/Logo/Logo';
import Gravatar from 'react-gravatar';
import { Hero } from 'reactbulma';

export default class Header extends PureComponent {
  render() {
    return (
      <header className="hero">
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
                  <Gravatar email="vincent@sumofus.org" size={32} />
                </a>
                <div className="navbar-dropdown is-right">
                  <a className="navbar-item">Logout</a>
                </div>
              </div>
            </div>
          </nav>
        </Hero.Head>
      </header>
    );
  }
}
