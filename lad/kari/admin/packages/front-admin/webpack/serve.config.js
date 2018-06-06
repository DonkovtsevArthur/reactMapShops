const path = require('path')
const root = path.resolve(__dirname, '../')
const initialPath = require('../src/js/constants.js').initialPath

const config = {
	host: '0.0.0.0',
	port: '8080',
	// content: `${root}/dist`,
	clipboard: false,
	dev: { publicPath: `/admin/` },
	hot: true,
	// http2: true,
	// https: {}
	logLevel: 'info' /*'trace', 'debug', 'info', 'warn', 'error' */,
	open: false,
	// openPage: `${initialPath}?token=123&extraToken=a8gh92`,
	// overlay: true,
	historyApiFallback: true
}

module.exports = config
