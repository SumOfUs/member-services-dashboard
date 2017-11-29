import React, { PureComponent } from 'react';

export default class LoadingScreen extends PureComponent {
  render() {
    return (
      <div className="LoadingScreen hero is-dark is-bold is-fullheight">
        <div className="hero-body is-size-1 has-text-centered">
          <div className="container">Loading...</div>
        </div>
      </div>
    );
  }
}
