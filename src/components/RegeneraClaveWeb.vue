<template>
  <div>
    <div class="ancho centra">
      <div class="row">
        <div class="col-sm-6" >
          <img src="../assets/forgot.png" width="100%"/>
        </div>
        <div class="col-sm-6">
          <div class="card">
            <!--
            <div class="card-header">
              <label class="h4">Regeneración de clave de acceso Web</label>
            </div>
            -->
            <div class="card-body align">

                <small class="form-text text-muted text-center">Por favor, introduce el correo electrónico con el que te registraste en el sistema para recuperar tu cuenta</small>
                <br>

                <div class ="form-group text-center">
                  <label for="correo">Correo electrónico</label>
                  <input type="email" class="form-control" id="mail" placeholder="ejemplo@gmail.com" v-model="correo">
                </div>
                <br>


                <div class="g-recaptcha">
                  <vue-recaptcha
                      id="solvecaptcha"
                      ref="recaptcha"
                      sitekey="6LffEdkaAAAAAOJllar3d53MdUh3qOZLhdQ8GuQs"
                  />
                </div>
                <br>

                <div class="form-group row text-center">
                  <div class="col">
                    <button type="button" @click="cambiaClave" class="btn btn-success">Recuperar mi clave</button>
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
        Siempre pegado al bottom de la página. 
    </div>
  </div>
</template>

<script>
  import VueRecaptcha from 'vue-recaptcha';
  import router from '../router'
  import axios from 'axios'
  import store from '../store'

  export default {
      data() {
        return {
          correo: '',
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
#footer {
    position: fixed;
    padding: 10px 10px 0px 10px;
    bottom: 0;
    width: 100%;
    /* Height of the footer*/ 
    height: 40px;
    background: #444;
    color: #fff;
    text-align: right;
}
</style>