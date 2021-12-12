// 支持commonjs 到处 es module 导入
import commonJs from '@rollup/plugin-commonjs'
// 打包依赖在node_modules里面的文件 默认不打包
import { nodeResolve } from '@rollup/plugin-node-resolve'
// 转换js代码
import { babel } from '@rollup/plugin-babel'
// 压缩代码
import { terser } from 'rollup-plugin-terser'
// 启动服务
import serve from 'rollup-plugin-serve'
// 实时编译
import livereload from 'rollup-plugin-livereload'

const isProduction = process.env.NODE_ENV === 'production'
const plugins = [
  commonJs(),
  nodeResolve(),
  babel({ babelHelpers: 'bundled' }),
]

const devPlugins = [
  serve({
    open: true,
    port: 8080,
    contentBase: '.'
  }),
  livereload()
]

if (isProduction) {
  plugins.push(terser())
} else {
  plugins.push(...devPlugins)
}

export default {
  input: './src/main.js',
  output: [
    {
      format: 'umd', // commonJs amd es
      name: 'lqrUtils',
      file: 'dist/lqr.umd.js',
      globals: {
        lodash: '_'
      }
    }
  ],
  external: ['lodash'],
  plugins
}
