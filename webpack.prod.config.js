const path = require('path')
const webpack = require('webpack')
const TerserPlugin = require('terser-webpack-plugin');
const copyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
 mode: 'production',
  entry: [
    './src/index.ts'
  ],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: "main.js"
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: {
          loader: "ts-loader"
        }
      }
    ]
  },
  resolve: {
    extensions: [ '.tsx', '.ts', '.js' ]
  },
  plugins: [
    new copyWebpackPlugin({
      patterns: [
        { from: "static" }
      ],
      options: {
        concurrency: 100
      }
    }),
    new webpack.ProvidePlugin({
      PIXI: 'pixi.js'
    })
  ],
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin()]
  }
};
