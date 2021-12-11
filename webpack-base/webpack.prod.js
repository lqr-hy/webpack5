const { merge } = require('webpack-merge')
const Config = require('./webpack.config.js')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const TerserPlugin = require("terser-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const PurgeCSSPlugin = require('purgecss-webpack-plugin');
const CompressionPlugin = require("compression-webpack-plugin");
const glob = require('glob');
const path = require('path');

const productionConfig = {
  mode: 'production',
  plugins: [
    new CleanWebpackPlugin(), 
    new MiniCssExtractPlugin({ // css 文件指纹
      filename: 'css/[name]_[contenthash:8].css'
    }),
    new CssMinimizerPlugin(), // css 压缩
    new PurgeCSSPlugin({ // css treeShaking
      paths: glob.sync(`${path.join(__dirname, 'src')}/**/*`,  { nodir: true }),
    }),
    new CompressionPlugin({ // HTTP压缩
      test: /\.(css|js)$/i,
      algorithm: "gzip"
    })
  ],
  output: {
    chunkFilename: '[name].[hash:6].chunk.js', // 路由懒加载文件名
    // publicPath: 'https://lqr.com', // cdn地址
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
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
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2
            }
          },
          'postcss-loader',
          'less-loader'
        ]
      },
    ],
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        parallel: true,
        // 不打包 LICENSE
        extractComments: false
      }),
    ],
    splitChunks: {
      // async 异步代码
      // initial 同步代码
      // 所有
      chunks: 'all'
    },
    runtimeChunk: true
  },
}
module.exports = (env) => {
  // console.log(env)
  process.env.PRODUCTION = 'PRODUCTION' in env
  return merge(productionConfig, Config)
}
