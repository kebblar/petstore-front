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
                <option :value="m.id" v-for="m in categorias" :key="m.id">{{m.valor}}</option>
              </select>
            </div>
          </div>
          <div class ="form-row form-group col-md-10">
            <div class="col-md-12">
              <label for="nombre">Precio :</label>
            </div>
            <div class="col-md-12">
              <input type="text" required class="form-control letrasBusqueda" :class="classPrecio" placeholder="0.00" v-model="precio" maxlength="10" size="10">
              <small class="notValid">{{msgPrecio}}</small>
            </div>
          </div>
          <div class="form-row form-group col-md-10">
            <div class="col-md-12">
              <label for="mun">Color :</label>
            </div>
            <div class="letraBusqueda col-md-12">
              <select id="idColor" class="form-control" style="font-size:11px;" v-model="idColor">
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
                <option :value="m.id" v-for="m in longevidades" :key="m.id">{{m.valor}}</option>
              </select>
            </div>
          </div>  
          <div class="form-row form-group col-md-10">
            <div class="col-md-12">
              <label for="mun">Tipo de agua :</label>
            </div>
            <div class="letraBusqueda col-md-12">
              <select id="idAguas" class="form-control" style="font-size:11px;" v-model="idAguas">
                <option :value="m.id" v-for="m in aguas" :key="m.id">{{m.valor}}</option>
              </select>
            </div>
          </div>     
          <div class="row col-md-10">
            <div class="col-xs-12 col-md-10 offset-md-6">
              <button type="button" class="col-xs-6 text-center btn btn-primary font-weight-bold "
                  @click="limpiar()" >LImpiar</button>&nbsp;
              <button type="button" class="col-xs-6 text-center btn btn-success font-weight-bold "
                  @click="testEvento(1)">Buscar</button>
            </div>
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
            <div >
              <b-card-group v-for="(entry, i) in anuncios" :key="i" class="inline padding" v-bind:class="{ 'col-md-4': isActive, 'col-md-12': notActive }"> 
                <b-card :title=" entry.titulo " :img-src="ruta + entry.imagenes[0].uuid" img-alt="Image" img-top >
                <b-card-sub-title class="mb-2">{{ entry.descCategoria }}</b-card-sub-title>
                  <b-card-text>
                    {{ entry.descripcion }}
                  </b-card-text>
                  <b-card-text>
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
              class="mt-4 text-center"
            >
              <template #first-text
                ><span @click="testEvento(1)" class="text-success"
                  >Primero</span
                ></template
              >
              <template v-if="currentPage != 1" #prev-text
                ><span @click="testEvento(currentPage)" class="text-danger"
                  >Anterior</span
                ></template
              >
              <template v-if="rows / perPage != currentPage" #next-text
                ><span @click="testEvento(currentPage)" class="text-warning"
                  >Siguiente</span
                ></template
              >
              <template #last-text
                ><span @click="testEvento(currentPage)" class="text-info"
                  >Último</span
                ></template
              >
              <template #page="{ page, active }">
                <b @click="testEvento(currentPage)" v-if="active">{{ page }}</b>
                <b @click="testEvento(currentPage)" v-else>{{ page }}</b>
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
    this.ruta = process.env.VUE_APP_URL+"upload/";
  },

  data(){
    return {

      isActive: true,     
      notActive: false,
      
      ruta:'',
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


      categorias : [
        { id: 1, valor: "Caninos" },
        { id: 2, valor: "Felinos" },
        { id: 3, valor: "Aracnidos" },
        { id: 4, valor: "Reptiles" },
        { id: 5, valor: "Peces" },
        { id: 6, valor: "Aves" },
        { id: 7, valor: "Roedores" },
      ],
      colores : [
        { id: 1, valor: "Blanco" },
        { id: 2, valor: "Negro" },
        { id: 3, valor: "Cafe" },
        { id: 4, valor: "Azul" },
        { id: 5, valor: "Amarillo" },
        { id: 6, valor: "Verde" },
        { id: 7, valor: "Dorado" },
        { id: 8, valor: "Plateado" },
        { id: 9, valor: "Gris" },
        { id: 10, valor: "Rosa" },
        { id: 11, valor: "Mixto" }
      ],
      tamanos : [
        { id: 1, valor: "Chico" },
        { id: 2, valor: "Mediano" },
        { id: 3, valor: "Grande" },
        { id: 4, valor: "Enorme" }
      ],
      razas : [
        { id: 1, valor: "Terranova" },
        { id: 2, valor: "Maltes" },
        { id: 3, valor: "Golden Retrievers" },
        { id: 4, valor: "Huskie Siberiano" },
        { id: 5, valor: "Poodles" },
        { id: 6, valor: "Beagles" },
        { id: 7, valor: "Pastor Alemán" },
        { id: 8, valor: "Corgis" },
        { id: 9, valor: "Labrador" },
        { id: 10, valor: "Chihuahua" },
        { id: 11, valor: "Mestizo" },
        { id: 12, valor: "Pug" },
        { id: 13, valor: "Bulldog" }
      ],
      edades : [
        { id: 1, valor: "Menos de 1 mes" },
        { id: 2, valor: "De 1 a 6 meses" },
        { id: 3, valor: "De 6 a 12 meses" },
        { id: 4, valor: "De 1 a 2 años" },
        { id: 5, valor: "De 2 a 3 años" },
        { id: 6, valor: "De 3 a 4 años" },
        { id: 7, valor: "De 4 a 5 años" },
        { id: 8, valor: "De 5 a 6 años" },
        { id: 9, valor: "De 6 a 7 años" },
        { id: 10, valor: "De 7 a 8 años" },
        { id: 11, valor: "De 8 a 9 años" },
        { id: 12, valor: "De 9 a 10 años" },
        { id: 13, valor: "Más de 10 años" }
      ],
      pesos : [
        { id: 1, valor: "Menos de 1 kg" },
        { id: 2, valor: "Entre 1 y 2 kg" },
        { id: 3, valor: "Entre 2 y 5 kg" },
        { id: 4, valor: "Entre 5 y 10 kg" },
        { id: 5, valor: "Entre 10 y 20 kg" },
        { id: 6, valor: "Mas de 20 kg" }
      ],
      longevidades : [
        { id: 1, valor: "Menos de 1 año" },
        { id: 2, valor: "De 1 a 2 años" },
        { id: 3, valor: "De 2 a 5 años" },
        { id: 4, valor: "De 5 a 10 años" },
        { id: 5, valor: "De 10 a 15 años" },
        { id: 6, valor: "De 15 a 20 años" },
        { id: 7, valor: "De 20 a 30 años" },
        { id: 8, valor: "Mas de 30 años" }
      ],
      aguas : [
        { id: 1, valor: "Agua Dulce" },
        { id: 2, valor: "Agua Salada" },
        { id: 3, valor: "Dulce y Salada" }
      ],
      
      anuncios: [
        
      ],

      currentPage: null,
      rows: null,
      perPage: 2,
    }
  },
  created(){
    this.anuncios= null

  },
  computed: {
    tablaVacia: function (){
      return this.anuncios == null;
      //return this.metodosPago == null;
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
 
    testEvento(numero) {
      // this.anuncios.splice(0);
      console.log(numero);
      
      
      let envio= [
      ]
      if(this.idPeso != '')
      {
        envio.push({id: 1, valor: this.idPeso})
      }
      if(this.idRaza != '')
      {
        envio.push({id: 2, valor: this.idRaza})
      }
      if(this.idColor != '')
      {
        envio.push({id: 3, valor: this.idColor})
      }
      if(this.idTamano != '')
      {
        envio.push({id: 4, valor: this.idTamano})
      }
      if(this.idEdad != '')
      {
        envio.push({id: 5, valor: this.idEdad})
      }
      if(this.idLongevidad != '')
      {
        envio.push({id: 6, valor: this.idLongevidad})
      }
      if(this.idAguas != '')
      {
        envio.push({id: 7, valor: this.idAguas})
      }

      console.log(envio)
      axios
        .post("/api/anuncio/filter.json", {
          precio: this.precio,   
          idCategoria: this.idCategoria,
          numPaginas: numero,
          tamPaginas: this.perPage,
          atributos: envio
          
        })
        .then((response) => {
          console.log(response.data);
          this.anuncios = response.data.listaAnuncios;
          //this.metodosPago = this.metodosPagoDatos;
          this.rows = response.data.totalAnuncios;
          this.currentPage = numero;
          console.log(this.currentPage);
          if(this.rows===0){
            this.anuncios=null;
          }
          
          //totalpaginas
        });


      // let contador = (numero==1)?1:(numero*this.perPage)-this.perPage;
      // for (let a=0; a<this.perPage; a++){
      //   this.anuncios.push({
      //       "sku": contador,
      //       "titulo": "Titulo",
      //       "categoria": "canino",
      //       "fechaInicioVigencia": "12/01/2021",
      //       "fechaFinVigencia": "12/01/2021",
      //       "idCategoria": "1",
      //       "estatus": "eliminado",
      //       "precio": "100"
      //   });
      //   contador++;
      // }
    },
    buscarAnuncios() {
      this.anuncios = this.metodosPagoDatos;
      // axios
      //   .post("/api/anuncio/search.json", {
      //     sku: this.sku,
      //     titulo: this.titulo,
      //     fechaInicioVigencia: this.fInicialV,
      //     fechaFinVigencia: this.fFinalV,
      //     estatus: this.idEstatus,
      //     idCategoria: this.idCategoria,
      //     numPaginas: this.currentPage,
      //     tamPaginas: this.perPage,
      //   })
      //   .then((response) => {
      //     console.log(response.data);
      //     //this.anuncios = response.data.listaAnuncios;
      //     this.anuncios = this.metodosPagoDatos;
      //     //this.rows = response.data.totalAnuncios;
      //     //totalpaginas
      //   });
    },
    
  }
}
</script>

<style>
.raya{
  border-bottom: .5px solid #979797;
}
.topAlign{
  vertical-align: top;
}
.padding {
  padding: 1%;
}
.form-row, .inline {
  display: inline-block!important;
}

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
.letrasBusqueda{
  font-size: 14px;
}
.estiloAcciones{
  font-size: 20px;
  line-height: 50px;
  text-align: center;
  width: 50px;
  height: 20px;
}
.pagination {
  display: flex;
  justify-content: center;
}
.ancho {
  max-width: 80%;
}
@media (max-width: 600px) {  
.ancho {
  max-width: 90%;
}
}
</style>