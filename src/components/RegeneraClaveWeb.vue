<template>
  <div class="container-fluid px-5 w-100 h-100 my-5">
    <div class="elementos">
      <div class="anuncios">
          Hola Mundo
      </div>
      <div class="row mt-5">
        <div class="col-12 col-sm-12 col-md-7 mb-3">
          <h3>Recupera tu clave de acceso</h3>
          <div class="row">
            <div class="col">
              <img src="../assets/forgot.png" width="100%"/>
            </div>
            <div class="col">
              <p class="text-justify">
                En caso de que no recuerdes tu clave de acceso, podrás reestablecerla a través de un procedimiento sencillo: <br/><br/>
                Sólo captura el correo que diste de alta al momento de registrarte y entonces, te mandaremos un token de 
                recuperación con el cual, podrás defnir una nueva clave. 
              </p>
            </div>
          </div>
        </div>
        <div class="col-12 col-sm-12 col-md-5">
          <div class="card">
            <!--
            <div class="card-header">
              <label class="h4">Regeneración de clave de acceso Web</label>
            </div>
            -->
            <div class="card-body align">

                <small class="form-text text-muted text-center">Introduce el correo electrónico con el que te registraste en el sistema para recuperar tu cuenta</small>
                <br>

                <div class ="form-group">
                  <div class="row px-3">
                    <input type="text" class="form-control caja" :class="classCorreo" placeholder="ejemplo@gmail.com" v-model="correo">
                    <span class="fas fa-envelope errspan"></span>
                    <small class="notValid">{{msgCorreo}}</small>                   
                  </div>
                </div>
                
                <br>
                <div class="g-recaptcha">
                  <vue-recaptcha
                      id="solvecaptcha"
                      ref="recaptcha"
                      sitekey="6LeypzsdAAAAAD716pR1WaBMWpPCmdYWOjKyPkoM"
                  />
                </div>
                <br>
                <div class="form-group row text-center">
                  <div class="col">
                    <button :disabled="habilitaBoton" type="button" @click="cambiaClave" class="btn btn-success">Recuperar mi clave</button>
                  </div>
                  <div class="col">
                    <a href="#" class="btn btn-warning" @click="openLoginPage">Regresar a login</a>
                  </div>
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div id="footer">&copy; 2021 Este es mi custom footer. 
    </div>
  </div>
</template>

<script>
  import VueRecaptcha from 'vue-recaptcha';
  import router from '../router'
  import axios from 'axios'
  import store from '../store'
  
  const emaiRegex = new RegExp(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);

  export default {
      data() {
        return {
          correo: '',
          msgCorreo:'',
          classCorreo:'',
          habilitaBoton: true
        }
      },
      watch: {
        correo() {
          this.msgCorreo="";
          this.classCorreo="ok";
          this.habilitaBoton=false;
          if(this.correo.length>30 || !emaiRegex.test(this.correo)) {
            this.msgCorreo="El correo ingresado no es valido";
            this.classCorreo="not-ok";
            this.habilitaBoton=true;
          }
        }
      },
      components: {
        VueRecaptcha
      },
      methods: {
        cambiaClave() {
          axios.get('api/regenera-clave.json?correo='+this.correo, {
          }).then(response => {
            console.log(response);
            console.log(response.data);
            console.log(response.status);
          }).catch(error => {
            if(error.response) {
                console.log(error);
            }
          }).finally(
            console.log('finaliza proceso de solicitud de regeneracion de clave')
          );
          router.push('/ui/regenera-clave-confirma').catch(()=>{});
        }, 
        openLoginPage() {
          router.push('/ui/login').catch(()=>{});
        }
      }, 
      mounted() {
        store.commit('setToggleHeader', false);
        store.commit('setToggleFooter', false);
        store.commit('setToggleSidebar', false);
      }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.ancho2 {
    max-width: 450px;
}
.g-recaptcha {
  transform:scale(0.9);
  transform-origin: 0 0;
}
.centra {
  margin: auto;
  padding-top: 10%;
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
.caja{
  padding-left: 33px;
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