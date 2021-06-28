<template>

  <div class="ancho centra">

    <div class="card" style="width: 600px;">
        <div class="card-header">
            <div class="row">
                <div class="col-sm-12">
                    <label>Detalle de anuncio <a href="#" @click="goBack" >[Regresar al Listado]</a></label>
                </div>
            </div>
        </div><!-- ends header-->
        <div class="card-body">
            <div class="row">
                <div class="col-sm-12 text-left">
                    <ul>
                      <li>{{unico.id}}</li>
                      <li>{{unico.folio}}</li>
                      <li>{{unico.titulo}}</li>
                      <li><span v-html="unico.descripcion" /></li>
                      <li>{{unico.precio}}</li>
                    </ul>
                </div>
            </div>
        </div>
    </div>

  </div>
  
</template>

<script>
// http://localhost:8080/post/search/prueba-imagen/13
import axios from 'axios';
import router from '../router';

export default {
    data: function () {
        return {
          unico:[],
          urlBase : process.env.VUE_APP_URL
        }
    },
    methods: {
      goBack() {
        router.push("/posts/");
      },
      build(data){
        var n = data.indexOf("-");
        var parte1 = data.substring(0,n);
        var parte2 = data.substring(n+1);
        return 'Petstore Ultrasist - ' + parte2 + " - [" + parte1 + "]";
      }
    },
    created() {
      axios.get('api/content/' + this.$route.params.id + "-" + this.$route.params.descripcion , {
      }).then(response => {
          this.unico = response.data[0];
          document.title = this.build(response.data[0].searchUrl);
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
    }
}
</script>

<style scoped>
.ancho {
    max-width: 600px;
}
</style>
