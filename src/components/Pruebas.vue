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
      <h1>{{ resultado }}</h1>
      <h1>{{ status }}</h1>
    </ul>
  </div>
</template>

<script>
import store from '../store'
import axios from 'axios';

export default {
    data: function () {
        return {
          a: store.state.session.nombreCompleto,
          b: store.state.session.correo,
          c: store.state.session.jwt,
          d: store.state.session.ultimoAcceso,
          e: store.state.session.roles,
          f: store.state.destination,
          resultado:[],
          status:''
        }
    },
    mounted() {
      var seccion = this.$route.params.seccion;
      var descripcion = this.$route.params.descripcion;

      axios.get('api/content/'+seccion+'/'+descripcion, {
      }).then(response => {
        this.status = response.status;
        this.resultado = response.data;
      }).catch(error => {
        if(error.response) {
          console.log(error.response);
        } else {
          console.log(error);
        }
      }).finally(
        console.log('finaliza proceso de solicitud info via url path vars')
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
