<template>
  <div class="container-fluid px-5 w-100 h-100 my-5">
    <div class="elementos">
    <div class="anuncios">
        {{msgToast}}
    </div>
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
              <button type="button" class="btn btn-light" @click="switchToLogin">Ingresar</button>
              <button type="button" class="btn btn-light" @click="switchToSignUp">Registrarse</button>
            </div>
            <div class="componentes">
              <LoginComponent v-if="loginChosen"></LoginComponent>
              <Registro v-else></Registro>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div id="footer">&copy; 2021 Este es mi custom footer.
      Siempre pegado al bottom de la página.
    </div>
  </div>
</template>
<script>
import Registro from "./RegistroComponent";
import LoginComponent from "./LoginComponent";
import store from "../store";

export default {

  name : 'acceso',
  components: {Registro, LoginComponent},
  mounted() {
    store.commit('setToggleSidebar', false);
    store.commit('setToggleFooter', false);
  },
  data () {
    return {
      msgToast : 'Aqui van avisos y cosas por el estilo',
      loginChosen: true,
    }
  },
  methods: {
    switchToLogin () {
      this.loginChosen = true;
    },
    switchToSignUp () {
      this.loginChosen = false;
    }
  }
}
</script>
<style scoped>
.anuncios {
  background-color: #0b9984;
  color: white;
  padding: 5px;
}
.ingresos {
  /*border: 1px solid rgba(128, 128, 128, 0.58);*/
  border-radius: 5px;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
}
.componentes {
  padding: 12% 2%;
}
#footer {
  position: fixed;
  padding: 10px 10px 0px 10px;
  bottom: 0;
  left: 0;
  width: 100%;
  /* Height of the footer*/
  height: 40px;
  background: #444;
  color: #fff;
  text-align: right;
}

</style>