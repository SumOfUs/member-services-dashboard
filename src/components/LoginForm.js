import React from "react";
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";

export default (props) => (
  <div>
    <FormGroup controlId="email" bsSize="large">
      <ControlLabel>Email</ControlLabel>
      <FormControl
        autoFocus
        type="email"
        value={props.email}
        onChange={props.handleChange}
      />
    </FormGroup>
    <FormGroup controlId="password" bsSize="large">
      <ControlLabel>Password</ControlLabel>
      <FormControl
        value={props.password}
        onChange={props.handleChange}
        type="password"
      />
    </FormGroup>
    <Button
      block
      bsSize="large"
      type="submit"
    >
      Login
    </Button>
  </div>
)
