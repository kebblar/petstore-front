<template>
  <div class="ancho centra">
    <div class="card" style="width: 380px">
      <div class="card-header">
        <div class="row">
          <div class="col-sm-6">
            <label>Ingresar al sistema</label>
          </div>
          <div class="col-sm-6" style="text-align: right">
            <label>V. {{ version }}</label>
          </div>
        </div>
      </div>
      <!-- ends header-->

      <div class="card-body">
        <div class="row">
          <div class="col-sm-12 text-left">
            <div class="form-group">
              <label for="precioVenta">Usuario</label>
              <!--   <input type="text" class="form-control" v-model="usr" />  -->
              <input
                type="email"
                required
                class="form-control"
                :class="classMail"
                id="mail"
                placeholder="ejemplo@gmail.com"
                v-model="usr"
              />
              <small class="notValid">{{ msgMail }}</small>
            </div>
            <div class="form-group">
              <div class="row">
                <div class="col-sm-6 text-left">
                  <label for="clave">Clave</label>
                </div>
                <div class="col-sm-6 text-right">
                  <a href="#" @click="openForgotPage">Olvidé mi clave</a>
                </div>
              </div>
              <!--    <input type="password" class="form-control" v-model="psw" /> -->
              <input
                type="password"
                required
                :class="classPasswd"
                class="form-control"
                id="clave"
                placeholder="******"
                v-model="password"
                maxlength="16"
                minlength="8"
              />
              <small id="clave" class="form-text text-muted" :class="isVisible">
                <b>La clave contiene:</b>
                <ul>
                  <li :style="styleCarac">8 carateres como mínimo</li>
                  <li :style="styleUpper">Una mayúscula</li>
                  <li :style="styleNum">Un número</li>
                </ul>
              </small>
            </div>
          </div>
          <div class="col-sm-12" style="text-align: center">
            <button @click="checkCredentials" class="btn btn-warning">
              Ingresar al sistema
            </button>
          </div>
          <div class="col-sm-12" style="text-align: center">
            <hr />
            <a href="#" @click="openRegistroPage"
              >Deseo registrarme al sistema</a
            >
          </div>
        </div>
      </div>
      <!-- ends body-->
    </div>
    <!-- ends card-->

    <modal
      name="mensaje-login"
      :clickToClose="false"
      :reset="true"
      :width="480"
      :height="260"
    >
      <div class="card">
        <div class="card-header">Advertencia del sistema</div>
        <div class="card-body">
          <h5 class="card-title">Error de ingreso al sistema</h5>
          <p class="card-text">{{ msgErr }}</p>
          <div style="text-align: right">
            <a href="#" class="btn btn-primary" @click="closeModal">Aceptar</a>
          </div>
        </div>
      </div> </modal
    ><!-- ends modal-->
  </div>
</template>

<script>
import axios from "axios";
import router from "../router";
import store from "../store";

const emaiRegex = new RegExp(
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
);
const passRegex = new RegExp("^(?=.*[A-Z])(?=.*[0-9])(?=.{8,})");

export default {
  data: function () {
    return {
      usr: "",
      psw: "",
      msgErr: "",
      email: "",
      password: "",

      msgMail: null,
      msgPasswd: null,

      classMail: "defaultColor",
      classPasswd: "defaultColor",

      styleCarac: "color:grey;",
      styleUpper: "color:grey;",
      styleNum: "color:grey;",

      styleCalendar: "",
      isVisible: "hidden",
      activoClave: true, //Cambia el valor del booleano para ver las distintas versiones de validaciones de la clave

      version: process.env.VUE_APP_VERSION,
    };
  },
  watch: {
    usr() {
      this.msgMail = "";
      this.classMail = "greenColor correct";
      if (!emaiRegex.test(this.usr)) {
        this.msgMail = "El correo ingresado no es valido";
        this.classMail = "redColor incorrect";
      }
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
  },

  computed: {
    habilitaBoton: function () {
      var dato =
        true &&
        this.usr &&
        emaiRegex.test(this.usr) &&
        this.password &&
        passRegex.test(this.password);

      return !dato;
    },
  },
  methods: {
    detecta: function (roles) {
      if (store.state.destination.length > 0) {
        var target = store.state.destination;
        store.commit("setDestination", "");
        return target;
      }
      if (typeof roles === "string") {
        return "/ui/inicio";
      } else {
        for (var i = 0; i < roles.length; i++) {
          switch (roles[i].nombre) {
            case "admin":
              return "/ui/admin"; // rol 1 = administrador
            case "user":
              return "/ui/user"; // rol 2 = usuario comun y corriente
            default:
              return "/ui/inicio"; // otro rol cualquiera
          }
        } // ends for cycle with switch inside
      }
    },
    closeModal: function () {
      this.$modal.hide("mensaje-login");
    },
    openRegistroPage: function () {
      router.push({ name: "registro" });
    },
    openForgotPage: function () {
      router.push({ name: "regenera-clave" });
    },
    checkCredentials: function () {
      axios
        .post("/api/login.json", {
          usuario: this.usr,
          clave: this.password,
        })
        .then((response) => {
          var rd = response.data;
          var ud = rd.usuarioDetalle;
          store.commit("setSession", {
            nombreCompleto:
              ud.nombre + " " + ud.apellidoPaterno + " " + ud.apellidoMaterno,
            roles: rd.roles,
            correo: rd.correo,
            ultimoAcceso: rd.ultimoAcceso,
            jwt: rd.jwt,
          });
          const target = this.detecta(rd.roles);
          router.push(target);
        })
        .catch((error) => {
          // el catch ocurre aun si el post está bien pero ud es null, por ejemplo !!!!
          this.msgErr = error;
          if (error.response) {
            this.msgErr = error.response.data["exceptionLongDescription"];
          }
          this.$modal.show("mensaje-login");
        });
    },
  },
};
</script>

<style>
.ancho {
  max-width: 400px;
}
</style>