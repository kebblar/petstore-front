<template>
  <div class="container">
    <div class="row">
      <div class="col-sm-12 text-left my-3">
        <div class="form-group">
          <div class="row px-3">
            <input type="text" placeholder="example@gmail.com" class="form-control" id="text-usr" v-model="usr" />
            <span class="fas fa-user errspan"></span>
          </div>
        </div>
        
        <div class="form-group">
          <div class="row px-3">
            <input :type=pwInputValue placeholder="*****" class="form-control" id="password" v-model="psw" />
            <span class="fas fa-lock errspan"></span>
            <div class="ojo put-right">
              <a href="#" @click="oculta" class="a2">
                <div class="icon-wrapper">
                  <i :class="[pwVisible ? 'fas fa-eye-slash' : 'fas fa-eye']"></i>
                </div>
              </a>
            </div>
          </div>
        </div>

      </div>

      <div class="col-sm-6">
        <small class="float-left text-primary"><input type="checkbox" name="vehicle3" value="Boat" checked /> Recuérdame</small>
      </div>
      <div class="col-sm-6">
        <small class="float-right text-primary vinculo" @click="openForgotPage">Olvidé mi clave</small>
      </div>
      <div class="col-sm-12 w-100 mt-2">
        <button @click="checkCredentials" class="btn btn-block btn-success">Ingresar al sistema</button>
      </div>

    </div>
    <Aviso
        ref='avisoComponente'
        ancho='320'
        target=''
        :avisoMsg=msgErr
        avisoTitulo='Error de ingreso al sistema' />

  </div>
</template>

<script>
import axios from 'axios';
import router from '../router'
import store from '../store'
import Aviso from './custom/dialog/Aviso'

export default {
  components: {
    'Aviso': Aviso
  },
  data: function () {
    return {
      usr: "",
      psw: "",
      msgErr: "",
      version: process.env.VUE_APP_VERSION,
      pwVisible: false,
      pwInputValue : "password"
    }
  },
  methods: {
    detecta: function(roles) {
      if(store.state.destination.length>0) {
        var target = store.state.destination;
        store.commit('setDestination','');
        return target;
      }
      if (typeof roles === 'string') {
        return '/';
      } else {
        for(var i=0; i<roles.length; i++) {
          switch(roles[i].nombre) {
            case 'admin': return '/ui/admin'; // rol 1 = administrador
            case 'user': return '/'; // rol 2 = usuario comun y corriente
            case 'normal': return '/'; // rol 2 = usuario comun y corriente
            default: return '/'; // otro rol cualquiera
          }
        } // ends for cycle with switch inside
      }
    },
    closeModal: function() {
      this.$modal.hide('mensaje-login');
    },
    openForgotPage: function() {
      router.push({'name':'regenera-clave'});
    },
    checkCredentials: function() {
      axios.post('/api/login.json', {
        usuario: this.usr,
        clave: this.psw
      }).then(response => {
        var rd = response.data;
        var ud = rd.usuarioDetalle;
        //console.log(response.data);
        store.commit('setSession', {
          nombreCompleto: ud.nickName, //ud.nombre + ' ' + ud.apellidoPaterno + ' ' + ud.apellidoMaterno,
          detalles:     ud,
          roles:        rd.roles,
          correo:       rd.correo,
          ultimoAcceso: rd.ultimoAcceso,
          idUser:       ud.id,
          jwt:          rd.jwt,
          carrito :     []
        });
        const target = this.detecta(rd.roles);
        router.push(target);
      }).catch(error => {
        // el catch ocurre aun si el post está bien pero ud es null, por ejemplo !!!!
        this.msgErr = error;
        if(error.response) {
          this.msgErr = error.response.data['exceptionLongDescription'];
        }
        this.$refs.avisoComponente.abre();
      })
    },
    oculta () {
      this.pwVisible = !this.pwVisible;
      this.pwInputValue = (this.pwVisible) ? "text" : "password";
    }
  },
}
</script>

<style scoped>
.a2 {
  color:#000;
}
.a2:hover {
  color:#00f;
}
.vinculo {
  cursor: pointer;
}
.vinculo:hover {
  text-decoration: underline;
  text-decoration-color: #0073ff;
}
#footer {
  position: fixed;
  padding: 10px 10px 0px 10px;
  bottom: 0;
  width: 100%;
  /* Height of the footer*/
  height: 40px;
  background: #444;
  color: #fff;
  text-align: right;
}
#text-usr{
  padding-left: 33px;
  display: block;
  box-sizing: border-box;
  margin-bottom: 4px;
  font-size: 12px;
  line-height: 2;
  border: 0;
  border-bottom: 1px solid #dddedf;
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
  border-bottom: 1px solid #dddedf;
  font-family: inherit;
  transition: 0.5s all;
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