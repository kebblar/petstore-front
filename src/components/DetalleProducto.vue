<template>
  <div class="centra">
    <b-container>
      <div v-if="error">
        <b-row class="align-items-center">
          <b-col cols="4"> <img src="@/assets/logo.png" /></b-col>
          <b-col cols="8">
            <b-alert v-model="error" variant="danger">
              {{ descripcionError }}
            </b-alert></b-col
          >
        </b-row>
        <b-row class="align-items-end">
          <b-col cols="9"> </b-col>
          <b-col cols="3">
            <b-button block variant="danger" @click="regresar">
              <b-icon
                style="margin-right: 2%"
                icon="arrow-left-circle-fill"
                aria-hidden="true"
              ></b-icon
              >Regresar</b-button>
          </b-col>
        </b-row>
      </div>
      <div v-else>
        <b-card no-body class="overflow-hidden" style="max-width: 100%">
          <div class="card-header text-center">
            <div class="row align-items-center">
              <div class="col-md-12">
                <h4>{{ titulo }}</h4>
              </div>
            </div>
          </div>
          <b-row no-gutters>
            <b-col md="7">
              <div>
                <hooper 
                :autoPlay="true"
                :playSpeed=5000
                :centerMode="true"
                :infiniteScroll="true" 
                group="group1" style="height: 50vh; width:100%; padding: 2%">

                 <slide v-for="imagen in imagenes" :key="imagen.uuid">
                    <b-card-img v-if="imagen.idTipo!=4 && imagen.idTipo!=5"
                      :src="ruta + imagen.uuid"
                      alt="Image"
                      class="card-img-top card-petstore-detalle">
                    </b-card-img>
                    <video v-if="imagen.idTipo==4 || imagen.idTipo==5" class="video-fluid" autoplay loop muted style="height: 50vh; width:100%; padding: 2%">
                      <source :src="rutaVideo + imagen.uuid" type="video/mp4" />
                    </video>
                  </slide>
                </hooper>
               <hooper
                  group="group1"
                  :itemsToShow="4"
                  :centerMode="true"
                  style="padding: 1%">
                  <slide v-for="imagen in imagenes" :key="imagen.uuid">
                    <b-card-img v-if="imagen.idTipo!=4 && imagen.idTipo!=5"
                      :src="ruta + imagen.uuid"
                      alt="Image"
                      style="height: 15vh; width:15vh;">
                    </b-card-img>
                      <video v-if="imagen.idTipo==4 || imagen.idTipo==5" class="video-fluid" autoplay loop muted style="height: 15vh; width:15vh;">
                        <source :src="rutaVideo + imagen.uuid"  type="video/mp4" />
                      </video>
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
                  <h1 class="text-success">$ {{ precio }}</h1>
                  <br />
                  <p v-html="descripcion">{{ descripcion }}</p>
                  <br />
                  <div>
                    <b-table
                      :items="atributos"
                      :fields="fields"
                      responsive
                      style="align: center">
                    </b-table>
                  </div>
                  <div>
                    <b-button
                      v-if="habilitaCompra"
                      block
                      variant="success"
                      @click="comprar">
                      <b-icon
                        style="margin-right: 2%"
                        icon="check-circle-fill"
                        aria-hidden="true"
                      ></b-icon
                      >Agregar al Carrito</b-button
                    >

                    <modal
                        name="aviso"
                        :clickToClose="false"
                        :reset="true"
                        :width="480"
                        :height="260">
                      <div class="card">
                        <div class="card-header" style="text-align:center">Advertencia del sistema</div>
                        <div class="card-body">
                          <h5 class="card-title">{{texto}}</h5>
                          <p class="card-text">{{ descripcionModal }}</p>
                          <div style="text-align: right;">
                            <a href="#" class="btn btn-primary" @click="closeModal">Aceptar</a>
                          </div>
                        </div>
                      </div>
                    </modal>

                    <b-button block variant="danger" @click="regresar">
                      <b-icon
                        style="margin-right: 2%"
                        icon="arrow-left-circle-fill"
                        aria-hidden="true"></b-icon>Regresar
                      </b-button>
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
import store from "../store";
import {
  Hooper,
  Slide,
  Pagination as HooperPagination,
  Navigation as HooperNavigation,
} from "hooper";
import "hooper/dist/hooper.css";
import axios from "axios";
import router from "../router";

