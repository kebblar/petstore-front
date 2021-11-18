<template>
  <div class="ancho centra">

    <div v-if="loading" class="loader"/>

    <div class="card defaultColor">

      <div class="card-header">
          <label class="control-label h4">Actualizar mis datos personales</label>
      </div><!-- ends header-->
      
      <div class="card-body align p-4">

        <!-- correo -->
        <div class ="form-group">
          <div class="row">
            <div class= "col-sm-12 col-md-5">
              <label>Correo:</label>
            </div>
            <div class="col-md-7">
              <input type="email" disabled class="form-control" :class="classMail" v-model="modelCorreo">
              <small class="notValid">{{msgMail}}</small>
            </div>
          </div>
        </div>

        <!-- Nick -->
        <div class ="form-group">
          <div class="row">
            <div class="col-sm-12 col-md-5">
              <label>Nick:</label>
            </div>
            <div class="col-md-7">
              <input type="text" required class="form-control" maxlength="35" :class="classNick" placeholder="ejemplo: Goose" v-model="modelNick">
              <small class="notValid">{{msgNick}}</small>
            </div>
          </div>
        </div>

        <!-- Nombre -->
        <div class ="form-group">
          <div class="row">
            <div class="col-sm-12 col-md-5">
              <label>Nombre:</label>
            </div>
            <div class="col-md-7">
              <input type="text" required class="form-control" :class="className" placeholder="ejemplo: luis" v-model="modelName">
              <small class="notValid">{{msgName}}</small>
            </div>
          </div>
        </div>

          <!-- apellido paterno -->
          <div class ="form-group">
            <div class="row">
              <div class="col-sm-12 col-md-5">
                <label>Apellido Paterno:</label>
              </div>
              <div class="col-md-7">
                <input type="text" required :class="classApPat" class="form-control" placeholder="ejemplo: López" v-model="modelApPat">
                <small class="notValid">{{msgApPat}}</small>
              </div>
            </div>
          </div>

          <!-- apellido materno -->
          <div class ="form-group">
            <div class="row">
              <div class="col-sm-12 col-md-5">
                <label>Apellido Materno:</label>
              </div>
              <div class="col-md-7">
                <input type="text" required :class="classApMat" class="form-control" placeholder="ejemplo: Pérez" v-model="modelApMat">
              </div>
            </div>
          </div>

          <!-- f nacimiento -->
          <div class ="form-group">
            <div class="row">
              <div class="col-sm-12 col-md-5">
                <label>Fecha de nacimiento:</label>
              </div>
              <div class="col-md-7">
                <b-form-datepicker
                    id="fecha-nacimiento"
                    v-model="fNacimiento"
                    :initial-date="dateConfig.initial"
                    :max="dateConfig.max"
                    :min="dateConfig.min"
                    calendar-width="100%"
                    class="styleCalendar mb-2"
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
          </div>

          <!-- telefono -->
          <div class ="form-group">
            <div class="row">
              <div class="col-sm-12 col-md-5">
              <label>Telefono:</label>
              </div>
              <div class="col">
              <input type="tel" class="form-control" required :class="classTel" placeholder="XX XXXX XXXX" v-model="tel">
              <small class="notValid">{{msgTel}}</small>
              </div>
            </div>
          </div>

          <!-- button -->
          <div class="form-group row my-4">
            <div class="col text-center" >
                <button
                  :disabled="habilitaBoton"
                  type="button"
                  id="button"
                  data-toggle="modal"
                  class="btn btn-success"
                  @click="submition"
                  data-target="#modalExito">Actualizar datos</button>
            </div>
          </div>

      </div>

    </div><!-- ends body-->

    <!-- Modal -->
    <Aviso
      ref='avisoComp'
      ancho='420'
      target='/'
      :avisoMsg=msgErr
      avisoTitulo='Aviso del sistema' />

  </div>
</template>

