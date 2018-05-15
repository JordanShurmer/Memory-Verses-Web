import Vue from 'vue'
import Admin from './Admin.vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import Firebase from './firebase-plugin.js'

Vue.use(ElementUI);
Vue.use(Firebase);

new Vue({
  el: '#app',
  render: h => h(App)
})
