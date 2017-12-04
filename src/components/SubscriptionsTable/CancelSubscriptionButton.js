import React from 'react';
import classnames from 'classnames';

const CancelSubscriptionButton = ({
  handleClick,
  subscription,
  cancellingSubscriptionId,
}) => {
  const buttonClasses = classnames('button is-danger is-small', {
    'is-loading': subscription.id === cancellingSubscriptionId,
  });

  const buttonDisabled = subscription.id === cancellingSubscriptionId;

  return (
    <button
      className={buttonClasses}
      disabled={buttonDisabled}
      onClick={handleClick.bind(this, subscription)}
    >
      Cancel
    </button>
  );
};

export default CancelSubscriptionButton;
