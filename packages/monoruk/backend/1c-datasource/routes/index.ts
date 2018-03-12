import * as Hapi from 'hapi';
import * as Joi from 'joi';

const routes: Hapi.ServerRoute[] = [
  {
    method: 'POST',
    path: '/file',
    handler
  }
];
