<template>
  <div class="ancho centra">
    <div class="card letrasBusqueda" style="width:900px;">
      <div class="card-header">
        <h5 class="control-label">Administración de anuncios</h5>
      </div>
      <div class="card-body align">
        <div class="form-row form-group">
          <div class="col-md-2">
            <label for="nombre">Folio :</label>
          </div>
          <div class="col-md-4">
            <input
              type="number"
              required
              class="form-control letrasBusqueda"
              :class="classFolio"
              placeholder="20052101030001"
              v-model="folio"
              maxlength="14"
              size="14"
            />
            <small class="notValid">{{ msgFolio }}</small>
          </div>
        </div>
        <div class="form-row form-group">
          <div class="col-md-2">
            <label for="nombre">Título :</label>
          </div>
          <div class="col-md-10">
            <input
              type="text"
              required
              class="form-control letrasBusqueda"
              :class="classTitulo"
              placeholder="Cachorro Chihuahua"
              v-model="titulo"
              maxlength="50"
              size="50"
            />
            <small class="notValid">{{ msgTitulo }}</small>
          </div>
        </div>
        <div class="form-row form-group">
          <div class="col-md-2">
            <label for="mun">Categoria :</label>
          </div>
          <div class="col-md-4 letraBusqueda">
            <select
              id="inputCat"
              class="form-control"
              style="font-size: 14px"
              v-model="idCategoria">
              <option value="" selected>Seleccionar</option>
              <option :value="m.id" v-for="m in categorias2" :key="m.id">
                {{ m.valor }}
              </option>
            </select>
          </div>
          <div class="col-md-1"></div>
          <div class="col-md-1">
            <label for="mun">Estatus :</label>
          </div>
          <div class="col-md-4">
            <select
              id="inputEstado"
              class="form-control"
              style="font-size: 14px"
              v-model="idEstatus">
              <option value="" selected >Seleccionar</option>
              <option :value="m.id" v-for="m in estatus2" :key="m.id">
                {{ m.valor }}
              </option>
            </select>
          </div>
        </div>
        <div class="form-row form-group">
          <!-- f inicial -->
          <div class="col-md-2">
            <label> Fecha inicial :</label>
          </div>
          <div class="col-md-4">
            <b-form-datepicker
              style="text-align: center; font-size: 11px; font-weight: bold"
              id="fecha-InicialV"
              v-model="fInicialV"
              :initial-date="dateConfigFI.initial"
              :max="dateConfigFI.max"
              :min="dateConfigFI.min"
              calendar-width="100%"
              class="mb-2"
              :class="styleCalendar"
              hide-header
              locale="es"
              menu-class="w-100"
              nav-button-variant="secondary"
              placeholder="MM-DD-YYYY"
              show-decade-nav
              v-bind:value-as-date="true"
            />
          </div>
          <div class="col-md-1"></div>
          <!-- f final -->
          <div class="col-md-1">
            <label> Fecha final :</label>
          </div>
          <div class="col-md-4">
            <b-form-datepicker
              id="fecha-finalV"
              style="text-align: center; font-size: 11px; font-weight: bold"
              v-model="fFinalV"
              :initial-date="dateConfigFF.initial"
              :max="dateConfigFF.max"
              :min="dateConfigFF.min"
              calendar-width="100%"
              class="mb-2"
              :class="styleCalendar"
              hide-header
              locale="es"
              menu-class="w-100"
              nav-button-variant="secondary"
              placeholder="MM-DD-YYYY"
              show-decade-nav
              v-bind:value-as-date="true"
            />
          </div>
        </div>
        <div class="row">
          <div class="col-xs-12 col-md-12 offset-md-8">
            <button
              type="button"
              class="col-xs-6 text-right btn btn-success font-weight-bold"
              style="font-size: 12px"
              @click="buscarAnuncios">
              Buscar
            </button>
            <button
              type="button"
              class="col-xs-6 btn btn-info font-weight-bold m-2"
              style="font-size: 12px"
              @click='crearAnuncio()'>
              Nuevo anuncio
            </button>
          </div>
        </div>
        <hr class="dotted" />
        <div>
          <h6 style="text-align: center; font-size: 14px; font-weight: bold">
            Resultado de la búsqueda
          </h6>
          <div v-if="tablaVacia">
            <h5 style="text-align: center; font-size: 12px">
              Tu busqueda no arrojo resultados.
            </h5>
          </div>
          <div v-else>
            <div class="table-responsive">
              <table
                class="table table-light table-striped table-xs"
                style="text-align: center; font-size: 10px">
                <thead
                  class="thead-dark"
                  style="text-align: center; font-size: 11px; font-weight: bold">
                  <tr>
                    <th scope="col">Folio</th>
                    <th scope="col">Titulo</th>
                    <th scope="col">Categoria</th>
                    <th scope="col">Estatus</th>
                    <th scope="col">Fecha inicio vigencia</th>
                    <th scope="col">Fecha fin vigencia</th>
                    <th scope="col">Acciones</th>
                  </tr>
                </thead>
                <tbody style="text-align: center; font-size: 11px">
                  <tr v-for="(entry, i) in anuncios" :key="i">
                    <td>{{ entry.folio }}</td>
                    <td>{{ entry.titulo }}</td>
                    <td>{{ entry.descripcionCategoria }}</td>
                    <td>{{ entry.descripcionEstatus }}</td>
                    <td v-if="entry.fechaInicioVigencia!=null && entry.fechaInicioVigencia!=''">{{ entry.fechaInicioVigencia.substring(0,10) }}</td>
                    <td v-else >{{'--'}}</td>
                    <td v-if="entry.fechaFinVigencia!=null && entry.fechaFinVigencia!=''">{{ entry.fechaFinVigencia.substring(0,10)}}</td>
                    <td v-else >{{'--'}}</td>
                    <!--Agregar id-->
                    <td>
                      <div class="form-row form-group">
                        <b-button-group>
                          <div class="row">
                            <div class="col-3 align-self-start">
                              <p class="h6 mb-1">
                                <b-button
                                  @click='verAnuncio(entry.id)'
                                  title="Ver detalle"
                                  class="btn btn-success btn-xs m-2">
                                  <b-icon
                                    icon="eye-fill"
                                    aria-hidden="false">
                                  </b-icon>
                                </b-button>
                              </p>
                            </div>
                            <div class="col-3 align-self-center">
                              <div v-if="entry.idEstatus != 5 ">
                                <p class="h6 mb-1">
                                  <b-button
                                    @click='editarAnuncio(entry.id)'
                                    title="Editar anuncio"
                                    class="btn btn-warning btn-xs m-2">
                                    <b-icon
                                      icon="pencil-square"
                                      aria-hidden="true">
                                    </b-icon>
                                  </b-button>
                                </p>
                              </div>
                            </div>
                            <div class="col-3 align-self-end">
                              <div v-if="entry.idEstatus != 5 ">
                                <p class="h6 mb-1">
                                  <b-button
                                    @click='modalEliminar(entry.id,entry.folio,entry.numPaginas)'
                                    title="borrar anuncio"
                                    class="btn btn-danger btn-xs m-2">
                                    <b-icon
                                      icon="trash-fill"
                                      aria-hidden="true">
                                    </b-icon>
                                  </b-button>
                                  </p>
                              </div>
                            </div>
                          </div>
                        </b-button-group>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <b-pagination
              v-model="currentPage"
              :total-rows="rows"
              :per-page="perPage"
              class="mt-4 text-center">
              <template #first-text>
                <span @click="paginaEvento(1)" class="text-success">Primero</span>
              </template>
              <template v-if="currentPage != 1" #prev-text>
                <span @click="paginaEvento(currentPage - 1)" class="text-danger">Anterior</span>
              </template>
              <template v-if="rows / perPage != currentPage" #next-text>
                <span @click="paginaEvento(currentPage + 1)" class="text-warning">Siguiente</span>
              </template>
              <template #last-text>
                <span @click="paginaEvento(((rows / perPage)%2==0)?(rows / perPage):parseInt(rows / perPage)+1)"
                       class="text-info">Último</span>
              </template>
              <template #page="{ page, active }">
                <b @click="paginaEvento(page)" v-if="active">{{ page }}</b>
                <i @click="paginaEvento(page)" v-else>{{ page }}</i>
              </template>
            </b-pagination>
          </div>
        </div>
      </div>
    </div>
    <vue-confirm-dialog></vue-confirm-dialog>
  </div>
