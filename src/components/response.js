import React from 'react';
import PropTypes from 'prop-types';

const Response = ({ rsvp }) => {
  const attending = (
    <React.Fragment>
      Attending: {rsvp.attending ? 'Yes' : 'No'}<br />
      <br />
    </React.Fragment>
  );

  const firstName = rsvp.firstName ? (
    <React.Fragment>
      First Name: {rsvp.firstName}<br />
      <br />
    </React.Fragment>
  ) : null;

  const lastName = rsvp.lastName ? (
    <React.Fragment>
      Last Name: {rsvp.lastName}<br />
      <br />
    </React.Fragment>
  ) : null;

  const email = rsvp.email ? (
    <React.Fragment>
      Email: {rsvp.email}<br />
      <br />
    </React.Fragment>
  ) : null;

  const phone = rsvp.phone ? (
    <React.Fragment>
      Phone: {rsvp.phone}<br />
      <br />
    </React.Fragment>
  ) : null;

  const guest = rsvp.guest ? (
    <React.Fragment>
      Guests:<br />
      {rsvp.guest.map((g, i) => (
        <React.Fragment key={i}>
          {g.firstName} {g.lastName}<br />
        </React.Fragment>
      ))}
      <br />
    </React.Fragment>
  ) : null;

  const note = rsvp.note ? (
    <React.Fragment>
      Note:<br />
      {rsvp.note}<br />
      <br />
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
