import { add } from './utils/sum.js'
// const { add } = require('./utils/sum')
import _ from 'lodash'

const a = 'hello rollup'

const sum = (a, b) => {
  console.log(a + b)
}
console.log(_.join([1,2,3]))
console.log(add(2, 3))

export { sum, a }
