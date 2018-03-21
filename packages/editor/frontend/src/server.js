const Hapi = require('hapi')
const Inert = require('inert')
const pino = require('pino')()
const settings = require('./tpl/settings')

module.exports = function createServer(config) {
	return new Promise(resolve => {
		const server = new Hapi.Server({ debug: { request: ['*'] } })

		server.connection({ port: config.port })

		server.register(Inert, () => {
			server.route({
				method: 'GET',
				path: '/css/{param*}',
				handler: {
					directory: {
						path: './public/css',
						redirectToSlash: true,
						index: true
					}
				}
			})

			server.route({
				method: 'GET',
				path: '/js/{param*}',
				handler: {
					directory: {
						path: './public/js',
						redirectToSlash: true,
						index: true
					}
				}
			})

			server.route({
				method: 'GET',
				path: '/img/{param*}',
				handler: {
					directory: {
						path: './public/img',
						redirectToSlash: true,
						index: true
					}
				}
			})

			server.route({
				method: 'GET',
				path: '/font/{param*}',
				handler: {
					directory: {
						path: './public/font',
						redirectToSlash: true,
						index: true
					}
				}
			})

			server.route({
				method: 'GET',
				path: '/settings/{param*}',
				handler: (response, reply) => {
					reply(settings())
				}
			})

			server.route({
				method: ['POST', 'GET', 'PUT'],
				path: '/{p*}',
				handler: (request, reply) => {
					pino.info(request.method, request.url.path, '404')
					reply().code(404)
					return null
				}
			})

			resolve(server)
		})
	})
}
