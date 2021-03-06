<template>
  <div class="container">
    <div v-if="loading" class="loader"/>
    <div class="card">
      <h3 class="card-header">Registro al sistema</h3>
      <b-form class="card-body" @submit.prevent="registrar">

        <b-form-group label="Nombre:" label-align="left" label-align-sm="right" label-cols="12" label-cols-sm="4"
                      label-for="name">
          <b-form-input id="name" v-model.trim="name" :state="validator.name" autocorrect="true" required/>
          <b-form-invalid-feedback>El nombre debe tener al menos 2 caracteres del alfabeto (sin números y sin espacios)</b-form-invalid-feedback>
        </b-form-group>

        <b-form-group label="Correo:"  label-align="left" label-align-sm="right" label-cols="12" label-cols-sm="4"
                      label-for="mail">
          <b-form-input  id="mail"   ref="mail" v-model.lazy="mail" :state="validator.mail"     required type="email"/>
          <b-form-invalid-feedback>{{ invalidFeedbackMessages.mail }}</b-form-invalid-feedback>
        </b-form-group>

        <b-form-group label="Clave:" label-align="left" label-align-sm="right" label-cols="12" label-cols-sm="4"
                      label-for="pass">
          <b-form-input id="pass" ref="pass" v-model="pass" :state="validator.password.valid()" maxlength="16"
                        minlength="8" autocomplete="new-password" required type="password"/>
          <b-form-invalid-feedback>La contraseña debe tener:
            <ul>
              <li v-if="!validator.password.length">De 8 a 16 caracteres</li>
              <li v-if="!validator.password.lowerCaseLetter">Al menos una letra minúscula</li>
              <li v-if="!validator.password.capitalLetter">Al menos una letra mayúscula</li>
              <li v-if="!validator.password.number">Al menos un número</li>
            </ul>
          </b-form-invalid-feedback>
        </b-form-group>


        <b-form-group label="Confirmación de la clave:" label-align="left" label-align-sm="right" label-cols="12"
                      label-cols-sm="4" label-for="confirm-pass">
          <b-form-input id="confirm-pass" ref="confirmPass" v-model="confirmPass" :disabled="!validator.password.valid()"
                        :state="validator.confirmPass" required type="password"/>
          <b-form-invalid-feedback>Las claves no coinciden</b-form-invalid-feedback>
        </b-form-group>

        <b-form-group label="Teléfono:" label-align="left" label-align-sm="right" label-cols="12" label-cols-sm="4"
                      label-for="phone">
          <b-form-input id="phone" ref="phone" v-model="phone" :formatter="phoneMask" :state="validator.phone"
                        :value="phone"
                        maxlength="12" pattern="\d\d ?\d{4} ?\d{4}" placeholder="XX XXXX XXXX"
                        type="tel"/>
          <b-form-invalid-feedback>El teléfono es invalido</b-form-invalid-feedback>
        </b-form-group>

        <b-form-group>
          <vue-recaptcha
              id="solvecaptcha"
              ref="recaptcha"
              sitekey="6LeyXssSAAAAAEuw62GOHmwzBtbX9Iz4He01Zk8_"
              @expired="onCaptchaExpired"
              @verify="onCaptchaVerified"/>
        </b-form-group>
        <button class="btn btn-success" type="submit" :disabled="!validator.valid()">Registrarme</button>
      </b-form>
    </div>

   <div>

  <b-modal id="mensaje-login" hide-footer>
    <template #modal-title >
     Advertencia del sistema
    </template>
    <div class="d-block text-center">
      <h4>Ha ocurrido un problema, intente mas tarde</h4>
      
    </div>
    <b-button class="mt-2" block @click="$bvModal.hide('mensaje-login')">Cerrar</b-button>
  </b-modal>
</div>




  </div>
</template>

<script>
import axios from 'axios';
import router from '../router'
import VueRecaptcha from 'vue-recaptcha';

const axiosConfig = {
  headers: {
    'Content-type': 'application/json',
    crossDomain: true,
    'Acces-Control-Allow-Origin': '*'
    
  },
   timeout:290000 
 }

const HTTP_STATUS = {
  OK : 200,
  FORBIDDEN: 403
}

