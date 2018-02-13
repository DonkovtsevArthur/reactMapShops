const rabbit = require('amqplib');
const logger = require('pino')();
const circular = require('circular-json');
const {
  DEFAULT_EXPIRES,
  HOLD_QUEUE,
  HOLD_EXCHANGE,
  ROUTING_KEY,
  ACTIVE_EXCHANGE,
} = require('../constants');

const host = process.env.RABBIT_HOST;
const username = process.env.RABBIT_USER;
const password = process.env.RABBIT_PASSWORD;
const expires = process.env.RABBIT_EXPIRES || DEFAULT_EXPIRES;

class BugHolder {
  constructor(message) {
    this.message = {
      method: message.method,
      url: message.path,
      headers: message.headers,
      payload: message.payload,
      credentials: message.auth.credentials,
    };
  }
  async send() {
    try {
      this.connection = await rabbit.connect(`amqp://${username}:${password}@${host}`);
      const ch = await this.connection.createChannel();
      await ch.assertExchange(HOLD_EXCHANGE, 'fanout');
      await ch.assertQueue(HOLD_QUEUE, {
        messageTtl: expires,
        deadLetterExchange: ACTIVE_EXCHANGE,
      });
      await ch.bindQueue(HOLD_QUEUE, HOLD_EXCHANGE, ROUTING_KEY);
      const sendMessage = circular.stringify(this.message);
      await ch.publish(HOLD_EXCHANGE, ROUTING_KEY, new Buffer(sendMessage));
      ch.close();
    } catch (error) {
      logger.error('Error Send Message to Rabbit ---->', error);
    }
  }
}

module.exports = BugHolder;
