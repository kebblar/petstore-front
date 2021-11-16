<template>
  <div class="container">
    <div class="row">
      <div class="col-sm-12 text-left my-3">
<!--        Nickname-->
        <div class="form-group">
          <div class="row px-3">
            <input autocomplete="off" style="display:none;" @click="activoClave=false" type="text" required placeholder="Mi nickname" maxlength="20" class="form-control" :class="className" id="text-usr" v-model="name" />
            <span class="fas fa-user errspan"></span>
            <small class="notValid">{{msgName}}</small>
          </div>
        </div>
<!--        Correo-->
        <div class="form-group">
          <div class="row px-3">
            <input autocomplete="off" style="display:none;" @click="activoClave=false" type="email" required class="form-control" maxlength="35" :class="classMail" id="text-usr" placeholder="ejemplo@gmail.com" v-model="email">
            <span class="fas fa-envelope errspan"></span>
            <small class="notValid">{{msgMail}}</small>
          </div>
        </div>
<!--        Password-->
        <div class="form-group">
          <div class="row px-3">
            <input autocomplete="off" style="display:none;" @keydown="activoClave=true" :type=pwInputValue :class="classPasswd" maxlength="20" placeholder="*****" class="form-control" id="password" v-model="password" />
            <span class="fas fa-lock errspan"></span>
            <div class="ojo put-right">
              <a @click="oculta" class="a2" style="cursor:pointer;">
                <div class="icon-wrapper">
                  <i :class="[pwVisible ? 'fas fa-eye-slash' : 'fas fa-eye']"></i>
                </div>
              </a>
            </div>
            <!--varificacion dinamica de clave-->
            <div class="col" :class="estiloClave1">
              <small id="clave" class="form-text text-muted" :class="isVisible">
                <b>La clave contiene:</b>
                <ul>
                  <li :style="styleCarac">8 carateres como mínimo</li>
                  <li :style="styleUpper">Una mayúscula</li>
                  <li :style="styleNum">Un número</li>
                  <li :style="styleSpecial">Un caracte especial, como _, -, #, etc.</li>
                </ul>
              </small>
            </div>
          </div>
        </div>

        <!-- fecha de nacimiento -->
        <div class="form-group">
          <div class="row no-gutters px-3">
            <div class="col-4 col-sm-3 col-md-4 pr-3 pr-sm-3 pr-md-2 col-lg-3">
              <label class="my-0">Dia</label>
              <select @click="activoClave=false" class="form-control" v-model="day">
                <option v-for="i in diasDelMes" :key="i">{{ i }}</option>
              </select>
            </div>

            <div class="col-8 col-sm-6 col-md-8 pr-0 pr-sm-3 pr-md-0 col-lg-6 pr-lg-2">
              <label class="my-0">Mes</label>
              <select class="form-control" v-model="month">
                <option value="1">Enero</option>
                <option value="2">Febrero</option>
                <option value="3">Marzo</option>
                <option value="4">Abril</option>
                <option value="5">Mayo</option>
                <option value="6">Junio</option>
                <option value="7">Julio</option>
                <option value="8">Agosto</option>
                <option value="9">Septiembre</option>
                <option value="10">Octubre</option>
                <option value="11">Noviembre</option>
                <option value="12">Diciembre</option>
              </select>
            </div>
            <div class="col-12 col-sm-3 col-md-12 col-lg-3">
              <label class="my-0 ">Año</label>
              <select @click="activoClave=false" id="dia" class="form-control" v-model="year">
                <option v-for="i in 70" :key="i">{{ 2002 - i }}</option>
              </select>
            </div>
            <small class="info text-secondary mt-2">Debes ser mayor de 21 años para registrarte.</small>
          </div>
        </div>

      </div>
      <div class="col-sm-12 w-100 mt-2">
        <button :disabled="habilitaBoton"
                data-toggle="modal"
                data-target="#termsModal"
                class="btn btn-block btn-success">Registrarme</button>
        <hr/>
      </div>

    </div>
    <Aviso
        ref='avisoComponente'
        ancho='320'
        target=''
        :avisoMsg=msgErr
        avisoTitulo='Error de ingreso al sistema' />

    <!--          Modal-->
    <div class="modal fade" id="termsModal" tabindex="-1" role="dialog">
      <div class="modal-dialog modal-md modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header mb-2 bg-light">
            <h5 class="modal-title ml-3" >
              <b>Términos y condiciones</b>
            </h5>
            <button type="button" class="close mr-2" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>

          <div class="modal-body mx-2">
            <div class="row " style="text-align: left">
              <div class="col">
                <p class=" h6">
                  He leido y estoy de acuerdo con:<br><br>
                </p>
                <small class="px-4">
                  <input type="checkbox"  required  id="agree1" v-model="servicio"/>
                  <a href="#"> Los términos de servicio</a><br>
                </small >
                <small class="px-4">
                  <input type="checkbox"  required  id="agree2" v-model="avisoP"/>
                  <a href="#"> El aviso de privacidad de datos personales</a><br>
                </small>
                <small class="px-4">
                  <input type="checkbox"  required  id="agree3" v-model="mayor"/>
                  <a href="#"> Que soy mayor de edad y publico por mi propia voluntad</a><br>
                </small>

                <div class="row pt-3" style="padding-left: 40px">
                  <div class="g-recaptcha mx-auto">
                    <vue-recaptcha
                        id="solvecaptcha"
                        ref="recaptcha"
                        sitekey="6LffEdkaAAAAAOJllar3d53MdUh3qOZLhdQ8GuQs"
                        @expired="onCaptchaExpired"
                        @verify="onCaptchaVerified"/>
                  </div>
                </div>
              </div>


            </div>
          </div>
          <div class="modal-footer border-top-0 d-flex justify-content-around px-0 mb-3">
            <button type="button" class="btn btn-outline-danger" data-dismiss="modal">Cancelar</button>
            <button type="button" :disabled="verifyCheck" class="btn btn-outline-info" data-dismiss="modal" @click="submition">Continuar con el registro</button>

          </div>
        </div>
      </div>
    </div>
