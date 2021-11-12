<template>
  <div class="container-fluid px-5 w-100 h-100 my-5">
    <div class="elementos">
      <div class="anuncios">
          {{msgToast}}
      </div>
      <div class="row mt-5">
        <div class="col-12 col-sm-12 col-md-7 mb-3">
          <h3>Bienvenido al sistema</h3>
          <p class="text-justify">
            En esta interfaz podrás ingresar al sistema con tu usuariio (correo) y con la clave que elegiste al momento de registrarte.
            Si no estás aun registrado, podrás realizar tu registro en este misma página, en la opción de "registrarse".<br/><br/>
            Adicionalmente, si ya estás registrado pero no recuerdas tu clave de acceso al sistema, podrás recuperarla sigiendo los
            pasos de la interfaz a la que llegas con la liga "Olvidé mi clave". 
          </p>
        </div>
        <div class="col-12 col-sm-12 col-md-5">
          <div class="ingresos">
            <div class="btn-group w-100" role="group">
              <button type="button" class="btn" :class="loginChosen" @click="switchToLogin">Ingresar</button>
              <button type="button" class="btn" :class="regChosen" @click="switchToSignUp">Registrarse</button>
            </div>
            <div class="componentes">
              <LoginComponent v-if="loginActive"></LoginComponent>
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
    store.commit('setToggleHeader', false);
    store.commit('setToggleFooter', false);
    store.commit('setToggleSidebar', false);
  },
  data () {
    return {
      msgToast : 'Aqui van avisos y cosas por el estilo',
      loginSel: true,
      regSel:false,
      loginActive:true
    }
  },
  computed : {
    loginChosen() {
      return this.loginSel ? 'clicked' : '';
    },
    regChosen() {
      return this.regSel ? 'clicked' : '';
    }
  },
  methods: {
    switchToLogin () {
      this.loginActive = true;
      this.regSel=false;
      this.loginSel= true;
    },
    switchToSignUp () {
      this.loginActive = false;
      this.regSel=true;
      this.loginSel= false;
    }
  }
}
</script>

<style scoped>

button{
  background: none;
  color: #000000;
  padding: 5px 5px;
  width: 30%;
  text-align: center;
  outline: none;
  transition: 0.5s all;
}
button:hover{
  border-bottom: 3px solid rgba(0, 100, 0, 0.75);
  color: #236510;
}
button:focus{
  box-shadow: rgba(17, 12, 46, 0.15) 0px 48px 100px 0px;
}
.clicked{
  border-bottom: 3px solid rgba(0, 100, 0, 0.75);
  color: #236510;
}
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
