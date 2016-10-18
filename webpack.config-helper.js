'use strict';

const Path = require('path')
const Webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const ExtractSASS = new ExtractTextPlugin('styles/bundle.css');
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = (options) => {

  let webpackConfig = {
    devtool: options.devtool,
    entry: [
      `webpack-dev-server/client?http://localhost:${options.port}`,
      'webpack/hot/dev-server',
      './src/index'
    ],
    output: {
      path: Path.join(__dirname, 'dist'),
      filename: 'bundle.js'
    },
    plugins: [
      new Webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify(options.isProduction ? 'production' : 'development')
        }
      }),
      new HtmlWebpackPlugin({
        filename: 'index.html',
        template: './src/views/index.hbs'
      }),
      new HtmlWebpackPlugin({
        filename: 'login/index.html',
        template: './src/views/login.hbs'
      }),
      new HtmlWebpackPlugin({
        filename: 'reward/index.html',
        template: './src/views/reward/index.hbs'
      }),
      new HtmlWebpackPlugin({
        filename: 'reward/hotel/index.html',
        template: './src/views/reward/hotel/index.hbs'
      }),
      new HtmlWebpackPlugin({
        filename: 'reward/hotel/step1.html',
        template: './src/views/reward/hotel/step1.hbs'
      }),
      new HtmlWebpackPlugin({
        filename: 'reward/hotel/step2.html',
        template: './src/views/reward/hotel/step2.hbs'
      }),
      new HtmlWebpackPlugin({
        filename: 'reward/hotel/step3.html',
        template: './src/views/reward/hotel/step3.hbs'
      }),
      new HtmlWebpackPlugin({
        filename: 'reward/hotel/step4.html',
        template: './src/views/reward/hotel/step4.hbs'
      }),
      new HtmlWebpackPlugin({
        filename: 'reward/hotel/step5.html',
        template: './src/views/reward/hotel/step5.hbs'
      }),
      new CopyWebpackPlugin([
        { from: './src/scripts', to: 'scripts' },
        { from: './src/images', to: 'images' },
      ])
    ],
    module: {
      loaders: [{
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel',
        query: {
          presets: ['es2015']
        }
      }, {
        test: /\.hbs$/,
        loader: 'handlebars-loader'
      }, {
        test: /\.(jpg|png|git|eot|svg|ttf|woff|woff2)$/,
        loader: 'file-loader?name=[path][name].[ext]?[hash]'
      }]
    }
  };

  if (options.isProduction) {
    webpackConfig.entry = ['./src/index'];

    webpackConfig.plugins.push(
      new Webpack.optimize.OccurenceOrderPlugin(),
      new Webpack.optimize.UglifyJsPlugin({
        compressor: {
          warnings: false
        }
      }),
      ExtractSASS
    );

    webpackConfig.module.loaders.push({
      test: /\.scss$/i,
      loader: ExtractSASS.extract(['css', 'sass'])
    });

  } else {
    webpackConfig.plugins.push(
      new Webpack.HotModuleReplacementPlugin()
    );

    webpackConfig.module.loaders.push({
      test: /\.scss$/i,
      loaders: ['style', 'css', 'sass']
    }, {
      test: /\.js$/,
      loader: 'eslint',
      exclude: /node_modules/
    });

    webpackConfig.devServer = {
      contentBase: './dist',
      hot: true,
      port: options.port,
      inline: true,
      progress: true
    };
  }

  return webpackConfig;

}