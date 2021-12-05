<template>
  <div id="app">
    <Header/>
    <div class="row">
      <Sidebar/>
      <div class="col">
        <!--
        <transition
          name="fade"
          mode="out-in">
            <router-view/>
        </transition>
        -->
        <router-view/>
      </div>
    </div>
    <Footer/>
  </div>
</template>

<script>
  import Footer from './components/custom/frame/Footer';
  import Header from './components/custom/frame/Header';
  import Sidebar from './components/custom/frame/Sidebar';
  import store from "./store";
  import router from "./router";

  export default {
    name: "App",
    components: {
      'Header': Header,
      'Footer' : Footer,
      'Sidebar': Sidebar
    },
    mounted() {
        this.todo();
    },
    beforeDestroy () {
       clearInterval(this.interval);
    },
    methods: {
        todo(){          
            this.interval = setInterval(
              function() {
                var jwt = store.state.session.jwt;
                if (jwt && jwt !== undefined && jwt.length > 0) {
                    //console.log(jwt);
                    //const jwtPayload = this.parseJwt(jwt);

                    var base64Url = jwt.split('.')[1];
                    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
                    var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
                        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
                    }).join(''));
                    const jwtPayload = JSON.parse(jsonPayload);

                    //jwtPayload.exp=1625505833-28*60;
                    //console.log(jwtPayload);
                    const limite = (Date.now() / 1000)-(2*60); // fecha actual menos dos minutos
                    const delta = jwtPayload.exp - limite;
                    if (delta < 0) {
                        store.commit('setSession', {
                            nombreCompleto: '',
                            roles: [],
                            correo: '',
                            ultimoAcceso: '',
                            idUser: 0,
                            jwt: '', // jwt: jwtPayload.exp
                            carrito: []
                        });
                        //store.commit('setDestination', '/');
                        console.log('REDIRECT  ' +  delta);
                        router.push('/ui/login');
                    } else {
                      // si hay jwt, pero no ha expirado
                      console.log('WAIT  ' + delta);
                        //const timeToExpire =  jwtPayload.exp - (Date.now()/1000);
                        //console.log('Tiempo para que expire:' + timeToExpire);
                    }
                } else {
                  // no hay jwt. Entonces no hagas nada
                }
              }, 
            3000);
        },
        parseJwt: function(token) {
            var base64Url = token.split('.')[1];
            var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
            var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
                return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
            }).join(''));
            return JSON.parse(jsonPayload);
        }
    }
  }
</script>

<style>

html,body {
  height:100%;
  background-color: #fff;
}
#app {
  position: relative;
  color: #2c3e50;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  margin-top: 1px;
}
#contenedor {
  width: 100%;
  background-color: transparent;
  padding-bottom: 60px;
  padding-top: 0px;
}
.centra {
  margin: auto;
  padding: 20px;
}
.loader {
  position: fixed;
  top:0px;
  right:0px;
  width:100%;
  height:100%;
  background-color:#ffffff;
  background-image: url('assets/wait.gif');
  background-repeat:no-repeat;
  background-position:center;
  z-index:10000000;
  opacity: 0.4;
  filter: alpha(opacity=40);
}
.card-custom-header {
  color: #fff;
  text-align: center; 
  background-color: #363636; 
}

.fade-enter-active,
.fade-leave-active {
  transition-duration: 0.3s;
  transition-property: opacity;
  transition-timing-function: ease;
}

.fade-enter,
.fade-leave-active {
  opacity: 0
}

/* Global Style for input text validation process */
.msgValidClass {
  display: none;
}
.msgNotValidClass {
  color: rgb(213, 95, 95);
}
.input-base {
  padding-left: 10px;
  padding-right: 35px;
  display: block;
  box-sizing: border-box;
  margin-bottom: 4px;
  font-size: 13px;
  line-height: 2;
  font-family: inherit;
  transition: 0.5s;
  border: 0;
}
.input-correct {
  background-color: #ffffff;
  border-bottom: 1px solid #009900;
  background: url(./assets/check.png) no-repeat scroll;
  background-position:right;
  background-size: 17px;
  background-position-x: 96%;
}
.input-wrong {
  background-color: #ffffff;
  border-bottom: 1px solid #990000;
  background: url(./assets/danger.jpg) no-repeat scroll;
  background-position:right;
  background-size: 17px;
  background-position-x: 96%;
}
.input-correct:focus {
  box-shadow: 2px 1px 4px #d2eac1;
  border: 1px solid rgb(183, 232, 170);
}
.input-wrong:focus {
  box-shadow: 2px 1px 4px #ffbbaa;
  border: 1px solid #bb0000;
}
.styleCalendar {
  font-size: 12px;
  border: 0;
  border-bottom: 1px solid #009900;
}
</style>