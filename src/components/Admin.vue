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
      <li>{{g}}</li>
    </ul>
  </div>
</template>

<script>
import store from '../store'

export default {
    data: function () {
        return {
          a: store.state.session.nombreCompleto,
          b: store.state.session.correo,
          c: store.state.session.jwt,
          d: store.state.session.ultimoAcceso,
          e: store.state.session.roles,
          f: store.state.destination,
          g: store.state.session.idUser
        }
    },
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
