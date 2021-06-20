<template>
  <div class="ancho centra">
    <div class="card" style="width:390px;">
      <div class="card-header">
        <label class="h4">Regenera tu clave</label>
      </div>
      <div class="card-body align">
        <form>
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
        </form>

        <hr class="dashed">

        <form>
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
              <input type="password" class="form-control" id="token" placeholder="******" >
            </div>
          </div>
        </form>

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
        clave: '',
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
      cambiaClave() {
        axios.get('api/confirma-regenera-clave.json?token='+this.token+'&clave='+this.clave, {
        }).then(response => {
          console.log(response);
          console.log(response.data);
          console.log(response.status);
          this.modalShowsError = false;
          this.modalTitulo ='Regeneración exitosa';
          this.modalMessage = 'Tu clave ha sido regenerada exitosamente, ahora puedes iniciar sesión !';
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


<style>

hr.dashed {
  border-top: 3px dashed #bbb;
}

</style>