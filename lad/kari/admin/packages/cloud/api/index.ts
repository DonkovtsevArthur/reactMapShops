import TestServer from './server';

const server = new TestServer(process.env.PORT);

server.init();
server.start();
