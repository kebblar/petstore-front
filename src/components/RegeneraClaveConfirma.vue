<template>
  <div class="container-fluid px-5 w-100 h-100 my-5">
    <div class="elementos">
      <div class="anuncios">
          Hola Mundo
      </div>
      <div class="row mt-5">
        <div class="col-12 col-sm-12 col-md-7 mb-3">
          <h3>Reestablece tu clave de acceso</h3>
          <div class="row">
            <div class="col">
              <img src="../assets/forgot.png" width="100%"/>
            </div>
            <div class="col">
              <p class="text-justify">
                Si el correo que proporcionaste se encuentra en nuestra base de datos, un token de 6 dígitos habrá sido enviado a dicho correo.
                Procede a capturarlo y en seguida teclea una clave de al menos 8 digitos de longitud, con al menos un número, una mayúscula y 
                un caracter especial. 
              </p>
            </div>
          </div>
        </div>
        <div class="col-12 col-sm-12 col-md-5">

          <div class="card">
            <div class="card-body align">
                <small class="form-text text-muted text-center">Un token de 6 dígitos fue enviado a tu correo electrónico, por favor introdúcelo a continuación:</small>
                <br>
                <div class ="form-group form-row">
                  <div class="col-sm-4">
                    <label for="correo">Token:</label>
                  </div>
                  <div class = "col">
                    <div class="row px-3">
                      <input type="text" class="form-control caja" id="token" maxlength="6" placeholder="XXXXXX" v-model="token"/>
                      <span class="fas fa-key errspan"></span>
                    </div>
                  </div>
                </div>

              <hr class="dashed">

                <small class="form-text text-muted text-center">Ingresa tu nueva clave y su confirmación</small>
                <br>
                <div class ="form-group form-row">
                  <div class="col-sm-4">
                    <label for="clave">Clave nueva:</label>
                  </div>
                  <div class = "col form-group">
                    <div class="row px-3">
                      <input :class="classPasswd" type="password" class="form-control caja" id="token" placeholder="******" v-model="password">
                      <span class="fas fa-lock errspan"></span>
                    </div>
                    <!--varificacion dinamica de clave-->
                    <div class="col">
                      <small id="clave" class="form-text text-muted">
                        <b>La clave contiene:</b>
                        <ul>
                          <li :style="styleCarac">8 carateres como mínimo</li>
                          <li :style="styleUpper">Una mayúscula</li>
                          <li :style="styleNum">Un número</li>
                          <li :style="styleSpecial">Un caracte especial, como _, -, #, etc.</li>
                        </ul>
                      </small>
                    </div>
                  </div>
                </div>

                <div class ="form-group form-row">
                  <div class="col-sm-4">
                    <label for="clave">Confirmación:</label>
                  </div>
                  <div class = "col form-group">
                    <div class="row px-3">
                      <input type="password" :class="classConf" class="form-control caja" id="token" placeholder="******" v-model="confirmaClave">
                      <span class="fas fa-lock errspan"></span>
                      <small :style="colorMsg">{{msgConf}}</small>
                    </div>
                  </div>
                </div>

              <div class="form-group row text-center">
                <div class="col text-center">
                  <button :disabled="validaDatos" type="button" class="btn btn-success" @click="cambiaClave">Cambiar mi clave</button>
                </div>
                <div class="col">
                  <button type="button" class="btn btn-warning" @click="goLogin">Ir a Login</button>
                </div>
              </div>

            </div>
          </div> 

        </div>
      </div>
      
      <!-- Modal -->
      <Aviso
        ref='avisoComp'
        ancho='360'
        :avisoTitulo=modalTitulo >
          <div>
            <div v-if='fortalezaIncorrecta'>
              <ul v-for="(msg, index) in modalMessage" :key="index">
                <li>{{ msg }}</li>
              </ul>
            </div>
            <div v-else>
              {{ modalMessage }}
            </div>
          </div>
      </Aviso>        

    </div>
    <div id="footer">
      &copy; 2021 Este es mi custom footer.
    </div>
  </div>
</template>

