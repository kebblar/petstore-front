/**/
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// import Toast from "vue-toastification";
// import "vue-toastification/dist/index.css";

import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"

const app = createApp(App);

app
.use(store)
.use(router)
.mount('#app')

/**/

/** /
import { createApp } from "vue";
import App from "./App.vue";
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";

import router from './router'
import store from './store'

import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"

Vue.config.productionTip = false;

Vue.use(Toast);
Vue.use(store)
Vue.use(router)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

/**/