<template>
<div class="ancho centra">
  <div class="card" style="width:410px;">
    <div class="card-header">
         <label class="control-label h4">Registro</label>
    </div>
    <div class="card-body align" style="margin-top:20px;">
      
      <form @submit.prevent="submition">
        <!-- Nombre -->
        <div class ="form-row form-group">
          <div class="col-md-4">
            <label for="nombre">Nombre:</label>
          </div>
          <div class="col">
            <input type="text" required class="form-control" :class="msgName===' ' ? 'defaultColor' : msgName==='' ? verde : rojo" id="nombre" placeholder="Alma" v-model="name">
            <small class="notValid">{{msgName}}</small>
          </div>
        </div>
        <!-- Apellido P -->
        <div class ="form-row form-group">
          <div class="col-md-4">
            <label for="nombre">Apellido Paterno:</label>
          </div>
          <div class="col">
            <input type="text" required class="form-control" :class="msgLast===' ' ? 'defaultColor' : msgLast==='' ? verde : rojo" id="apellidoP" placeholder="Cruz" v-model="last">
            <small class="notValid">{{msgLast}}</small>
          </div>
        </div>
        <!-- Appelido M -->
        <div class ="form-row form-group">
          <div class="col-md-4">
            <label for="nombre">Apellido Materno:</label>
          </div>
          <div class="col">
            <input type="text" required class="form-control" :class="msgSndLast===' ' ? 'defaultColor' : msgSndLast==='' ? verde : rojo" id="apellidoM" placeholder="Ibarra" v-model="sndLast">
            <small class="notValid">{{msgSndLast}}</small>
          </div>
        </div>
        <!-- correo -->
        <div class ="form-row form-group">
          <div class= "col-md-4">
            <label for="correo">Correo:</label>
          </div>
          <div class="col">
            <input type="email" required class="form-control" :class="msgMail===' ' ? 'defaultColor' : msgMail==='' ? verde : rojo" id="mail" placeholder="ejemplo@gmail.com" v-model="email">
            <small class="notValid">{{msgMail}}</small>
          </div>
        </div>
        <!-- clave -->
        <div class ="form-row form-group">
          <div class="col-md-4">
            <label for="clave">Clave:</label>
          </div>
          <div class="col">
            <input type="password" required :class="msgPasswd===' ' ? 'defaultColor' : msgPasswd==='' ? verde : rojo" class="form-control" id="clave" placeholder="******" v-model="password">
            <small id="clave" class="form-text text-muted">Debe estar compuesto por <b :style="styleCarac">8 caracteres</b>, <b :style="styleUpper">una mayúscula</b> y <b :style="styleNum">un número</b> al menos</small>
          </div>
        </div>
        <!-- clave confirma -->
        <div class ="form-row form-group">
          <div class="col-md-4">
            <label for="confirmacion">Confirmación de la clave:</label>
          </div>
          <div class="col">
            <input type="password" :disabled="pwConfDisabled" required :class="msgConfirm===' ' ? 'defaultColor' : msgConfirm==='' ? verde : rojo" class="form-control" id="confirmacion" placeholder="******" v-model="confirm">
            <small class="notValid">{{msgConfirm}}</small>
         </div>
        </div>
        <!-- f nacimiento -->
        <div class ="form-row form-group">
          <div class="col-md-4">
            <label> Fecha de nacimiento:</label>
          </div>
          <div class="col">
            <b-form-datepicker
                id="fecha-nacimiento"
                v-model="fNacimiento"
                :initial-date="dateConfig.initial"
                :max="dateConfig.max"
                :min="dateConfig.min"
                calendar-width="100%"
                class="mb-2"
                :class="styleCalendar"
                hide-header
                locale="es"
                menu-class="w-100"
                nav-button-variant="secondary"
                placeholder="MM-DD-YYYY"
                show-decade-nav
                v-bind:value-as-date=true
                />
              </div>
        </div>
        <!-- telefono -->
        <div class ="form-row form-group">
          <div class="col-md-4">
          <label for="telefono">Telefono:</label>
          </div>
          <div class="col">
          <input type="tel" class="form-control" required :class="msgTel===' ' ? 'defaultColor' : msgTel==='' ? verde : rojo" id="telefono" placeholder="XX XXXX XXXX" v-model="tel">
          <small class="notValid">{{msgTel}}</small>
          </div>
        </div>

        <!-- ESTADO -->
        <div class= form-row form-group>
          <div class="col-md-4">
            <label for="estado">Estado:</label>
          </div>
          <div class="col">
            <select class="form-control" v-model="estadoSelec" required>
              <option :value="estado.id" v-for="estado in listaEstado" :key="estado.id">{{estado.nombre}}</option>
            </select>
          </div>
        </div>

        <!-- captcha -->
        <div style="text-align:center; margin:35px;">
        <div class="form-group form-row">
            <vue-recaptcha sitekey="6Le5uroaAAAAADen22qpov_2nbZq0zYY0dmg_kxj"></vue-recaptcha>
        </div>
        </div>
        <!-- slider -->
        <div class="form-group text-center">
         <range-slider
                      class="slider"
                      min="100"
                      max="200"
                      step="5"
                      v-model="sliderValue"
                    />
                    <div>{{ sliderValue }}</div>
        </div>

        <!-- button -->
        <div class="form-group row">
          <div class="col text-center" :class="validate">
              <button :disabled="!isDisabled" type="submit" id="button" data-toggle="modal" class="btn btn-success" data-target="#modalExito">Registrarme</button>
          </div>
        </div>
       
      </form>

    </div>
  </div><!-- ends header-->

  <!-- Modal -->

  <div class="modal fade" name="modalExito" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered " role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Registro exitoso</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          Has quedado registrado en el sistema, ahora puedes iniciar sesión
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
          <button type="button" class="btn btn-primary">Iniciar sesión</button>
        </div>
      </div>
    </div>
  </div>

  </div>