<script>
  import axios from 'axios';
  import router from '../router';
  import Vue from 'vue';
  import VueToast from 'vue-toast-notification';
  import Aviso from './custom/dialog/Aviso';
  import store from '../store'

  const passRegex = new RegExp("^(?=.*[A-Z])(?=.*[0-9])(?=.{8,})");
  const regularExpression = new RegExp(/[&\\#, +(\-\\_)$~%.'":*?<>{}]/g);

  Vue.use(VueToast);

  export default {
    components: {
      'Aviso': Aviso
    },
    watch:{
      confirmaClave(value) {
        this.classConf = "not-ok";
        this.msgConf = "Las claves no coinciden";
        this.colorMsg='color:red';
        if(this.password === value){
          this.classConf = "ok";
          this.msgConf = "Las claves coinciden";
          this.colorMsg='color:green';
        }
      },
      password(value) {
        this.classPasswd = "not-ok";
        if (passRegex.test(this.password) && regularExpression.test(this.password)) {
          this.classPasswd = "ok";
        }
        //Estilo para los requerimientos de la clave
        const red = 'color :  rgb(235, 74, 74) ;'
        const green = 'color : green  ;'

        this.styleCarac = value.length < 8 ? red : green;
        this.styleUpper = (value.replace(/[*A-Z]/g, "").length) < value.length ? green : red;
        this.styleNum = (value.replace(/[*0-9]/g, "").length) < value.length ? green : red;
        this.styleSpecial = (value.replace(regularExpression, "").length) < value.length ? green : red;
      }
    },
    data() {
      return {
        token: '',
        password: '',
        confirmaClave: '',
        modalShowsError: false,
        modalTitulo:'',
        modalMessage: '',
        fortalezaIncorrecta: false,

        styleCarac : 'color:grey;',
        styleUpper : 'color:grey;',
        styleNum : 'color:grey;',
        styleSpecial : 'color:grey',
        classPasswd: 'defaultColor',
        classConf:'defaultColor',
        msgConf:'',
        colorMsg:'color:red'
      }
    },
    computed : {
      validaDatos(){
        return !(this.token &&
            this.password === this.confirmaClave &&
            passRegex.test(this.password) &&
            regularExpression.test(this.password));
      },
    },
    methods: {
      abreToast(msg) {
        Vue.$toast.open({
          message: msg,
          type: 'error',
          duration: 5000,
          position:'top'
        });
      },
      go() {
        if(this.modalShowsError) {
          this.$modal.hide('aviso');
        } else {
          router.push('/ui/login');
        }
      },
      goLogin() {
        router.push('/ui/login');
      },
      cambiaClave() {
        this.fortalezaIncorrecta = false;
        this.modalShowsError = true;

        if(this.password.length<4) {
          this.abreToast('La clave debe poseer al menos 4 caracteres');
          return;
        }
        if(this.password !== this.confirmaClave) {
          this.abreToast('La clave y su confirmación deben coincidir');
          return;
        }
        axios.get('api/confirma-regenera-clave?token='+this.token+'&clave='+this.password, {
        }).then(response => {
          if(response) console.log('ok');
          this.modalShowsError = false;
          this.modalTitulo ='Regeneración exitosa';
          this.modalMessage = 'Tu clave ha sido regenerada exitosamente, ahora puedes iniciar sesión !';
        }).catch(error => {
          this.modalTitulo ='Error en el proceso de restauración de clave';
          this.modalMessage = error;
          if(error.response) {
            if(error.response.data.strengthViolations) {
              this.fortalezaIncorrecta = true;
              this.modalMessage = error.response.data.strengthViolations;
            } else {
              this.modalMessage = error.response.data.exceptionLongDescription;
            }
          }
        }).finally(
          this.$refs.avisoComp.abre()
        );
      }
    },
    mounted() {
      store.commit('setToggleHeader', false);
      store.commit('setToggleFooter', false);
      store.commit('setToggleSidebar', false);
    }
  }
</script>

<style scoped>
.ancho2 {
  max-width: 380px;
}
hr.dashed {
  border-top: 3px dashed #bbb;
}
.ok {
  box-shadow: 1px 1px 3px #8cc968;
  border-bottom: 1px solid #5e6e5e;
}
.not-ok {
  box-shadow: 1px 1px 3px #d37474;
  border-bottom: 1px solid #7e5151;
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
.anuncios {
  background-color: #0b9984;
  color: white;
  padding: 5px;
}
.form-control:focus {
  box-shadow: inset 0 0 1px rgba(0, 0, 0, 0.075), 0 0 8px rgba(168, 161, 161, 0.58);
}
.ok {
  box-shadow: 1px 1px 3px #8cc968;
  border-bottom: 1px solid #5e6e5e;
}
.not-ok {
  box-shadow: 1px 1px 3px #d37474;
  border-bottom: 1px solid #7e5151;
}
.defaultColor {
  background-color: white;
  box-shadow: 1px 1px 3px #d8dcdd;
  border-bottom: 1px solid #dddedf;
}
.caja{
  padding-left: 43px;
  display: block;
  box-sizing: border-box;
  margin-bottom: 4px;
  font-size: 12px;
  line-height: 2;
  border: 0;
  border-bottom: 1px solid #dddedf;
  font-family: inherit;
}
</style>