import React, { Component } from 'react';
import { connect } from 'react-redux';
import map from 'lodash/map';
import values from 'lodash/values';
import SearchForm from '../components/SearchForm';
import MemberCard from '../components/MemberCard';
import Header from './Header';
import { updateMembers, resetMembers } from '../redux/members';
import ApiService from '../libs/api-service';

import './MemberSearch.css';

export class MemberSearch extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searching: false,
      email: '',
    };

    this.api = new ApiService({});
  }

  componentWillReceiveProps(newProps = {}) {
    this.api = new ApiService({ token: newProps.token || this.props.token });
  }

  handleChange = event => {
    this.setState({ email: event.target.value });
  };

  handleSearch = event => {
    event.preventDefault();
    if (!this.state.email) return;
    this.props.resetMembers();
    this.setState(state => ({ ...state, searching: true }));
    this.api
      .findMemberByEmail(this.state.email)
      .then(members => this.props.updateMembers(members))
      .catch(err => console.debug('Whoops!', err))
      .then(() => this.setState(prev => ({ ...prev, searching: false })));
  };

  render() {
    return (
      <section className="MemberSearch">
        <Header />
        <section className="section">
          <section className="columns is-centered">
            <div className="column is-8-tablet is-6-desktop">
              <h1 className="MemberSearch-title is-size-2 has-text-centered">
                Member search
              </h1>
              <SearchForm
                email={this.state.email}
                handleChange={this.handleChange}
                handleSubmit={this.handleSearch}
              />
            </div>
          </section>
          <section className="Dashboard-results columns is-centered">
            <div className="column is-8-tablet is-6-desktop">
              {this.state.searching && (
                <p className="is-loading has-text-centered">Searching...</p>
              )}
              {map(this.props.members, member => {
                console.log('rendering member:', member);
                return <MemberCard key={member.id} member={member} />;
              })}
            </div>
          </section>
        </section>
      </section>
    );
  }
}

const mapStateToProps = state => ({
  token: `Bearer ${state.auth.token}`,
  members: values(state.members),
});

const mapDispatchToProps = dispatch => ({
  updateMembers: members => dispatch(updateMembers(members)),
  resetMembers: () => dispatch(resetMembers()),
});

export default connect(mapStateToProps, mapDispatchToProps)(MemberSearch);
