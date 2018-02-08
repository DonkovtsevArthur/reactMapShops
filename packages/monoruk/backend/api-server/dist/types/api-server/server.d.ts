import * as Hapi from 'hapi';
import * as Hemera from 'nats-hemera';
export interface DecoratedRequest extends Hapi.Request {
    hemera(): Hemera;
}
export default class Server {
    private port;
    private options;
    constructor(port: string);
    start(): void;
}
