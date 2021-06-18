<template>
    <div>

        <div class="barra">
          <div class="row">
              <div class="col-sm-7">
                <img src="./assets/logo.png" width="50px;"/> <label style="font-size:32px;">The Petstore App</label>

              </div>
              <div class="col-sm-2"></div>
              <div class="col" style="text-align: right;">
                <div v-if="logged">
                <div class="row">
                  <div class="col my-auto" align="right">
                    <Carrito :ruta="ruta" :cantidad="cantidad"></Carrito>
                  </div>
                  <div class="col my-auto">
                    <div class="btn-group divider">
                      <a
                          class="dropdown-toggle verde"
                          id="opcionesUsuario"
                          data-toggle="dropdown"
                          aria-haspopup="true"
                          aria-expanded="false">
                        {{ nombre }}
                      </a>
                      <div class="dropdown-menu">
                        <a class="dropdown-item" href="#" @click="navega('/ui/cambia-clave')" >Cambiar clave</a>
                        <a class="dropdown-item" href="#" @click="navega('/ui/cambia-datos-personales')">Cambiar datos personales</a>
                        <a class="dropdown-item" href="#" @click="navega('/ui/compras')">Mis compras</a>
                        <a class="dropdown-item" href="#" @click="navega('/ui/mis-direcciones')">Mis direcciones</a>
                        <a class="dropdown-item" href="#" @click="navega('/ui/mis-metodos-pago')">Mis métodos de pago</a>
                        <div class="dropdown-divider" v-if="admin" ></div>
                        <a v-if="admin" class="dropdown-item dropdown-toggle"  id="navbarDropdownMenuLink"  data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                         Catalogos        
                        </a>
                        <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                          <a class="dropdown-item" href="#" @click="navega('/ui/consulta-pais')" >Paises</a>
                          <a class="dropdown-item" href="#" @click="navega('/ui/consulta-estado')" >Estados</a>
                          <a class="dropdown-item" href="#" @click="navega('/ui/consulta-municipio')" >Municipios</a>
                          <a class="dropdown-item" href="#" @click="navega('/ui/consulta-estatus-anuncio')" >Estatus Anuncio</a>
                          <a class="dropdown-item" href="#" @click="navega('/ui/consulta-tipos-medias')" >Tipos Media</a>
                          <a class="dropdown-item" href="#" @click="navega('/ui/consulta-atributos')" >Atributos</a>
                          <a class="dropdown-item" href="#" @click="navega('/ui/consulta-categorias')" >Categorias</a>
                        </div>
                         <div class="dropdown-divider"></div>
                        <a class="dropdown-item" href="#" @click="logout">Salir</a>
                      </div>
                    </div>
                  </div>
                  <div class="col">
                    <input @click="logout" type="button" class="btn btn-warning" value="Salir" />
                  </div>
                  <div class="col-sm-1"></div>
                </div>

                </div>

                <div v-else>
                  <input @click="navega('/ui/registro')" type="button" class="btn btn-success" value="Registrarse" />
                  &nbsp;
                  <input @click="navega('/ui/login')" type="button" class="btn btn-info" value="Ingresar" />
                </div>
              </div>
          </div>

        </div>

        <div class="top">
          <img id="image" src="./assets/pajaro_01.png" width="50%" />
        </div>

        <div class="buscador">
          <label>Bienvenido</label>
          <div class="row">
              <div class="col-sm-9">
              <input 
                  type="text" 
                  class="form-control" 
                  placeholder="palabras de búsqueda" 
                  value="" />
              </div>
              <div class="col-sm4">
              <input type="button" class="btn btn-success" value="Buscar" />
              </div>
          </div>
        </div>
    </div>
</template>


<script>
import router from './router'
import store from './store'
import Carrito from './components/Carrito'

export default {
    components: {
      Carrito
    },
    computed: {
      logged: function() {
        return store.state.session.jwt && store.state.session.jwt.length>10; 
      },
      nombre: function() {
        return store.state.session.nombreCompleto; 
      },
      cantidad: function() {
        return store.state.session.carrito.length;
      }, 
      admin: function() {
           return store.state.session.jwt && store.state.session.jwt.length>10
         && store.state.session.roles[0].nombre.includes('admin');
      }
    },
    data() {
      return {
        ruta : window.location.pathname
      }
    },
    methods: {
      logout: function() {
        store.commit('setSession', {
            nombreCompleto: '',
            roles:          [],
            correo:         '',
            ultimoAcceso:   '',
            idUser:         0,
            jwt:            '',
            carrito :      []
        });
        this.navega('/');
      },
      navega: function(url) {
        router.push(url).catch(()=>{});
      },

    }
}
</script>

<style>
.top {
  text-align: right;
  background-color: #006600;
}
.top img {
  margin-right: 10%;
}
.buscador {
  width: 300px;
  min-width: 300px;
  text-align: left;
  margin-top: -140px;
  margin-left: 10%;
  z-index: 10;
}
.buscador label {
  color: #ffff;
  font-size: 28px;
}
.barra {
  margin: 10px;
}
.divider {
  padding-right: 20px;
}
.verde {
  color:green;
}
.verde:hover {
  color:green;
}

img {
  object-fit: cover;
}
</style>
