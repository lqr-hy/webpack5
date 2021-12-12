export default {
  input: './src/main.js',
  output: [
    {
      format: 'umd', // commonJs amd es
      name: 'lqrUtils',
      file: 'dist/lqr.umd.js'
    },
    {
      format: 'cjs', // commonJs
      file: 'dist/lqr.commonjs.js'
    },
    {
      format: 'amd', // define
      file: 'dist/lqr.amd.js'
    },
    {
      format: 'es', // es module
      file: 'dist/lqr.es.js'
    },
    {
      format: 'iife', // 浏览器使用
      name: 'lqrUtils',
      file: 'dist/lqr.browser.js'
    }
  ]
}
