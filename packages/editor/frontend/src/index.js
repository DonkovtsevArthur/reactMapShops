// require('dotenv').config()
require('babel-core/register')
require('babel-polyfill')
const server = require('./server.js')
const pino = require('pino')()

server({
	port: process.env.PORT
})
	.then(newServer => {
		newServer.start(err => {
			if (err) throw err
			pino.info('Server running at:', newServer.info.uri)
		})
	})
	.catch(error => {
		pino.error('Ошибка запуска сервера')
		throw new Error(error)
	})
