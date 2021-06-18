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
import Admin from '@/components/Admin'
import Forbidden from '@/components/Forbidden'
import Upload from '@/components/Upload'
import Upload2 from '@/components/Up2'
import Upload3 from '@/components/Up3'

import CambiaClave from '@/components/CambiaClave'
import CambiaDatosPersonales from '@/components/CambiaDatosPersonales'
import MisCompras from '@/components/MisCompras'
import MisDirecciones from '@/components/MisDirecciones'
import MisMetodosPago from '@/components/MisMetodosPago'
import HistorialPedidos from '@/components/HistorialPedidos'
import AdministracionCompras from '@/components/AdministracionCompras'
import CompraConfirmada from '@/components/CompraConfirmada'

import Pruebas from '@/components/Pruebas'
import DetalleProducto from '@/components/DetalleProducto'
import AdminConsultaAnuncio from '@/components/admin/ConsultaAnuncio'
import AdminAnuncio from '@/components/admin/Anuncio'
import ConsultaAnunciosPublico from '@/components/ConsultaAnunciosPublico'

import ConsultaCategoria from '@/components/ConsultaCategoria'
import ConsultaAtributo from '@/components/ConsultaAtributo'
import ConsultaMediaTipo from '@/components/ConsultaMediaTipo'
import ConsultaEstatusAnuncio from '@/components/ConsultaEstatusAnuncio'

import ConsultaPais from '@/components/ConsultaPais'
import ConsultaEstado from '@/components/ConsultaEstado'
import ConsultaMunicipio from '@/components/ConsultaMunicipio'

import GraficaMontoPorCategoriaContainer from '@/components/GraficaMontoPorCategoriaContainer'

Vue.use(Router);

const routes = [
  {
    path: '/ui/graficas-monto-por-categoria',
    name: 'GraficaMontoPorCategoriaContainer',
    component: GraficaMontoPorCategoriaContainer
  },
  {
    path: '/ui/pba',
    name: 'pba',
    component: Pruebas
  },
  {
    path: '/ui/cambia-datos-personales',
    name: 'cambia-datos-personales',
    component: CambiaDatosPersonales
  },
  {
    path: '/ui/detalle-producto/:idp',
    name: 'detalle',
    component: DetalleProducto,
  },
  {
    path: '/ui/cambia-clave',
    name: 'cambia-clave',
    component: CambiaClave,
    meta: { allowedRoles: ['normal'] }
  },
  {
    path: '/ui/mis-compras',
    name: 'mis-compras',
    component: MisCompras
  },
  {
    path: '/ui/mis-direcciones',
    name: 'mis-direcciones',
    component: MisDirecciones
  },
  {
    path: '/ui/mis-metodos-pago',
    name: 'mis-metodos-pago',
    component: MisMetodosPago
  },
  {
    path: '/ui/compra-confirmada',
    name: 'compra-confirmada',
    component: CompraConfirmada
  },
  {
    path: '/ui/regenera-clave-confirma',
    name: 'regenera-clave-confirma',
    component: RegeneraClaveConfirma
  },
  {
    path: '/ui/upload',
    name: 'upload',
    component: Upload
  },
  {
    path: '/ui/up2',
    name: 'upload2',
    component: Upload2
  },
  {
    path: '/ui/up3',
    name: 'upload3',
    component: Upload3
  },
  {
    path: '/ui/forbidden',
    name: 'forbidden',
    component: Forbidden
  },  {
    path: '/ui/detalle-pago',
    name: 'detalle-pago',
    component: DetallePago,
    meta: { allowedRoles: ['admin','user','normal'] }
  },
  {
    path: '/',
    name: 'inicio',
    component: Inicio
  },
  {
    path: '/ui/compras',
    name: 'HistorialPedidos.vue',
    component: HistorialPedidos,
    meta: { allowedRoles: ['admin','normal'] }
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
    path: '/ui/regenera-clave',
    name: 'regenera-clave',
    component: RegeneraClave
  },
  {
    path: '/ui/admin-anuncio/:id?',
    name: 'anuncio',
    component: AdminAnuncio,
    meta: { allowedRoles: ['admin'] }
  },
  {
    path: '/ui/admin-consulta-anuncio',
    name: 'consulta-anuncio',
    component: AdminConsultaAnuncio,
    meta: { allowedRoles: ['admin'] }
  },
  {
    path: '/ui/consulta-anuncios-publico',
    name: 'consulta-anuncios-publico',
    component: ConsultaAnunciosPublico
  },
  {
    path: '/ui/admin-compras',
    name: 'AdministracionCompras',
    component: AdministracionCompras,
    meta: { allowedRoles: ['admin'] }
  }, 
  {
    path: '/ui/consulta-categorias',
    name: 'consultacategoria',
    component: ConsultaCategoria,
    meta: { allowedRoles: ['admin'] }
  }, 
  {
    path: '/ui/consulta-atributos',
    name: 'consultaatributo',
    component: ConsultaAtributo,
    meta: { allowedRoles: ['admin'] }
  }, 
  {
    path: '/ui/consulta-tipos-medias',
    name: 'consultatipomedia',
    component:ConsultaMediaTipo,
    meta: { allowedRoles: ['admin'] }
  }, 
  {
    path: '/ui/consulta-estatus-anuncio',
    name: 'consultaestatusanuncio',
    component:ConsultaEstatusAnuncio,
    meta: { allowedRoles: ['admin'] }
  }, 
  {
    path: '/ui/consulta-pais',
    name: 'ConsultaPais',
    component:ConsultaPais,
    meta: { allowedRoles: ['admin'] }
  }, 
  {
    path: '/ui/consulta-estado',
    name: 'ConsultaEstado',
    component:ConsultaEstado,
    meta: { allowedRoles: ['admin'] }
  }, 
  {
    path: '/ui/consulta-municipio',
    name: 'ConsultaMunicipio',
    component:ConsultaMunicipio,
    meta: { allowedRoles: ['admin'] }
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

function checaJwt (jwt, active) {
  if(active && jwt && jwt!==undefined && jwt.length>0) {
    console.log(jwt);
    const jwtPayload = parseJwt(jwt);
    //console.log(jwtPayload);
    if (jwtPayload.exp < Date.now()/1000) {
      store.commit('setSession', {
        nombreCompleto: '',
        roles:        [],
        correo:       '',
        ultimoAcceso: '',
        idUser:        0,
        jwt:          '', // jwt: jwtPayload.exp
        carrito: []
      });
      store.commit('setDestination', '/');
    } else {
      //const timeToExpire =  jwtPayload.exp - (Date.now()/1000);
    }
  }
}


router.beforeEach((to, from, next) => {
  axios.defaults.headers.common = {"X-CSRFToken": store.state.session.jwt};
  checaJwt(store.state.session.jwt, false);
  

  axios.get('/api/carritoVista/'+store.state.session.idUser+'.json', {}).then(response => {
    store.commit('setCarrito', response.data);
    console.log(response.data);
  }).catch(e => {
    console.log(e);
  });

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
