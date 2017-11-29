import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import Gravatar from 'react-gravatar';
import format from 'date-fns/format';
import SubscriptionStatus from './SubscriptionStatus';
import './MemberCard.css';

export default class MemberCard extends PureComponent {
  render() {
    const { member } = this.props;
    return (
      <div className="MemberCard">
        <Link to={`/member/${member.id}`}>
          <article className="media">
            <figure className="media-left avatar">
              <Gravatar
                className="is-64x64 image"
                email={member.email}
                size={64}
              />
            </figure>
            <div className="media-content">
              <div className="content">
                <p>
                  <strong>
                    {member.first_name} {member.middle_name} {member.last_name}
                  </strong>
                  <br />
                  <small>
                    Joined: {format(member.created_at, 'MMMM, YYYY')}
                  </small>
                </p>
              </div>
            </div>
            <div className="media-right">
              <SubscriptionStatus status={member.subscription_status} />
            </div>
          </article>
        </Link>
      </div>
    );
  }
}
