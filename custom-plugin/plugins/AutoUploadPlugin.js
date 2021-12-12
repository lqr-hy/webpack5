const { NodeSSH } = require('node-ssh')
const { validate } = require('schema-utils')
const schema = require('./AutoUploadPlugin-schema.json')

class AutoUploadPlugin {
  constructor(options) {
    this.ssh = new NodeSSH()
    this.options = options
    validate(schema, this.options, {
      name: 'autoUploadPlugin'
    })
  }

  apply(compiler) {
    compiler.hooks.afterEmit.tapAsync(
      'AutoUploadPlugin',
      async (compilation, callback) => {
        // console.log('上传服务器')
        // 获取目录生成的位置
        const outputPath = compilation.outputOptions.path

        // 连接服务器
        await this.connectServer()

        // 删除原来目录的内容
        const serverDir = this.options.serverDir
        await this.ssh.execCommand(`rm -rf ${serverDir}/*`)

        // 上传当前文件到服务器的文件夹位置
        await this.uploadFiles(outputPath, serverDir)

        // 关闭连接
        this.ssh.dispose()
        callback()
      }
    )
  }

  async connectServer() {
    await this.ssh.connect({
      host: this.options.host,
      username: this.options.username,
      password: this.options.password
    })
    console.log('连接成功~')
  }

  async uploadFiles(localPath, remotePath) {
    const status = await this.ssh.putDirectory(localPath, remotePath, {
      recursive: true, // 递归
      concurrency: 10 // 并发
    })
    console.log('上传：', status ? '成功' : '失败')
  }
}

module.exports = AutoUploadPlugin
