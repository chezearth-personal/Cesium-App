// import { path } from "path";
const path = require("path");
// import { htmlWebpackPlugin } from "html-webpack-plugin";
const htmlWebpackPlugin = require("html-webpack-plugin");
// import { webpack } from "webpack";
const {webpack} = require("webpack");
// import "babel-register";
require("babel-register");

module.exports = {
  entry: {
    index: "./src/index"
  },
  output: {
    path: path.resolve(__dirname, "./app"),
    filename: "[name].pack.js"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          "babel-loader"
        ]
      }
    ]
  },
  resolve: {
    fallback: {
      zlib: require.resolve("browserify-zlib"),
      http: require.resolve("stream-http"),
      https: require.resolve("https-browserify"),
      buffer: require.resolve("buffer/"),
      assert: require.resolve("assert/"),
      stream: require.resolve("stream-browserify")
    }
  },
  plugins: [
    new htmlWebpackPlugin({
      template: "./app/index.html"
    })
  ],
  mode: "development",
  devtool: "inline-source-map",
    devServer: {
      static: {
        directory: path.resolve(__dirname, "./app")
      }
    }
};
