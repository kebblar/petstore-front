import Vue from 'vue'
import axios from 'axios'
import router from './router'
import VModal from 'vue-js-modal'
import VueToast from 'vue-toast-notification'

import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap-vue/dist/bootstrap-vue.css"
import 'vue-toast-notification/dist/theme-sugar.css';
import App from './App'
import VueAnalytics from 'vue-analytics';

Vue.use(VModal, BootstrapVue, IconsPlugin, VueToast)
Vue.use(VueAnalytics, {
  id: 'UA-213360206-1',
  router
});

axios.defaults.baseURL = process.env.VUE_APP_URL

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
