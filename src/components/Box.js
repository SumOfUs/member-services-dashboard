import React from 'react';
import classnames from 'classnames';
import './Box.css';
export default function Box(props) {
  return (
    <div className={classnames('Box', props.className || '')}>
      {props.children}
    </div>
  );
}
