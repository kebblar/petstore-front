import Vue from 'vue'
import Router from 'vue-router'
import store from '../store'

import Inicio from '@/components/Inicio';
import Login from '@/components/Login';
import Forgot from '@/components/Forgot';
import Registro from '@/components/Registro';
import RegistroUsuario from '@/components/RegistroUsuario';
import List from '@/components/List';
import Video from '@/components/Video';
import Upload from '@/components/Upload2';
import Admin from '@/components/Admin';
import User from '@/components/User';
import ConfirmaForgot from '@/components/ConfirmaForgot';
import ConfirmaRegistro from '@/components/ConfirmaRegistro';
import ConfirmaReg from '@/components/ConfirmaReg';
import CambiarClave from '@/components/CambiarClave';
import Forbidden from '@/components/Forbidden';
import PageNotFound from '@/components/PageNotFound';
import Crop from '@/components/Crop';
import CambioClaveOther from '@/components/CambioClaveOther';
import Upload3 from '@/components/Upload3';

Vue.use(Router);

const routes = [
  {
    path: '/',
    name: 'inicio',
    component: Inicio
  },
  {
    path: '/ui/upload3',
    name: 'upload3',
    component: Upload3
  },
  {
    path: '/ui/crop',
    name: 'crop',
    component: Crop
  },
  {
    path: '/ui/forbidden',
    name: 'forbidden',
    component: Forbidden
  },
  {
    path: '/ui/login',
    name: 'login',
    component: Login
  },
  {
    path: '/ui/forgot',
    name: 'forgot',
    component: Forgot
  },
  {
    path: '/ui/confirma-forgot',
    name: 'confirma-forgot',
    component: ConfirmaForgot
  },
  {
    path: '/ui/cambiar-clave',
    name: 'cambiar-clave',
    component: CambiarClave,
    meta: { role: ['admin','user'] }
  },
  {
    path: '/ui/cambiar-other',
    name: 'cambiar-other',
    component: CambioClaveOther,
    meta: { role: ['admin','user'] }
  },
  {
    path: '/ui/confirma-registro',
    name: 'confirma-registro',
    component: ConfirmaRegistro
  },
  {
    path: '/ui/registro',
    name: 'registro',
    component: Registro
  },
  {
    path: '/ui/upload',
    name: 'upload',
    component: Upload
  },
  {
    path: '/ui/list',
    name: 'list',
    component: List,
    meta: { role: ['admin'] }
  },
  {
    path: '/ui/video',
    name: 'video',
    component: Video
  },
  {
    path: '/ui/admin',
    name: 'admin',
    component: Admin,
    meta: { role: ['admin'] }
  },
  {
    path: '/ui/user',
    name: 'user',
    component: User,
    meta: { role: ['user'] }
  },
  {
    path: '/ui/confirma-reg',
    name: 'confirma-reg',
    component: ConfirmaReg
  },
  {
    path: '/ui/registro-usuario',
    name: 'registro-usuario',
    component: RegistroUsuario
  },
  {
    path: "*",
    name: 'pageNotFound',
    component: PageNotFound
  },
]

const router = new Router({
  mode: 'history',
  scrollBehavior: () => ({ y: 0 }),
  routes
})

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
    const jwtPayload = parseJwt(dato);
    //console.log(jwtPayload);
    if (jwtPayload.exp < Date.now()/1000) {
      store.commit('setState', {
        estado: '',
        firmado: false,
        destination: '/ui/upload'
      });
      store.commit('setFirmado', false);
      store.commit('setDestination', '/ui/upload');
    } else {
      //const timeToExpire =  jwtPayload.exp - (Date.now()/1000);
    }
  }
}

router.beforeEach((to, from, next) => {
  checaJwt(store.state.estado.jwt, true);
  if (to.matched.some(record => record.meta.role )) { // El recurso SI requiere autenticación ya que pide ciertos roles
    if (store.state.firmado===false) { // NO estás autenticado actualmente ????
      store.commit('setDestination', to.fullPath);
      router.push("/ui/login");
      return;
    }
    // SI estoy autenticado actualmente, asi que solo voy a checar si mi rol es el adecuado:
    if(to.matched.some(ok => !ok.meta.role.includes(store.state.estado.roles[0].name))) {
      router.push('/ui/forbidden'); // no tengo el rol asociado a esa interfaz
      return;
    }
  }
  next(); // El recurso NO requiere autenticación
})


export default router;
