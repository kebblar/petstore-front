<template>
  <div class="ancho centra">
    <div class="card letrasBusqueda">
      <div class="card-header">
        <h5 class="control-label text-center">Consultar anuncios</h5>
      </div>
      <div class="card-body align ">
        <div class="col-md-3 inline topAlign">
          <div class="form-row form-group col-md-10 raya">
            <h1>Búsqueda</h1>
          </div>
          <div class="form-row form-group col-md-10">
            <div class="col-md-12">
              <label for="mun">Categoria :</label>
            </div>
            <div class="letraBusqueda col-md-12">
              <select id="idCategoria" class="form-control" style="font-size:11px;" v-model="idCategoria">
                <option value="">Seleccione</option>
                <option :value="m.id" v-for="m in categorias" :key="m.id">{{m.valor}}</option>
              </select>
            </div>
          </div>
          <div class ="form-row form-group col-md-10">
            <div class="col-md-12">
              <label for="nombre">Precio máximo :</label>
            </div>
            <div class="letraBusqueda col-md-12">
              <input type="number" pattern="[0-9]" required
                   onkeypress="return event.charCode >= 48 || event.charCode == 46"
                   step="1" :class="classPrecio" class="form-control" style="font-size:11px;"
                   v-model="precio" min="0" maxlength="9" />
            </div>
          </div>
          <div class="form-row form-group col-md-10">
            <div class="col-md-12">
              <label for="mun">Color :</label>
            </div>
            <div class="letraBusqueda col-md-12">
              <select id="idColor" class="form-control" style="font-size:11px;" v-model="idColor">
                <option value="">Seleccione</option>
                <option :value="m.id" v-for="m in colores" :key="m.id">{{m.valor}}</option>
              </select>
            </div>
          </div>
          <div class="form-row form-group col-md-10">
            <div class="col-md-12">
              <label for="mun">Tamaño :</label>
            </div>
            <div class="letraBusqueda col-md-12">
              <select id="idTamano" class="form-control" style="font-size:11px;" v-model="idTamano">
                <option value="">Seleccione</option>
                <option :value="m.id" v-for="m in tamanos" :key="m.id">{{m.valor}}</option>
              </select>
            </div>
          </div>
          <div class="form-row form-group col-md-10">
            <div class="col-md-12">
              <label for="mun">Raza :</label>
            </div>
            <div class="letraBusqueda col-md-12">
              <select id="idRaza" class="form-control" style="font-size:11px;" v-model="idRaza">
                <option value="">Seleccione</option>
                <option :value="m.id" v-for="m in razas" :key="m.id">{{m.valor}}</option>
              </select>
            </div>
          </div>
          <div class="form-row form-group col-md-10">
            <div class="col-md-12">
              <label for="mun">Peso :</label>
            </div>
            <div class="letraBusqueda col-md-12">
              <select id="idPeso" class="form-control" style="font-size:11px;" v-model="idPeso">
                <option value="">Seleccione</option>
                <option :value="m.id" v-for="m in pesos" :key="m.id">{{m.valor}}</option>
              </select>
            </div>
          </div>
          <div class="form-row form-group col-md-10">
            <div class="col-md-12">
              <label for="mun">Edad :</label>
            </div>
            <div class="letraBusqueda col-md-12">
              <select id="idEdad" class="form-control" style="font-size:11px;" v-model="idEdad">
                <option value="">Seleccione</option>
                <option :value="m.id" v-for="m in edades" :key="m.id">{{m.valor}}</option>
              </select>
            </div>
          </div>
          <div class="form-row form-group col-md-10">
            <div class="col-md-12">
              <label for="mun">Longevidad :</label>
            </div>
            <div class="letraBusqueda col-md-12">
              <select id="idLongevidad" class="form-control" style="font-size:11px;" v-model="idLongevidad">
                <option value="">Seleccione</option>
                <option :value="m.id" v-for="m in longevidades" :key="m.id">{{m.valor}}</option>
              </select>
            </div>
          </div>
          <div class="form-row form-group col-md-10 none" v-if="false">
            <div class="col-md-12">
              <label for="mun">Tipo de agua :</label>
            </div>
            <div class="letraBusqueda col-md-12">
              <select id="idAguas" class="form-control" style="font-size:11px;" v-model="idAguas">
                <option value="">Seleccione</option>
                <option :value="m.id" v-for="m in aguas" :key="m.id">{{m.valor}}</option>
              </select>
            </div>
          </div>
          <div class="text-center">
              <button type="button" class="btn btn-primary font-weight-bold m-1"
                  @click="limpiar()" >Limpiar</button>
              <button type="button" class="btn btn-success font-weight-bold m-1"
                  @click="buscarAnuncios(1)">Buscar</button>
          </div>
        </div>
        <div class='col-md-9 inline' >
          <h6 style="text-align: center; font-size: 14px; font-weight: bold;">Resultado de la búsqueda</h6>
          <div v-if="tablaVacia">
            <h5 style="text-align: center; font-size: 12px;">Tu busqueda no arrojo resultados.</h5>
          </div>
          <div v-else>
            <div class="text-right font-wight-bold">
              <b-button title="" variant="light" @click="lista">
                  <b-icon icon="view-list" aria-hidden="true"></b-icon>
              </b-button>
              <b-button title="" variant="light" @click="mosaico">
                  <b-icon icon="view-stacked" aria-hidden="true"></b-icon>
              </b-button>
            </div>
            <div>
              <b-card-group  v-for="(entry, i) in anuncios" :key="i" class="inline align-top"  v-bind:class="{ 'col-md-4': isActive, 'col-md-12': notActive }">
                <b-card v-if="entry.imagenes != null" style="height:400px" class="m-1">
                    <b-row no-gutters v-if="notActive">

                      <b-col md="6" >
                           <img v-if="entry.imagenes[0].idTipo!=4  && entry.imagenes[0].idTipo!=5" 
                            class="card-img-top card-petstore-notActive" :src="ruta + entry.imagenes[0].uuid" img-alt="Image"/>
                            
                            <div v-else>
                              <video  class="video-fluid" autoplay loop muted width="97%" height="50%" img-top>
                                <source :src="rutaVideo + entry.imagenes[0].uuid" type="video/mp4" />
                              </video>
                            </div>
                      </b-col>
                      <b-col md="6" style="padding:2%">
                         <b-card-title>{{entry.titulo}}</b-card-title>
                        <b-card-sub-title class="mb-2">{{ entry.descCategoria }}</b-card-sub-title>
                        <b-card-text v-html="entry.descripcion" class="puntitosLarge">
                        </b-card-text>
                        <b-card-text>
                          {{ entry.precio }}
                        </b-card-text>
                      </b-col>
                    </b-row>

                    <img v-if="entry.imagenes[0].idTipo!=4  && entry.imagenes[0].idTipo!=5 && isActive" 
                            class="card-img-top card-petstore" :src="ruta + entry.imagenes[0].uuid" img-alt="Image"/>
                    <div v-else >
                      <video  class="video-fluid" autoplay loop muted width="97%" height="50%" img-top v-if="isActive">
                        <source :src="rutaVideo + entry.imagenes[0].uuid" type="video/mp4" />
                      </video>
                    </div>

                    <b-card-title v-if="isActive" class="puntitosTitulo">{{entry.titulo}}</b-card-title>
                    <b-card-sub-title class="mb-2" v-if="isActive">{{ entry.descCategoria }}</b-card-sub-title>
                    <b-card-text v-html="entry.descripcion" v-if="isActive" class="puntitosShort">
                     
                    </b-card-text>
                    <b-card-text v-if="isActive">
                      {{ entry.precio }}
                    </b-card-text>

                    <template #footer>
                      <b-button block  variant="primary" @click="redireccion(entry.id)">Ver Anuncio</b-button>
                    </template>
                </b-card>

              </b-card-group>
            </div>
            <b-pagination
              v-model="currentPage"
              :total-rows="rows"
              :per-page="perPage"
              @change="buscarAnuncios"
              first-text="Primero"
              prev-text="Anterior"
              next-text="Siguiente"
              last-text="Último"
              class="mt-4 text-center">
              <template v-if="currentPage != 1" #first-text>
                <span class="text-success">Primero</span>
              </template>
              <template v-if="currentPage != 1" #prev-text>
                <span  class="text-danger">Anterior</span>
              </template>
              <template v-if="rows / perPage != currentPage" #next-text>
                <span  class="text-warning">Siguiente</span>
              </template>
              <template  v-if="rows / perPage != currentPage" #last-text>
                <span class="text-info">Último</span>
              </template>
              <template #page="{ page, active }">
                <b v-if="active">{{ page }}</b>
                <i  v-else>{{ page }}</i>
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
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import "vue-toast-notification/dist/theme-sugar.css";
import VueConfirmDialog from 'vue-confirm-dialog';
import router from '../router';

Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(VueConfirmDialog);
Vue.use(VueToast);
Vue.component('vue-confirm-dialog', VueConfirmDialog.default);

