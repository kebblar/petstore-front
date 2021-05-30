<template>
  <div class="ancho centra">
    <div class="card letrasBusqueda" style="width:900px;">
      <div class="card-header">
        <h5 class="control-label">Consultar anuncios</h5>
      </div>
      <div class="card-body align">
        <div class="form-row form-group">
          <div class="col-md-2">
            <label for="nombre">SKU :</label>
          </div>
          <div class="col-md-4">
            <input
              type="text"
              required
              class="form-control letrasBusqueda"
              :class="classSKU"
              placeholder="20052101030001"
              v-model="sku"
              maxlength="14"
              size="14"
            />
            <small class="notValid">{{ msgSKU }}</small>
          </div>
        </div>
        <div class="form-row form-group">
          <div class="col-md-2">
            <label for="nombre">Título :</label>
          </div>
          <div class="col-md-9">
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
          <div class="col-md-3 letraBusqueda">
            <select
              id="inputCat"
              class="form-control"
              style="font-size: 14px"
              v-model="idCategoria"
            >
              <option :value="m.id" v-for="m in categorias2" :key="m.id">
                {{ m.valor }}
              </option>
            </select>
          </div>
          <div class="col-md-1"></div>
          <div class="col-md-2">
            <label for="mun">Estatus :</label>
          </div>
          <div class="col-md-3">
            <select
              id="inputEstado"
              class="form-control"
              style="font-size: 12px"
              v-model="idEstatus"
            >
              <option value="" selected disabled hidden>Choose here</option>
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
          <div class="col-md-3">
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
          <div class="col-md-2">
            <label> Fecha final :</label>
          </div>
          <div class="col-md-3">
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
              @click="buscarAnuncios"
            >
              Buscar
            </button>
            <button
              type="button"
              class="col-xs-6 btn btn-info font-weight-bold m-2"
              style="font-size: 12px"
              @click='creaarAnuncio(entry.id)'
            >
              Nuevo anuncio
            </button>
          </div>
        </div>
        <hr class="dotted" />
        <input @click='modal()' type="button" class="btn btn-info" value="Modal" />
                                
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
                style="text-align: center; font-size: 10px"
              >
                <thead
                  class="thead-dark"
                  style="text-align: center; font-size: 11px; font-weight: bold"
                >
                  <tr>
                    <th scope="col">SKU</th>
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
                    <td>{{ entry.sku }}</td>
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
                                  title="Ver detalle"
                                  class="btn btn-success btn-xs m-2"
                                >
                                  <b-icon
                                    icon="eye-fill"
                                    aria-hidden="false"
                                  ></b-icon>
                                </b-button>
                              </p>
                            </div>
                            <div class="col-3 align-self-center">
                              <div v-if="entry.descripcionEstatus != 'Eliminado'">
                                <p class="h6 mb-1">
                                  <b-button
                                    @click='editarAnuncio(entry.id)'
                                    title="Editar anuncio"
                                    class="btn btn-warning btn-xs m-2"
                                  >
                                    <b-icon
                                      icon="pencil-square"
                                      aria-hidden="true"
                                    ></b-icon>
                                  </b-button>
                                </p>
                              </div>
                            </div>
                            <div class="col-3 align-self-end">
                              <div v-if="entry.descripcionEstatus != 'Eliminado'">
                                <p class="h6 mb-1">
                                  <b-button
                                    @click='modal(entry.id)'
                                    title="borrar anuncio"
                                    class="btn btn-danger btn-xs m-2"
                                  >
                                    <b-icon
                                      icon="trash-fill"
                                      aria-hidden="true"
                                    ></b-icon>
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
              class="mt-4 text-center"
            >
              <template #first-text
                ><span @click="paginaEvento(1)" class="text-success"
                  >Primero</span
                ></template
              >
              <template v-if="currentPage != 1" #prev-text
                ><span @click="paginaEvento(currentPage - 1)" class="text-danger"
                  >Anterior</span
                ></template
              >
              <template v-if="rows / perPage != currentPage" #next-text
                ><span @click="paginaEvento(currentPage + 1)" class="text-warning"
                  >Siguiente</span
                ></template
              >
              <template #last-text
                ><span @click="paginaEvento(((rows / perPage)%2==0)?(rows / perPage):parseInt(rows / perPage)+1)" 
                       class="text-info"
                  >Último</span
                ></template
              >
              <template #page="{ page, active }">
                <b @click="paginaEvento(page)" v-if="active">{{ page }}</b>
                <i @click="paginaEvento(page)" v-else>{{ page }}</i>
              </template>
            </b-pagination>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import axios from "axios";
