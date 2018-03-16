import * as Hapi from 'hapi';
import * as Joi from 'joi';
import { test } from '../controllers';

const routes: Hapi.ServerRoute[] = [
  {
    method: 'POST',
    path: '/file',
    handler: test,
    options: {
      payload: {
        output: 'stream',
        parse: false
      }
    }
  }
];

export default routes;
