<template>
  <div class="ancho centra">
    <div class="card" style="width:450px;">
      <div class="card-header">
        <h4 class="control-label">Detalles de la compra</h4>
      </div>
      <div class="card-body align">

        <div class="form-group" align="center">
          <div class="col" style="margin-top: 10px;"><h6 class="text-info" style=" line-height: 155%;">Por favor completa la siguiente información para comenzar a procesar tu compra</h6></div>
        </div>
        <hr class="dotted">
        <div class="row">
          <div class="col-sm-4 " align="center" >
            <img class="rounded img-thumbnail" src="../assets/bicho1.jpg" alt="imagen mascota" style="max-height: 130px; width: auto;">
          </div>
          <div class="col" style="margin-top: 15px;">
            <div class="row">
              <div class="row">
                <h5 class="col-sm-11" align="center"><b>{{nombreMascota}}</b></h5>
                <div class="w-100 d-none d-md-block"></div>
                <div class="col-sm-11" style="margin-top: 10px;">
                  <button class="shadowing btn btn-link dropdown-toggle btn-block" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">Paquetería de envío</button>
                </div>
              </div>

            </div>
          </div>
        </div>

        <div id="collapseOne" class="collapse" aria-labelledby="headingOne" data-parent="#accordion">
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
        <hr class="dotted">

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
                    <b style="font-size: 14px;">{{usuarioDetalle.nombre}}</b>
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
                              <input type="text" v-model="nuevaDireccion.cp" placeholder="00000" class="form-control">
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
        <hr class="dotted">

        <div class="card-body">
          <div class="row">
            <div class="col-sm-3">
              <small class="text-secondary">Pagar con</small>
            </div>
            <div class="col">
              <div class="row">
                <div class="col-sm-1" style="margin-top: 2px;">
                  <input type="radio" v-model="paymentSelected" name="paymentSelected" :value="2">
                </div>
                <div class="col">
                  <b style="font-size: 14px;">Pagar con <i class="text-primary">PayPal</i></b>
                </div>
              </div>
              <div class="row separation">
                <div class="col-sm-1" >
                  <img src="../assets/bb-bitcoin.jpg" width="20px">
                </div>
                <div class="col" >
                  <b >Pago con Cripto-monedas</b>
                </div>
              </div>
              <div class="row" style="margin-top: 5px;">
                <div class="col-sm-1">
                  <input type="radio" v-model="paymentSelected" name="paymentSelected" :value="3">
                </div>
                <div class="col">
                  <p class="shortSpace">Bitcoin</p>
                </div>
                <div class="col-sm-1">
                  <input type="radio" v-model="paymentSelected" name="paymentSelected" :value="4">
                </div>
                <div class="col">
                  <p class="shortSpace">Ethereum</p>
                </div>
              </div>
              <div class="row" style="margin-top: -5px;">
                <div class="col-sm-1"></div>
                <div class="col">
                  <a href="#">Ver mis carteras digitales</a>
                </div>
              </div>

              <div class="row separation">
                <div class="col-sm-1" >
                  <img src="../assets/cc.png" width="20px">
                </div>
                <div class="col" >
                  <b >Pago con tarjeta bancaria</b>
                </div>
              </div>
              <div v-for="ta in getTarjetas" :key="ta.numeroPago">
                <div class="row">
                  <div class="col-sm-1" >
                    <input type="radio" v-model="paymentSelected" name="paymentSelected" :value="ta.numeroPago">
                  </div>
                  <div class="col">
                    <div class="row">
                      <div class="col-sm-8">
                        <p class="shortSpace" style="line-height: 115%">Tarjeta terminada en <b>{{getLastDigits(ta.numeroPago)}}</b>
                          Expira el: {{ta.expiracion}}</p>
                      </div>
                      <div class="col">
                        <input v-if="paymentSelected===ta.numeroPago" type="text" v-model="cvv" maxlength="3" placeholder="CVV" style="width: 50px; font-size: 10px;">
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="row" style="margin-top: -5px;">
                <div class="col-sm-1"></div>
                <div class="col">
                  <a href="#">Añadir una nueva tarjeta</a>
                  {{paymentSelected}}
                </div>
              </div>
            </div>
          </div>

        </div>

        <hr class="dotted">

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
                  <td>Mascota</td>
                  <td class="text-primary" align="right">$ {{precio}}</td>
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
                <td class="text-primary" align="right">$ {{ precio + getPrecioEnvio }}</td>
                </thead>
              </table>
            </div>

            <div class="col-sm-1"></div>

          </div>
        </div>
        <div class="container mb-2" align="center">
          <button type="button" class="btn btn-success">Realizar pedido</button>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
import axios from 'axios';
export default {
  name: "DetallePago.vue",

  mounted () {
    this.getDirecciones()
    this.getPaqueterias()
  },

  data(){
    return {
      usuario : {id : 1},
      usuarioDetalle: {id : 1, nombre: "Ana Luisa", apellidoPaterno: "Castrejon"},

      nombreMascota: "Camaleon pantera macho 13 meses",
      precio: 6000,

      paqueterias: [],
      paqSelected: 0,

      direcciones: [],
      dirSelected: 0,

      nuevaDireccion: {
        id : 0,
        idUsuario : 1, //info del store
        nombre : "store.state.estado.usuarioDetalle.nombre"+"store.state.estado.usuarioDetalle.apellidoPaterno",
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

      metodosPago: [
        {'idCliente': 1, 'tipoPago': 1, 'numeroPago': '1243777789093623', 'expiracion':'10-22' },
        {'idCliente': 1, 'tipoPago': 1, 'numeroPago': '1234567890564534', 'expiracion': '11-25'}
      ],
      paymentSelected: 0,
      cvv:""
    }
  },

  methods: {
    guardaDireccion() {
      axios.post('/api/nueva-direccion.json', this.nuevaDireccion).then(response => {
        console.log("post enviado");
        console.log(response.data);
        this.getDirecciones();
        this.reiniciaDatos();
      })
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
      axios.get('/api/estado-por-pais/'+this.nuevaDireccion.idPais+'.json', {}).then(response => {
        console.log(response.data);
        this.estados = response.data;
        this.estados.unshift({'id' : -1, 'nombre' : 'Selecciona uno'});
        console.log(this.nuevaDireccion.idEstado);
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
    procesada(obj){
      return obj.calleNumero + ", "
          + obj.colonia + ", "
          + obj.cp + ", "
          + obj.municipioNombre + ", "
          + obj.estadoNombre + ","
          + obj.paisNombre;
    },
    getLastDigits(obj){
      return obj.slice(-4);
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
      axios.get('/api/direcciones-con-nombre/'+this.usuario.id+'.json', {}).then(response => {
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
        nombre : "store.state.estado.usuarioDetalle.nombre"+"store.state.estado.usuarioDetalle.apellidoPaterno",
        tipo : 1,
        calleNumero : null,
        colonia : null,
        referencias : null,
        cp : null,
        idPais : 1,
        idEstado : null,
        idMunicipio : null
      }
    },

  },
  computed: {
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
    getTarjetas(){
      var arr=[];
      for (var i=0;i<this.metodosPago.length;i++){
        if (this.metodosPago[i].tipoPago===1){
          arr.push(this.metodosPago[i]);
        }
      }
      return arr;
    }
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
  line-height: 98%;
  font-size: 12px;
}
.separation{
  font-size: 14px;
  margin-top: 30px;
  margin-bottom: 10px;
}

</style>