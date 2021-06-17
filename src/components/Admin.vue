<template>
  <div class="card w-75 mx-auto my-5 px-2">
    <div class="card-header" align="center">
      <h4 class="control-label mt-2">
        Bienvenido a la interfaz de administrador
      </h4>
    </div>
    <div class="card-body">
      <p class="text-center"><Strong>Por favor indica la acción que desea realizar</Strong></p>
      <div class="small-box shrink2 mx-2" style="width:45%; background-color: rgba(58,194,58,0.8)">
        <div class="inner py-4 px-4">
          <h3>53<sup style="font-size: 20px">%</sup></h3>

          <p style="float: left">Bounce Rate</p>
          <div>
            <i class="far fa-chart-bar fa-4x icono shrink" ></i>
          </div>
           </div>
        <div>
          <button type="button" class="btn btn-success btn-block">
            <a href="#" class="small-box-footer" style="color: white">Acceder <i class="fas fa-arrow-circle-right"></i></a>
          </button>
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

.small-box {
  border-radius: .25rem;
  box-shadow: 2px 2px 3px rgba(69, 68, 68, 0.62);
  display: block;
  margin-bottom: 20px;
  position: relative;
}
.bg-success {
  background-color: #28a745!important;
}
.small-box> .small-box-footer {
  background-color: rgba(0,0,0,.1);
  color: rgba(255,255,255,.8);
  display: block;
  padding: 3px 0;
  position: relative;
  text-align: center;
  text-decoration: none;
  z-index: 10;
}
.icono {
  position: absolute;
  right: 15%;
  bottom: 40%;
  opacity: 35%;
}
.shrink {
  transition: all .2s ease-in-out;
}
.shrink2 {
  transition: all .2s ease-in-out;
}
.shrink:hover {
  transform: scale(0.9);
}
.shrink2:hover {
  transform: scale(1.1);
  box-shadow: 2px 2px 10px rgba(36, 36, 36, 0.62);
}
</style>
