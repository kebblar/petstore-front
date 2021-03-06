<template>
  <div class="container">
    <div v-if="loading" class="loader"/>
    <div class="">

      <br>
      <b-form class="bg-active" @submit.prevent="registrar">
        <br>
        <h3 class="bold">Crear cuenta</h3>
        <b-card>

          <br>

          <b-card-text>
            <b-row cols="1" cols-lg="2" cols-md="4" cols-sm="2">
              <b-col>
                <b-form-group label="Nombre:" label-align="left" label-align-sm="right" label-cols="12"
                              label-cols-sm="4"
                              label-for="name">
                  <b-form-input id="name" v-model.trim="name" :state="validator.name" autocorrect="true" required/>
                  <b-form-invalid-feedback>Ingrésalo tal como figura en tu identificación oficial
                  </b-form-invalid-feedback>
                </b-form-group>
              </b-col>
              <b-col>
                <b-form-group label="E-mail:" label-align="left" label-align-sm="right" label-cols="12"
                              label-cols-sm="4"
                              label-for="mail">
                  <b-form-input id="mail" ref="mail" v-model.lazy="mail" :state="validator.mail" required type="email"/>
                  <b-form-invalid-feedback>{{ invalidFeedbackMessages.mail }}</b-form-invalid-feedback>
                </b-form-group>
              </b-col>
              <b-col>
                <b-form-group label="Teléfono:" label-align="left" label-align-sm="right" label-cols="12"
                              label-cols-sm="4"
                              label-for="phone">
                  <b-form-input id="phone" ref="phone" v-model="phone" :formatter="phoneMask" :state="validator.phone"
                                :value="phone"
                                maxlength="12" pattern="\d\d ?\d{4} ?\d{4}" placeholder=""
                                type="tel"/>
                  <b-form-invalid-feedback>El teléfono es invalido</b-form-invalid-feedback>
                </b-form-group>
              </b-col>
            </b-row>
          </b-card-text>

          <br>
        </b-card>

        <button :disabled="!validator.valid()" class="btn btn-success" type="submit">Continuar</button>

      </b-form>
    </div>


    <modal
        :clickToClose="false"
        :height="260"
        :reset="true"
        :width="480"
        name="mensaje-login">
      <div class="card">
        <div class="card-header">Advertencia del sistema</div>
        <div class="card-body">
          <h5 class="card-title">Error de registro al sistema</h5>
          <p class="card-text">{{ msgErr }}</p>
          <div style="text-align: right;">
            <a class="btn btn-primary" href="#" @click="closeModal">Aceptar</a>
          </div>
        </div>
      </div>
    </modal>

  </div>
</template>

<script>
import router from '../router'

export default {
  components: {},
  data() {
    return {
      name: '',
      pass: '',
      confirmPass: '',
      mail: '',
      phone: '',
      errorsMsg: [],
      confError: '',
      msgErr: '',
      loading: false,
      invalidFeedbackMessages: {
        mail: ''
      },
      validator: {
        name: null,
        pass: null,
        confirmPass: null,
        mail: null,
        phone: null,
        captcha: false,
        valid: () => Boolean(this.name && this.mail)
      }
    }
  },
  methods: {
    registrar() {
      this.makeToast();
      router.push('/ui/confirma-registro');
    },
    closeModal() {
      this.$modal.hide('mensaje-login');
    },
    phoneMask(phone, {target}) {
      let {selectionStart} = target;
      console.log(selectionStart)
      this.$nextTick(() => target.setSelectionRange(selectionStart, selectionStart));
      return phone.replace(/ /g, '').slice(0, 12)
          .replace(/^(\d\d)?(\d{1,4})?(\d{1,4})?$/, '$1 $2 $3').trim();
    },
    makeToast() {
      this.$root.$bvToast.toast('Para continuar revisa tu correo de electrónico.', {
        title: '¡Pre-registro exitoso!',
        variant: 'success',
        solid: true,
        toaster: 'b-toaster-top-right'
      });
    }
  },
  watch: {
    name(newValue) {
      this.validator.name = newValue.length > 1
    },
    mail() {
      this.invalidFeedbackMessages.mail = 'Ingresa una dirección de correo electrónico válida'
      this.validator.mail = this.$refs.mail.checkValidity();
    },
    pass() {
      this.validator.pass = this.$refs.pass.checkValidity();
      this.validator.confirmPass = this.validator.pass ? this.pass === this.confirmPass : null;
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

#app {
}

.card {
  max-width: 820px;
  padding: 0;
  margin: 3rem auto;
}

.container {
  width: 100vw;
  height: 90vh;
}

.container, .container-lg, .container-md, .container-sm {
  max-width: 100vw;
  min-width: 80vh;
  background-color: #f7f7f7;

}

.card-body {
  box-shadow: 0 1px 3px rgba(0, 0, 0, .2)
}

</style>
