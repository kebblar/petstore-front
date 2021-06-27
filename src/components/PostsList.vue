<template>

  <div class="ancho centra">

    <div class="card" style="width: 600px;">
        <div class="card-header">
            <div class="row">
                <div class="col-sm-12">
                    <label>Lista de anuncios activos</label>
                </div>
            </div>
        </div><!-- ends header-->
        <div class="card-body">
            <div class="row">
                <div class="col-sm-12 text-left">
                    <ul v-for="url in resultado"  :key="url.id">
                      <li><a href="#" @click=salta(url.searchUrl) >{{ getUrl(url.searchUrl) }}</a></li> 
                    </ul>
                </div>
            </div>
        </div><!-- ends body -->
    </div><!-- ends card -->

  </div>
  
</template>

<script>
// http://localhost:8080/posts/
import axios from 'axios';
import router from '../router';

export default {
    data: function () {
        return {
          urlBase: window.location.origin,
          resultado:[]
        }
    },
    methods: {
      salta(data) {
        router.push( {path: this.build(data) } );
      },
      getUrl(data) {
        return this.urlBase + this.build(data);
      },
      build(data){
        var n = data.indexOf("-");
        var parte1 = data.substring(0,n);
        var parte2 = data.substring(n+1);
        return '/posts/search/' + parte2 + "/" + parte1 + "/";
      }
    },
    created() {
      document.title = 'Petstore Ultrasist - Listado de anuncios activos';
      axios.get('api/content/all', {
      }).then(response => {
          this.resultado = response.data;
      }).catch(error => {
        if(error.response) {
          console.log(error.response);
        } else {
          console.log(error);
        }
        router.push('/ui/not-found');
      }).finally(
        //console.log('finaliza proceso de solicitud info via url path vars')
      );
    } // created

}
</script>

<style scoped>
.ancho {
    max-width: 600px;
}
</style>
