<template>

  <div class="container">
    <div v-if="loading" class="loader"/>
    <div class="card">
      <h3 class="card-header">Confirma tu Registro</h3>
      <b-form class="card-body" @submit.prevent="registrar">

        <p align="left">Para confirmar tu registro, por favor: 
          <ul>
          <li>Captura el Token que enviamos a tu correo</li>
          <li>Indícanos el resto de tus datos</li>
          <li>Acepta los términos de privacidad de datos</li>
          </ul>
          </p>

        <b-form-group label="Token:" label-align="left" label-align-sm="right" label-cols="12" label-cols-sm="4" label-for="token">
          <b-form-input id="token" v-model.trim="token" :state="validator.token" placeholder="XXXXXX"/>
          <b-form-invalid-feedback> {{ invalidFeedbackMessages.token }}</b-form-invalid-feedback>
        </b-form-group>

        <hr>

        <b-form-group label="Calle y número:" label-align="left" label-align-sm="right" label-cols="12" label-cols-sm="4" label-for="calle-num">
          <b-form-input id="calle-num" v-model="calleNumero" :state="validator.calleNumero" placeholder="Ejemplo: Limón, número 20"/>
          <b-form-invalid-feedback>La dirección debe tener al menos 3 caracteres</b-form-invalid-feedback>
        </b-form-group>

        <b-form-group label="Estado:" label-align="left" label-align-sm="right" label-cols="12" label-cols-sm="4" label-for="estado">
          <b-form-select id="estado" v-model="idEstado" :options="estados" :state="validator.idEstado" @change="updateMunicipios"/>
        </b-form-group>

        <b-form-group label="Municipio:" label-align="left" label-align-sm="right" label-cols="12" label-cols-sm="4" label-for="municipio">
          <b-form-select id="municipio" v-model="idMunicipio" :disabled="!idEstado" :options="municipios" :state="validator.idMunicipio"/>
        </b-form-group>

        <b-form-group label="Fecha nacimiento:" label-align="left" label-align-sm="right" label-cols="12" label-cols-sm="4" label-for="fecha-nacimiento">
          <b-form-datepicker id="fecha-nacimiento"
                             v-model="fNacimiento"
                             :date-format-options="dateConfig.format"
                             :initial-date="dateConfig.initial"
                             :max="dateConfig.max"
                             :min="dateConfig.min"
                             :state="validator.date"
                             calendar-width="100%"
                             class="mb-2"
                             hide-header
                             locale="es"
                             menu-class="w-100"
                             nav-button-variant="secondary" placeholder="MM-DD-YYYY"
                             show-decade-nav/>
          <b-form-invalid-feedback>Debes de seleccionar una fecha</b-form-invalid-feedback>
        </b-form-group>

        <hr>

        <b-form-group>
              <b-form-checkbox
                id="aviso"
                v-model="aviso"
                name="aviso"
                value="accepted"
                :state="validator.aviso"
                unchecked-value="not_accepted">
                Acepto los <a href="#" id="show-btn" @click="$bvModal.show('bv-modal-example')">términos de privacidad</a> de datos
              </b-form-checkbox>
              <b-modal id="bv-modal-example" hide-footer>
                <template #modal-title>
                Politica de Privacidad
                </template>
                <div class="d-block text-center">
                  <p>El respeto a tu privacidad se encuentra codificado en nuestro ADN. Desde que iniciamos 
                    En que te ayudo?, aspiramos a crear nuestros Servicios teniendo en cuenta fuertes principios 
                    de privacidad. En que te ayudo ? ofrece mensajes, llamadas por Internet y otros servicios 
                    a usuarios alrededor del mundo. Nuestra Política de privacidad ayuda a explicar nuestras 
                    prácticas de información (incluidos los mensajes). Por ejemplo, hablamos sobre la información 
                    que recopilamos y qué repercusión tiene para ti. También explicamos las medidas que tomamos 
                    para proteger tu privacidad, como diseñar En que te ayudo? de modo que los mensajes entregados 
                    no se almacenen y tengas control para elegir con quién te comunicas en nuestros Servicios. 
                    Cuando decimos "En que te ayudo?", "nuestro/a(s)", "nosotros" o "nos", nos referimos a En que 
                    te ayudo? LLC. Esta Política de privacidad ("Política de privacidad") se aplica a todas nuestras 
                    aplicaciones, servicios, funciones, software y sitio web (en conjunto, "Servicios") a menos 
                    que se indique lo contrario.</p>
                </div>
                <b-button class="mt-3" block @click="$bvModal.hide('bv-modal-example')">Cerrar</b-button>
              </b-modal>
        </b-form-group>

      <button class="btn btn-success" type="submit" :disabled="!validator.valid()">Confirmar</button>

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
import axios from "axios";
import router from "@/router";

