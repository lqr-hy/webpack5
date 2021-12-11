const { transform } = require('@babel/core')
const { getOptions } = require('loader-utils')

module.exports = function (content) {
  // 异步loader
  const callBack = this.async()

  // 获取参数
  const options = getOptions(this)

  // 对代码进行转化
  transform(content, options, (err, result) => {
    if (err) {
      callBack(err)
    } else {
      callBack(null, result.code)
    }
  })
}
