<template>
    <div class="card">
        <div class="card-header">
            <div class="row">
                <div class="col-sm-12">
                    <h5>{{ titulo }}</h5>
                </div>
            </div>
        </div><!-- ends header-->

        <div class="card-body">
            <vue-dropzone 
                ref="myVueDropzone" 
                id="myVueDropzone" 
                v-on:vdropzone-sending="sendingEvent"
                v-on:vdropzone-success="successEvent"
                v-on:vdropzone-error="errorEvent"
                :options="dropzoneOptions">
            </vue-dropzone>
        </div>
        <button @click="sube" type="button" class="btn btn-lg btn-primary" >Carga archivos</button>

        <div class="row col-12">
            <table class="table">
              <thead class="text-center">
                <tr>
                  <th>
                    Imagen
                  </th>
                  <th>
                    Archivo
                  </th>
                  <th>
                    Nombre servidor
                  </th>
                  <th>
                    
                  </th>
                  <th>
                    Principal
                  </th>
                </tr>
              </thead>
              <tbody>
                  <tr v-for="(item, index) in imagenes" :key="index">
                    <td> 
                      <!-- <img :src="ruta+item.uuid" class="img-fluid" width="150px" height="150px" /><br/> -->
                    </td> 
                    <td>
                      <p class="mb-0">{{ item.imagen }}</p>
                    </td>
                    <td class="text-center">
                      <p class="mb-0">{{ item.uuid }}</p>
                    </td>
                    <td>
                          <b-icon class="h1" icon="trash-fill" aria-hidden="true" 
                            style="color:red;font-size: 2rem;cursor:hand" :id="index" @click="eliminarImagen(index,item)"
                            title="Elimina la imagen">
                        </b-icon>  
                    </td>
                    <td>
                      <template>
                        <div>
                          <b-form-group label="" >
                            <b-form-radio v-model="selected"  @change="seleccionarImagen(item)" name="some-radios" :value="item.principal"></b-form-radio>
                          </b-form-group>
                        </div>
                      </template>
                    </td>
                  </tr>
              </tbody>
            </table>
        </div>
    </div>
</template>

<script>
import Vue from "vue";
import Vue2Dropzone from 'vue2-dropzone';
import 'vue2-dropzone/dist/vue2Dropzone.min.css';
import axios from 'axios';
import store from '../../store';
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import "vue-toast-notification/dist/theme-sugar.css";
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)

export default {
  components: {
    vueDropzone: Vue2Dropzone
  },
  props:['imagenes','id'],
	mounted(){
    this.ruta = process.env.VUE_APP_URL + "upload/";
	}, 
  created(){
    this.dropzoneOptions = {
          url: this.calcula(),
          maxFilesize: 0.5,
          thumbnailWidth: 140,
          thumbnailMethod: 'contain',
          addRemoveLinks: true,
          dictRemoveFile: 'Eliminar',
          dictDefaultMessage: 'Arrastra y suelta tus archivos a subir aqui.',
          destroyDropzone: false,
          headers: {
            "jwt": store.state.session.jwt,
          }, 
          autoProcessQueue: false, // Make sure the files aren't queued until manually added
      };
  },
  data: function () {
    return {
        ruta:'',
        titulo: 'Interfase de carga de imágenes',
        selected: 'true',
    }
  }, 
  methods: {
        calcula: function() {
            return axios.defaults.baseURL + 'api/anuncios/imagen.json';
        },
        sube: function() {
            console.log('subeeeeeeeee');
            this.$refs.myVueDropzone.processQueue();
        },
        sendingEvent (file, xhr, formData) {
          console.log("file "+file , xhr, formData);
          xhr.setRequestHeader('idAnuncio', this.id );
        },
        successEvent(file,response){
            console.log("--> successEvent "+file +" response "+response);
  
            this.imagenes.push(response);
        },
        errorEvent(file){
            console.log("--> errorEvent "+file );
        },
        eliminarImagen(index,item){
           axios.delete('api/anuncios/imagen.json',{headers: {uuid: item.uuid}
           }).then(response => {
               console.log("--> "+response);
               this.$delete(this.imagenes, index);
            }).catch(error => {
                console.log("--> error "+error);
            }); 
        },
        seleccionarImagen(item){
            axios.put('api/anuncios/imagen/principal.json',  { 
            idAnuncio:item.idAnuncio,
            uuid: item.uuid
          }).then(response => {
            console.log("--> "+response);
          }).catch(error => {
            console.log("--> error "+error);            
          });
        }
        
  }
}
</script>