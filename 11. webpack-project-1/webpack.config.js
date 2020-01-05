const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	entry: './src/index.js',
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				use: ['babel-loader'],
			},
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: ['babel-loader', 'eslint-loader'],
			},
			{
				test: /\.scss/,
				exclude: /node_modules/,
				loader: ExtractTextPlugin.extract({ fallback: 'style-loader', use: 'css-loader!sass-loader' }),
			},
		],
	},
	resolve: {
		extensions: ['*', '.js', '.jsx'],
	},
	output: {
		path: `${__dirname}/dist`, // to where it store in local folder
		publicPath: '/',  //`${__dirname}/dist` // to where it load file when server is on
		filename: 'bundle.js',
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		new ExtractTextPlugin('style.css'),
		new HtmlWebpackPlugin({
			template: "./src/index.html", // file that will be open first
      filename: "index.html"
		}),
	],
	devServer: {
		contentBase: './dist',
		hot: true,
	},
};