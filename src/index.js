#!/usr/bin/env node
import util from 'util';
import amqp from 'amqplib';
import nodemailer from 'nodemailer';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import Response from './components/response';
import Thanks from './components/thanks';

const setTimeoutPromise = util.promisify(setTimeout);
const transporter = nodemailer.createTransport(process.env.MAILER_URL);
const site = process.env.SITE_EMAIL;
const bride = process.env.BRIDE_EMAIL;
const groom = process.env.GROOM_EMAIL;

const connect = () => (
  amqp.connect(process.env.MESSENGER_ADAPTER_DSN)
    .then((conn) => {
      console.log('Connected');
      return conn;
    })
    .catch((error) => {
      console.error(error.message);
      console.log('Retrying in 10 seconds...');
      return setTimeoutPromise(10000).then(() => connect());
    })
);

const handleMessage = (message) => {
  const rsvp = JSON.parse(message.content.toString());
  return Promise.all([
    transporter.sendMail({
      from: site,
      to: [bride, groom],
      replyTo: {
        name: `${rsvp.firstName} ${rsvp.lastName}`,
        address: rsvp.email,
      },
      subject: `Wedding RSVP (${rsvp.id})`,
      html: ReactDOMServer.renderToStaticNodeStream(<Response rsvp={rsvp} />),
    }),
    transporter.sendMail({
      from: site,
      to: {
        name: `${rsvp.firstName} ${rsvp.lastName}`,
        address: rsvp.email,
      },
      replyTo: bride,
      subject: rsvp.attending ? 'Invitation Accepted' : 'Invitation Declined',
      html: ReactDOMServer.renderToStaticNodeStream(<Thanks attending={rsvp.attending} />),
    }),
  ]).then(() => message);
};

connect()
  .then(conn => conn.createChannel())
  .then(ch => (
    Promise.all([
      ch.assertQueue('mailer', { durable: true }),
      ch.assertExchange('rsvp', 'fanout'),
      ch.bindQueue('mailer', 'rsvp'),
      ch.prefetch(1),
      ch.consume('mailer', message => (
        handleMessage(message)
          .then((msg) => {
            ch.ack(msg);
          })
          .catch((error) => {
            console.error(error);
            // Just acknowledge the message so we don't get in an infinite loop.
            // Right now it's posisble for one of the messages to fail, but other
            // to sucseed. Maybe we should listen to two different queues?
            // @TODO Gracefully handle a failure.
            ch.ack(message);
          })
      ), { noAck: false }),
    ])
  ));
