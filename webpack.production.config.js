const path = require('path');
const webpack = require('webpack');

module.exports = {
	devtool: 'eval',
	entry: [
		'./resources/assets/js/index',
	],
	output: {
		path: path.join(__dirname, 'public/js'),
		filename: 'bundle.js'
	},
	plugins: [],
	module: {
		loaders: [{
			test: /\.js$/,
			loaders: ['react-hot', 'babel'],
			include: path.join(__dirname, 'resources/assets/js'),
			exclude: /(node_modules)/
		}]
	}
};
