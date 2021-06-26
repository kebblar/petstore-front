<template>
  <div>
    <h3>Registro Aideé</h3>
    <ul>
      <li>{{a}}</li>
      <li>{{b}}</li>
      <li>{{c}}</li>
      <li>{{d}}</li>
      <li>{{e}}</li>
      <li>{{f}}</li>
      <b-button>Hola Mundo</b-button>
    </ul>
  </div>
</template>

<script>
import Vue from 'vue'
import store from '../store'
import axios from 'axios';
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)

export default {
    data: function () {
        return {
          a: store.state.session.nombreCompleto,
          b: store.state.session.correo,
          c: store.state.session.jwt,
          d: store.state.session.ultimoAcceso,
          e: store.state.session.roles,
          f: store.state.destination
        }
    },
    mounted() {
      var seccion = this.$route.params.seccion;
      var descripcion = this.$route.params.descripcion;

      axios.get('api/content/'+seccion+'/'+descripcion, {
      }).then(response => {
        console.log(response);
        console.log(response.data);
        console.log(response.status);
      }).catch(error => {
        if(error.response) {
            console.log(error);
        }
      }).finally(
        console.log('finaliza proceso de solicitud de regeneracion de clave')
      );

    }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
h3 {
  margin: 40px 0 0;
  display: block;
  margin-top: 2.7em;
  font-weight: bold;
  color: rgb(7, 7, 7);
}
</style>
