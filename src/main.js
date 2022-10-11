// from: https://router.vuejs.org/guide/#javascript
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";

import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"

const app = createApp(App);

app
.use(Toast)
.use(store)
.use(router)
.mount('#app')