export default {
  name: "DetalleProducto",
  components: {
    Hooper,
    Slide,
    HooperPagination,
    HooperNavigation,
  },
  mounted() {
    this.cargarDetalle(this.idprod),
    this.ruta = process.env.VUE_APP_URL_MEDIA;
    this.rutaVideo = process.env.VUE_APP_URL_MEDIA_VIDEO;
    
    console.log('----------------------------------->'+this.ruta);
    if(store.state.session.correo!=null){
      this.habilitaCompra = store.state.session.roles[0].nombre != "admin";
    }else{
      this.habilitaCompra=false;
    }
  },
  data() {
    return {
      habilitaCompra: false,
      slide: 0,
      sliding: null,
      error: true,
      descripcionError: "",
      ruta: "",
      rutaVideo:"",
      idprod: this.$route.params.idp,
      titulo: "",
      precio: "",
      descripcion: "",
      atributos: [],
      imagenes: [],
      fields: [
        {
          key: "caracteristica",
          label: "Caracteristicas",
        },
        {
          key: "valor",
          label: "",
        },
      ],
      texto : '',
      descripcionModal : ''

    };
  },
  methods: {
    actualiza() {
      axios.get('/api/carritoVista/'+store.state.session.idUser+'.json', {}).then(response => {
        store.commit('setCarrito', response.data);
        console.log(response.data);
      }).catch(e => {
        console.log(e);
      });
    },
    closeModal: function() {
      this.$modal.hide('aviso');
    },
    onSlideStart(slide) {
      this.sliding = true;
      console.log(slide);
    },
    onSlideEnd(slide) {
      this.sliding = false;
      console.log(slide);
    },
    cargarDetalle(idProd) {
      axios
        .get("/api/anuncios/" + idProd + ".json", {})
        .then((response) => {
          this.error = false;
          this.titulo = response.data.titulo;
          this.precio = response.data.precio;
          this.descripcion = response.data.descripcion;
          if (response.data.atributos != null) {
            response.data.atributos.forEach((i) => {
              console.log(
                "indice: " + i.nombreAtributo + ", valor: " + i.rango
              );
              this.atributos.push({
                caracteristica: i.nombreAtributo,
                valor: i.rango,
              });
            });
          }
          if (response.data.imagenes != null) {
            this.imagenes = response.data.imagenes;
          }
        })
        .catch((e) => { 
          console.log(e);
          console.log(e.response.data);
          console.log(+e.response.data.exceptionLongDescription);
          this.error = true;
          this.descripcionError = e.response.data.exceptionLongDescription;
        });
    },
    comprar() {
      let id = this.idprod;
      axios.post("/api/carrito.json", {"cveOrdenCompra": "string",
                                       "id": 0,
                                       "idAnuncio": id,
                                       "idUsuario": store.state.session.idUser}).then(response => {
        console.log(response);
        this.$modal.show('aviso');
        this.texto = "¡Éxito!"
        this.descripcionModal = "Se ha agregado la mascota al carrito."
        this.actualiza();
      }).catch(error => {
        console.log(error);
      })
    },
    regresar() {
      console.log("regresa a busqueda");
      router.back();
    },
  },
};
</script>

<style scoped>
.card-petstore-detalle{
  height: 50vh !important;
  object-fit: unset;
}
.hooper-pagination {
  position: absolute;
  bottom: 0;
  right: 50%;
  transform: translateX(50%);
  display: inline;
  padding-bottom: 30px;
}
</style>