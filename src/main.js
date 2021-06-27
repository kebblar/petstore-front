import Vue from 'vue'
import axios from 'axios'
import router from './router'
import VModal from 'vue-js-modal'

import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap-vue/dist/bootstrap-vue.css"
import titleMixin from './titleMixin'

import App from './App'

Vue.use(VModal, BootstrapVue, IconsPlugin)
Vue.mixin(titleMixin)

axios.defaults.baseURL = process.env.VUE_APP_URL

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
