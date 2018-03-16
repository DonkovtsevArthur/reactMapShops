import * as Boom from 'boom';
import * as Hapi from 'hapi';
import * as Pino from 'pino';
import axios from 'axios';
import FileParser from './fileParser';
import config from '../config';

const logger = Pino();

export async function test(request: Hapi.Request, h: Hapi.ResponseToolkit) {
  try {
    const payload = request.payload as NodeJS.ReadWriteStream;
    const headers = request.headers;
    const req = axios.create({
      baseURL: config.MONITOR_API_HOST,
      headers
    });
    const appResponse = await req.get('/userApp/getConfig');
    const appConfig = appResponse.data;
    const types = {};
    appConfig.forEach(group => {
      group.items.forEach(item => {
        types[item.name] = item.type;
      });
    });
    const parser = new FileParser(types);
    const response = new Promise((resolve, reject) => {
      payload.on('end', async () => {
        try {
          await req.post('/data', parser.result);
          return resolve(parser.status);
        } catch (error) {
          logger.error(error.message);
          return reject(Boom.serverUnavailable(error.message));
        }
      });
      payload.on('data', data => {
        const buf = new Buffer(data);
        parser.parse(buf.toString());
      });
      payload.on('error', error => {
        reject(Boom.badImplementation(error));
      });
    });
    return response;
  } catch (error) {
    return Boom.badImplementation(error);
  }
}
