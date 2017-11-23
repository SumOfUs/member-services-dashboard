import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import format from 'date-fns/format';
import './SearchResults.css';

export default class SearchResults extends PureComponent {
  render() {
    console.log('rendering...', this.props);
    return (
      <div className="SearchResults">
        <table>
          <thead>
            <tr>
              <td>First name</td>
              <td>Last name</td>
              <td>Email</td>
              <td>Subscription Status</td>
              <td>Member since</td>
            </tr>
          </thead>
          <tbody>
            {this.props.results.map(member => (
              <tr className="SearchResult" border="1" key={member.id}>
                <td>{member.first_name}</td>
                <td>{member.last_name}</td>
                <td>{member.email}</td>
                <td>{member.subscription_status}</td>
                <td>{format(member.created_at, 'DD/MM/YYYY')}</td>
                <td>
                  <Link to={`/members/${member.id}`}>{member.email}</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}
