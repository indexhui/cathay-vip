'use strict';

const Path = require('path');
const Webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const ExtractSASS = new ExtractTextPlugin('styles/bundle.css');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const glob = require('glob');
const autoprefixer = require('autoprefixer');

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
      publicPath: options.isProduction ? './' : '/',
      filename: 'bundle.js'
    },
    plugins: [
      new Webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify(options.isProduction ? 'production' : 'development')
        }
      }),
      new CopyWebpackPlugin([
        { from: './src/scripts', to: 'scripts' },
        { from: './src/images', to: 'images' },
      ])
    ].concat(glob.sync('./src/views/**/*.hbs', {
      ignore: [
        './src/views/partials/**',
        './src/views/*/components/**'
      ]
    }).map(template => {
        const filename = template.replace('./src/views/', '').replace('hbs', 'html');
        return new HtmlWebpackPlugin({
          filename,
          template,
        });
      })
    ),
    module: {
      loaders: [{
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel',
        query: {
          presets: ['es2015', 'stage-2']
        }
      }, {
        test: /\.hbs$/,
        loader: 'handlebars-loader'
      }, {
        test: /\.(jpg|png|git|eot|svg|ttf|woff|woff2|otf)$/,
        loader: 'file-loader?name=[path][name].[ext]?[hash]'
      }]
    },
    postcss: [ autoprefixer({ browsers: ['last 2 versions'] }) ]
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
      test: /\.css$/i,
      loader: ExtractSASS.extract(['css'])
    }, {
      test: /\.scss$/i,
      loader: ExtractSASS.extract(['css', 'sass'])
    });

  } else {
    webpackConfig.plugins.push(
      new Webpack.HotModuleReplacementPlugin()
    );

    webpackConfig.module.loaders.push({
      test: /\.css$/i,
      loaders: ['style', 'css']
    }, {
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
};
