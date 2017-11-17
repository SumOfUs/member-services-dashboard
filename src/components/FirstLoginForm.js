import React from "react";
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";

export default (props) => (
  <div>
    <FormGroup controlId="password" bsSize="large">
      <ControlLabel>Almost there. You just need to change your password...</ControlLabel>
      <FormControl
        placeholder="Please change your password"
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
      Change
    </Button>
  </div>
)
