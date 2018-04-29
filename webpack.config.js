var path = require('path');
var webpack = require('webpack');
var inProduction = (process.env.NODE_ENV === 'production');

module.exports = {
  entry: './src/lattespirit.js',
  output: {
    filename: 'lattespirit.js',
    path: path.resolve(__dirname, 'js')
  },

  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015']
        }
      },

      {
        test: /\.css$/,
        loader: ['style-loader', 'css-loader']
      }
    ]
  },

  plugins: [
      new webpack.ProvidePlugin({
         $: "jquery",
         jQuery: "jquery",
         "window.jQuery": "jquery"
     }),
  ]

};

if (inProduction) {
  module.exports.plugins.push(
      new webpack.optimize.UglifyJsPlugin({
        comments: false
      })
  );
}