</template>



<script>
  import VueRecaptcha from 'vue-recaptcha';
  import axios from 'axios';
  import RangeSlider from "vue-range-slider";
  import "vue-range-slider/dist/vue-range-slider.css";
  export default {
    components: { 
      VueRecaptcha,
      RangeSlider
    },

    data(){
      return{
        name: "",
        last : "",
        sndLast : "",
        email : "",
        password : "",
        confirm : "",
        fNacimiento : null,
        tel : "",
        dateConfig : {
          initial : new Date(2000,0,1),
          min : new Date(1930,0,1),
          max : new Date(2003,11,30)
        },
        sliderValue : 100,
        fher : process.env.VUE_APP_URL,

        msgName : " ",
        msgLast : " ",
        msgMail : " ",
        msgSndLast : " ",
        msgPasswd : " ",
        msgConfirm : " ",
        msgCalendar : " ",
        msgTel : " ",

        verde : 'greenColor correct',
        rojo : 'redColor incorrect',
        styleCarac : 'color:grey;',
        styleUpper : 'color:grey;',
        styleNum : 'color:grey;',
        styleCalendar : '',

        isDisabled : false, //button param
        pwConfDisabled: true,

        listaEstado : [],
        estadoSelec : 1
     }
    },
    watch: {
      name(value){
        if (value.trim().length<3){
          this.msgName="El nombre debe contener más de 2 letras";
        }else{
          this.msgName= "";
        }
        this.validate();
      },

      last(value){
        console.log(this.msgLast);
        this.msgLast= value.trim().length<3 ? "El apellido debe contener más de 2 letras" : "";
        this.validate();
      },

      sndLast(value){
        this.msgSndLast = value.trim().length<3 ? "El apellido debe contener más de 2 letras" : "";
        this.validate();
      },

      email(value){
        const reg = new RegExp(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
        this.msgMail = reg.test(value) ? "" : "El correo ingresado no es valido";
        this.validate();
      },

      password(value){
        const redColor = 'color : red;'
        const greenColor = 'color : green;'
        console.log(value); //**ojo** esto hay que quitarselo 
        const reg = new RegExp("^(?=.*[A-Z])(?=.*[0-9])(?=.{8,})");
        if(reg.test(value)){
          this.msgPasswd = "";
          this.pwConfDisabled = false;
        }else{
          this.msgPasswd = "El correo ingresado no es valido";
          this.pwConfDisabled = true;
        }
        //Estilo para los requerimientos de la clave
        this.styleCarac = value.length<8 ? redColor : greenColor;
        this.styleUpper = (value.replace(/[*A-Z]/g, "").length)<value.length ? greenColor : redColor;
        this.styleNum = (value.replace(/[*0-9]/g, "").length)<value.length ? greenColor : redColor;
        this.validate();
      },

      confirm(value){
        this.msgConfirm = value===this.password ? "" : "Las claves no coinciden";
        this.validate();
      },

      fNacimiento(){
        this.styleCalendar=this.verde;
        this.msgCalendar="";
        this.validate();
      },

      tel(value){
        this.msgTel = value.length<14 ? "Ingresa un teléfono válido a 10 digitos" : "";
        var x = value.replace(/\D/g, '').match(/(\d{0,2})(\d{0,4})(\d{0,4})/);
        this.tel = !x[2] && !x[3] ? x[1] : '(' + x[1] + ') ' + x[2] + (x[3] ? '-' + x[3] : '');
        console.log(this.tel);
        this.validate();
      }
    },

    mounted () {
      this.getEstados();
    }, 

    methods: {
      submition(){
        console.log(this.fher);
        console.log(this.name, this.email, this.password, this.confirm, this.fNacimiento, this.tel);
        this.$modal.show('modalExito');
        axios.post('api/pba1.json', {
          id:0,
          nombre : this.name,
          apellidoPaterno : this.last,
          apellidoMaterno : "",
          fechaNacimiento : this.fNacimiento,
          nickName : "",
          telefonoCasa : this.tel,
          telefonoCelular : ""
        }).then(response => {
          console.log("enviado");
          console.log(response);
          console.log(response.data);
          console.log(response.status);
        }).catch(error => {
          console.log(error.response.status);
          console.log(error.response.data);
          this.msgErr = error.response.data['exceptionLongDescription'];
          
        })
      },

      getEstados(){
        axios.get('/api/estados.json',{}).then(response => {
          this.listaEstado = response.data;
        }).catch(e => {
          console.log(e.response.status);
          console.log(e.response.data);
        });
      },
      
      validate(){
        console.log(this.msgLast);
        this.isDisabled = (this.msgName==='')
                        &&(this.msgLast==='')
                        &&(this.msgSndLast==='')
                        &&(this.msgEmail==='')
                        &&(this.msgPasswd==='')
                        &&(this.msgConfirm==='')
                        &&(this.fNacimiento!=null)
                        &&(this.msgTel==='');
        }
      }
    }
    
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.align {
 text-align: left;
}

.notValid{
  color:red;
}

.greenColor:focus{
  border-color:green;
  background-color: #eefaee;
}

.correct{
  border-color:green;
}

.redColor:focus{
  border-color:red;
  background-color: #f0e4e4;
}

.incorrect{
  border-color:red;
}

.defaultColor{
  border-Color:rgba(165, 183, 190, 0.918);
  background-color: white;
}



</style>
