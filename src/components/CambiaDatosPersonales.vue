<template>
  <div class="anchu centra">

    <div v-if="loading" class="loader"/>

    <div class="card defaultColor">

      <div class="card-header">
          <label class="control-label h4">Actualizar mis datos personales</label>
      </div><!-- ends header-->
      
      <div class="card-body alineado p-4">

        <!-- correo -->
        <div class ="form-group">
          <div class="row">
            <div class= "col-sm-12 col-md-5">
              <label>Correo:</label>
            </div>
            <div class="col-md-7">
              <label>{{modelCorreo}}</label>
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
              <input :class="classInputNick" type="text" required maxlength="15" placeholder="ejemplo: Goose" v-model="modelNick">
              <small :class="classMsgNick">El nick debe ser de más de 3 letras</small>
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
              <input :class="classInputName" type="text" required maxlength="40" placeholder="ejemplo: luis" v-model="modelName">
              <small :class="classMsgName">El nombre debe ser de más de 3 letras</small>
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
                <input :class="classInputApPat" type="text" required maxlength="40" placeholder="ejemplo: López" v-model="modelApPaterno">
                <small :class="classMsgApPat">El Apellido Paterno debe ser de más de 3 letras</small>
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
                <input :class="classInputApMat" type="text" required maxlength="40" placeholder="ejemplo: Pérez" v-model="modelApMaterno">
                <small :class="classMsgApMat">El Apellido Materno debe ser de más de 3 letras</small>
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
                    v-model="modelFechaNacimiento"
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

          <!-- Telefono -->
          <div class ="form-group">
            <div class="row">
              <div class="col-sm-12 col-md-5">
              <label>Telefono:</label>
              </div>
              <div class="col">
              <input :class="classInputTel" type="text" required maxlength="20" placeholder="XX XXXX XXXX" v-model="modelTelefono">
              <small :class="classMsgTel">El Teléfono es incorrecto</small>
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
  import Aviso from './custom/dialog/Aviso';

  export default {
    components: {
      'Aviso': Aviso
    },    
    data() {
      return {
        idUser: '',
        msgErr : '',
        loading: false,

        modelNick: '',
        modelName: '',
        modelCorreo : '',
        modelTelefono : '',
        modelApPaterno : '',
        modelApMaterno : '',
        modelFechaNacimiento : '',

        msgValid: 'msgValidClass',
        msgInvalid: 'msgNotValidClass',

        classMsgTel : this.msgValid,
        classMsgNick : this.msgValid,
        classMsgName : this.msgValid,
        classMsgApPat : this.msgValid,
        classMsgApMat : this.msgValid,

        inputAccepted: 'form-control input-base input-correct',
        inputRejected: 'form-control input-base input-wrong',

        classInputTel: this.inputAccepted,
        classInputNick: this.inputAccepted,
        classInputName: this.inputAccepted,
        classInputApPat: this.inputAccepted,
        classInputApMat: this.inputAccepted,

        dateConfig : {
          initial : new Date(2000,0,1),
          min : new Date(1930,0,1),
          max : new Date(2003,11,30)
        }
     }
    },
    mounted() {
      this.setValues();
    },
    watch: {
      modelName() {
        this.classMsgName=this.msgValid;
        this.classInputName=this.inputAccepted;
        if (this.modelName.trim().length<4){
          this.classMsgName=this.msgInvalid;
          this.classInputName=this.inputRejected;
        }
        this.modelName= this.modelName.length===1 ? this.modelName.toUpperCase() : this.modelName;
      },
      modelNick() {
        this.classMsgNick=this.msgValid;
        this.classInputNick=this.inputAccepted;
        if (this.modelNick.trim().length<4){
          this.classMsgNick=this.msgInvalid;
          this.classInputNick=this.inputRejected;
        }
      },
      modelApPaterno() {
        this.classMsgApPat=this.msgValid;
        this.classInputApPat=this.inputAccepted;
        if(this.modelApPaterno.length<4) {
          this.classMsgApPat=this.msgInvalid;
          this.classInputApPat=this.inputRejected;
        }
      },
      modelApMaterno() {
        this.classMsgApMat=this.msgValid;
        this.classInputApMat=this.inputAccepted;
        if(this.modelApMaterno.length<4) {
          this.classMsgApMat=this.msgInvalid;
          this.classInputApMat=this.inputRejected;
        }
      },
      modelTelefono() {
        var x = this.modelTelefono.replace(/\D/g, '').match(/(\d{0,2})(\d{0,4})(\d{0,4})/);
        this.modelTelefono = !x[2] && !x[3] ? x[1] : '(' + x[1] + ') ' + x[2] + (x[3] ? '-' + x[3] : '');
        this.classMsgTel=this.msgValid;
        this.classInputTel=this.inputAccepted;
        if(this.modelTelefono.length!=14) {  // mejor poner aqui una expresion regular
          this.classMsgTel=this.msgInvalid;
          this.classInputTel=this.inputRejected;
        }
      },
    },
    computed: {
      habilitaBoton: function() {
        var dato = true
          && this.modelNick  && this.modelNick.length>=4
          && this.modelName  && this.modelName.length>=4
          && this.modelApPaterno && this.modelApPaterno.length>=4
          && this.modelApMaterno && this.modelApMaterno.length>=4
          && this.modelTelefono && this.modelTelefono.length==14
          && this.modelFechaNacimiento
          return !dato;
      }
    },
    methods: {
      setValues() {
        this.idUser= store.state.session.detalles.id
        this.modelNick= store.state.session.detalles.nickName
        this.modelName= store.state.session.detalles.nombre
        this.modelCorreo = store.state.session.correo
        this.modelApPaterno = store.state.session.detalles.apellidoPaterno
        this.modelApMaterno = store.state.session.detalles.apellidoMaterno
        this.modelFechaNacimiento = store.state.session.detalles.fechaNacimiento
        this.modelTelefono = store.state.session.detalles.telefonoCelular
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
          apellidoPaterno: this.modelApPaterno,
          apellidoMaterno: this.modelApMaterno,
          telefonoCelular : this.modelTelefono,
          fechaNacimiento : this.formatDate(this.modelFechaNacimiento),
          hash: 0
        }).then(response => {
          this.loading = false
          // actualiza el store
              var ud = response.data;
              var nombreCompleto = ud.nickName; //ud.nombre + ' ' + ud.apellidoPaterno + ' ' + ud.apellidoMaterno;
              store.commit('setNombreCompleto', nombreCompleto);
              store.commit('setDetalles', ud);
          // Redirige al home
          this.setValues();
          this.msgErr = 'Sus datos han sido cambiados exitosamente';
          this.$refs.avisoComp.abre();
        }).catch(error => {
          this.loading = false
          this.msgErr = 'Error';
          if(error.response) {
              var info = error.response.data.exceptionLongDescription;
              console.log(info);
              this.msgErr = info;
          }
          this.$refs.avisoComp.abre();
        });
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.anchu {
  max-width: 570px;
  padding: 20px;
}
.alineado {
  text-align: right;
  font-size: 13px;
}
label {
  padding-top: 6px;
}
</style>
