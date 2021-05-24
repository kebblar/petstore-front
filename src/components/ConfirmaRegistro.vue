<template>

  <div class="ancho centra">
    <div class="card" style="width:390px;">
      <div class="card-header">
        <label class="h4">Confirma tu registro</label>
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
          <div class="form-group row text-center">
            <div class="col text-center">
              <button @click="confirma" class="btn btn-success" >Completar registro</button>
            </div>
          </div>
      </div><!-- card-body ends -->

    </div><!-- card ends -->

  <!-- Modal -->
  <modal 
    name="aviso" 
    :clickToClose="false" 
    :reset="true"
    :width="420"
    :height="220">
    <div class="card">
        <div class="card-header text-white" style="text-align: center; background-color: #363636;">
          <label class="control-label h4" >{{ modalTitulo }}</label>
        </div>
        <div class="card-body">
            <p class="card-text">{{ modalMessage }}</p>
            <div style="text-align: right;">
                <a href="#" class="btn btn-primary" @click="go">Aceptar</a>
            </div>
        </div>
    </div>
  </modal>

  </div>

</template>


<script>
  import axios from 'axios';
  import router from '../router';

  export default {
    data() {
      return {
        token: '',
        modalShowsError: false,
        modalTitulo:'',
        modalMessage: ''
      }
    },
    methods: {
      go() {
        if(this.modalShowsError) {
          this.$modal.hide('aviso');
        } else {
          router.push('/ui/login');
        }
      },
      confirma() {
        axios.get('api/confirma-preregistro.json?token='+this.token, { 
          token: this.token,
        }).then(response => {
          console.log(response);
          console.log(response.data);
          console.log(response.status);
          this.modalShowsError = false;
          this.modalTitulo ='Registro exitoso';
          this.modalMessage = 'Has quedado registrado en el sistema, ahora puedes iniciar sesión !';          
        }).catch(error => {
          this.modalShowsError = true;
          this.modalTitulo ='Error en el proceso de confirmación';
          this.modalMessage = error;
          if(error.response) {
              this.modalMessage = error.response.data['exceptionLongDescription'];
          }
        }).finally(
          this.$modal.show('aviso')
        ); 
      }
    }
  }
</script>


<style scoped> 
.ancho {
    max-width: 390px;
}
hr.dashed {
  border-top: 3px dashed #bbb;
}
</style>