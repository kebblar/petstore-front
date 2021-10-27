import Vue from 'vue'
import axios from 'axios'
import router from './router'
import VModal from 'vue-js-modal'
import VueToast from 'vue-toast-notification'

import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap-vue/dist/bootstrap-vue.css"

import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import 'vue-toast-notification/dist/theme-sugar.css';
import App from './App'

library.add(fas)
Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.use(VModal, BootstrapVue, IconsPlugin, VueToast)

axios.defaults.baseURL = process.env.VUE_APP_URL

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
