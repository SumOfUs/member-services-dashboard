import React, { PureComponent } from 'react';
import config from '../../config';
import './Logo.css';

export default class Logo extends PureComponent {
  render() {
    return (
      <div className="Logo">
        <span className="Logo-title">{config.app_name}</span>
      </div>
    );
  }
}
