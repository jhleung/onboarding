const webpack = require('webpack');
const path = require('path')

module.exports = {
  entry: './src/js/main.js',
  output: {
    path: __dirname + '/dist',
    filename: 'bundle.js'
  },
	devServer: {
		inline: true,
		hot: true,
		port: 9000,
		contentBase: "./src",
	},
	target: 'node'
};
