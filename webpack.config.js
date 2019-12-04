const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const inProduction = process.env.NODE_ENV !== 'production';

module.exports = {
  mode: 'production',
  entry: './src/lattespirit.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'lattespirit.js'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
        ]
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      }
    ]
  },
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js'
    }
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'lattespirit.css',
    }),
    new VueLoaderPlugin()
  ]
};
