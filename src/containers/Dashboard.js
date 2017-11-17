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
    const opts = {
      mode: 'cors',
      method: 'GET',
    	headers: new Headers({
    		'Authorization': token,
        'Accept': 'application/json'
    	})
    };

    fetch('https://7c6m72mh4k.execute-api.us-east-1.amazonaws.com/omar/foo/bar', opts)
      .then( resp => resp.json() )
      .then( json => alert(json.message) )
      .catch( err => alert('Whoops!', err) );
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
