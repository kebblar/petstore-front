import Vue from 'vue'
import Router from 'vue-router'

// Importación de cada componente
import Inicio from '@/components/Inicio'
import Login from '@/components/Login'
import Registro from '@/components/Registro'
import RegeneraClave from '@/components/RegeneraClave'

Vue.use(Router);

const routes = [
  {
    path: '/',
    name: 'inicio',
    component: Inicio
  },
  {
    path: '/ui/login',
    name: 'login',
    component: Login
  },
  {
    path: '/ui/registro',
    name: 'registro',
    component: Registro
  },
  {
    path: '/ui/regenera-clave',
    name: 'regenera-clave',
    component: RegeneraClave
  }
]

const router = new Router({
  mode: 'history',
  scrollBehavior: () => ({ y: 0 }),
  routes
})

export default router
