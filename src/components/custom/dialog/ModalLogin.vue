<template>
<modal name="gustavo" transition="pop-out" :width="modalWidth" :focus-trap="fT" :height="400">
  <div class="box">
    <div class="box-part" id="bp-left">
      <div class="partition" id="partition-register">
        <div class="partition-title">Iniciar Sesión</div>
        <div class="partition-form">

            <div class="row px-3">
              <input type="text" placeholder="correo@example.com" class="form-control" id="text-usr" @click="msgErr=''" @keyup.enter="checkCredentials" v-model="usr" />
              <span class="fas fa-user errspan"></span>
            </div>

            <div class="row px-3">
              <input :type=pwInputValue placeholder="*********" class="form-control" id="password" @click="msgErr=''" @keyup.enter="checkCredentials" v-model="psw" />
              <span class="fas fa-lock errspan"></span>
              <div class="put-right">
                <a href="#" @click="oculta">
                  <div class="icon-wrapper">
                    <i :class="[pwVisible ? 'fas fa-eye-slash' : 'fas fa-eye']" style=" color: #698cb6"></i>
                  </div>
                </a>
              </div>
            </div>
          <div v-if="check">
            <div class="box-error-message mt-2">
              {{msgErr}}
            </div>
          </div>
          <div v-else style="height: 20px" class="mt-2">
          </div>
          <div class="container mt-4 pl-1">
              <a href="#" class="pw" @click="openForgotPage">Olvidé mi clave</a>
          </div>
          <div class="button-set">
            <button id="goto-signin-btn" @click="openRegistroPage">Registrarse</button>
            <button id="register-btn" @click="checkCredentials">Ingresar</button>
          </div>

          <button class="large-btn github-btn">Ingresar con <span>github</span></button>
          <button class="large-btn facebook-btn">Ingresar con <span>facebook</span></button>
        </div>
      </div>
    </div>
    <div class="box-part" id="bp-right">
    </div>
  </div>
</modal>
</template>

<script>
import axios from "axios";
import store from "../../../store";
import router from "../../../router";

const MODAL_WIDTH = 656

export default {
  name: 'DemoLoginModal',
  data() {
    return {
      modalWidth: MODAL_WIDTH,
      usr: "",
      psw: "",
      msgErr: "",
      version: process.env.VUE_APP_VERSION,
      pwVisible: false,
      pwInputValue : "password",
      fT :true
    }
  },
  created() {
    this.modalWidth =
      window.innerWidth < MODAL_WIDTH ? MODAL_WIDTH / 2 : MODAL_WIDTH
  },
  computed: {
    check(){
      return this.msgErr.length>0;
    }
  },
  methods: {
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

        this.$modal.hide('gustavo');
        router.push(target);
      }).catch(error => {
        // el catch ocurre aun si el post está bien pero ud es null, por ejemplo !!!!
        this.msgErr = error.response.data['exceptionShortDescription'];
        console.log(this.msgErr);

      })
    },
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
            case 'user': return '/ui/consulta-anuncios-publico'; // rol 2 = usuario comun y corriente
            case 'normal': return '/ui/consulta-anuncios-publico'; // rol 2 = usuario comun y corriente
            default: return '/ui/consulta-anuncios-publico'; // otro rol cualquiera
          }
        } // ends for cycle with switch inside
      }
    },
    closeModal: function() {
      this.$modal.hide('mensaje-login');
    },
    openRegistroPage: function() {
      router.push({'name':'registro'});
    },
    openForgotPage: function() {
      router.push({'name':'regenera-clave'});
    },
    oculta () {
      this.pwVisible = !this.pwVisible;
      this.pwInputValue = (this.pwVisible) ? "text" : "password";
    }
  }
}
</script>

<style>
.box {
   background: white;
   overflow: hidden;
   width: 656px;
   height: 400px;
   border-radius: 2px;
   box-sizing: border-box;
   box-shadow: 0 0 40px black;
   color: #8b8c8d;
}

.errspan{
  left: 29px;
  margin-top: 7px;
  position: absolute;
  z-index: 2;
  font-size: 12px;
  color: #698cb6;
}
.pw {
  color: #dba226;
  font-size: 12px;
  font-family: 'Open Sans', sans-serif;
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
 .put-right{
  position: absolute;
  right: 33px;
  margin-top: 7px;
  z-index: 2;
   font-size: 14px;
}
 .box .box-part {
   display: inline-block;
   position: relative;
   vertical-align: top;
   box-sizing: border-box;
   height: 100%;
   width: 50%;
}
 .box .box-part#bp-right {
   background: url('../../../assets/panorama.jpg') no-repeat top left;
   border-left: 1px solid #eee;
}
 .box .box-messages {
   position: absolute;
   left: 0;
   bottom: 0;
   width: 100%;
}
 .box .box-error-message {
   position: relative;
   overflow: hidden;
   box-sizing: border-box;
   height: 20px;
   line-height: 20px;
   text-align: center;
   width: 100%;
   font-size: 11px;
   color: white;
   background: #f38181;
}
 .box .partition {
   width: 100%;
   height: 100%;
}
 .box .partition .partition-title {
   box-sizing: border-box;
   padding: 30px;
   width: 100%;
   text-align: center;
   letter-spacing: 1px;
   font-size: 20px;
   font-weight: 300;
}
 .box .partition .partition-form {
   padding: 0 20px;
   box-sizing: border-box;
}

 .box button {
   background: white;
   border-radius: 4px;
   box-sizing: border-box;
   padding: 10px;
   letter-spacing: 1px;
   font-family: 'Open Sans', sans-serif;
   font-weight: 400;
   min-width: 140px;
   margin-top: 8px;
   color: #8b8c8d;
   cursor: pointer;
   border: 1px solid #dddedf;
   text-transform: uppercase;
   transition: 0.1s all;
   font-size: 10px;
}
 .box button:hover {
   border-color: #c7c8c9;
   color: #6f7071;
}
 .box .large-btn {
   width: 100%;
   background: white;
}
 .box .large-btn span {
   font-weight: 600;
}
 .box .large-btn:hover {
   color: white !important;
}
 .box .button-set {
   margin-bottom: 8px;
}
 .box #register-btn, .box #signin-btn {
   margin-left: 8px;
}
 .box .facebook-btn {
   border-color: #3880ff;
   color: #3880ff;
}
 .box .facebook-btn:hover {
   border-color: #3880ff;
   background: #3880ff;
}
 .box .github-btn {
   border-color: #dba226;
   color: #dba226;
}
 .box .github-btn:hover {
   border-color: #dba226;
   background: #dba226;
}
 .box .autocomplete-fix {
   position: absolute;
   visibility: hidden;
   overflow: hidden;
   opacity: 0;
   width: 0;
   height: 0;
   left: 0;
   top: 0;
}
 .pop-out-enter-active, .pop-out-leave-active {
   transition: all 0.5s;
}
 .pop-out-enter, .pop-out-leave-active {
   opacity: 0;
   transform: translateY(24px);
}

</style>

