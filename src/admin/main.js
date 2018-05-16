import Vue from 'vue'
import Admin from './Admin.vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import store from '../store.js'
import locale from 'element-ui/lib/locale/lang/en'

Vue.use(ElementUI, {locale});

new Vue({
  el: '#app',
  store,
  render: h => h(Admin)
})