export default {
  name: "ConsultaAnunciosPublico.vue",
  mounted () {
    this.ruta      = process.env.VUE_APP_URL_MEDIA;
    this.rutaVideo = process.env.VUE_APP_URL_MEDIA_VIDEO;
    console.log('-------------->'+this.rutaVideo);

    axios.get('api/categorias.json').then(response => {
        response.data.forEach((obj, key) => {
            Vue.set(this.categorias, key, { id: obj.id, valor:obj.categoria});
        });
    });
    axios.get('api/valor-atributo/atributo/1.json').then(response => {
        response.data.forEach((obj, key) => {
            Vue.set(this.pesos, key, { id: obj.id, valor:obj.rango});
        });
    });
    axios.get('api/valor-atributo/atributo/2.json').then(response => {
        response.data.forEach((obj, key) => {
            Vue.set(this.razas, key, { id: obj.id, valor:obj.rango});
        });
    });
    axios.get('api/valor-atributo/atributo/3.json').then(response => {
        response.data.forEach((obj, key) => {
            Vue.set(this.colores, key, { id: obj.id, valor:obj.rango});
        });
    });
    axios.get('api/valor-atributo/atributo/4.json').then(response => {
        response.data.forEach((obj, key) => {
            Vue.set(this.tamanos, key, { id: obj.id, valor:obj.rango});
        });
    });
    axios.get('api/valor-atributo/atributo/5.json').then(response => {
        response.data.forEach((obj, key) => {
            Vue.set(this.edades, key, { id: obj.id, valor:obj.rango});
        });
    });
    axios.get('api/valor-atributo/atributo/6.json').then(response => {
        response.data.forEach((obj, key) => {
            Vue.set(this.longevidades, key, { id: obj.id, valor:obj.rango});
        });
    });
    axios.get('api/valor-atributo/atributo/7.json').then(response => {
        response.data.forEach((obj, key) => {
            Vue.set(this.aguas, key, { id: obj.id, valor:obj.rango});
        });
    });
    this.cargaInicial(this.$route.params.idCatInit)
  },
  data(){
    return {
      isActive: true,
      notActive: false,

      ruta:'',
      rutaVideo: process.env.VUE_APP_URL_MEDIA_VIDEO,
      idCategoria : '',
      idColor : '',
      idTamano : '',
      idRaza : '',
      imagen : '',
      idEdad : '',
      idLongevidad : '',
      idPeso : '',
      peso : '',
      precio : '',
      edad : '',
      idAguas: '',

      classPrecio : 'defaultColor',
      classEdad : 'defaultColor',
      classPeso : 'defaultColor',

      msgPrecio : null,
      msgEdad : null,
      msgPeso : null,
      categorias : [],
      colores : [],
      tamanos : [],
      razas : [],
      edades : [],
      pesos : [],
      longevidades : [],
      aguas : [],
      anuncios: [],
      currentPage: null,
      rows: null,
      perPage: 9
    }
  },
  created(){
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
      this.idCategoria = localStorage.idCategoria;
      this.precio = localStorage.precio;
      this.idColor = localStorage.idColor;
      this.idTamano = localStorage.idTamano;
      this.idRaza = localStorage.idRaza;
      this.idPeso = localStorage.idPeso;
      this.idPeso = localStorage.idEdad;
      this.idAguas = localStorage.idAguas;
      this.idLongevidad = localStorage.idLongevidad;
      this.currentPage = localStorage.currentPage;
    }
      localStorage.removeItem('anuncios');
      localStorage.rows = null;
      localStorage.idCategoria = null;
      localStorage.precio = null;
      localStorage.idColor = null;
      localStorage.idTamano = null;
      localStorage.idRaza = null;
      localStorage.idPeso = null;
      localStorage.idEdad = null;
      localStorage.idAguas = null;
      localStorage.idLongevidad = null;
      localStorage.currentPage = null;
      localStorage.bandera = null;
  },
  computed: {
    tablaVacia: function (){
      return this.anuncios == null;
    },

  },
  methods: {
    limpiar(){
      this.idCategoria= '';
      this.idColor = '';
      this.idTamano = '';
      this.idRaza = '';
      this.imagen = '';
      this.idEdad = '';
      this.idLongevidad = '';
      this.idPeso = '';
      this.precio = '';
      this.idAguas = '';
    },
    redireccion(idAnuncio){
    //Guardamos información en la vista
    localStorage.setItem('anuncios', JSON.stringify(this.anuncios));
    localStorage.rows = this.rows;
    localStorage.idCategoria = this.idCategoria;
    localStorage.precio = this.precio;
    localStorage.idColor = this.idColor;
    localStorage.idTamano = this.idTamano;
    localStorage.idRaza = this.idRaza;
    localStorage.idPeso = this.idPeso;
    localStorage.idEdad = this.idPeso;
    localStorage.idAguas = this.idAguas;
    localStorage.idLongevidad = this.idLongevidad;

    this.bandera = true;
    localStorage.bandera = this.bandera;
    router.push({path:'/ui/detalle-producto/'+idAnuncio}).catch(()=>{});
    },
    lista(){
      this.isActive= false;
      this.notActive= true;
    },
    mosaico(){
      this.isActive= true;
      this.notActive= false;
    },
    buscarAnuncios(numero) {
      console.log(numero);
      let envio= []
      if(this.idPeso != ''){
        envio.push(this.idPeso)
      }
      if(this.idRaza != ''){
        envio.push(this.idRaza)
      }
      if(this.idColor != ''){
        envio.push(this.idColor)
      }
      if(this.idTamano != ''){
        envio.push(this.idTamano)
      }
      if(this.idEdad != ''){
        envio.push(this.idEdad)
      }
      if(this.idLongevidad != ''){
        envio.push(this.idLongevidad)
      }
      if(this.idAguas != ''){
        envio.push(this.idAguas)
      }
      axios.post("/api/anuncio/filter.json", {
          precio: this.precio,
          idCategoria: this.idCategoria,
          numPaginas: numero,
          tamPaginas: this.perPage,
          atributos: envio
        })
        .then((response) => {
          this.anuncios = response.data.listaAnuncios;
          this.rows = response.data.totalAnuncios;
          this.currentPage = numero;
          localStorage.currentPage = numero;
          if(this.rows===0){
            this.anuncios=null;
          }
          //Guardamos información en la vista
          localStorage.setItem('anuncios', JSON.stringify(response.data.listaAnuncios));
          localStorage.rows = response.data.totalAnuncios;
          localStorage.idCategoria = this.idCategoria;
          localStorage.precio = this.precio;
          localStorage.idColor = this.idColor;
          localStorage.idTamano = this.idTamano;
          localStorage.idRaza = this.idRaza;
          localStorage.idPeso = this.idPeso;
          localStorage.idEdad = this.idPeso;
          localStorage.idAguas = this.idAguas;
          localStorage.idLongevidad = this.idLongevidad;
        });
    },
    cargaInicial(idCat){
      console.log();
      if(idCat!=null && idCat!=0){
        this.idCategoria=idCat;
        this.buscarAnuncios(1);
      }
    }
  }
}
</script>

<style>
.none{
  display: none;
}
.raya{
  border-bottom: .5px solid #979797;
}
.topAlign{
  vertical-align: top;
}
.padding {
  padding: 1%;
}
.inline {
  display: inline-block!important;
}

.estiloAcciones{
  font-size: 20px;
  line-height: 50px;
  text-align: center;
  width: 50px;
  height: 20px;
}

.ancho {
  max-width: 80%;
}
@media (max-width: 600px) {
  .ancho {
    max-width: 90%;
  }
}
.puntitosTitulo{
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
.puntitosShort{
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  display: -webkit-box;
}
.puntitosLarge{
  white-space: normal;
  text-overflow: ellipsis;
  overflow: auto;
  -webkit-line-clamp: 5;
  -webkit-box-orient: vertical;
   display: -webkit-box;
}
.card-petstore {
  width:100% !important;
  height:15vh !important;
  object-fit:fill !important;
}
.card-petstore-notActive {
  width:100% !important;
  height:40vh !important;
  object-fit:fill !important;
}
</style>