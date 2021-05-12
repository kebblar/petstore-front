<template>
<div class="ancho centra">
  <div class="card defaultColor" style="width:450px;">
    <div class="card-header">
         <label class="control-label h4">Registro</label>
    </div>
    <div class="card-body align" style="margin-top:20px;">
      
      
        <!-- Nombre -->
        <div class ="form-row form-group">
          <div class="col-md-4">
            <label for="nombre">Nombre:</label>
          </div>
          <div class="col">
            <input type="text" required class="form-control" :class="className" placeholder="Alma" v-model="name">
            <small class="notValid">{{msgName}}</small>

          </div>
        </div>
        <!-- Apellido P -->
        <div class ="form-row form-group">
          <div class="col-md-4">
            <label for="nombre">Apellido Paterno:</label>
          </div>
          <div class="col">
            <input type="text" required class="form-control" :class="classLast" id="apellidoP" placeholder="Cruz" v-model="last">
            <small class="notValid">{{msgLast}}</small>
          </div>
        </div>
        <!-- Appelido M -->
        <div class ="form-row form-group">
          <div class="col-md-4">
            <label for="nombre">Apellido Materno:</label>
          </div>
          <div class="col">
            <input type="text" required class="form-control" :class="classSndLast" id="apellidoM" placeholder="Ibarra" v-model="sndLast">
            <small class="notValid">{{msgSndLast}}</small>
          </div>
        </div>
        <!-- correo -->
        <div class ="form-row form-group">
          <div class= "col-md-4">
            <label for="correo">Correo:</label>
          </div>
          <div class="col">
            <input type="email" required class="form-control" :class="classMail" id="mail" placeholder="ejemplo@gmail.com" v-model="email">
            <small class="notValid">{{msgMail}}</small>
          </div>
        </div>
        <!-- clave -->
        <div class ="form-row form-group">
          <div class="col-md-4">
            <label for="clave">Clave:</label>
          </div>
          <div class="col" :class="estiloClave1"> <!--cambiar booleano "activaClave" linea 242-->
            <input type="password" required :class="classPasswd" class="form-control" id="clave" placeholder="******" v-model="password">
            <small id="clave" class="form-text text-muted" :class="isVisible">
              <b>La clave contiene:</b>
              <ul> 
                <li :style="styleCarac">8 carateres como mínimo</li>
                <li :style="styleUpper">Una mayúscula</li>
                <li :style="styleNum">Un número</li>
              </ul>
            </small>
          </div>

          <div class="col" :class="estiloClave2">
            <input type="password" required :class="classPasswd" class="form-control" id="clave" placeholder="******" v-model="password">
            <small id="clave" class="form-text text-muted" :class="isVisible">
              <b v-if="msgPasswd!=''">Falta que la clave contenga:</b>
              <ul> 
                <li :class="styleCarac2">8 carateres como mínimo</li>
                <li :class="styleUpper2">Una mayúscula</li>
                <li :class="styleNum2">Un número</li>
              </ul>
            </small>
          </div>

        </div>
        <!-- clave confirma -->
        <div class ="form-row form-group">
          <div class="col-md-4">
            <label for="confirmacion">Confirmación de la clave:</label>
          </div>
          <div class="col">
            <input type="password" required :disabled="pwConfDisabled" :class="classConfirm" class="form-control" id="confirmacion" placeholder="******" v-model="confirm">
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
          <input type="tel" class="form-control" required :class="classTel" id="telefono" placeholder="XX XXXX XXXX" v-model="tel">
          <small class="notValid">{{msgTel}}</small>
          </div>
        </div>
        <!-- captcha -->
        <div style="margin:14.5%;">
        <div class="form-row ">
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
          <div class="col text-center" >
              <button 
                :disabled="habilitaBoton" 
                type="button" 
                id="button" 
                data-toggle="modal" 
                class="btn btn-success" 
                @click="submition"
                data-target="#modalExito">Registrarme</button>
          </div>
        </div>
       
      

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
  import store from '../store';
  import router from '../router';
  import RangeSlider from "vue-range-slider";
  import "vue-range-slider/dist/vue-range-slider.css";
  //import { mapMutations } from 'vuex'

  const emaiRegex = new RegExp(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
  const passRegex = new RegExp("^(?=.*[A-Z])(?=.*[0-9])(?=.{8,})");


  export default {
    components: { 
      VueRecaptcha,
      RangeSlider
    },
    data() {
      return {
        name: 'Gustavo',
        last : 'Arellano',
        sndLast : 'Sandoval',
        email : 'gus@aol.com',
        password : 'Gustavo1',
        confirm : 'Gustavo1',
        fNacimiento : null,
        tel : '525516913070',

        msgName : null,
        msgLast : null,
        msgMail : null,
        msgSndLast : null,
        msgPasswd : null,
        msgConfirm : null,
        msgCalendar : null,
        msgTel : null,

        className: 'defaultColor',
        classMail: 'defaultColor',
        classLast: 'defaultColor',
        classSndLast: 'defaultColor',
        classPasswd: 'defaultColor',
        classConfirm: 'defaultColor',
        classCalendar: 'defaultColor',
        classTel: 'defaultColor',

        styleCarac : 'color:grey;',
        styleUpper : 'color:grey;',
        styleNum : 'color:grey;',
        
        styleCarac2 : 'show',
        styleUpper2 : 'show',
        styleNum2 : 'show',
        
        styleCalendar : '',
        isVisible : 'hidden',
        activoClave : true, //Cambia el valor del booleano para ver las distintas versiones de validaciones de la clave

        dateConfig : {
          initial : new Date(2000,0,1),
          min : new Date(1930,0,1),
          max : new Date(2003,11,30)
        },
        sliderValue : 100,
        pwConfDisabled: true
     }
    },
    watch: {
      name(){
        this.msgName="";
        this.className="greenColor correct";
        if (this.name.trim().length<3){
          this.msgName="El nombre debe contener más de 3 letras";
          this.className="redColor incorrect";
        }
        this.name= this.name.length===1 ? this.name.toUpperCase() : this.name;
      },

      last(){
        this.msgLast="";
        this.classLast="greenColor correct";
        if(this.last.trim().length<3) {
          this.msgLast="El apellido paterno debe contener más de 3 letras";
          this.classLast="redColor incorrect";
        }
        this.last= this.last.length===1 ? this.last.toUpperCase() : this.last;
      },

      sndLast(){
        this.msgSndLast="";
        this.classSndLast="greenColor correct";
        if(this.sndLast.trim().length<3) { 
          this.msgSndLast="El apellido materno debe contener más de 3 letras";
          this.classSndLast="redColor incorrect";
        }
        this.sndLast= this.sndLast.length===1 ? this.sndLast.toUpperCase() : this.sndLast;
      },

      email(){
        this.msgMail="";
        this.classMail="greenColor correct";
        if(!emaiRegex.test(this.email)) { 
          this.msgMail="El correo ingresado no es valido";
          this.classMail="redColor incorrect";
        }
      },

      password(value){
        this.isVisible='show';
        this.msgPasswd="";
        this.classPasswd="greenColor correct";
        this.pwConfDisabled = false;
        this.confirm = null;
        if(!passRegex.test(this.password)) { 
          this.msgPasswd="Clave incorrecta";
          this.classPasswd="redColor incorrect";
          this.pwConfDisabled = true;
        }
        //Estilo para los requerimientos de la clave
        const red = 'color :  rgb(235, 74, 74) ;'
        const green = 'color : green  ;'

        this.styleCarac = value.length<8 ? red : green;
        this.styleUpper = (value.replace(/[*A-Z]/g, "").length)<value.length ? green : red;
        this.styleNum = (value.replace(/[*0-9]/g, "").length)<value.length ? green : red;

        this.styleCarac2 = value.length<8 ? 'show' : 'hidden';
        this.styleUpper2 = (value.replace(/[*A-Z]/g, "").length)<value.length ? 'hidden' : 'show';
        this.styleNum2 = (value.replace(/[*0-9]/g, "").length)<value.length ? 'hidden' : 'show';

      },

      confirm(){
        this.msgConfirm="";
        this.classConfirm="greenColor correct";
        if(this.confirm != this.password) { 
          this.msgConfirm="Las claves no coinciden";
          this.classConfirm="redColor incorrect";
          this.isVisible='hidden';
        }
      },

      fNacimiento(){
        this.msgCalendar="";
        this.styleCalendar='greenColor correct';
      },

      tel(){
        var x = this.tel.replace(/\D/g, '').match(/(\d{0,2})(\d{0,4})(\d{0,4})/);
        this.tel = !x[2] && !x[3] ? x[1] : '(' + x[1] + ') ' + x[2] + (x[3] ? '-' + x[3] : '');
        this.msgTel="";
        this.classTel="greenColor correct";
        if(this.tel.length!=14) {  // mejor poner aqui una expresion regular
          this.msgTel="El teléfono es incorrecto";
          this.classTel="redColor incorrect";
        }
      },
    },
    computed: {
      habilitaBoton: function() {
        var dato = true
          && this.name && this.name.length>2
          && this.last && this.last.length>2
          && this.sndLast && this.sndLast.length>2
          && this.email && emaiRegex.test(this.email)
          && this.password && passRegex.test(this.password)
          && this.tel && this.tel.length==14
          && this.password===this.confirm
          && this.fNacimiento
          return !dato;
      },
      estiloClave1 (){
          return this.activoClave ? 'show' : 'hidden';
      },
      estiloClave2 (){
          return !this.activoClave ? 'show' : 'hidden';
      }
      
    },
    methods: {
      submition() {
        console.log(store.state)
        axios.post('api/usuario-detalles.json', { 
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
          console.log(response.data.jwt);
          console.log(response.status);
          store.commit('setSession', {
            name:'gus',
            roles: response.data.roles,
            signed: true,
            jwt:response.data.jwt
          });
          router.push('regenera-clave');
        }).catch(error => {
          console.log(error.response.status);
          console.log(error.response.data);
          this.msgErr = error.response.data['exceptionLongDescription'];
        })
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
  color:rgb(235, 74, 74);
}

.greenColor:focus{
  background-color: #eefaee;
  box-shadow: 2px 1px 4px #bdd3ae;
}

.correct{
  border-color:rgb(96, 161, 99);
  border-width: 1px;
  box-shadow: 1px 1px 3px #d8dcdd;
  background: url(../assets/check.png) no-repeat scroll;
  background-position:right ;
  background-size: 17px;
  background-position-x: 96%;
}

.redColor:focus{
  background-color:   #fff3f3  ;
  box-shadow: 2px 1px 4px #dba6a6;
}

.incorrect{
  border-color:rgb(235, 74, 74);
  border-width: 1px;
  box-shadow: 1px 1px 3px #d8dcdd;
  background: url(../assets/danger.jpg) no-repeat scroll;
  background-position:right ;
  background-size: 20px;
  background-position-x: 96%;
}

.defaultColor{
  background-color: white;
  box-shadow: 1px 1px 3px #d8dcdd;
}

.hidden{
  display: none;
}

.show{
  display: block;
}



</style>