</template>

<script>
import Vue from "vue";
import axios from "axios";
import VueToast from "vue-toast-notification";
import router from '../../router';
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import "vue-toast-notification/dist/theme-sugar.css";
import VueConfirmDialog from 'vue-confirm-dialog';

Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(VueConfirmDialog);
Vue.use(VueToast);
Vue.component('vue-confirm-dialog', VueConfirmDialog.default);

//const folioRegex = new RegExp(/^[0-9]*$/);

export default {
  name: "ConsultaAnuncio.vue",
  mounted() {
    axios.get('api/categorias.json').then(response => {
        response.data.forEach((obj, key) => {
            Vue.set(this.categorias2, key, { id: obj.id, valor:obj.categoria});
        });
    });
    axios.get('api/estatus-anuncios.json').then(response => {
        response.data.forEach((obj, key) => {
            Vue.set(this.estatus2, key, { id: obj.id, valor:obj.descripcion});
        });
    });
  },
  data() {
    return {
      showModal: false,
      folio: '',
      titulo: '',
      categoria: [],
      idCategoria: '',
      estatus: [],
      idEstatus: '',
      dateConfigFI: {
        initial: new Date(2021, 4, 1),
        min: new Date(2021, 0, 1),
        max: new Date(2100, 11, 30),
      },
      dateConfigFF: {
        initial: new Date(2021, 4, 1),
        min: new Date(2021, 0, 1),
        max: new Date(2100, 11, 30),
      },
      fechaInicioVigencia: null,
      fechaFinVigencia: null,
      fFinalV: '',
      fInicialV: '',
      classFolio: "defaultColor",
      classTitulo: "defaultColor",
      msgFolio: null,
      msgTitulo: null,
      styleCalendar: "",
      categorias2: [],
      estatus2: [],
      anuncios: null,
      paymentSelected: 0,
      cvv: "",
      currentPage: 1,
      rows: "",
      perPage: 5,
    };
  },
  watch: {
    // folio() {
    //   this.msgFolio = "";
    //   this.classFolio = "greenColor correct";
    //   if (!folioRegex.test(this.folio)) {
    //     this.msgFolio = "El folio debe contener solo números";
    //     this.classFolio = "redColor incorrect";
    //   }
    //   localStorage.setItem('folio', this.folio);
    // }
  },
  created() {
    this.anuncios = null;
    this.titulo = "";
    this.bandera = false;
    //Validamos si existen datos en sección
    if (localStorage.bandera) {
      this.bandera = localStorage.bandera;
    }
    if (this.bandera == 'true') {
      this.anuncios = JSON.parse(localStorage.getItem("anuncios"));
      this.rows = localStorage.rows;
      this.currentPage = localStorage.getItem('cp');
      if (localStorage.folio == null) {
        this.folio = '';
      }else{
        this.folio = localStorage.folio;
      }

      if (localStorage.titulo == null) {
        this.titulo = '';
      }else{
        this.titulo = localStorage.titulo;
      }
      this.idCategoria = localStorage.idCategoria;
      this.idEstatus = localStorage.idEstatus;
      if (localStorage.fFinalV == null) {
        this.fFinalV = '';
      }else{
        this.fFinalV = localStorage.fFinalV;
      }
      if (localStorage.fInicialV == null) {
        this.fInicialV = '';
      }else{
        this.fInicialV = localStorage.fInicialV;
      }

      console.log(this.currentPage)
      /*
      console.log('currentPage '+this.currentPage) */
    }
    //Limpiamos los datos de la session
      localStorage.removeItem('anuncios');
      localStorage.rows = null;
      localStorage.removeItem('cp');
      localStorage.folio = null;
      localStorage.titulo = null;
      localStorage.idCategoria = null;
      localStorage.idEstatus = null;
      localStorage.fFinalV = null;
      localStorage.fInicialV = null;
      localStorage.bandera = null;
  },
  computed: {
    tablaVacia: function () {

      return this.anuncios == null || this.anuncios[0] == null;
    }
  },
  methods: {
    paginaEvento(numero) {
      let folioBack2= this.folio;
     // if (this.folio == undefined || this.folio == '' ) {
     //  folioBack2 = 0;
      //}
      axios
        .post("/api/anuncio/search.json", {
          folio: folioBack2,
          titulo: this.titulo,
          fechaInicioVigencia: this.fInicialV,
          fechaFinVigencia: this.fFinalV,
          estatus: this.idEstatus,
          idCategoria: this.idCategoria,
          numPaginas: numero,
          tamPaginas: this.perPage,
        })
        .then((response) => {
          //Limpiamos los datos de la session
          this.anuncios = response.data.listaAnuncios;
          this.rows = response.data.totalAnuncios;
          localStorage.setItem('anuncios', JSON.stringify(response.data.listaAnuncios));
          localStorage.rows = response.data.totalAnuncios;
          localStorage.setItem('cp',numero);
          localStorage.folio = this.folio;
          localStorage.titulo = this.titulo;
          localStorage.idCategoria = this.idCategoria;
          localStorage.idEstatus = this.idEstatus;
          localStorage.fFinalV = this.fFinalV;
          localStorage.fInicialV = this.fInicialV;
          console.log(numero)
/*           console.log(localStorage.anuncios);
          console.log(localStorage.rows); */
        });
    },
    buscarAnuncios() {
      let folioBack = this.folio;
      //if (this.folio == undefined || this.folio == '' ) {
      //  folioBack = 0;
      //}
      axios
        .post("/api/anuncio/search.json", {
          folio: folioBack,
          titulo: this.titulo,
          fechaInicioVigencia: this.fInicialV,
          fechaFinVigencia: this.fFinalV,
          estatus: this.idEstatus,
          idCategoria: this.idCategoria,
          numPaginas: 1,
          tamPaginas: this.perPage,
        })
        .then((response) => {
          //asignamos la informaciòn recibida
          this.anuncios = response.data.listaAnuncios;
          this.rows = response.data.totalAnuncios;
          //localStorage.anuncios = response.data.listaAnuncios;
          localStorage.setItem('anuncios', JSON.stringify(response.data.listaAnuncios));
          localStorage.rows = response.data.totalAnuncios;
          localStorage.folio = this.folio;
          localStorage.titulo = this.titulo;
          localStorage.idCategoria = this.idCategoria;
          localStorage.idEstatus = this.idEstatus;
          localStorage.fFinalV = this.fFinalV;
          localStorage.fInicialV = this.fInicialV;
          console.log('curertn '+this.currentPage);
        });
    },
    modalEliminar(idAnuncio,idFolio){
      this.$confirm({
      title: 'Eliminar anuncio',
      message: '¿Estás seguro que quieres eliminar el anuncio?    '+idFolio,
        button: {
          yes: 'Si',
          no: 'Cancelar'
        },
        callback: confirm => {
          if (confirm == true) {
            this.eliminar(idAnuncio,idFolio);
          }else{
            //console.log("Confirmado? false", idAnuncio);
          }
        }
      })
    },
    eliminar (idAnuncio,idFolio) {
        this.loading = true;
        console.log(idFolio);
        axios.delete('/api/anuncios.json?id='+ idAnuncio, {
          id : idAnuncio
        }).then(response => {
          console.log(response);
          let msgEliminar =
            "<center>Anuncio eliminado correctamente</center>";
          Vue.$toast.open({
              message: msgEliminar,
              type: "success",
              duration: 7000,
              position: "top"
          });
          this.bandera = false;
          localStorage.bandera = this.bandera;
          router.go('/ui/admin-consulta-anuncio');
        }).catch(error => {
          this.msgErr = error;
          if(error.response) {
              this.msgErr = error.response.data['exceptionLongDescription'];
          }
          let msgEliminar =
            "<center>El anuncio no fue eliminado correctamente</center>";
          Vue.$toast.open({
            message: msgEliminar,
            type: "error",
            duration: 7000,
            position: "top",
          });
        }).finally(
          () => this.loading = false
        );
      },
    verAnuncio(idAnuncio){
      //asignamos valores a la session
      localStorage.setItem('anuncios', JSON.stringify(this.anuncios));
      localStorage.rows = this.rows;
      localStorage.folio = this.folio;
      localStorage.titulo = this.titulo;
      localStorage.idCategoria = this.idCategoria;
      localStorage.idEstatus = this.idEstatus;
      localStorage.fFinalV = this.fFinalV;
      localStorage.fInicialV = this.fInicialV;
      this.bandera = true;
      localStorage.bandera = this.bandera;

      this.loading = true;
      router.push({path:'/ui/detalle-producto/'+idAnuncio}).catch(()=>{});
    },
    editarAnuncio(idAnuncio) {
        this.bandera = true;
        localStorage.setItem('anuncios', JSON.stringify(this.anuncios));
        localStorage.rows = this.rows;
        localStorage.folio = this.folio;
        localStorage.titulo = this.titulo;
        localStorage.idCategoria = this.idCategoria;
        localStorage.idEstatus = this.idEstatus;
        localStorage.fFinalV = this.fFinalV;
        localStorage.fInicialV = this.fInicialV;
        localStorage.bandera = this.bandera;
        this.loading = true;
        router.push({path:'/ui/admin-anuncio/'+idAnuncio}).catch(()=>{});
    },
    crearAnuncio(){
        this.loading = true;
        router.push('/ui/admin-anuncio').catch(()=>{});
    }
  },
};
</script>

<style>
.shadowing {
  box-shadow: 1px 1px 3px #d8dcdd;
}
.shortSpace {
  line-height: 98%;
  font-size: 12px;
}
.separation {
  font-size: 14px;
  margin-top: 30px;
  margin-bottom: 10px;
}
.letrasBusqueda {
  font-size: 11px;
}
.estiloAcciones {
  font-size: 20px;
  line-height: 50px;
  text-align: center;
  width: 50px;
  height: 20px;
}
.modal-active{
    display:block;
}
.pagination {
  display: flex;
  justify-content: center;
}
.ancho {
  max-width: 60%;
}
@media (max-width: 600px) {
  .ancho {
    max-width: 90%;
  }
}
</style>