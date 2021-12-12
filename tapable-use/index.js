const {
  SyncHook,
  SyncBailHook,
  SyncLoopHook,
  SyncWaterfallHook,
  AsyncSeriesHook,
  AsyncParallelHook
} = require('tapable')

let counter = 0

class LqrTapAble {
  constructor() {
    this.hook = {
      // 同步hooks
      // syncHook: new SyncHook(['name', 'age'])
      // SyncBailHook: 在某个监听如果有返回值，就不会执行后续的监听事件了
      // syncHook: new SyncBailHook(['name', 'age'])
      // SyncLoopHook: 在某个事件监听函数中，如果返回值为true那么这个函数就会循环执行（返回undefined,就立即停止）
      // syncHook: new SyncLoopHook(['name', 'age'])
      // SyncWaterfallHook： 在某个事件监听函数中，如果有返回值 返回值下一个监听事件的函数第一个参数
      syncHook: new SyncWaterfallHook(['name', 'age']),

      // 异步hooks
      // AsyncSeriesHook：在hooks里面监听多个事件（多个回调），这多个回调属于串行
      // asyncHook: new AsyncSeriesHook(['name', 'age'])
      // AsyncParallelHook: 在hooks里面监听多个事件（多个回调），这多个回调属于并行
      asyncHook: new AsyncParallelHook(['name', 'age'])
    }
    // 同步监听事件
    // this.hook.syncHook.tap('event1', (name, age) => {
    //   // return '123'
    //   // if (counter ++ < 3) {
    //   //   console.log(name, age, 'event1')
    //   //   return true
    //   // }

    //   console.log(name, age, 'event1')
    //   return 'event1'
    // })

    // this.hook.syncHook.tap('event2', (name, age) => {
    //   console.log(name, age, 'event2')
    // })

    // 异步async监听事件
    // this.hook.asyncHook.tapAsync('event1', (name, age, callback) => {
    //   setTimeout(() => {
    //     console.log(name, age)
    //     callback()
    //   }, 2000)
    // })

    // this.hook.asyncHook.tapAsync('event2', (name, age, callback) => {
    //   setTimeout(() => {
    //     console.log(name, age)
    //     callback()
    //   }, 2000)
    // })

    // 异步promise监听事件
    this.hook.asyncHook.tapPromise('event1', (name, age) => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          console.log(name, age, 'event2')
          resolve()
        }, 2000)
      })
    })

    this.hook.asyncHook.tapPromise('event2', (name, age) => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          console.log(name, age, 'event2')
          resolve()
        }, 2000)
      })
    })
  }

  emit() {
    // 同步触发触发事件
    // this.hook.syncHook.call('lqr', '24')

    // 异步async触发事件
    // this.hook.asyncHook.callAsync('lqr', '23', () => {
    //   console.log('执行完了')
    // })

    this.hook.asyncHook.promise('lqr', '23').then(() => {
      console.log('执行完了')
    })
  }
}

const lqr = new LqrTapAble()
lqr.emit()
