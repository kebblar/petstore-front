<template>
  <div>

    <div class="categorias">
      <h3>Confirma Registro !!!</h3>
      <ul>
        <li><input type="text" :value=this.a /></li>
      </ul>
    </div>



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
          f: store.state.destination
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

.categorias {
  width: 400px;
  margin: auto;
  margin-top: -50px;
  background-color:blue;
}


.footer2 {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  background-color: red;
  color: white;
  text-align: center;
}

</style>
