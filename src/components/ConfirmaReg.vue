<template>

  <div class="container">
    <div v-if="loading" class="loader"/>
    <br>
    <br>
    <br>
    <h3 class="bold">Confirma tu Registro</h3>

    <div class="card">


      <b-form class="card-body" @submit.prevent="registrar">


        <p>Por favor, para confirmar tu registro, captura el Token que te acabamos de enviar a tu correo e indícanos el
          resto de tus datos</p>

        <b-form-group labelvue="Token:" label-align="left" label-align-sm="right" label-cols="12" label-cols-sm="4"
                      label-for="token">
          <b-form-input id="token" v-model.trim="token" :state="validator.token" placeholder="XXXXXX"/>
          <b-form-invalid-feedback> {{ invalidFeedbackMessages.token }}</b-form-invalid-feedback>
        </b-form-group>

        <hr>
        <b-form-group label="Contraseña: " label-align="left" label-align-sm="right" label-cols="12" label-cols-sm="4"
                      label-for="pass">
          <b-form-input id="pass" ref="pass" v-model="pass" :state="validator.pass" autocomplete="new-password"
                        maxlength="16"
                        minlength="8" pattern="^(?=.*\d)(?!.* )(?=.*[a-z])(?=.*[A-Z]).{8,16}$" required
                        type="password"/>
          <b-form-invalid-feedback>
            {{ invalidFeedbackMessages.pass }}
          </b-form-invalid-feedback>
        </b-form-group>
        <b-form-group label="Confirma contraseña:" label-align="left" label-align-sm="right"
                      label-cols="12"
                      label-cols-sm="4" label-for="confirm-pass">
          <b-form-input id="confirm-pass" ref="confirmPass" v-model="confirmPass" :disabled="!validator.pass"
                        :state="validator.confirmPass" required type="password"/>
          <b-form-invalid-feedback>Las claves no coinciden</b-form-invalid-feedback>
        </b-form-group>

        <button :disabled="!validator.valid()" class="btn btn-success" type="submit">Confirmar</button>
      </b-form>
    </div>

    <modal :adaptive="true" :width="480" height="auto" name="mensaje-confirm">
      <div class="card w-100">
        <div class="card-header">Advertencia del sistema</div>
        <div class="card-body">
          <h5 class="card-title">Error de confirmación de clave</h5>
          <p class="card-text">{{ msgErr }}</p>
        </div>
        <div class="card-footer bg-white border-0">
          <button class="btn btn-primary" @click="closeModal">Aceptar</button>
        </div>
      </div>
    </modal>

  </div>

</template>

<script>
import axios from 'axios';
import router from '@/router'

const minDate = new Date();
const maxDate = new Date();
const initialDate = new Date();
minDate.setFullYear(minDate.getFullYear() - 100, 0, 1);
maxDate.setFullYear(maxDate.getFullYear() - 18, 0, 1);
initialDate.setFullYear(initialDate.getFullYear() - (100 - 18) / 2, 0, 1);

const axiosConfig = {
  headers: {
    'Content-type': 'application/json',
    'crossDomain': true,
    'Acces-Control-Allow-Origin': '*'
  }
}

export default {
  name: 'ConfirmRegistro',
  data() {
    return {
      timer: null,
      pass: '',
      confirmPass: '',
      dateConfig: {
        min: minDate,
        max: maxDate,
        initial: initialDate,
        format: {year: 'numeric', month: '2-digit', day: '2-digit'}
      },
      validator: {
        token: null,
        pass: null,
        confirmPass: null,
        valid() {
          return Boolean(this.date && this.pass && this.confirmPass);
        }
      },
      token: '',
      msgErr: '',
      invalidFeedbackMessages: {
        token: 'El token solo debe tener 6 caracteres',
        pass: 'La contraseña debe tener entre 8 y 16 caracteres, un minúscula, una mayúscula y un número.'
      },
      loading: false
    }
  },

  methods: {
    makeToast() {
      this.$root.$bvToast.toast('Ahora puedes iniciar sesión y usar nuestros servicios', {
        title: '¡Registro exitoso!',
        variant: 'success',
        solid: true,
        toaster: 'b-toaster-bottom-right'
      });
    },

    registrar() {
      this.loading = true;
      axios.post('/api/confirmarRegistro.json',
          {
            token: this.token,
            calleNumero: this.calleNumero,
            idMunicipio: this.idMunicipio,
            fNacimiento: this.fNacimiento.toString()
          }, axiosConfig)
          .then(() => {
            this.makeToast();
            router.push('/ui/login');
          })
          .catch(error => {
            if (error.response.status === 404) {
              this.validator.token = false;
              this.invalidFeedbackMessages.token = "El token ya no es valido o no existe, te recomentamos generar otro token"
            } else {
              this.msgErr = "Ha ocurrido un error de red: " + error;
              this.$modal.show('mensaje-confirm');
            }
          })
          .finally(() => this.loading = false);
    },
    closeModal() {
      this.$modal.hide('mensaje-confirm');
    },
  },
  watch: {
    token(newValue) {
      if (this.invalidFeedbackMessages.token.includes('no existe')) {
        this.validator.token = null;
        this.invalidFeedbackMessages.token = 'El token solo debe tener 6 caracteres';
      }
      this.validator.token = newValue.length === 6;
    },
    pass() {
      this.validator.pass = this.$refs.pass.checkValidity();
      this.validator.confirmPass = this.validator.pass ? this.pass === this.confirmPass : null;
    },
    confirmPass() {
      this.validator.confirmPass = this.pass === this.confirmPass;
    }
  }
}
</script>

<style scoped>

#app {
  background-color: red;
}
.container {
  max-width: 520px;
  padding: 0;
  margin: 3rem auto;
  height: 80vh;
}

.card {
  max-width: 820px;
  padding: 0;
  margin: 3rem auto;
}


.container {
  width: 100vw;
  height: 90vh;
  margin: 0;
}

.container, .container-lg, .container-md, .container-sm {
  max-width: 100vw;
  min-width: 80vh;
  background-color: #f7f7f7;

}


</style>