<script>
  import axios from 'axios';
  import store from '../store';
  import "vue-range-slider/dist/vue-range-slider.css";
  import Aviso from './custom/dialog/Aviso';

  export default {
    components: {
      'Aviso': Aviso
    },    
    data() {
      return {
        idUser: '',
        modelNick: '',
        modelName: '',
        modelCorreo : '',
        modelApPat : '',
        modelApMat : '',
        fNacimiento : '',
        tel : '',

        msgErr : null,
        msgNick : null,
        msgName : null,
        msgMail : null,
        msgApPat : null,
        msgConfirm : null,
        msgCalendar : null,
        msgTel : null,

        classNick: 'defaultColor',
        className: 'defaultColor',
        classMail: 'defaultColor',
        classApPat: 'defaultColor',
        classApMat: 'defaultColor',
        classCalendar: 'defaultColor',
        classTel: 'defaultColor',

        styleCarac : 'color:grey;',
        styleUpper : 'color:grey;',
        styleNum : 'color:grey;',

        styleCarac2 : 'show',
        styleUpper2 : 'show',
        styleNum2 : 'show',

        isVisible : 'hidden',
        activoClave : true, //Cambia el valor del booleano para ver las distintas versiones de validaciones de la clave

        dateConfig : {
          initial : new Date(2000,0,1),
          min : new Date(1930,0,1),
          max : new Date(2003,11,30)
        },
        pwConfDisabled: true, 
        loading: false,
     }
    },
    watch: {
      modelName(){
        this.msgName="";
        this.className="greenColor correct";
        if (this.modelName.trim().length<4){
          this.msgName="El nombre debe contener más de 3 letras";
          this.className="redColor incorrect";
        }
        this.modelName= this.modelName.length===1 ? this.modelName.toUpperCase() : this.modelName;
      },
      modelNick(){
        this.msgNick="";
        this.classNick="greenColor correct";
        if (this.modelNick.trim().length<4){
          this.msgNick="El nick debe contener más de 3 letras";
          this.classNick="redColor incorrect";
        }
      },



      modelApPat(){
        this.msgApPat="";
        this.classApPat="greenColor correct";
        if(this.modelApPat.length<4) {
          this.msgApPat="El Apellido Paterno debe contener más de 3 letras";
          this.classApPat="redColor incorrect";
        }
      },

      modelApMat(){
        this.msgConfirm="";
        this.classApMat="greenColor correct";
        if(this.modelApMat.length<4) {
          this.msgConfirm="El Apellido Materno debe contener más de 3 letras";
          this.classApMat="redColor incorrect";
        }
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
          && this.modelNick  && this.modelNick.length>=4
          && this.modelName  && this.modelName.length>=4
          && this.modelApPat && this.modelApPat.length>=4
          && this.modelApMat && this.modelApMat.length>=4
          && this.tel && this.tel.length==14
          && this.fNacimiento
          //console.log(dato);
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
      setValues() {
        this.idUser= store.state.session.detalles.id
        this.modelNick= store.state.session.detalles.nickName
        this.modelName= store.state.session.detalles.nombre
        this.modelCorreo = store.state.session.correo
        this.modelApPat = store.state.session.detalles.apellidoPaterno
        this.modelApMat = store.state.session.detalles.apellidoMaterno
        this.fNacimiento = store.state.session.detalles.fechaNacimiento
        this.tel = store.state.session.detalles.telefonoCelular
      },
      paddingZeros(v, k) {
        const valor = v.toString();
        const diff = k-valor.length;
        if(diff<1) return valor;
        var res = '';
        for(var i=0; i<diff; i++) {
          res = res + '0';
        }
        return res + valor;
      },
      formatDate(dd) {
        var d = new Date(dd);
        const year = d.getFullYear(); // 2019
        const monthIndex = d.getMonth() + 1;// 0
        const day = d.getDate(); // 23
        return this.paddingZeros(year,4) + "-" + this.paddingZeros(monthIndex,2) + "-" + this.paddingZeros(day,2);
      },
      submition() {
        this.loading = true;
        axios.put('api/usuario-detalles', {
          id: this.idUser,
          nickName: this.modelNick,
          nombre: this.modelName,
          apellidoPaterno: this.modelApPat,
          apellidoMaterno: this.modelApMat,
          telefonoCelular : this.tel,
          fechaNacimiento : this.formatDate(this.fNacimiento),
          hash: 0
        }).then(response => {
          this.loading = false
          //console.log(response.data);
          // actualiza el store
              var ud = response.data;
              var nombreCompleto = ud.nickName; //ud.nombre + ' ' + ud.apellidoPaterno + ' ' + ud.apellidoMaterno;
              store.commit('setNombreCompleto', nombreCompleto);
              store.commit('setDetalles', ud);
          // Redirige al home
          this.setValues();
          this.msgErr = 'Sus datos han sido cambiados exitosamente';
          this.$refs.avisoComp.abre()
        }).catch(error => {
          this.loading = false
          this.msgErr = error;
          if(error.response) {
              this.msgErr = error.response.data['exceptionLongDescription'];
          }
          this.$refs.avisoComp.abre();
        });
      }
    },
    mounted() {
      this.setValues();
    }
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.ancho {
    max-width: 570px;
    padding: 20px;
}

.align {
 text-align: left;
}

.notValid {
  color: rgb(213, 95, 95);
}

input {
  padding-left: 10px;
  padding-right: 35px;
  display: block;
  box-sizing: border-box;
  margin-bottom: 4px;
  font-size: 13px;
  line-height: 2;
  border: 0;
  border-bottom: 1px solid #dddedf;
  font-family: inherit;
}

input:focus {
  margin: 0 0 15px 0;
  height: 37px;
  font-size: 100%;
}

.styleCalendar {
  font-size: 12px;
  border: 0;
  border-bottom: 1px solid #dddedf;
}

label {
  font-size: 15px;
}

.greenColor:focus {
  background-color: rgba(238, 250, 238, 0.84);
  box-shadow: 2px 1px 4px #d2eac1;
  border: 1px solid rgb(183, 232, 170);
}

.correct {
  border-width: 1px;
  box-shadow: 1px 1px 3px #d8dcdd;
  background: url(../assets/check.png) no-repeat scroll;
  background-position:right ;
  background-size: 17px;
  background-position-x: 96%;
  transition: 0.3s;
}

.redColor:focus {
  background-color: rgba(250, 241, 238, 0.84);
  box-shadow: 2px 1px 4px #e8cccc;
  border: 1px solid #d5a1a1;
}

.incorrect {
  border-color: rgb(236, 127, 127);
  border-width: 1px;
  box-shadow: 1px 1px 3px #d8dcdd;
  background: url(../assets/danger.jpg) no-repeat scroll;
  background-position:right ;
  background-size: 20px;
  background-position-x: 96%;
  transition: 0.3s;
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
