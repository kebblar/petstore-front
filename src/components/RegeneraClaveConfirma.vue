<template>
  <div class="ancho centra">
    <div class="card">
      <div class="card-header">
        <label class="h4">Regenera tu clave</label>
      </div>
      <div class="card-body align">
          <small class="form-text text-muted text-center">Un token de 6 dígitos fue enviado a tu correo electrónico, por favor introdúcelo a continuación:</small>
          <br>
          <div class ="form-group form-row">
            <div class="col-sm-4">
              <label for="correo">Token:</label>
            </div>
            <div class = "col form-group">
              <input type="text" class="form-control" id="token" placeholder="XXXXXX" v-model="token"/>
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
              <input type="password" class="form-control" id="token" placeholder="******" v-model="clave">
            </div>
          </div>

          <div class ="form-group form-row">
            <div class="col-sm-4">
              <label for="clave">Confirmación:</label>
            </div>
            <div class = "col form-group">
              <input type="password" class="form-control" id="token" placeholder="******" v-model="confirmaClave">
            </div>
          </div>

        <div class="form-group row text-center">
          <div class="col text-center">
            <button type="button" class="btn btn-success" @click="cambiaClave">Cambiar mi clave</button>
          </div>
        </div>

      </div>
    </div> 

  <!-- Modal -->
  <modal
    name="aviso" 
    :clickToClose="true"
    :reset="true"
    :width="360"
    height="auto"> 
    <div class="popup-modal">
      <h2 style="margin-top: 0; text-align: center;">{{ modalTitulo }}</h2>

      <div v-if='fortalezaIncorrecta'>
        <ul v-for="(msg, index) in modalMessage" :key="index">
          <li>{{ msg }}</li>
        </ul>
      </div>
      <div v-else>
        {{ modalMessage }}
      </div>

      <hr>

      <div style="text-align: right;">
          <a href="#" class="green-btn" @click="go">Aceptar</a>
      </div>

    </div>
  </modal>

  </div>

</template>

<script>
  import axios from 'axios';
  import router from '../router';
  import Vue from 'vue';
  import VueToast from 'vue-toast-notification';

  Vue.use(VueToast);

  export default {
    data() {
      return {
        token: '',
        clave: '',
        confirmaClave: '',
        modalShowsError: false,
        modalTitulo:'',
        modalMessage: '',
        fortalezaIncorrecta: false,
      }
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
      cambiaClave() {
        this.fortalezaIncorrecta = false;
        this.modalShowsError = true;

        if(this.clave.length<4) {
          this.abreToast('La clave debe poseer al menos 4 caracteres');
          return;
        }
        if(this.clave != this.confirmaClave) {
          this.abreToast('La clave y su confirmación deben coincidir');
          return;
        }
        axios.get('api/confirma-regenera-clave.json?token='+this.token+'&clave='+this.clave, {
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
          this.$modal.show('aviso')
        );
      }
    }
  }
</script>

<style scoped>
hr.dashed {
  border-top: 3px dashed #bbb;
}
.popup-modal {
    padding: 1rem;
}
.green-btn {
    padding: 0.5em 1em;
    background-color: #d5eae7;
    color: #35907f;
    border: 2px solid #0ec5a4;
    border-radius: 5px;
    font-weight: bold;
    font-size: 16px;
    text-transform: uppercase;
    cursor: pointer;
}
</style>