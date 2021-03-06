<template>
    <div class="ancho centra">
  <div class="card bg-warning">
            <div class="card-heade">
                <div class="row  p-3 mb-2 bg-warning text-white">
                    <div class="col-sm-12">
                        <label style="font-size:26px;">Restablece tu clave</label>
                    </div>
                </div>
            </div>
            <div class="card-body bg-secondary">
<script src="//maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossorigin="anonymous"></script>
<script src="//code.jquery.com/jquery-1.11.1.min.js"></script>
<!------ Include the above in your HEAD tag ---------->

 <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css">
 <div class="form-gap"></div>
<div class="container">
	<div class="row">
		<div class="col-md-4 col-md-offset-4">
            <div class="panel panel-default">
              <div class="panel-body">
                <h3><i class="fa fa-lock fa-4x"></i></h3>
                <h2>hh</h2>
                <div class="text-center">
                  <h2>Regenerar</h2>
                  <p>Puedes restablecer tu contrasela aqui</p>
                  
                  <div class="panel-body">
    
                    <form id="register-form" role="form" autocomplete="off" class="form" method="get" novalidate="true" @submit="registrar">
    
                      <div class="form-group">
                        <div class="input-group">
                            <span class="input-group-addon"><i class="fa fa-envelope"></i></span>
                          <input id="email"  name="email" placeholder="correo" class="form-control"  type="email" v-model="correo" />
                        </div>
                      </div>
                      <div class="form-group">
                        <input class="btn btn-lg btn-warning btn-block" value="Reset Password" type="submit">
                      </div>
                      
                    </form>
    
                  </div>
                </div>
              </div>
            </div>
          </div>
	</div>
</div>
  </div>
	</div>

        <modal 
            name="mensaje-login" 
            :clickToClose="false" 
            :reset="true">
            <div class="card">
                <div class="card-header">Advertencia del sistema</div>
                <div class="card-body">
                    <h5 class="card-title">Error de regeneración de clave</h5>
                    <p class="card-text">{{ msgErr }}</p>
                    <div style="text-align: right;">
                        <a href="#" class="btn btn-primary" @click="closeModal">Aceptar</a>
                    </div>
                </div>
            </div>
        </modal>


    </div>
</template>

<script>
import axios from 'axios';
import router from '../router'
 
//import VueRecaptcha from 'vue-recaptcha';

export default {
    data: function () {
        return {
            correo: "",
            msgErr: "",
            loading: false,
            status: "",
            sucessfulServerResponse: "",
            serverError: "",
            reg: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/
        }
    },
    created() {
    },
    methods: {
        closeModal: function() {
            this.$modal.hide('mensaje-login');
        },
        registrar: function(e) {
            e.preventDefault();          
            if(this.correo == null || this.correo == '') {
                this.msgErr = 'El correo no puede ser vacío';
                this.$modal.show('mensaje-login');
                return;
            }
            if(!this.reg.test(this.correo)) {
                this.msgErr = 'La estructura del correo es incorrecta';
                this.$modal.show('mensaje-login');
                return;
            }
            console.log(this.correo) 
            this.loading = true;
            axios.get('api/clave-olvidada.json?mail='+this.correo, 
            {
                mail: this.correo
            }, 
            {
                headers: {
                    'Content-type': 'application/json',
                    'crossDomain': true,
                    'Acces-Control-Allow-Origin': '*'
                }
            }).catch(error => {
                this.msgErr = "Ha ocurrido un error de red: " + error;
                this.$modal.show('mensaje-login');
            }).then(response => {
                if(response.status===200) {
                    this.envioMensaje();
                    router.push('/ui/confirmar-regeneracion');
                } else {
                    this.msgErr = response.data['desc-exception'];
                    this.$modal.show('mensaje-login');
                }
            }).finally(() => {
                this.loading =  false
            });  
        },
        envioMensaje() {
             this.$root.$bvToast.toast('Si tu correo existe en nuestra base de datos, recibiras un token unos minutos', {
             title: 'Token enviado',
             variant: 'success',
             solid: true,
             toaster: 'b-toaster-bottom-right'
      });
    }
    }
}
</script>

<style scoped>
.ancho {
    max-width: 380px;
}
.form-gap {
    padding-top: 70px;
}


</style>