import React from 'react';
import PropTypes from 'prop-types';
import N from './n';

const Thanks = ({ attending }) => {
  if (attending) {
    return (
      <React.Fragment>
        Thank you for responding to our wedding invitation.<N />
        <N />
        We look forward to seeing you on October 20th!<N />
        <N />
        Thank you,<N />
        Jeremy & Amanda<N />
      </React.Fragment>
    );
  }

  return (
    <React.Fragment>
      We are sad that you cannot make it. Thank you for your reply.
    </React.Fragment>
  );
};

Thanks.propTypes = {
  attending: PropTypes.bool.isRequired,
};

export default Thanks;
