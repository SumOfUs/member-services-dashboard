import React from 'react';

export default props => (
  <div>
    <div className="form-group">
      <label htmlFor="email">Email</label>
      <input
        id="email"
        autoFocus
        type="email"
        value={props.email}
        onChange={props.handleChange}
      />
    </div>

    <div className="form-group">
      <label htmlFor="password">Password</label>
      <input
        id="password"
        value={props.password}
        onChange={props.handleChange}
        type="password"
      />
    </div>
    <button className="button is-primary is-large" type="submit">
      Login
    </button>
  </div>
);
