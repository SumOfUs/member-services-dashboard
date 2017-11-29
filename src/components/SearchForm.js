import React from 'react';
import classnames from 'classnames';
import isEmail from 'validator/lib/isEmail';
import './SearchForm.css';

export default props => {
  const { loading, email } = props;
  const buttonClass = classnames('button is-block is-large is-info', {
    'is-loading': loading,
  });
  return (
    <div className="SearchForm">
      <form onSubmit={props.handleSubmit} className="form">
        <div className="field">
          <div className="control">
            <input
              className="input"
              id="email"
              type="email"
              autoFocus
              value={email}
              placeholder="Search by Email"
              onChange={props.handleChange}
            />
          </div>
        </div>
        <div className="field is-grouped">
          <button
            disabled={!isEmail(email)}
            className={buttonClass}
            type="submit"
          >
            Search
          </button>
        </div>
      </form>
    </div>
  );
};
