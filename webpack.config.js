const path = require('path')
const webpack = require('webpack')

module.exports = {
  mode: 'development',
  entry: [
    './src/index.ts'
  ],
  output: {
    path: path.resolve(__dirname, '/dist'),
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
    extensions: ['.tsx', '.ts', '.js']
  },
  devtool: 'inline-source-map',
  devServer: {
    static: './dist',
    port: 8080
  },
  plugins: [
    new webpack.ProvidePlugin({
      PIXI: 'pixi.js'
    })
  ]
};
