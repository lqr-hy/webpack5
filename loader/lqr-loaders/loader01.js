const { getOptions } = require('loader-utils')
const { validate } = require('schema-utils')
const schema = require('../lqr-loaders-schema/loader01-schema.json')

module.exports = function (content, sourcemap, meta) {
  // 获取传入的options
  const options = getOptions(this)
  // 验证options 
  validate(schema, options, {
    name: 'loader01'
  })
  // content 输入的内容
  // let content = String(content)
  console.log(content, /console\.log/.test(content))
  if (/console\.log/.test(content)) {
    content = content.replace(/console\.log/, 'console.error')
  }
  console.log(content)
  return content
}