const minDate = new Date();
const maxDate = new Date();
const initialDate = new Date();
minDate.setFullYear(minDate.getFullYear() - 100, 0, 1);
maxDate.setFullYear(maxDate.getFullYear() - 18, 0, 1);
initialDate.setFullYear(initialDate.getFullYear() - (100 - 18) / 2, 0, 1);

const axiosConfig = {
  headers: {
    "Content-type": "application/json",
    crossDomain: true,
    "Acces-Control-Allow-Origin": "*",
  },
};

export default {
  name: "ConfirmRegistro",
  data() {
    return {
      timer: null,
      dateConfig: {
        min: minDate,
        max: maxDate,
        initial: initialDate,
        format: { year: "numeric", month: "2-digit", day: "2-digit" },
      },
      validator: {
        date: null,
        token: null,
        calleNumero: null,
        idEstado: null,
        idMunicipio: null,
        aviso: null,
        valid() {
          return Boolean(
            this.aviso &&
            this.date &&
            this.token &&
            this.calleNumero &&
            this.idEstado &&
            this.idMunicipio
          );
        }
      },
      token: "",
      aviso: "not_accepted",
      calleNumero: "",
      idEstado: 0,
      idMunicipio: 0,
      fNacimiento: "",
      msgErr: "",
      invalidFeedbackMessages: {
        token: "El token solo debe tener 6 caracteres",
      },
      estados: [],
      municipios: [],
      loading: false,
    };
  },
  mounted() {
    this.updateEstados();
  },
  methods: {
    makeToast() {
      this.$root.$bvToast.toast(
        "Ahora puedes iniciar sesión y usar nuestros servicios",
        {
          title: "¡Registro exitoso!",
          variant: "success",
          solid: true,
          toaster: "b-toaster-bottom-right",
        }
      );
    },
    updateEstados() {
      axios
        .get("/api/estados.json", axiosConfig)
        .then(
          (response) =>
            (this.estados = response.data.map((x) => ({
              value: x.id,
              text: x.nombre,
            })))
        )
        .catch((error) => console.error(error))
        .finally(() => (this.loading = false));
    },
    updateMunicipios() {
      axios
        .get(`/api/municipios.json?idEstado=${this.idEstado}`, axiosConfig)
        .then(
          (response) =>
            (this.municipios = response.data.map((x) => ({
              value: x.id,
              text: x.nombre
                .toLowerCase()
                .replace(/^\w/, (c) => c.toUpperCase()),
            })))
        )
        .then(() => (this.idMunicipio = this.municipios[0].value))
        .catch((error) => console.error(error))
        .finally(() => (this.loading = false));
    },
    registrar() {
      this.loading = true;
      axios
        .post(
          "/api/confirmarRegistro.json",
          {
            token: this.token,
            calleNumero: this.calleNumero,
            idMunicipio: this.idMunicipio,
            fNacimiento: this.fNacimiento.toString(),
          },
          axiosConfig
        )
        .then(() => {
          this.makeToast();
          router.push("/ui/login");
        })
        .catch((error) => {
          if (error.response.status === 404) {
            this.validator.token = false;
            this.invalidFeedbackMessages.token =
              "El token ya no es valido o no existe, te recomentamos generar otro token";
          } else {
            this.msgErr = "Ha ocurrido un error de red: " + error;
            this.$modal.show("mensaje-confirm");
          }
        })
        .finally(() => (this.loading = false));
    },
    closeModal() {
      this.$modal.hide("mensaje-confirm");
    },
  },
  watch: {
    fNacimiento() {
      this.validator.date = this.fNacimiento.length !== 0;
    },
    token(newValue) {
      if (this.invalidFeedbackMessages.token.includes("no existe")) {
        this.validator.token = null;
        this.invalidFeedbackMessages.token = "El token solo debe tener 6 caracteres";
      }
      this.validator.token = newValue.length === 6;
    },
    calleNumero(newValue) {
      this.validator.calleNumero = 2 < newValue.length && newValue.length < 256;
    },
    idEstado(newValue) {
      this.validator.idEstado = Boolean(newValue);
      this.validator.idMunicipio = null;
    },
    idMunicipio(newValue) {
      this.validator.idMunicipio = this.validator.idEstado
        ? Boolean(newValue)
        : null;
    },
    aviso(){
      this.validator.aviso=this.aviso==="accepted";
    }
  }
};
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
</style>
