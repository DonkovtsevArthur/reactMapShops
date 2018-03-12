require('dotenv').config();

import DataSourceServer from './server';

const server = new DataSourceServer(parseInt(process.env.PORT || '5000', 10));

server.init();
server.start();
