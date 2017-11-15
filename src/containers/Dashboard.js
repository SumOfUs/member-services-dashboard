import React, { Component } from "react";
import SearchForm from '../components/SearchForm';
import "./Dashboard.css";

export default class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
    };
  }

  render() {
    return (
      <div className="Dashboard">
        <div className="lander">
          <SearchForm {...this.state.email} />
        </div>
      </div>
    );
  }
}
