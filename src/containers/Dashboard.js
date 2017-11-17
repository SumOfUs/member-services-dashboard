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

  handleSearch(event) {
    event.preventDefault();
    const token = this.props.token;
    console.log("TOKEN?", token);
    const request = new Request('https://7c6m72mh4k.execute-api.us-east-1.amazonaws.com/omar/foo/bar', {
    	headers: new Headers({
    		'Authorization': token
    	})
    });

    fetch(request)
      .then( resp => resp.json() )
      .then( json => console.log(json) )
      .catch( err => console.log(err) );
  }

  render() {
    return (
      <div className="Dashboard">
        <div className="lander">
          <SearchForm {...this.state.email} handleSubmit={this.handleSearch.bind(this)}/>
        </div>
      </div>
    );
  }
}
