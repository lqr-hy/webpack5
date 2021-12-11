import Vue from 'vue'
import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import App from './App.vue'
import './index.css'

new Vue({
  render: (h) => h(App)
}).$mount('#app')

class Root extends Component {
  render() {
    return <div>hello react</div>
  }
}

ReactDOM.render(<Root />, document.getElementById('root'))
