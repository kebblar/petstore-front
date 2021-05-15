<template>
  <div>

    <div class="top">
      <img id="image" src="../assets/pajaro.jpg" width="50%" />
    </div>

    <div class="buscador">
      <label>Bienvenido</label>
      <div class="row">
        <div class="col-sm-9">
          <input 
            type="text" 
            class="form-control" 
            placeholder="palabras de búsqueda" 
            value="" />
        </div>
        <div class="col-sm4">
          <input type="button" class="btn btn-success" value="Buscar" />
        </div>
      </div>
    </div>

    <div class="categorias">
      <h3>Confirma Registro !!!</h3>
      <ul>
        <li><input type="text" :value=this.a /></li>
        <li><input type="text" :value=this.b /></li>
        <li><input type="text" :value=this.c /></li>
        <li><input type="text" :value=this.d /></li>
        <li><input type="text" :value=this.e /></li>
        <li><input type="text" :value=this.f /></li>
      </ul>
    </div>

    <div class="footer">
      <div class="row">
        <div class="col-sm-9">
          UNO
        </div>
        <div class="col-sm-3">
          DOS
        </div>
      </div>
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
.top {
  text-align: right;
  background-color: #5DACFD;
}
.top img {
  margin-right: 10%;
}
.categorias {
  width: 400px;
  margin: auto;
  margin-top: -50px;
  background-color:blue;
}
.buscador {
  width: 300px;
  min-width: 300px;
  text-align: left;
  margin-top: -140px;
  margin-left: 10%;
  z-index: 10;
}
.buscador label{
  color: #ffff;
  font-size: 28px;
}

.footer {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  background-color: red;
  color: white;
  text-align: center;
}

</style>
