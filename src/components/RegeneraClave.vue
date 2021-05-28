<template>
  <div class="ancho centra">
    <div class="card" style="width: 390px">
      <div class="card-header">
        <label class="h4">Regeneración de clave de acceso</label>
      </div>
      <div class="card-body align">
        <small class="form-text text-muted text-center"
          >Por favor introduce el correo electrónico con el que te registraste
          en el sistema para recuperar tu cuenta</small
        >
        <br />

        <div class="form-group text-center">
          <label for="correo">Correo electrónico</label>
          <input
            type="email"
            required
            class="form-control"
            :class="classMail"
            id="mail"
            placeholder="ejemplo@gmail.com"
            v-model="email"
          />
          <small class="notValid">{{ msgMail }}</small>
        </div>
        <br />

        <div>
          <vue-recaptcha
            id="solvecaptcha"
            ref="recaptcha"
            sitekey="6LffEdkaAAAAAOJllar3d53MdUh3qOZLhdQ8GuQs"
            @expired="onCaptchaExpired"
            @verify="onCaptchaVerified"
          />
        </div>
        <br />

        <div class="form-group row text-center">
          <div class="col text-center">
            <button
              type="button"
              :disabled="habilitaBoton"
              @click="cambiaClave"
              class="btn btn-success"
            >
              Recuperar mi clave
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import VueRecaptcha from "vue-recaptcha";
import router from "../router";
import axios from "axios";

const HTTP_STATUS = {
  OK: 200,
  FORBIDDEN: 403,
};

const emaiRegex = new RegExp(
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
);

export default {
  data() {
    return {
      email: "",
      captcha: false,

      msgMail: null,

      classMail: "defaultColor",
    };
  },
  components: {
    VueRecaptcha,
  },
  watch: {
    email() {
      this.msgMail = "";
      this.classMail = "greenColor correct";
      if (!emaiRegex.test(this.email)) {
        this.msgMail = "El correo ingresado no es valido";
        this.classMail = "redColor incorrect";
      }
    },
    token() {
      this.msgToken = "";
      this.classToken = "greenColor correct";
      if (this.token.trim().length < 6) {
        this.msgToken =
          "El token debe contener máximo 6 dígitos ";
        this.classToken = "redColor incorrect";
      }
      this.token =
        this.token.length === 1 ? this.token.toUpperCase() : this.token;
    },
  },
  computed: {
    habilitaBoton: function () {
      var dato =
        true && this.email && emaiRegex.test(this.email) && this.captcha;
      return !dato;
    },
  },
  methods: {
    go() {
      if (this.modalShowsError) {
        this.$modal.hide("aviso");
      } else {
        router.push("/ui/login");
      }
    },
    onCaptchaVerified(recaptchaToken) {
      axios
        .post("api/check-captcha.json", {
          response: recaptchaToken,
          ip: "10.0.2.15",
        })
        .then((response) => {
          if (response.status === HTTP_STATUS.OK) {
            this.captcha = true;
          } else {
            this.msgErr = "Regreso con un estatus: " + response.status;
            this.$bvModal.show("mensaje-login");
          }
        })
        .catch((error) => {
          console.log(error.data);
          this.msgErr = "Ha ocurrido un error de red: " + error;
          this.$bvModal.show("mensaje-login");
        })
        .finally(() => (this.loading = false));
    },
    onCaptchaExpired() {
      this.captcha = false;
      this.$refs.recaptcha.reset();
    },
    cambiaClave() {
      axios
        .get("api/regenera-clave.json?correo=" + this.email, {})
        .then((response) => {
          console.log(response);
          console.log(response.data);
          console.log(response.status);
        })
        .catch((error) => {
          if (error.response) {
            console.log(error);
          }
        })
        .finally(
          console.log("finaliza proceso de solicitud de regeneracion de clave")
        );
      router.push("/ui/regenera-clave-confirma").catch(() => {});
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.align {
  text-align: left;
}

.notValid {
  color: rgb(235, 74, 74);
}

.greenColor:focus {
  background-color: #eefaee;
  box-shadow: 2px 1px 4px #bdd3ae;
}

.correct {
  border-color: rgb(96, 161, 99);
  border-width: 1px;
  box-shadow: 1px 1px 3px #d8dcdd;
  background: url(../assets/check.png) no-repeat scroll;
  background-position: right;
  background-size: 17px;
  background-position-x: 96%;
}

.redColor:focus {
  background-color: #fff3f3;
  box-shadow: 2px 1px 4px #dba6a6;
}

.incorrect {
  border-color: rgb(235, 74, 74);
  border-width: 1px;
  box-shadow: 1px 1px 3px #d8dcdd;
  background: url(../assets/danger.jpg) no-repeat scroll;
  background-position: right;
  background-size: 20px;
  background-position-x: 96%;
}

.defaultColor {
  background-color: white;
  box-shadow: 1px 1px 3px #d8dcdd;
}

.hidden {
  display: none;
}

.show {
  display: block;
}
</style>