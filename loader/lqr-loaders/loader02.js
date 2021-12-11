// 异步loader
module.exports = function (content, sourcemap, meta) {
  const callBack = this.async()
  setTimeout(() => {
    callBack(null, content)
  })
}