import VueToast from "vue-toast-notification";
import router from '../router';
import "vue-toast-notification/dist/theme-sugar.css";
import VueConfirmDialog from 'vue-confirm-dialog';
Vue.use(VueConfirmDialog);
Vue.use(VueToast);
Vue.component('vue-confirm-dialog', VueConfirmDialog.default);

const skuRegex = new RegExp(/^[0-9]*$/);

export default {
  name: "ConsultaAnuncio.vue",
  mounted() {},
  data() {
    return {
      showModal: false,
      sku: '',
      titulo: '',
      categoria: [],
      idCategoria: 0,
      estatus: [],
      idEstatus: 0,
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
      fFinalV: null,
      fInicialV: null,
      classSKU: "defaultColor",
      classTitulo: "defaultColor",
      msgSKU: null,
      msgTitulo: null,
      styleCalendar: "",
      categorias2: [
        { id: 1, valor: "Caninos" },
        { id: 2, valor: "Felinos" },
        { id: 3, valor: "Aracnidos" },
        { id: 4, valor: "Reptiles" },
        { id: 5, valor: "Peces" },
        { id: 6, valor: "Aves" },
        { id: 7, valor: "Roedores" },
      ],
      estatus2: [
        { id: 1, valor: "Edición" },
        { id: 2, valor: "Activo" },
        { id: 3, valor: "Publicado" },
        { id: 4, valor: "Vencido" },
        { id: 5, valor: "Eliminado" },
        { id: 6, valor: "Cancelado" },
      ],
      anuncios: [],
      paymentSelected: 0,
      cvv: "",
      currentPage: 1,
      rows: "",
      perPage: 5,
    };
  },
  watch: {
    sku() {
      this.msgSKU = "";
      this.classSKU = "greenColor correct";
      if (!skuRegex.test(this.sku)) {
        this.msgSKU = "El SKU debe contener solo números";
        this.classSKU = "redColor incorrect";
      }
    },
  },
  created() {
    this.anuncios = [];
    this.titulo = ""
  },
  computed: {
    tablaVacia: function () {
      return this.anuncios[0] == null;
    }
  },
  methods: {
    paginaEvento(numero) {
      console.log(numero);
      let skuBack2= this.sku;
      if (this.sku == undefined || this.sku == '' ) {
        skuBack2 = 0;
      }
      axios
        .post("/api/anuncio/search.json", {
          sku: skuBack2,
          titulo: this.titulo,
          fechaInicioVigencia: this.fInicialV,
          fechaFinVigencia: this.fFinalV,
          estatus: this.idEstatus,
          idCategoria: this.idCategoria,
          numPaginas: numero,
          tamPaginas: this.perPage,
        })
        .then((response) => {
          console.log(response.data);
          this.anuncios = response.data.listaAnuncios;
          this.rows = response.data.totalAnuncios;
        });
    },
    buscarAnuncios() {
      let skuBack = this.sku;
      if (this.sku == undefined || this.sku == '' ) {
        skuBack = 0;
      }
      axios
        .post("/api/anuncio/search.json", {
          sku: skuBack,
          titulo: this.titulo,
          fechaInicioVigencia: this.fInicialV,
          fechaFinVigencia: this.fFinalV,
          estatus: this.idEstatus,
          idCategoria: this.idCategoria,
          numPaginas: this.currentPage,
          tamPaginas: this.perPage,
        })
        .then((response) => {
          console.log(response.data);
          this.anuncios = response.data.listaAnuncios;
          this.rows = response.data.totalAnuncios;
        });
    },
    modal(){
    //  console.log(idAnuncio);
      this.$confirm({
      title: 'Are you sure?',
      message: 'Are you sure you want to logout?',
        button: {
          yes: 'Yes',
          no: 'Cancel'
        },
        callback: confirm => {
            // ...do something
          if (confirm == true) {
           // console.log("Confirmado? true", idAnuncio);
          }else{
           // console.log("Confirmado? false", idAnuncio);
          }  
        }
      })
    },
    borrar(idAnuncio) {
        this.loading = true;
        console.log(idAnuncio);
        axios.delete('/api/anuncios.json?id='+ idAnuncio, { 
          id : idAnuncio
        }).then(response => {
          console.log(response);
          console.log(response.data);
          console.log(response.status);
          this.modalShowsError = false;
          this.modalTitulo ='Borrado exitoso';
          this.modalMessage = 'Se ha borrado exitosamente el anuncio del sistema.'; 
          router.push('confirma-borrar');
        }).catch(error => {
          this.msgErr = error;
          if(error.response) {
              this.msgErr = error.response.data['exceptionLongDescription'];
          }
          this.$modal.show('mensaje-login');
        }).finally(
          () => this.loading = false
        );
      },
    editarAnuncio(idAnuncio) {
        this.loading = true;
        console.log(idAnuncio);
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
hr.dotted {
  border-top: 2px dotted #bbb;
}
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