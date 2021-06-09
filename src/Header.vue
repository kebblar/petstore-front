<template>
    <div>

        <div class="barra">
          <div class="row">
              <div class="col-sm-6">
                <img src="./assets/logo.png" width="50px;"/> <label style="font-size:32px;">The Petstore App</label>
              </div>

              <div class="col-sm-6" style="text-align: right;">
                <div v-if="logged">

                  <a href="#" class="mr-4" data-toggle="modal" data-target="#kartModal" @click="getKart">
                      <i class="fas fa-shopping-cart fa-lg"></i>
                  </a>

                  <!--          Modal-->
                  <div class="modal fade" id="kartModal" tabindex="-1" role="dialog">
                    <div class="modal-dialog modal-lg modal-dialog-centered" role="document">
                      <div class="modal-content">
                        <div class="modal-header mb-2 bg-light">
                          <h5 class="modal-title ml-4" id="kart" >
                            <b>Mi carrito de compras</b>
                          </h5>
                          <button type="button" class="close mr-2" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                          </button>
                        </div>

                        <div class="modal-body mx-2">
                          <div class="row ">
                            <table class="table mx-4">
                              <thead>
                              <tr align="center">
                                <th></th>
                                <th scope="col" >Mascota</th>
                                <th scope="col">Precio</th>
                                <th scope="col">Quitar</th>
                              </tr>
                              </thead>
                              <tr v-for="mascota in shoppingKart" :key="mascota.idAnuncio" align="center" >
                                <td class="w-25 tamanoImg">
                                  <img :src=mascota.urlImagen class="mw-100 img-thumbnail" style="max-height: 80px;" height="auto" width="60%">
                                </td>
                                <td style="padding: 3% 0;">{{mascota.titulo}}</td>
                                <td style="padding: 3% 0;" >${{mascota.precio}}</td>
                                <td style="padding: 3% 0;"><button type="button" class="btn btn-danger btn-sm px-2 py-0" @click="deleteElement(mascota.idCarrito)">x</button> </td>
                              </tr>
                              <tr align="center">
                                <th></th><th></th>
                                <th>Subtotal: </th>
                                <th align="left"> $ {{total}}</th>
                              </tr>

                            </table>
                          </div>
                        </div>
                        <div class="modal-footer border-top-0 d-flex justify-content-between px-5">
                            <button type="button" class="btn btn-warning" data-dismiss="modal">Cerrar</button>
                            <button type="button" class="btn btn-success" @click="navega('/ui/detalle-pago')" data-dismiss="modal">Proceder al pago</button>
                          </div>
                      </div>
                    </div>
                  </div>

<!--                  <div class="modal fade" id="seguro" tabindex="-1" role="dialog" style="border-color: black; border-width: 2px">-->
<!--                    <div class="modal-dialog modal-sm modal-dialog-centered" role="document">-->
<!--                      <div class="modal-content">-->
<!--                        <div class="modal-body" align="center">-->
<!--                          <b>Seguro que desea eliminar el artiículo?</b>-->
<!--                        </div>-->
<!--                        <div class="modal-footer">-->
<!--                          <button type="button" class="btn btn-danger btn-sm">Sí</button>-->
<!--                          <button type="button" class="btn btn-warning btn-sm" data-dismiss="modal">No</button>-->
<!--                        </div>-->
<!--                      </div>-->
<!--                    </div>-->
<!--                  </div>-->

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
                      <a class="dropdown-item" href="#" @click="navega('/ui/mis-compras')">Mis compras</a>
                      <a class="dropdown-item" href="#" @click="navega('/ui/mis-direcciones')">Mis direcciones</a>
                      <a class="dropdown-item" href="#" @click="navega('/ui/mis-metodos-pago')">Mis métodos de pago</a>
                      <div class="dropdown-divider"></div>
                      <a class="dropdown-item" href="#" @click="logout">Salir</a>
                    </div>
                  </div>

                  <input @click="logout" type="button" class="btn btn-warning" value="Salir" />
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
import axios from 'axios';

export default {
    computed: {
      logged: function() {
        return store.state.session.jwt && store.state.session.jwt.length>10; 
      },
      nombre: function() {
        return store.state.session.nombreCompleto; 
      }
    },
  data () {
      return{
        shoppingKart : [],
        bicho : require("./assets/bicho3.jpg"),
        total : 0,
        tavo : ''
      }
  },
    methods: {
      logout: function() {
        store.commit('setSession', {
            nombreCompleto: '',
            roles:        [],
            correo:       '',
            ultimoAcceso: '',
            jwt:          ''
        });
        this.navega('/');
      },
      navega: function(url) {
        router.push(url).catch(()=>{});
      },
      getKart() {
        axios.get('/api/carritoVista/'+store.state.session.idUser+'.json', {}).then(response => {
          this.shoppingKart = response.data;
          this.total = this.getTotal(response.data);
        }).catch(e => {
          console.log(e);
        });
      },
      getTotal(obj) {
        console.log(obj);
        var i = 0;
        for (const elem of obj) {
          i = i + elem.precio;
        }
        return i;
      },
      deleteElement(i) {
        axios.delete('/api/carrito/'+i+'.json').then (response => {
          console.log(response);
          this.getKart();
        }).catch(e => {
          console.log(e);
        });
      }
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