export default {
  components: {
    VueRecaptcha
  },
  data() {
    return {
      name: '',
      pass: '',
      confirmPass: '',
      mail: '',
      phone: '',
      reg: /^(([^<>()\\.,;:\s@"]+(\.[^<>()\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/,
      errorsMsg: [],
      confError: '',
      msgErr: '',
      loading: false,
      invalidFeedbackMessages: {
        mail: ''

      },
      validator: {
        name: null,
        password: {
          length: null,
          capitalLetter: null,
          lowerCaseLetter: null,
          number: null,
          valid: () => {
            let validPassword = this.validator.password.length && this.validator.password.capitalLetter && this.validator.password.lowerCaseLetter && this.validator.password.number;
            return validPassword === null ? null : Boolean(validPassword);
          }
        },
        confirmPass: null,
        mail: null,
        phone: null,
        captcha: false,
        valid: () => {
          let temp;
          temp = this.validator.name && this.validator.password.valid() && this.validator.confirmPass && this.validator.mail && (this.validator.phone ?? true);
          return Boolean(temp)
        }
      }
    }
  },
  methods: {
    registrar() {
      // lipmia todos los errores
      this.confError = '';
      this.errorsMsg = [];

      // prende el bloqueador de pantalla
      this.loading = true;

      // manda la petición de registro
      axios.post('/api/registro.json',
          {
            nombre: this.name,
            clave: this.pass,
            correo: this.mail,
            telefono: this.phone.replace(/ /g,'')
          }, axiosConfig)
          .then(response => {
            if (response.status === HTTP_STATUS.OK) {
              this.makeToast();
              router.push('/ui/confirma-registro');
            } else {
              if (response.data.TipoError && response.data.TipoError === "1777") {
                const len = response.data.errors.length;

                for (let i = 0; i < len; i++) {
                  const err = response.data.errors[i];
                  this.errorsMsg[err.index] = err.description;
                }
              } else {
                this.msgErr = response.data['desc-exception'];
                this.$bvModal.show('mensaje-login');

                
              }
            }
          })
          .catch (response => {
            console.log(response)
            console.log(`estatus: ${response.status}, type: ${typeof response.status}`)
            if (response.status === HTTP_STATUS.FORBIDDEN) {
              this.validator.mail = false;
              this.invalidFeedbackMessages.mail = 'Ese correo ya ha sido usado por otro usuario'
            } else {
              this.msgErr = "Ha ocurrido un error de red: " + Object.entries(response);
              this.$bvModal.show('mensaje-login');
            }
          })
          .finally(() => this.loading = false);
    },
    onCaptchaVerified(recaptchaToken) {
      axios.post('api/check-captcha', {response: recaptchaToken, ip: '127.0.0.1'}, axiosConfig)
          .then(response => {
            if (response.status === HTTP_STATUS.OK) {
              this.validator.captcha = true;
            } else {
              this.msgErr = 'Regreso con un estatus: ' + response.status;
              this.$bvModal.show('mensaje-login');
            }
          })
          .catch(error => {
            console.log(error.data)
              this.msgErr = "Ha ocurrido un error de red: " + error;
              this.$bvModal.show('mensaje-login');
          })
          .finally(() => this.loading = false)
    },
    onCaptchaExpired() {
      this.validator.captcha = false;
      this.$refs.recaptcha.reset();
    },
    closeModal() {
      this.$modal.hide('mensaje-login');
    },
    phoneMask(phone, {target}) {
      let {selectionStart} = target;
      this.$nextTick(() => target.setSelectionRange(selectionStart,selectionStart));
      return phone.replace(/ /g, '').slice(0, 12)
          .replace(/^(\d\d)?(\d{1,4})?(\d{1,4})?$/, '$1 $2 $3').trim();
    },
       
    makeToast() {
      this.$root.$bvToast.toast('Te hemos enviado un token a tu correo electrónico', {
        title: '¡Pre-registro exitoso!',
        variant: 'success',
        solid: true,
        toaster: 'b-toaster-bottom-right'
      });
    }
  },
  watch: {
    name(newValue) {
      this.validator.name = Boolean(/^[A-Za-zñ]{2,128}$/.exec(newValue));
    },
    mail() {
      this.invalidFeedbackMessages.mail = 'El correo es invalido'
      this.validator.mail = Boolean(this.reg.test(this.mail));

    },
    pass() {
      this.validator.password.length = 8 <= this.pass.length && this.pass.length <= 16
      this.validator.password.lowerCaseLetter = Boolean(/[a-z]/g.exec(this.pass))
      this.validator.password.capitalLetter = Boolean(/[A-Z]/g.exec(this.pass))
      this.validator.password.number = Boolean(/[0-9]/g.exec(this.pass))
      this.validator.confirmPass = this.validator.password.valid() ? this.pass === this.confirmPass : null;
    },
    confirmPass() {
      this.validator.confirmPass = this.pass === this.confirmPass;
    },
    phone() {
      this.validator.phone = this.$refs.phone.checkValidity();
    }
  }
}
</script>

<style scoped>
.invalid-feedback {
  text-align: left;
}

.container {
  max-width: 520px;
  padding: 0;
  margin: 3rem auto;
}

#solvecaptcha {
  margin: 1.5rem auto;
  width: min-content;
}

  
</style>
