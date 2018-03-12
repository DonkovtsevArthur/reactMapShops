// require('dotenv').config();
require('babel-register');
require('./src/server.js')({
  port: process.env.PORT,
});
