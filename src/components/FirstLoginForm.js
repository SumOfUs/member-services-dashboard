import React from 'react';

export default props => (
  <div className="container">
    <div className="form-group" controlId="password" bsSize="large">
      <label htmlFor="new-password">
        Almost there. You just need to change your password...
      </label>
      <input
        id="new-password"
        placeholder="Please change your password"
        value={props.password}
        onChange={props.handleChange}
        type="password"
      />
    </div>
    <button className="btn btn-primary" bsSize="large" type="submit">
      Change
    </button>
  </div>
);
