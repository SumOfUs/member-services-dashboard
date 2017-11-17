import React from 'react';
import "./SearchForm.css";
import { Button, FormGroup, FormControl } from "react-bootstrap";

export default (props) => (
  <div className="SearchForm">
    <form onSubmit={props.handleSubmit}>
      <FormGroup controlId="email" bsSize="large">
        <FormControl
          autoFocus
          type="email"
          value={props.email}
          placeholder="Search by Email"
          onChange={props.handleChange}
        />
      </FormGroup>
      <Button
        block
        bsSize="large"
        type="submit"
      >
        Search
      </Button>
    </form>
  </div>
);
