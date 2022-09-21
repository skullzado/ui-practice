const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: './src/index.ts',
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Project - Reusable UI',
      filename: 'index.html',
      template: './src/index.html',
      favicon: './src/favicon.ico',
      inject: true,
    }),
    new MiniCssExtractPlugin({
      linkType: 'text/css',
      filename: '[name].css',
    }),
  ],
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.s?css$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
        generator: {
          filename: 'css/[name]-[hash][ext]',
        },
      },
      {
        type: 'asset/resource',
        test: /\.(png|jpe?g|gif|ico)$/i,
        generator: {
          filename: 'media/[name]-[hash][ext]',
        },
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.jsx', '.js'],
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    assetModuleFilename: 'assets/[name]-[hash].[ext]',
    clean: true,
  },
};
