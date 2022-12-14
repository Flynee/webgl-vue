import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

window.$bus = require('event-emitter')();

Vue.config.productionTip = false

window.$vm = new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
