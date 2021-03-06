<template>
    <div  id="axiosForm" class="container">
        <div class="loader" v-if="loading"></div>

        <div class="card">
            <div class="card-header">
                <div class="row">
                    <div class="col-sm-12">
                        <label style="font-size:26px;">Restablece tu clave</label>
                    </div>
                </div>
            </div>
            <div class="card-body">
                <div class="row">
                    <div class="col-sm-6 form-group" >
                        <label for="nombre">Token</label>
                    </div>
                    <div class="col-sm-6 form-group">
                        <input type="text" class="form-control" v-model="token" maxlength="25"/>
                    </div>

                    <div class="col-sm-6" >
                        <label for="clave">Clave Nueva</label>
                    </div>
                    <div class="col-sm-6 form-group">
                        <input type="password" class="form-control"  v-model="clave" />
                    </div>

                    <div class="col-sm-6"  >
                        <label for="clave2">Confirma Clave Nueva</label>
                    </div>
                    <div class="col-sm-6 form-group">
                        <input type="password" class="form-control" v-model="clave2" />
                    </div>

                    <div class="col-sm-12" style="text-align: center;">
                        <hr/>
                    </div>

                    
                    <div class="col-sm-12" style="text-align: center;">
                        <button @click="registrar" class="btn btn-success">Solicitar restauración</button>
                    </div>



                </div>

            </div>
        </div>
            <b-modal id="mensaje-login" hide-footer>
    <template #modal-title >
     Advertencia del sistema
    </template>
    <div class="d-block text-center">
      <h4>{{titulo}}</h4>
      {{msgErr}}
    </div>
    <b-button class="mt-2" block @click="closeModal">Cerrar</b-button>
  </b-modal>





    </div>

    
</template>
<script src="https://cdn.jsdelivr.net/npm/sweetalert2@10"></script>

<style scoped>
#axiosForm{  /* Components Root Element ID */
    position: relative;
}
.loader{  /* Loader Div Class */
    position: absolute;
    top:0px;
    right:0px;
    width:100%;
    height:100%;
    background-color:#eceaea;
    background-image: url('../assets/logo2.gif');
    background-repeat:no-repeat;
    background-position:center;
    z-index:10000000;
    opacity: 0.4;
    filter: alpha(opacity=40);
}

#solvecaptcha{
    margin-left:12%;
}
.card{
    margin-left:30%;
    width: 40%;
}

@media (max-width: 150px){
  .card {
    margin-left:0%;
    width:400%;
  }
  #solvecaptcha{
    margin-left:0%;
  }
}

@media (max-width: 200px) and (min-width:150px){
  .card {
    margin-left:0%;
    width:300%;
  }
  #solvecaptcha{
    margin-left:0%;
  }
}

@media (max-width: 250px) and (min-width:200px){
  .card {
    margin-left:0%;
    width:200%;
  }
  #solvecaptcha{
    margin-left:0%;
  }
}

@media (max-width: 350px) and (min-width:250px){
  .card {
    margin-left:0%;
    width:150%;
  }
  #solvecaptcha{
    margin-left:0%;
  }
}

@media (max-width: 500px) and (min-width:350px){
  .card {
    margin-left:0%;
    width:100%;
  }
  #solvecaptcha{
    margin-left:0%;
  }
}

@media (max-width: 1000px) and (min-width:500px){
  .card {
    margin-left:0%;
    width:100%;
  }
  #formulario{
    margin-left:20%;
  }
}
</style>

<script>
import axios from 'axios';
import router from '../router'
export default {
    data: function () {
        return {
          token: "",
          clave: "",
          clave2: "",
          msgErr: "",
          loading: false,
          salta: false,
          titulo: "",
          status: "",
          sucessfulServerResponse: "",
          serverError: "",
        }
    },
    created() {
    },
    methods: {
        closeModal: function() {
            this.$bvModal.hide('mensaje-login');
            if(this.salta) router.push('/ui/login');
        },
        registrar: function() {
            if(this.clave.length < 8 ||
                (!(this.clave.toUpperCase() != this.clave)) ||
                (!(this.clave.toLowerCase() != this.clave)) ||
                (!(/\d/.test(this.clave))) ||
                (!(/[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(this.clave)))){
                this.titulo = "Error de regeneración de clave";
                this.msgErr = "La clave tiene que tener 8 caracteres, "+
                "una mayuscula, una minuscula, un caracter especial " +
                "y al menos un numero.";
                this.$bvModal.show('mensaje-login');
                return;
            }

            if(this.clave != this.clave2) {
                this.titulo = "Error de regeneración de clave";
                this.msgErr = 'La clave y su confirmación no coinciden';
                this.$bvModal.show('mensaje-login');
                return;
            }

            this.loading = true;

            axios.post('api/confirma-clave-olvidada.json', 
            {
                code: this.token,
                pass: this.clave
            }, 
            {
                headers: {
                    'Content-type': 'application/json',
                    'crossDomain': true,
                    'Acces-Control-Allow-Origin': '*'
                }
            }).then(response => {
                if(response.status===200) {
                    this.salta = true;
                    this.titulo = 'Felicidades !!!';
                    this.msgErr = 'La clave ha sido cambiada exitosamente';
                    this.$bvModal.show('mensaje-login');
                } else {
                    this.titulo = "Error de regeneración de clave";
                    this.msgErr = response.data['desc-exception'];
                    this.$bvModal.show('mensaje-login');
                }
            }).catch(error => {
                this.titulo = "Error de regeneración de clave";
                this.msgErr = "Ha ocurrido un error: " + error.response.data["desc-exception"];
                this.$bvModal.show('mensaje-login');
            }).finally(() => {
                this.loading =  false
            });            
        },
    },
}

</script>
