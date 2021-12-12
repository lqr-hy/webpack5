import { add } from './utils/sum.js'
// const { add } = require('./utils/sum')

const a = 'hello rollup'

const sum = (a, b) => {
  console.log(a + b)
}

console.log(add(2, 3))

export { sum, a }
