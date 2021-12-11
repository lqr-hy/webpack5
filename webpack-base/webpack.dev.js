const path = require('path')

const VueLoaderPlugin = require('vue-loader/lib/plugin')

// react HMR 
const ReactRefreshPlugin = require('@pmmmwh/react-refresh-webpack-plugin')

const { merge } = require('webpack-merge')
const Config = require('./webpack.config.js')

const developmentConfig = {
  mode: 'development',
  devtool: 'source-map',
  devServer: {
    hot: true,
    open: true
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1
              //  选项允许你配置在 css-loader 之前有多少 loader 应用于 @imported 资源与 CSS 模块/less 导入。
              // 0 => no loaders (default);
              // 1 => postcss-loader;
              // 2 => postcss-loader, less-loader
            }
          },
          'postcss-loader'
        ]
      },
      {
        test: /\.less$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2
            }
          },
          'postcss-loader',
          'less-loader'
        ]
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    new ReactRefreshPlugin()
  ]
}

module.exports = merge(developmentConfig, Config)
