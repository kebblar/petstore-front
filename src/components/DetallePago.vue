<template>
  <div class="ancho centra" align="center">
    <div v-if="loading" class="loader"/>

    <div class="card" style="width:75%;"> <!---->
      <div class="card-header">
        <h4 class="control-label mt-2" align="center">Detalles de la compra</h4>
      </div>
      <div class="card-body align">

        <div class="form-group" align="center">
          <div class="col" style="margin-top: 10px;"><h6 class="text-info" style=" line-height: 155%;">Por favor completa la siguiente información para comenzar a procesar tu compra</h6></div>
        </div>
        <div class="row">
          <div class="col my-2" align="center"><h5><b>Tus artículos</b></h5></div>
        </div>
        <div class="row">
          <div class="col mx-4">
            <table class="table">

              <tr v-for="mascota in shoppingKart" :key="mascota.idAnuncio" align="center" >
                <td class="w-25 tamanoImg">
                  <img :src="mascota.urlImagen" class="mw-100 img-thumbnail" style="max-height: 80px;" height="auto" width="80%">
                </td>
                <td style="padding: 3% 0;">{{mascota.titulo}}</td>
                <td style="padding: 3% 0;" >${{mascota.precio}}</td>
              </tr>
              <tr align="center">
                <th></th>
                <th>Subtotal</th>
                <th>${{total}}</th>
              </tr>

            </table>
          </div>

        </div>

        <div v-show="showDetalles">
        <div class="mt-2"></div>
        <div id="accordion">
              <h5 class="mb-2">
                <button class="shadowing btn btn-link dropdown-toggle btn-block" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                  Paquetería de envío
                </button>
              </h5>

            <div id="collapseOne" class="collapse show" data-parent="#accordion">

              <div class="card-body">
                <div class="row ">
                  <div class="col-sm-1"></div>
                  <div class="col">
                    <div v-for="pa in paqueterias" :key="pa.id">
                      <div class="row" style="margin-bottom: 5px;">
                        <div class="col-sm-1" style="margin-top: 5px;">
                          <input type="radio" v-model="paqSelected" name="paqSelected" :value="pa.id">
                        </div>
                        <div class="col-sm-7">
                          <b style="font-size: 14px;">{{pa.nombre}}</b>
                          <div class="w-100 d-none d-md-block"></div>
                          <p class="shortSpace">{{pa.breveDescripcion}}</p>
                        </div>
                        <div class="col-sm-1"></div>
                        <div class="col text-primary">
                          ${{pa.precio}}
                        </div>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-sm-1"></div>
                      <div class="col"  style="margin-top: 10px;">
                        <a href="#" class="text-primary" data-toggle="modal" data-target="#infoEnvios">Más información sobre envíos y paqueterías</a>
                      </div>

                      <!-- Modal -->
                      <div class="modal fade" id="infoEnvios" role="dialog" tabindex="-1" aria-labelledby="titulo" aria-hidden="true">
                        <div class="modal-dialog modal-dialog-centered" role="document">
                          <div class="modal-content">
                            <div class="modal-header">
                              <h5 class="modal-title" id="titulo">Información de las paqueterías</h5>
                              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                              </button>
                            </div>
                            <div class="modal-body">
                              <ul align="left">
                                <div v-for="pa in paqueterias" :key="pa.id">
                                  <div class="container">
                                    <li><b>{{pa.nombre}}</b>  ${{pa.precio}}<br>
                                      <small>{{pa.breveDescripcion}}</small><br>
                                      <div class="text-primary my-3" style="font-size: 12px;">
                                        {{pa.htmlDescripcion}}
                                      </div>
                                    </li>
                                  </div>
                                </div>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                      <!--end Modal-->
                    </div>
                  </div>
                </div>
              </div>

            </div>


              <h5 class="mb-2">
                <button class="shadowing btn btn-link collapsed dropdown-toggle btn-block" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                  Dirección de envío
                </button>
              </h5>
            <div id="collapseTwo" class="collapse" aria-labelledby="headingTwo" data-parent="#accordion">
              <div class="card-body">
                <div class="row">
                  <div class="col-sm-3">
                    <small class="text-secondary">Enviar a</small>
                  </div>
                  <div class="col">
                    <div v-for="dir in direcciones" :key="dir.id">
                      <div class="row">
                        <div class="col-sm-1" style="margin-top: 5px;">
                          <input type="radio" v-model="dirSelected" name="dirSelected" :value="dir.id">
                        </div>
                        <div class="col">
                          <b style="font-size: 14px;">{{nuevaDireccion.nombre}}</b>
                          <div class="w-100 d-none d-md-block"></div>
                          <p class="shortSpace">{{procesada(dir)}}</p>
                        </div>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-sm-1"></div>
                      <div class="col text-primary">
                        <a href="#" data-toggle="modal" data-target="#nuevaDireccion" @click="cargaDatos()">Añadir una nueva dirección</a>
                      </div>

                      <!-- Modal -->
                      <div class="modal fade" id="nuevaDireccion" role="dialog" tabindex="-1" aria-labelledby="direccionTitulo" aria-hidden="true">
                        <div class="modal-dialog modal-dialog-centered" role="document">
                          <div class="modal-content">
                            <div class="modal-header mt-2">
                              <h5 class="modal-title ml-4" id="direccionTitulo">Añadir nueva dirección</h5>
                              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                              </button>
                            </div>
                            <div class="modal-body">
                              <form class="mx-4">
                                <div class="form-row form-group">
                                  <div class="col-md-8">
                                    <label for="nombre">
                                      Nombre y Apellido
                                    </label>
                                    <input type="text" class="form-control" v-model="nuevaDireccion.nombre">
                                  </div>
                                  <div class="col">
                                    <label for="tipo">Tipo dirección</label>
                                    <select id="inputState" class="form-control" v-model="nuevaDireccion.tipo">
                                      <option :value="tipo.id" v-for="tipo in tipoDirecciones" :key="tipo.id">
                                        {{tipo.nombre}}
                                      </option>
                                    </select>
                                  </div>
                                </div>
                                <div class="form-row form-group">
                                  <div class="col">
                                    <label for="calle">Calle y Número</label>
                                    <input type="text" v-model="nuevaDireccion.calleNumero" class="form-control" placeholder="Calle y Número">
                                  </div>
                                  <div class="col">
                                    <label for="colonia">Colonia</label>
                                    <input type="text" v-model="nuevaDireccion.colonia" class="form-control" placeholder="Colonia">
                                  </div>
                                </div>
                                <div class="form-row form-group">
                                  <div class="col-md-9">
                                    <label for="refs">Referencias</label>
                                    <input type="text" v-model="nuevaDireccion.referencias" class="form-control" placeholder="Entre calles, color de la fachada, etc.">
                                  </div>
                                  <div class="col">
                                    <label for="cp">C.P.</label>
                                    <input maxlength="5" type="tel" v-model="nuevaDireccion.cp" placeholder="00000" class="form-control" oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');"/>
                                  </div>
                                </div>
                                <div class="form-row form-group">
                                  <div class="col-md-4">
                                    <label for="pais">Pais</label>
                                    <select id="inputPais" class="form-control" v-model="nuevaDireccion.idPais" @change="cargaEstados">
                                      <option :value="p.id" v-for="p in paises" :key="p.id">{{ p.nombre }}</option>
                                    </select>
                                  </div>
                                  <div class="col-md-4">
                                    <label for="estado">Estado</label>
                                    <select id="inputEstado" class="form-control" v-model="nuevaDireccion.idEstado" @change="cargaMunicipios">
                                      <option :value="e.id" v-for="e in estados" :key="e.id">{{e.nombre}}</option>
                                    </select>
                                  </div>
                                  <div class="col">
                                    <label for="mun">Municipio</label>
                                    <select id="inputMun" class="form-control" v-model="nuevaDireccion.idMunicipio">
                                      <option :value="m.id" v-for="m in municipios" :key="m.id">{{m.nombre}}</option>
                                    </select>
                                  </div>
                                </div>
                              </form>
                            </div>
                            <div class="modal-footer mr-4">
                              <button type="button" class="btn btn-success" data-dismiss="modal" :disabled="habilitaBoton" @click="guardaDireccion">Aceptar</button>
                              <button type="button" class="btn btn-warning" data-dismiss="modal" @click="reiniciaDatos">Cancelar</button>
                            </div>
                          </div>
                        </div>
                      </div>
                      <!--end Modal-->

                    </div>

                  </div>
                </div>
              </div>
            </div>

        </div>
        </div>

        <div class="container my-4" align="center">
          <button v-show="showDetalles" type="button" :disabled="validaDetalles" class="btn btn-success" @click="invierteVista">Proceder al pago</button>
        </div>

        <div class="row mb-4" v-show="showPagos">
          <div class="col-sm-1"></div>
          <div class="col">
          <div class="card py-0">
            <div class="card-header pb-0 text-center">
              <p>Informacion de envio</p>
            </div>
            <div class="card-body" >
              <b style="font-size: 14px;">Tu pedido sera entregado a</b>
              <p><b class="format">{{dirText}}</b></p>
              <b style="font-size: 14px;">Por medio de</b>
              <p v-html="paqText"></p>
              <div class="container" align="center" v-show="showPagos">
                <button v-show="showPagos" type="button" class="btn btn-warning btn-sm" @click="invierteVista">Editar Detalles</button>
              </div>
            </div>
          </div>
          </div>
          <div class="col-sm-1"></div>
        </div>

        <hr class="dotted" v-show="showDetalles">

        <div class="card-body">
          <div class="row">
            <div class="col-sm-3">
              <small class="text-secondary">Resumen de pedido</small>
            </div>
            <div class="col-sm-1"></div>
            <div class="col">

              <table class="table table-sm table-borderless mb-0">
                <tbody>
                <tr>
                  <td>Mascotas</td>
                  <td class="text-primary" align="right">$ {{total}}</td>
                </tr>
                <tr>
                  <td>Envío</td>
                  <td align="right" class="text-primary">$ {{getPrecioEnvio}}</td>
                </tr>
                </tbody>
              </table>
              <table class="table table-sm mt-1">
                <thead>
                <td>Total</td>
                <td class="text-primary" align="right">$ {{ total + getPrecioEnvio }}</td>
                </thead>
              </table>
            </div>

            <div class="col-sm-1"></div>

          </div>
        </div>
        <hr class="dotted" v-show="showPagos">

        <div class="card-body" v-show="showPagos">

          <div class="row">
            <div class="col-sm-3">
              <small class="text-secondary">Pagar con</small>

            </div>
            </div>
          <div v-show="shoppingKart.length>0" class="row mt-4">
            <div class="col">
              <div class="mx-auto w-100" ref="paypal"></div>
            </div>
          </div>
          <div v-show="shoppingKart.length===0" class="row my-4">
            <div class="col" align="center">
              <p class="text-center text-danger">No puedes continuar porque tu carrito está vacío</p>
            </div>
          </div>
          <div class="row">
            <div class="col">
              <div class="container">
                <button v-show="shoppingKart.length>0" type="button" class="btn btn-block btn-outline-success" @click="getCartera" data-toggle="modal" data-target="#carteraBtc">Bitcoin</button>

                <div class="modal fade" id="carteraBtc" role="dialog" tabindex="-1" aria-labelledby="MyWallet" aria-hidden="true">
                  <div class="modal-dialog modal-dialog-centered" role="document">
                    <div class="modal-content">
                      <div class="modal-header mt-2">
                        <h5 class="modal-title ml-4" id="MyBtcWallet">Mi cartera Bitcoin</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                          <span aria-hidden="true">&times;</span>
                        </button>
                      </div>
                      <div class="modal-body">
                        <div class="card centra" style="width: 400px;">
                          <div class="card-body text-center">
                            <h5>{{cartera}}</h5>
                            <img :src="'data:image/jpeg;base64,'+imagenQR"/>
                          </div>
                          </div>
                        <div class="row my-4 text-center">
                          <div class="col-sm-1"></div>
                          <div class="col">
                            <h5>Transfiere {{precioEnCripto.monto}} BTC a esta dirección y oprime continuar</h5>
                            <small class="text-primary">Cambio 1 BTC = {{precioEnCripto.cambio}} MXN</small><br>
                            <p class="mt-3"><small>Una vez que la transacción aparezca en la blockchain te enviaremos el correo de confirmación y tu compra comenzará a procesarse.</small></p>
                          </div>
                          <div class="col-sm-1"></div>
                          </div>
                        <div class="container my-2" align="center">
                          <button type="button" class="btn btn-primary" data-dismiss="modal" @click="generaBtcOrden">Continuar</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>


