import React from 'react';
import PropTypes from 'prop-types';
import N from './n';

const Response = ({ rsvp }) => {
  const attending = (
    <React.Fragment>
      Attending: {rsvp.attending ? 'Yes' : 'No'}<N />
      <N />
    </React.Fragment>
  );

  const firstName = rsvp.firstName ? (
    <React.Fragment>
      First Name: {rsvp.firstName}<N />
      <N />
    </React.Fragment>
  ) : null;

  const lastName = rsvp.lastName ? (
    <React.Fragment>
      Last Name: {rsvp.lastName}<N />
      <N />
    </React.Fragment>
  ) : null;

  const email = rsvp.email ? (
    <React.Fragment>
      Email: {rsvp.email}<N />
      <N />
    </React.Fragment>
  ) : null;

  const phone = rsvp.phone ? (
    <React.Fragment>
      Phone: {rsvp.phone}<N />
      <N />
    </React.Fragment>
  ) : null;

  const guest = rsvp.guest ? (
    <React.Fragment>
      Guests:<N />
      {rsvp.guest.map((g, i) => (
        <React.Fragment key={i}>
          {g.firstName} {g.lastName}<N />
        </React.Fragment>
      ))}
      <N />
    </React.Fragment>
  ) : null;

  const note = rsvp.note ? (
    <React.Fragment>
      Note:<N />
      {rsvp.note}<N />
      <N />
    </React.Fragment>
  ) : null;

  return (
    <React.Fragment>
      {attending}
      {firstName}
      {lastName}
      {email}
      {phone}
      {guest}
      {note}
    </React.Fragment>
  );
};

Response.propTypes = {
  rsvp: PropTypes.shape({
    attending: PropTypes.bool,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    email: PropTypes.string,
    phone: PropTypes.string,
    guest: PropTypes.array,
    note: PropTypes.string,
  }).isRequired,
};

export default Response;
