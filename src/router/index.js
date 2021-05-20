import Vue from 'vue'
import Router from 'vue-router'
import store from '../store'
import axios from 'axios';


// Importación de cada componente
import Inicio from '@/components/Inicio'
import Login from '@/components/Login'
import Registro from '@/components/Registro'
import ConfirmaRegistro from '@/components/ConfirmaRegistro'
import RegeneraClave from '@/components/RegeneraClave'
import RegeneraClaveConfirma from '@/components/RegeneraClaveConfirma'
import DetallePago from '@/components/DetallePago'
import Reg from '@/components/Reg'
import Admin from '@/components/Admin'
import Forbidden from '@/components/Forbidden'
import HistorialPedidos from '@/components/HistorialPedidos'
import AdministracionCompras from '@/components/AdministracionCompras';

Vue.use(Router);

const routes = [
  {
    path: '/ui/regenera-clave-confirma',
    name: 'regenera-clave-confirma',
    component: RegeneraClaveConfirma
  },
  {
    path: '/ui/forbidden',
    name: 'forbidden',
    component: Forbidden
  },  {
    path: '/ui/detalle-pago',
    name: 'detalle-pago',
    component: DetallePago
  },
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
    path: '/ui/compras',
    name: 'compras',
    component: HistorialPedidos
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
    component: Registro,
  },
  {
    path: '/ui/admin',
    name: 'admin',
    component: Admin,
    meta: { allowedRoles: ['admin'] }
  },
  {
    path: '/ui/confirma-registro',
    name: 'confirma-registro',
    component: ConfirmaRegistro
  },
  {
    path: '/ui/reg',
    name: 'reg',
    component: Reg
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
  },
  {
    path: '/ui/admin-compras',
    name: 'AdministracionCompras',
    component: AdministracionCompras
  },

]

const router = new Router({
  mode: 'history',
  scrollBehavior: () => ({ y: 0 }),
  routes
})
/*
function parseJwt (token) {
  var base64Url = token.split('.')[1];
  var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));
  return JSON.parse(jsonPayload);
}

function checaJwt (dato, active) {
  if(active && dato && dato!==undefined && dato.length>0) {
    console.log(dato);
    const jwtPayload = parseJwt(dato);
    //console.log(jwtPayload);
    if (jwtPayload.exp < Date.now()/1000) {
      store.commit('setSession', {
        name: 'gusy',
        signed:true,
        jwt: jwtPayload.exp
      });
      store.commit('setDestination', '/ui/upload');
    } else {
      //const timeToExpire =  jwtPayload.exp - (Date.now()/1000);
    }
  }
}
*/
router.beforeEach((to, from, next) => {
  axios.defaults.headers.common = {"X-CSRFToken": store.state.session.jwt};
  //checaJwt(store.state.session.jwt, true);
  if (to.matched.some(record => record.meta.allowedRoles )) { // *** El recurso SI requiere autenticación ya que pide ciertos roles
    // NO estás autenticado actualmente:
    if (store.state.session.jwt==='') { 
      store.commit('setDestination', to.fullPath);
      router.push("/ui/login");
      return;
    }
    // SI estoy autenticado actualmente, asi que solo voy a checar si mi rol es el adecuado:
    if(to.matched.some(ok => !ok.meta.allowedRoles.includes(store.state.session.roles[0].nombre))) {
      router.push('/ui/forbidden'); // no tengo el rol asociado a esa interfaz
      return;
    }
  }
  next(); // *** El recurso NO requiere autenticación
})


export default router;
