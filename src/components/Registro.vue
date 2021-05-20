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
          f: store.state.destination
        }
    },
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.align {
 text-align: left;
}

.notValid{
  color:red;
}

.greenColor:focus{
  border-color:green;
  background-color: #eefaee;
}

.correct{
  border-color:green;
}

.redColor:focus{
  border-color:red;
  background-color: #f0e4e4;
}

.incorrect{
  border-color:red;
}

.defaultColor{
  border-Color:rgba(165, 183, 190, 0.918);
  background-color: white;
}



</style>
