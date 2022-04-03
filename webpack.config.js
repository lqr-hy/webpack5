const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { DefinePlugin } = require('webpack')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const { VueLoaderPlugin } = require('vue-loader/dist/index')

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true // 清除输出目录文件
  },
  devServer: {
    hot: true
  },
  resolve: {
    extensions: ['.js', '.json', '.vue', '.ts', '.tsx'],
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader'],
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'sass-loader',
            options: {
              // `dart-sass` 是首选
              implementation: require('sass'),
            },
          },
        ],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset',
        parser: {
          dataUrlCondition: { // 限制打包base64文件大小
            maxSize: 70 * 1024 // 4kb
          }
        },
        generator: {
          filename: 'static/[hash:6][ext][query]'
        }
      },
      {
        test: /\.j?tsx?$/i,
        use: ['babel-loader']
      },
      {
        test: /\.vue$/,
        use: 'vue-loader'
      }
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'vue',
      template: './public/index.html'
    }),
    new MiniCssExtractPlugin({ // 将css单独打包
      filename: 'css/[name]_[contenthash:8].css'
    }),
    new DefinePlugin({
      BASE_URL: '"./"'
    }),
    new CopyWebpackPlugin({ //  文件拷贝
      patterns: [
        {
          from: "public",
          globOptions: {
            ignore: ['**/index.html']
          }
        }
      ]
    }),
    new VueLoaderPlugin()
  ],
  // performance: {
  //   maxAssetSize: 1000000, // 设置图片大小
  // }
};  