const ROUTING_KEY = 'error';
const HOLD_EXCHANGE = 'hold_request';
const ACTIVE_EXCHANGE = 'active_request';
const HOLD_QUEUE = 'hold_queue';
const ACTIVE_QUEUE = 'active_queue';
const DEFAULT_EXPIRES = 120000;
const TTL = 240000;

module.exports = {
  ROUTING_KEY,
  HOLD_EXCHANGE,
  ACTIVE_EXCHANGE,
  HOLD_QUEUE,
  ACTIVE_QUEUE,
  DEFAULT_EXPIRES,
  TTL
};
