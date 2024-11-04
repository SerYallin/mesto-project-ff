const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const outputDir = path.resolve(__dirname, 'dist');

module.exports = (env, args) => (
  {
    entry: {
      main: './src/scripts/index.js'
    },
    output: {
      path: outputDir,
      filename: 'main.js',
      publicPath: ''
    },
    mode: args.mode || 'development',
    devServer: {
      static: outputDir,
      compress: true,
      port: 8000,
      liveReload: true,
      open: true
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          use: 'babel-loader',
          exclude: /node_modules/
        },
        {
          test: /\.(png|svg|jpg|gif|woff(2)?|eot|ttf|otf)$/,
          type: 'asset/resource',
          generator: {
            filename: 'img/[name][ext]',
          },
        },
        {
          test: /\.css$/,
          use: [MiniCssExtractPlugin.loader, {
            loader: 'css-loader',
            options: { importLoaders: 1 }
          },
            'postcss-loader'
          ]
        }
      ]
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './src/index.html',
      }),
      new CleanWebpackPlugin(),
      new MiniCssExtractPlugin()
    ]
  }
)