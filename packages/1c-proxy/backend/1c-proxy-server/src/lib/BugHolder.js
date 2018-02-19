const rabbit = require('amqplib');
const logger = require('pino')();

const {
  ACTIVE_QUEUE,
  HOLD_QUEUE,
  HOLD_EXCHANGE,
  ROUTING_KEY,
  ACTIVE_EXCHANGE,
} = require('../constants');

class BugHolder {
  constructor(options) {
    const { username, password, host, expires } = options;
    this.username = username;
    this.password = password;
    this.host = host;
    this.expires = expires;
  }
  async connect() {
    try {
      this.connection =
        await rabbit
          .connect(`amqp://${this.username}:${this.password}@${this.host}`);
      const chanel = await this.connection.createChannel();
       // create hold exchange and queue
      await chanel.assertExchange(HOLD_EXCHANGE, 'fanout');
      await chanel.assertQueue(HOLD_QUEUE, {
        messageTtl: this.expires,
        deadLetterExchange: ACTIVE_EXCHANGE,
      });
      await chanel.bindQueue(HOLD_QUEUE, HOLD_EXCHANGE, ROUTING_KEY);
      // crete active axchange and queue
      await chanel.assertExchange(ACTIVE_EXCHANGE, 'direct');
      await chanel.assertQueue(ACTIVE_QUEUE, { durable: true });
      await chanel.bindQueue(ACTIVE_QUEUE, ACTIVE_EXCHANGE, ROUTING_KEY);
      this.chanel = chanel;
    } catch (error) {
      logger.error(error);
    }
  }
  async send(message) {
    try {
      const normalizeMessage = {
        method: message.method,
        url: message.path,
        headers: message.headers,
        payload: message.payload,
        credentials: message.auth.credentials,
      };
      await this.chanel.publish(
        HOLD_EXCHANGE,
        ROUTING_KEY,
        new Buffer(JSON.stringify(normalizeMessage)));
    } catch (error) {
      logger.error('Error Send Message to Rabbit ---->', error.message);
    }
  }
  consume(queue, server) {
    this.chanel.consume(queue, (message) => {
      const msg = JSON.parse(message.content);
      server.inject(msg);
      this.chanel.ack(message);
    });
  }
  close() {
    return this.chanel.close();
  }
}

module.exports = BugHolder;
