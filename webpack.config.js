const webpack = require('webpack');
const path = require('path')

module.exports = {
  entry: './src/js/pulltimeline.js',
	output: {
		path: path.join(__dirname, '/src'),
    filename: 'bundle.js'
	},
	devServer: {
		inline: true,
		hot: true,
		port: 9000,
		contentBase: './src'
	},
	module: {
		rules: [
		  	{exclude: path.join(__dirname, '/src/js/main.js')}
		]
	}
}

