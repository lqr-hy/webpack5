import { createApp } from 'vue'
import Hello from './Hello.vue'
import './a.ts'
import a from './1.jpg'
import b from './2.jpg'
import './index.scss'

const a1 = document.createElement('img')
a1.src = a

const a2 = document.createElement('img')
// a2.src = import (/* webpackChunkName */'./2.jpg')
a2.src = b

document.body.appendChild(a1)
document.body.appendChild(a2)

const app = createApp(Hello)
app.mount('#app')