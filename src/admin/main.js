import Vue from 'vue'
import Admin from './Admin.vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import store from '../store.js'

Vue.use(ElementUI);

new Vue({
  el: '#app',
  store,
  render: h => h(Admin)
})
