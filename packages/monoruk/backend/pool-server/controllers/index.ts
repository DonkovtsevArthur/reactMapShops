import * as Boom from 'boom';
import * as Logger from 'pino';

const logger = Logger();

export async function get(payload, response, model) {
  try {
    const pool = await model.find();
    response(null, pool);
  } catch (error) {
    response(Boom.badImplementation());
    logger.error(error);
  }
}

export async function add(payload, response, model) {
  try {
    const name = payload.name;
    const type = payload.type;
    const column = await model.findOne({ name });
    if (column) {
      throw new Error('Колонка уже существует');
    }
    await model.create({ name, type });
    response(null, { status: 'ok' });
  } catch (error) {
    response(Boom.badImplementation());
    logger.error(error);
  }
}
