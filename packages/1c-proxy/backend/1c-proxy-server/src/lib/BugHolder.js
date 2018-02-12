const rabbit = require('amqplib');
const logger = require('pino')();
const {
  DEFAULT_EXPIRES,
  HOLD_QUEUE,
  HOLD_EXCHANGE,
  ROUTING_KEY,
  ACTIVE_EXCHANGE,
  ACTIVE_QUEUE,
  TTL
} = require('../constants');

const host = process.env.RABBIT_HOST;
const username = process.env.RABBIT_USER;
const password = process.env.RABBIT_PASSWORD;
const port = process.env.RABBIT_PORT;
const expires = process.env.RABBIT_EXPIRES || DEFAULT_EXPIRES;

class BugHolder {
  constructor(message) {
    this.message = message;
  }
  async send() {
    try {
      this.connection = await rabbit.connect(`amqp://${host}`);
      const ch = await this.connection.createChannel();
      await ch.assertExchange(HOLD_EXCHANGE, 'fanout');
      await ch.assertQueue(HOLD_QUEUE, {
        expires,
        deadLetterExchange: ACTIVE_EXCHANGE,
        deadLetterRoutingKey: ROUTING_KEY,
        messageTtl: TTL,
        autoDelete: false,
        durable: true
      });
      ch.bindQueue(HOLD_QUEUE, HOLD_EXCHANGE, ROUTING_KEY);
      const sendMessage = {
        headers: this.message.headers,
        payload: this.message.payload
      };
      await ch.publish(HOLD_EXCHANGE, ROUTING_KEY, new Buffer(JSON.stringify(sendMessage)));
      logger.info('----------------------------------> Message Send!');
    } catch (error) {
      logger.error('Error Send Message to Rabbit ---->', error);
    }
  }
}

module.exports = BugHolder;
