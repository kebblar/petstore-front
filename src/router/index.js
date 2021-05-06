import Vue from 'vue'
import Router from 'vue-router'

// Importación de cada componente
import Inicio from '@/components/Inicio'
import Login from '@/components/Login'
import Registro from '@/components/Registro'
import RegeneraClave from '@/components/RegeneraClave'
import RegeneraClaveConfirma from '@/components/RegeneraClaveConfirma'
import Reg from '@/components/Reg'
import DetallePago from '@/components/DetallePago'

Vue.use(Router);

const routes = [
  {
    path: '/',
    name: 'inicio',
    component: Inicio
  },
  {
    path: '/ui/detalle-pago',
    name: 'detalle-pago',
    component: DetallePago
  },
  {
    path: '/ui/reg',
    name: 'reg',
    component:  Reg
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
  },
  {
    path: '/ui/regenera-clave-confirma',
    name: 'regenera-clave-confirma',
    component: RegeneraClaveConfirma
  }
]

const router = new Router({
  mode: 'history',
  scrollBehavior: () => ({ y: 0 }),
  routes
})

export default router
