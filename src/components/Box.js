import React from 'react';
import classnames from 'classnames';
export default function Box(props) {
  return (
    <div className={classnames('box', props.className || '')}>
      {props.children}
    </div>
  );
}
