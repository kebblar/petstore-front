<template>
  <div>
    <h3>Regenera Clave</h3>
    <a @click="regresa">regresa</a>
    <h3>{{valor}}</h3>

    <ul v-for="rol in roles" :key="rol.id">
       <li>ID: {{rol.id}}  NOMBRE: {{rol.nombre}}  ACTIVO: {{rol.activo}}</li>
    </ul>

    <a @click="desastre">desastre</a>

  </div>
</template>

<script>
import store from '../store';
import router from '../router';

export default {
    data() {
      return {
        valor: store.state.session.jwt,
        roles: store.state.session.roles
      }
    },
    methods: {
      regresa: function() {
        router.push('reg');
      },
      desastre: function() {
        this.roles = [
          {id:7, nombre:'x', activo:false},
          {id:8, nombre:'y', activo:true}
          ];
      }
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
