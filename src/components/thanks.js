import React from 'react';
import PropTypes from 'prop-types';

const Thanks = ({ attending }) => {
  if (attending) {
    return (
      <React.Fragment>
        Thank you for responding to our wedding invitation.<br />
        <br />
        We look forward to seeing you on October 20th!<br />
        <br />
        Thank you,<br />
        Jeremy & Amanda<br />
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
