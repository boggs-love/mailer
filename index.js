#!/usr/bin/env node
const util = require('util');
const setTimeoutPromise = util.promisify(setTimeout);
const amqp = require('amqplib');

const connect = () => (
  amqp.connect(process.env.MESSENGER_ADAPTER_DSN)
    .then(conn => {
      console.log('Connected');
      return conn;
    })
    .catch(error => {
      console.error(error.message);
      console.log('Retrying in 10 seconds...');
      return setTimeoutPromise(10000).then(() => connect())
    })
)

const handleMessage = async (message) => {
  console.log(JSON.parse(message.content.toString()));
  return message;
};

connect()
  .then(conn => conn.createChannel())
  .then(ch => (
    Promise.all([
      ch.assertQueue('messages', {durable: true}),
      ch.assertExchange('rsvp', 'fanout'),
      ch.bindQueue('messages', 'rsvp'),
      ch.prefetch(1),
      ch.consume('messages', (message) => (
        handleMessage(message)
          .then(message => {
            ch.ack(message)
          })
          .catch(error => {
            console.error(error);
            ch.nack(message)
          })
      ), {noAck: false})
    ])
  ));
