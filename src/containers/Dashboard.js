import React, { Component } from 'react';
import SearchForm from '../components/SearchForm';
import SearchResults from '../components/SearchResults';
import './Dashboard.css';
import config from '../config';

export default class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searching: false,
      email: '',
      results: [],
    };
  }

  handleSearch(event) {
    event.preventDefault();
    const token = this.props.token;
    const opts = {
      mode: 'cors',
      method: 'GET',
      headers: new Headers({
        Authorization: token,
        Accept: 'application/json',
      }),
    };

    const email = document.getElementById('email').value;
    if (!email) return;
    this.setState(
      prev => ({ ...prev, searching: true }),
      () => {
        fetch(`${config.api.API_URL}/members?email=${email}`, opts)
          .then(resp => resp.json())
          .then(json => {
            this.setState(prevState => {
              return { ...prevState, results: json.objects };
            });
          })
          .catch(err => console.debug('Whoops!', err))
          .then(() => this.setState(prev => ({ ...prev, searching: false })));
      }
    );
  }

  render() {
    return (
      <div className="Dashboard">
        <div className="lander">
          <SearchForm
            {...this.state.email}
            handleSubmit={this.handleSearch.bind(this)}
          />
          <div className="Dashboard-results">
            {this.state.searching && 'Searching...'}
            {!this.state.searching &&
              this.state.results.length > 0 && (
                <SearchResults results={this.state.results} />
              )}
          </div>
        </div>
      </div>
    );
  }
}
