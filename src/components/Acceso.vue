<template>
  <div class="container-fluid px-5 w-100 h-100 my-4">
    <div class="anuncios">
        {{msgToast}}
    </div>
    <div class="elementos">
      <div class="row mt-5">
        <div class="col-12 col-sm-12 col-md-7 mb-3">
          <h3>Texto de bienvenido</h3>
          <p class="text-justify">Hmm. We’re having trouble finding that site.
            We can’t connect to the server at www.google.com.
            If that address is correct, here are three other things you can try:
            Try again later.
            Check your network connection.
            If you are connected but behind a firewall, check that Firefox has permission to access the Web.</p>
        </div>
        <div class="col-12 col-sm-12 col-md-5">
          <div class="ingresos">
            <div class="btn-group w-100" role="group">
              <button type="button" class="btn btn-secondary">Ingresar</button>
              <button type="button" class="btn btn-secondary">Registrarse</button>
            </div>
            <div class="componentes">
              <Registro></Registro>
              <LoginComponent></LoginComponent>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Registro from "./RegistroComponent";
import LoginComponent from "./LoginComponent";

export default {

  name : 'acceso',
  components: {Registro, LoginComponent},
  data () {
    return {
      msgToast : 'viva mexico prros'
    }
  },
  methods: {

  }
}
</script>
<style>
.anuncios {
  background-color: #0b9984;
  color: white;
  position: relative;
  padding: 5px 20%;
  left: -20%;
  height: auto;
  width: 140%
}


</style>