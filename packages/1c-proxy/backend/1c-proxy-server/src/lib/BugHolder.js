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

// const host = process.env.RABBIT_HOST;
// const username = process.env.RABBIT_USER;
// const password = process.env.RABBIT_PASSWORD;
// const expires = process.env.RABBIT_EXPIRES || DEFAULT_EXPIRES;

class BugHolder {
  constructor(options) {
    const { username, password, host, expires } = options;
    this.username = username;
    this.password = password;
    this.host = host;
    this.expires = expires;
    // this.message = {
    //   method: message.method,
    //   url: message.path,
    //   headers: message.headers,
    //   payload: message.payload,
    //   credentials: message.auth.credentials,
    // };
  }
  async connect() {
    try {
      this.connection =
        await rabbit
          .connect(`amqp://${this.username}:${this.password}@${this.host}`);
      this.chanel = await this.connection.createChannel();
    } catch (error) {
      logger.error(error);
    }
  }
  async send(message) {
    try {
      await this.chanel.assertExchange(HOLD_EXCHANGE, 'fanout');
      await this.chanel.assertQueue(HOLD_QUEUE, {
        messageTtl: this.expires,
        deadLetterExchange: ACTIVE_EXCHANGE,
      });
      await this.chanel.bindQueue(HOLD_QUEUE, HOLD_EXCHANGE, ROUTING_KEY);
      const sendMessage = circular.stringify(message);
      await this.chanel.publish(HOLD_EXCHANGE, ROUTING_KEY, new Buffer(sendMessage));
    } catch (error) {
      logger.error('Error Send Message to Rabbit ---->', error);
    }
  }
  async prepare() {

  }
  close() {
    return this.chanel.close();
  }
}

module.exports = BugHolder;