<!--    modal end-->
  </div>

</template>

<script>
import VueRecaptcha from 'vue-recaptcha';
import "vue-range-slider/dist/vue-range-slider.css";
import Aviso from './custom/dialog/Aviso';
import axios from "axios";
import router from "../router";
import Vue from "vue";

const HTTP_STATUS = {
  OK : 200,
  FORBIDDEN: 403
}

const emaiRegex = new RegExp(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
const passRegex = new RegExp("^(?=.*[A-Z])(?=.*[0-9])(?=.{8,})");
const regularExpression = new RegExp(/[&\\#, +(\-\\_)$~%.'":*?<>{}]/g);
const nameRegExp = new RegExp(/^([A-Za-z0-9]{3,18})$/);

export default {
  components: {
    VueRecaptcha,
    Aviso
  },
  mounted() {
    this.name = '';
    this.password = '';
    this.email = '';
    },
  data () {
    return {
      msgErr:'',
      target:'',

      name: '',
      email : '',
      password : '',
      fNacimiento : null,
      captcha: false,

      year: 2000,
      month: 1,
      day: 1,

      className: 'defaultColor',
      classMail: 'defaultColor',
      classPasswd: 'defaultColor',
      classTel: 'defaultColor',

      msgName : null,
      msgMail : null,
      msgPasswd : null,
      msgTel : null,

      styleCarac : 'color:grey;',
      styleUpper : 'color:grey;',
      styleNum : 'color:grey;',
      styleSpecial : 'color:grey',

      isVisible : 'hidden',
      vacio:true,
      activoClave : false,

      servicio : false,
      avisoP : false,
      mayor : false,

      pwVisible: false,
      pwInputValue : "password",
      diasDelMes: 31
    }
  },
  watch: {
    year(){
      this.diasDelMes = this.calculaDiasDelMes();
    },
    month() {
      this.diasDelMes = this.calculaDiasDelMes();
    },
    name(){
      this.msgName="";
      this.className="ok";
      if (!nameRegExp.test(this.name)){
        this.msgName="El nick debe ser mayor a 3 caracteres y menor a 18, sin espacios ni caracteres especiales. Puede contener números.";
        this.className="not-ok";
      }
    },
    email(){
      this.msgMail="";
      this.classMail="ok";
      if(this.email.length>30 || !emaiRegex.test(this.email)) {
        this.msgMail="El correo ingresado no es valido";
        this.classMail="not-ok";
      }
    },
    password(value) {
      this.isVisible = 'show';
      this.msgPasswd = "Clave incorrecta";
      this.classPasswd = "not-ok";
      if (passRegex.test(this.password) && regularExpression.test(this.password)) {
        this.msgPasswd = "";
        this.classPasswd = "ok";
      }
      //Estilo para los requerimientos de la clave
      const red = 'color :  rgb(235, 74, 74) ;'
      const green = 'color : green  ;'

      this.styleCarac = value.length < 8 ? red : green;
      this.styleUpper = (value.replace(/[*A-Z]/g, "").length) < value.length ? green : red;
      this.styleNum = (value.replace(/[*0-9]/g, "").length) < value.length ? green : red;
      this.styleSpecial = (value.replace(regularExpression, "").length) < value.length ? green : red;
    },
  },
  computed:{
    verifyCheck() {
      return !(this.captcha && this.servicio && this.avisoP && this.mayor);
    },
    estiloClave1 (){
      return this.activoClave ? 'show' : 'hidden';
    },
    habilitaBoton: function() {
      var dato = true
          && this.name && this.name.length>2
          && this.email && emaiRegex.test(this.email)
          && this.password && passRegex.test(this.password) && regularExpression.test(this.password);
      return !dato;
    }
  },
  methods: {
    calculaDiasDelMes() {
      this.day = 1;
      var mes = this.month;
      if(mes==4 || mes==6 || mes==9 || mes==11) return 30;
      if(mes==2) {
        if(this.year%4==0) return 29;
        return 28;
      }
      return 31;
    },
    oculta () {
      this.pwVisible = !this.pwVisible;
      this.pwInputValue = (this.pwVisible) ? "text" : "password";
    },
    onCaptchaVerified(recaptchaToken) {
      axios.post('api/check-captcha.json', {
        response: recaptchaToken,
        ip: '127.0.0.1'
      })
          .then(response => {
            if (response.status === HTTP_STATUS.OK) {
              this.captcha = true;
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
      this.captcha = false;
      this.$refs.recaptcha.reset();
    },
    submition() {
      this.loading = true;
      axios.post('api/usuario-preregistro2.json', {
        id:0,
        nick: this.name,
        claveHash: this.password,
        correo: this.email,
        telefono : '5587654321',
        year : this.year,
        month : this.month,
        day : this.day
      }).then(response => {
        this.loading = false
        if(response.data) console.log('ok');
        router.push('confirma-registro');
      }).catch(error => {
        this.loading = false
        if(error.response) {
          Vue.$toast.open({
            message: error.response.data['exceptionLongDescription'],
            type: 'error',
            duration: 5000,
            position:'top'
          });
        } else {
          console.log(error.data);
          this.$modal.show('mensaje-login');
        }
      }).finally(
          console.log('end ulpoad')
      );
    }
  }
}
</script>

<style scoped>

#text-usr{
  padding-left: 33px;
  display: block;
  box-sizing: border-box;
  margin-bottom: 4px;
  font-size: 12px;
  line-height: 2;
  border: 0;
  font-family: inherit;
}
#password{
  padding-left: 33px;
  padding-top: 10px;
  padding-right: 37px;
  display: block;
  box-sizing: border-box;
  margin-bottom: 4px;
  font-size: 12px;
  line-height: 2;
  border: 0;
  font-family: inherit;
  transition: 0.5s all;
}

label {
  font-family: inherit;
  font-size: 12px;
}
.ok {
  box-shadow: 1px 1px 3px #8cc968;
  border-bottom: 1px solid #5e6e5e;
}
.not-ok {
  box-shadow: 1px 1px 3px #d37474;
  border-bottom: 1px solid #7e5151;
}
.defaultColor {
  background-color: white;
  box-shadow: 1px 1px 3px #d8dcdd;
  border-bottom: 1px solid #dddedf;
}

select {
  border: 0;
  outline: 0;
  box-shadow: 1px 1px 3px #8cc968;  font-family: inherit;
  transition: 0.5s all;
  font-size: 12px;
}

.form-control:focus {
  box-shadow: inset 0 0 1px rgba(0, 0, 0, 0.075), 0 0 8px rgba(168, 161, 161, 0.58);
}
.a2 {
  color:#000;
}
.a2:hover {
  color:#00f;
}
.put-right{
  position: absolute;
  right: 28px;
  margin-top: 9px;
  z-index: 2;
}
.errspan{
  left: 29px;
  margin-top: 7px;
  position: absolute;
  z-index: 2;
  color: #000;
  font-size: 13px;
}

</style>