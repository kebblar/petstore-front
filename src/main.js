import Vue from 'vue'
import router from './router'

import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap-vue/dist/bootstrap-vue.css"
import 'vue-toast-notification/dist/theme-sugar.css';
import App from './App'

Vue.use(BootstrapVue, IconsPlugin)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
