const path = require("path");
const webpack = require("webpack");

const HtmlWebpackPlugin = require("html-webpack-plugin");
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
  entry: {
    app: "./impl/src/main/resources/web/app.jsx"
  },

  output: {
    path: path.join(__dirname, "impl/src/main/javascript/web"),
    filename: "[name].js"
  },

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        loader: "babel-loader",
        options: {
          plugins: ["transform-es2015-modules-amd"],
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
      filename: "index.html",
      template: "./impl/src/main/resources/web/index.html" // generate index.html
    }),
    new ExtractTextPlugin('styles.css'),                   // extract the css
    new CleanWebpackPlugin([
      path.join(__dirname, "impl/src/main/javascript/web")
    ], { dry: true, "watch": true })
  ],

  devServer: {
    contentBase: path.join(__dirname, "impl/src/main/javascript/web"),
    compress: true,
    port: 9000,
    proxy: {
      "/content/webcontext.js": "http://localhost:9051" ,
      "/requirejs-manager/js/require-init.js": "http://localhost:9051"
    }
  },

  target: "web",

  resolve: {
    modules: [
      path.join(__dirname, "impl/src/main/resources/web"),
      "node_modules"
    ]
  }

};
