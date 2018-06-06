import * as Nats from 'nats';
import * as Hemera from 'nats-hemera';

import { default as Users } from 'ecommerce-users/Client';
import { default as Goods } from 'ecommerce-goods/Client';

const nats = Nats.connect({ url: process.env.NATS_HOST });
const hemera = new Hemera(nats, { logLevel: 'info', timeout: process.env.HEMERA_TIMEOUT });

export const users = new Users(hemera);
export const goods = new Goods(hemera);
