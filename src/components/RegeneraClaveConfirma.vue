<template>
  <div class="ancho centra">
    <div class="card" style="width: 390px">
      <div class="card-header">
        <label class="h4">Regenera tu clave</label>
      </div>
      <div class="card-body align">
        <form>
          <small class="form-text text-muted text-center"
            >Un token de 6 dígitos fue enviado a tu correo electrónico, por
            favor introdúcelo a continuación:</small
          >
          <br />
          <div class="form-group form-row">
            <div class="col-sm-4">
              <label for="correo">Token:</label>
            </div>
            <div class="col form-group">
              <input
                type="text"
                required
                class="form-control"
                :class="classToken"
                id="token"
                placeholder="XXXXXX"
                v-model="token"
                maxlength="6"
                minlength="6"
              />
              <small class="notValid">{{ msgToken }}</small>
            </div>
          </div>
        </form>

        <hr class="dashed" />

        <form>
          <small class="form-text text-muted text-center"
            >Ingresa tu nueva clave y su confirmación</small
          >
          <br />
          <div class="form-group form-row">
            <div class="col-sm-4">
              <label for="clave">Clave nueva:</label>
            </div>

            <div class="col">
              <!--cambiar booleano "activaClave" linea 242-->
              <input
                type="password"
                required
                :class="classPasswd"
                class="form-control"
                id="clave"
                placeholder="******"
                v-model="password"
              />
              <small id="clave" class="form-text text-muted" :class="isVisible">
                <b>La clave debe contener:</b>
                <ul>
                  <li :style="styleCarac">8 carateres como mínimo</li>
                  <li :style="styleUpper">Una mayúscula</li>
                  <li :style="styleNum">Un número</li>
                </ul>
              </small>
            </div>
          </div>

          <div class="form-group form-row">
            <div class="col-sm-4">
              <label for="clave">Confirmación:</label>
            </div>
            <div class="col form-group">
              <input
                type="password"
                required
                :disabled="pwConfDisabled"
                :class="classConfirm"
                class="form-control"
                id="confirmacion"
                placeholder="******"
                v-model="confirm"
              />
              <small class="notValid">{{ msgConfirm }}</small>
            </div>
          </div>
        </form>

        <div class="form-group row text-center">
          <div class="col text-center">
            <button type="button"
            :disabled="habilitaBoton" 
            class="btn btn-success" 
            @click="cambiaClave">
              Cambiar mi clave
            </button>
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
      :height="220"
    >
      <div class="card">
        <div
          class="card-header text-white"
          style="text-align: center; background-color: #363636"
        >
          <label class="control-label h4">{{ modalTitulo }}</label>
        </div>
        <div class="card-body">
          <p class="card-text">{{ modalMessage }}</p>
          <div style="text-align: right">
            <a href="#" class="btn btn-primary" @click="go">Aceptar</a>
          </div>
        </div>
      </div>
    </modal>
  </div>
</template>


<script>
import axios from "axios";
import router from "../router";

const passRegex = new RegExp("^(?=.*[A-Z])(?=.*[0-9])(?=.{8,})");

export default {
  data() {
    return {
      token: "",
      password: "",
      confirm: "",
      modalShowsError: false,
      modalTitulo: "",

      msgToken: null,
      msgPasswd: null,
      msgConfirm: null,

      classToken: "defaultColor",
      classPasswd: "defaultColor",
      classConfirm: "defaultColor",
      isVisible: "hidden",
      activoClave: true, //Cambia el valor del booleano para ver las distintas versiones de validaciones de la clave
      modalMessage: "",
    };
  },
  watch: {
    token() {
      this.msgToken = "";
      this.classToken = "greenColor correct";
      if (this.token.trim().length < 6) {
        this.msgToken =
          "El token debe contener máximo 6 dígitos";
        this.classToken = "redColor incorrect";
      }
      this.token =
        this.token.length === 1 ? this.token.toUpperCase() : this.token;
    },
    password(value) {
      this.isVisible = "show";
      this.msgPasswd = "";
      this.classPasswd = "greenColor correct";
      this.pwConfDisabled = false;
      this.confirm = null;
      if (!passRegex.test(this.password)) {
        this.msgPasswd = "Clave incorrecta";
        this.classPasswd = "redColor incorrect";
        this.pwConfDisabled = true;
      }
      //Estilo para los requerimientos de la clave
      const red = "color :  rgb(235, 74, 74) ;";
      const green = "color : green  ;";

      this.styleCarac = value.length < 8 ? red : green;
      this.styleUpper =
        value.replace(/[*A-Z]/g, "").length < value.length ? green : red;
      this.styleNum =
        value.replace(/[*0-9]/g, "").length < value.length ? green : red;

      this.styleCarac2 = value.length < 8 ? "show" : "hidden";
      this.styleUpper2 =
        value.replace(/[*A-Z]/g, "").length < value.length ? "hidden" : "show";
      this.styleNum2 =
        value.replace(/[*0-9]/g, "").length < value.length ? "hidden" : "show";
    },
    confirm() {
      this.msgConfirm = "";
      this.classConfirm = "greenColor correct";
      if (this.confirm != this.password) {
        this.msgConfirm = "Las claves no coinciden";
        this.classConfirm = "redColor incorrect";
        this.isVisible = "hidden";
      }
    },
  },
  computed: {
    habilitaBoton: function(){
      var dato = true 
      && this.token && this.token.length>2
      && this.password && passRegex.test(this.password)
      && this.password===this.confirm
      return !dato;
    }

  },
  methods: {
    go() {
      if (this.modalShowsError) {
        this.$modal.hide("aviso");
      } else {
        router.push("/ui/login");
      }
    },
    cambiaClave() {
      axios
        .get(
          "api/confirma-regenera-clave.json?token=" +
            this.token +
            "&clave=" +
            this.clave,
          {}
        )
        .then((response) => {
          console.log(response);
          console.log(response.data);
          console.log(response.status);
          this.modalShowsError = false;
          this.modalTitulo = "Regeneración exitosa";
          this.modalMessage =
            "Tu clave ha sido regenerada exitosamente, ahora puedes iniciar sesión !";
        })
        .catch((error) => {
          this.modalShowsError = true;
          this.modalTitulo = "Error en el proceso de confirmación";
          this.modalMessage = error;
          if (error.response) {
            this.modalMessage = error.response.data["exceptionLongDescription"];
          }
        })
        .finally(this.$modal.show("aviso"));
    },
  },
};
</script>

<style>
hr.dashed {
  border-top: 3px dashed #bbb;
}
</style>