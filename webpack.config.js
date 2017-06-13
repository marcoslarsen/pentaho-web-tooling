const path = require("path");
const webpack = require("webpack");

const HtmlWebpackPlugin = require("html-webpack-plugin");
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const WEBJARS_PATH = path.join(__dirname, "impl/target/dependency/META-INF/resources/webjars");
const ENTRY_PATH = path.join(__dirname, "impl/src/main/resources/web");
const OUTPUT_PATH = path.join(__dirname, "impl/src/main/javascript/web");

module.exports = {
  entry: {
    app: ENTRY_PATH + '/app.jsx'
  },

  output: {
    path: OUTPUT_PATH,
    filename: "[name].js"
  },

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        loader: "babel-loader",
        options: {
          presets: ["es2015", "react"]
        }
      },
      {
        test: /\.scss$/,
        exclude: /(node_modules|bower_components)/,
        loader: ExtractTextPlugin.extract({
          fallbackLoader: 'style-loader',
          loader: 'css-loader!sass-loader'
        })
      }
    ]
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: ENTRY_PATH + '/index.html'  // generate index.html
    }),
    new ExtractTextPlugin('styles.css'),    // extract the css
    new CleanWebpackPlugin([
      OUTPUT_PATH
    ], { dry: true, "watch": true })
  ],

  devServer: {
    contentBase: OUTPUT_PATH,
    compress: true,
    port: 9000,
    proxy: {
      "*": "http://localhost:9051"
    }
  },

  target: "web",

  resolve: {
    modules: ["node_modules", ENTRY_PATH, WEBJARS_PATH],
    alias: {
      'react': 'react/15.5.4/dist/react.js',
      'react-dom': 'react-dom/15.5.4/dist/react-dom.js'
    }
  }

};
