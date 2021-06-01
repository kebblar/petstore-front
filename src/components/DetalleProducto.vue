<template>
  <div class="centra">
    <b-container>
      <div v-if="error">
        <b-row class="align-items-center">
          <b-col cols="4"> <img src="@/assets/logo.png"/></b-col>
          <b-col cols="8"> <b-alert v-model="error" variant="danger">
          {{descripcionError}}
        </b-alert></b-col>
        </b-row>
        <b-row class="align-items-end">
          <b-col cols="9">
          </b-col>
          <b-col cols="3">
            <b-button block variant="danger">
                      <b-icon style="margin-right: 2%"
                        icon="arrow-left-circle-fill"
                        aria-hidden="true"></b-icon>Regresar</b-button>
          </b-col>
        </b-row>
       
      </div>
      <div v-else>
        <b-card no-body class="overflow-hidden" style="max-width: 100%;">
          <div class="card-header text-center">
            <div class="row align-items-center">
              <div class="col-md-12">
                <h4>{{titulo}}</h4>
              </div>
            </div>
          </div>
          <b-row no-gutters>
            <b-col md="7">
              <div>
                <hooper group="group1" style="height: 400px; padding: 2%">               
                  <slide v-for="imagen in imagenes" :key="imagen.uuid">
                    <b-card-img
                      :src="ruta +imagen.uuid"
                      alt="Image"
                      class="rounded-0">
                    </b-card-img>
                  </slide>
                </hooper>

                <hooper group="group1" :itemsToShow="4" :centerMode="true" style="padding: 1%">
                  <slide v-for="imagen in imagenes" :key="imagen.uuid">
                    <b-card-img
                      :src="ruta +imagen.uuid"
                      alt="Image" 
                      style="width: 150px;">
                    </b-card-img>
                  </slide>
                  <hooper-navigation slot="hooper-addons"></hooper-navigation>
                  <hooper-pagination slot="hooper-addons"></hooper-pagination>
                </hooper>
              </div>
            </b-col>
            <b-col md="5">
              <b-card-body>
                <b-card-text>
                  <br />
                  <h1 class="text-success">$ {{precio}}</h1>
                  <br />
                    <p>{{descripcion}}</p>
                  <br/>
                  <div>
                    <b-table :items="atributos" :fields="fields" responsive style="align:center;">

                    </b-table>
                  </div>
                  <div>
                    <b-button v-if="!esAdmin" block variant="success"  @click="comprar">
                      <b-icon style="margin-right: 2%"
                        icon="check-circle-fill"
                        aria-hidden="true"></b-icon>Comprar</b-button>
                    <b-button block variant="danger" @click="regresar">
                      <b-icon style="margin-right: 2%"
                        icon="arrow-left-circle-fill"
                        aria-hidden="true"></b-icon>Regresar</b-button>
                  </div>
                </b-card-text>
              </b-card-body>
            </b-col>
          </b-row>
        </b-card>
      </div>
    </b-container>
  </div>
</template>
<script>
  import store from '../store'
  import {
    Hooper,
    Slide,
    Pagination as HooperPagination,
    Navigation as HooperNavigation,
  } from "hooper";
  import "hooper/dist/hooper.css";
  import axios from 'axios';
  import router from '../router'
  export default {
    name: "DetalleProducto",
    components: {
      Hooper,
      Slide,
      HooperPagination,
      HooperNavigation,
    },
   mounted () {
      this.cargarDetalle(this.idprod),
      this.ruta = process.env.VUE_APP_URL+"upload/";
      this.esAdmin = store.state.session.roles[0].nombre == 'admin';
    },
    data() {
      return {
        esAdmin:false,
        slide: 0,
        sliding: null,
        error:true,
        descripcionError:'',
        ruta:'',
        idprod:this.$route.params.idp,
        titulo:'',
        precio:'',
        descripcion:'',
        atributos :[],
        imagenes: [],
        fields: [{
            key: 'caracteristica',
            label: 'Caracteristicas'
          },
          {
            key: 'valor',
            label: ''
          }],
      };
    },
    methods: {
      onSlideStart(slide) {
        this.sliding = true;
        console.log(slide);
      },
      onSlideEnd(slide) {
        this.sliding = false;
        console.log(slide);
      },
      cargarDetalle(idProd){
        console.log(idProd);
        axios.get('/api/anuncios/'+idProd+'.json', {}).then(response => {
          this.error=false;
          this.titulo=response.data.titulo;
          this.precio=response.data.precio;
          this.descripcion=response.data.descripcion;
          if(response.data.atributos!=null){
            response.data.atributos.forEach(i=>{
              console.log("indice: "+i.descAtributo+", valor: "+i.descValor);
              this.atributos.push({ 'caracteristica':i.descAtributo,'valor': i.descValor});
            });
          }
          if(response.data.imagenes!=null){
            this.imagenes = response.data.imagenes;
           /*  response.data.imagenes.forEach(i=>{
              console.log("imagen: "+this.ruta+""+i.uuid);
             // let itemImagen=[{'uuid':this.ruta+""+i.uuid}];
              this.imagenes.push(itemImagen);
            }); */
          }
        }).catch(e => {
          console.log(e);
          console.log(e.response.data);
          console.log(+e.response.data.exceptionLongDescription);
          this.error=true;
          this.descripcionError=e.response.data.exceptionLongDescription;
        });
      },
      comprar(){
        let id=this.idprod;
        console.log("Va a la pantalla de compras: "+id);
        router.push({path:"ui/detalle-pago"});
      },
      regresar(){
        console.log("regresa a busqueda");
        //router.go(-1);
        router.back()
      }
    },
  }
</script>
<style scoped>
.hooper-slide {
  display: flex;
  justify-content: center;
  align-items: center;

}
.hooper-pagination {
  position: absolute;
  bottom: 0;
  right: 50%;
  transform: translateX(50%);
  display: flex;
  padding-bottom: 30px ;
}
</style>