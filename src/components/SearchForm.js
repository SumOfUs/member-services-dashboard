import React from 'react';
import './SearchForm.css';

export default props => (
  <div className="SearchForm">
    <form onSubmit={props.handleSubmit}>
      <div className="form-group">
        <input
          id="email"
          type="email"
          autoFocus
          value={props.email}
          placeholder="Search by Email"
          onChange={props.handleChange}
        />
      </div>
      <button
        className="btn btn-primary btn-large"
        block
        bsSize="large"
        type="submit"
      >
        Search
      </button>
    </form>
  </div>
);