</template>

<script>

import axios from 'axios';
import router from '../router'
import store from '../store'

export default {
  name: "DetallePago.vue",

  mounted () {
    this.getDirecciones()
    this.getPaqueterias()
    this.getCarrito()

    const paypal = document.createElement("script");
    paypal.src = "https://www.paypal.com/sdk/js?client-id=ASKLSAfRgs3tG08RNVRpe6DwG0NMuHHsXqEMfIW65vjYyF2-cI8JQW6ylnWA-eBhFgx0hd-VLIp4yPFP&disable-funding=mercadopago&currency=MXN";
    paypal.addEventListener("load", this.setLoaded);
    document.body.appendChild(paypal);
  },

  data(){
    return {

      shoppingKart : [],
      precioEnCripto : { monto: 0.000456,
                         cambio : 764567.0 },

      showDetalles: true,
      showPagos:false,

      anuncio : {id : 2},
      usuario : store.state.session.idUser,
      total: 0,

      paqueterias: [],
      paqSelected: 0,

      direcciones: [],
      dirSelected: 0,

      nuevaDireccion: {
        id : 0,
        idUsuario : store.state.session.idUser,
        nombre : store.state.session.nombreCompleto,
        tipo : 1,
        calleNumero : null,
        colonia : null,
        referencias : null,
        cp : null,
        idPais : 0,
        idEstado : -1,
        idMunicipio : null
      },

      tipoDirecciones: [],
      paises: [],
      estados: [],
      municipios : [],

      dirText : "",
      paqText : "",
      cartera : '',
      imagenQR : [],

      loading : false
    }
  },

  watch: {
    paqSelected(value){
      for(const e of this.paqueterias){
        if(e.id == value){
          this.paqText = '<b><span class="format">'+ e.nombre + '</span></b>' + ' <span style="font-size: 12px;">'+ e.breveDescripcion + '</span>';
        }
      }
    },
    dirSelected(value){
      for(const e of this.direcciones){
        if(e.id == value){
          this.dirText = this.procesada(e);
        }
      }
    }
  },

  methods: {
    getCartera(){
      axios.get('/api/wallet/'+this.usuario+'.json', {}).then(response => {
        this.cartera = response.data;
        this.getQR(response.data);
        this.getMontoBtc();
      }).catch(e => {
        console.log(e);
      });

    },

    setEdoMun() {
      this.nuevaDireccion.idEstado=-1;
      this.nuevaDireccion.idMunicipio=null;
    },

    getMontoBtc(){
      axios.get('/api/monto-btc/'+(this.total + this.getPrecioEnvio)+'.json').then(response => {
        this.precioEnCripto = response.data;
        console.log(response.data);
      }).catch(e => {
        console.log(e);
      });
    },

    getQR(obj){
      axios.get('/api/qr-base64/'+obj).then(response => {
        this.imagenQR = response.data;
      });
    },

    invierteVista() {
      this.showPagos=this.showDetalles;
      this.showDetalles=!this.showDetalles;
    },
    setLoaded: function () {
      window.paypal.Buttons({
        createOrder : (data, actions) => {
          return actions.order.create({
            purchase_units: [
              {
                description: 'Compra en comercio pet store',
                amount: { currency_code: 'MXN', value: this.total + this.getPrecioEnvio}
              }
            ]
          });
        },


        onApprove: async (data, actions) => {
          const order = await actions.order.capture();
          this.data;
          this.submitDomain(order);
          console.log(order);
          router.push({'name':'compra-confirmada'});
        },
        onError: err => {
          this.loading=false;
          console.log(err);
        }
      }).render(this.$refs.paypal);
    },
      generaBtcOrden(){
      let data = {
        id : 0,
        idUsuario : this.usuario,
        idDireccion: this.dirSelected,
        wallet : this.cartera,
        idPaqueteria : this.paqSelected,
        status : false,
        monto : this.precioEnCripto.monto,
        fecha : new Date(),
        descripcion : "Compra por criptomonedas",
        lastBalance : 0
      };
      axios.post('/api/orden.json', data).then(response => {
        this.loading=true;
        console.log(response);
        router.push({'name':'compra-confirmada'});
      }).catch(e => {
        this.loading=false;
        console.log(e);
      })
    },
    submitDomain(order){
      let data = {
                  idUsuario : this.usuario,
                  idDireccion : this.dirSelected,
                  idPaqueteria : this.paqSelected,
                  idMetodoPago : 1,
                  idMoneda : 1,
                  cveOrdenCompra: order.id,
                  fecha : order.update_time,
                  estadoEnvio : false,
                  total : this.total + this.getPrecioEnvio,
                  descripcion : "Compra en el pet store",
                  recibo : ""
                  };
      console.log(data);
      axios.post('/api/procesa-orden.json', data).then(response => {
        console.log(response);
      }).catch(e => {
        console.log(e.response.data);
      });
    },

    guardaDireccion() {
      axios.post('/api/nueva-direccion.json', this.nuevaDireccion).then(response => {
        console.log("post enviado");
        console.log(response.data);
        this.getDirecciones();
        this.reiniciaDatos();
      }).catch(e => {
        console.log(e.response.status);
        console.log(e.response.data);
      });
    },
    cargaMunicipios(){
      axios.get('/api/municipio-por-estado/'+this.nuevaDireccion.idEstado+'.json', {}).then(response => {
        console.log(response.data);
        this.municipios = response.data;
        this.nuevaDireccion.idMunicipio=this.municipios[0].id;
        console.log(this.nuevaDireccion.idMunicipio);
      }).catch(e => {
        console.log(e.response.status);
        console.log(e.response.data);
      });
    },
    cargaEstados() {
      this.setEdoMun();
      axios.get('/api/estado-por-pais/'+this.nuevaDireccion.idPais+'.json', {}).then(response => {
        console.log(response.data);
        this.estados = response.data;
        this.estados.unshift({'id' : -1, 'nombre' : 'Selecciona uno'});
      }).catch(e => {
        console.log(e.response.status);
        console.log(e.response.data);
      });
    },
    cargaDatos(){
      axios.get('/api/tipo-direcciones.json', {}).then(response => {
        console.log(response.data);
        this.tipoDirecciones = response.data;
      }).catch(e => {
        console.log(e.response.status);
        console.log(e.response.data);
      });
      axios.get('/api/paises.json', {}).then(response => {
        console.log(response.data);
        this.paises =response.data;
        this.paises.unshift({'id' : 0, 'nombre' : 'Selecciona uno'});
      }).catch(e => {
        console.log(e.response.status);
        console.log(e.response.data);
      });
    },

    getCarrito() {
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

    procesada(obj){
      var dir =  obj.calleNumero + ", "
          + obj.colonia + ", "
          + obj.cp + ", "
          + obj.municipioNombre + ", "
          + obj.estadoNombre + ","
          + obj.paisNombre;
      return dir;
    },

    getPaqueterias(){
      axios.get('/api/paqueterias.json', {}).then(response => {
        console.log(response.data);
        this.paqueterias=response.data;
      }).catch(e => {
        console.log(e.response.status);
        console.log(e.response.data);
      });
    },
    getDirecciones(){
      axios.get('/api/direcciones-con-nombre/'+this.usuario+'.json', {}).then(response => {
        console.log(response.data);
        this.direcciones=response.data;
      }).catch(e => {
        console.log(e.response.status);
        console.log(e.response.data);
      });
    },
    reiniciaDatos(){
      this.nuevaDireccion = {
        id : 0,
        nombre : store.state.session.nombreCompleto,
        tipo : 1,
        calleNumero : null,
        colonia : null,
        referencias : null,
        cp : null,
        idPais : 0,
        idEstado : -1,
        idMunicipio : null
      }
    }

  },
  computed: {
    validaDetalles(){
      var x = true && (this.dirSelected!==0) && (this.paqSelected!==0);
      return !x;
    },

    habilitaBoton() {
      var dato = true
          && this.nuevaDireccion.nombre.length>2
          && this.nuevaDireccion.calleNumero
          && this.nuevaDireccion.colonia
          && this.nuevaDireccion.referencias
          && this.nuevaDireccion.cp
          && this.nuevaDireccion.idEstado
          && this.nuevaDireccion.idMunicipio
      return !dato;
    },

    getPrecioEnvio(){
      if(this.paqSelected!=0){
        return this.paqueterias[this.paqSelected-1].precio;
      }
      return 0;
    },

  },

}
</script>

<style>

hr.dotted {
  border-top: 2px dotted #bbb;
}
.shadowing {
  box-shadow: 1px 1px 3px #d8dcdd;
}
.shortSpace{
  font-size: 12px;
}

.format {
  color:dodgerblue;
  font-size: 13px;
}

</style>