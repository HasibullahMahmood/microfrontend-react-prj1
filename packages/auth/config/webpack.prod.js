const { merge } = require('webpack-merge');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const packages = require('../package.json');
const commonConfig = require('./webpack.common');

const prodConfig = {
	mode: 'production',
	output: {
		filename: '[name].[contenthash].js',
		publicPath: '/auth/latest/'
	},
	plugins: [
		new ModuleFederationPlugin({
			name: 'auth',
			filename: 'remoteEntry.js',
			exposes: {
				'./AuthApp': './src/bootstrap.js',
			},
			shared: packages.dependencies,
		}),
	],
};

module.exports = merge(commonConfig, prodConfig);
