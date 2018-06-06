const Hapi = require('hapi')
const Inert = require('inert')
const path = require('path')
const prefix = '/admin/'
const distPath = './dist'
const assetsPath = 'assets'

const server = new Hapi.Server({
	port: process.env.PORT || 5000,
	routes: {
		cors: true
	}
})

server.route([
	{
		method: 'GET',
		path: prefix + `${assetsPath}/{param*}`,
		options: {
			cache: {
				expiresIn: 1209600, //2 недели: 60 * 60 * 24 * 7 * 2
				privacy: 'private'
			},
			handler: ({ params: { param: fileName } }, h) =>
				h.file(path.join(process.cwd(), `${distPath}/${assetsPath}/${fileName}`))
		}
	},
	{
		method: 'GET',
		path: prefix + '{param*}',
		options: {
			cache: {
				expiresIn: 1209600, //2 недели: 60 * 60 * 24 * 7 * 2
				privacy: 'private'
			},
			handler: ({ params: { param: fileName } }, h) => h.file(path.join(process.cwd(), `${distPath}/index.html`))
		}
	}
])

server
	.register([
		{
			plugin: Inert
		}
	])
	.then(() => server.start())
	.then(() => console.log(`Server running at: ${server.info.uri}`))
