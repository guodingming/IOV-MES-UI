var path = require('path')
var utils = require('./utils')
var config = require('../config')
var vueLoaderConfig = require('./vue-loader.conf')
var webpack = require('webpack')
var CopyWebpackPlugin = require('copy-webpack-plugin');
function resolve(dir) {
	return path.join(__dirname, '..', dir)
}

module.exports = {
	entry: {
		app: './src/main.js'
	},
	output: {
		path: config.build.assetsRoot,
		filename: '[name].js',
		publicPath: process.env.NODE_ENV === 'production' ?
			config.build.assetsPublicPath :
			config.dev.assetsPublicPath
	},
	resolve: {
		extensions: ['.js', '.vue', '.json'],
		alias: {
			'vue$': 'vue/dist/vue.esm.js',
			'@': resolve('src'),
			'assets': resolve('src/assets'),
			'components': resolve('src/components'),
			'pages': resolve('src/pages')
		}
	},
	plugins: [
		new CopyWebpackPlugin([{
			from: resolve('/src/components/formDesign/plugin/assets'),
			to: resolve('/dist/form')
		}])
	],
	module: {
		rules: [{
				test: /\.vue$/,
				loader: 'vue-loader',
				options: vueLoaderConfig
			},
			{
				test: /\.js$/,
				loader: 'babel-loader',
				include: [resolve('src'), resolve('test')]
			},
			{
				test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
				loader: 'url-loader',
				options: {
					limit: 10000,
					name: utils.assetsPath('img/[name].[hash:7].[ext]')
				}
			},
			{
				test: /\.(woff|eot|ttf|otf|svg)\??.*$/,
				loader: 'url-loader?name=fonts/[name].[md5:hash:hex:7].[ext]'
			},
			{
				test: /\.scss$/,
				loader: 'style!css!sass?sourceMap'
			},
			{
				test: /\.jade$/,
				loader: "jade"
			},
			{
				test: /\.pug$/,
				loader: 'pug'
			}
		]
	}
}