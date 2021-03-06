<template>
    <div  id="axiosForm" class="container">
        <div class="loader" v-if="loading"></div>
<div class="container">
	<div class="d-flex justify-content-center h-100">
		<div class="card">
			<div class="card-header">
				<h3>Confirmar Regeneracion</h3>
			</div>
			<div class="card-body">
				<form class="ancho central" @submit="registrar">
					<div class="input-group form-group">
						<div class="input-group-prepend">
							<span class="input-group-text"><i class="fa fa-unlock"></i></span>
						</div>
          <input type="text" class="form-control" placeholder="token" v-model="token">
					</div>
					<div class="input-group form-group">
						<div class="input-group-prepend">
							<span class="input-group-text"><i class="fa fa-key"></i></span>
						</div>
            <input type="password" class="form-control" placeholder="new password" v-model="clave">
					</div>
            <div class="input-group form-group">
						<div class="input-group-prepend">
							<span class="input-group-text"><i class="fa fa-key"></i></span>
						</div>
              <input type="password" class="form-control" placeholder="confirm new password" v-model="clave2">
					</div>
				
					<div class="form-group">
						<input type="submit" value="Confirm" class="btn float-right login_btn">
					</div>
				</form>
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
                    <h5 class="card-title">{{ titulo }}</h5>
                    <p class="card-text">{{ msgErr }}</p>
                    <div style="text-align: right;">
                        <a href="#" class="btn btn-primary" @click="closeModal">Aceptar</a>
                    </div>
                </div>
            </div>
        </modal>


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
/* Made with love by Mutiullah Samim*/

@import url('https://fonts.googleapis.com/css?family=Numans');

html,body{
background-image: url('http://getwallpapers.com/wallpaper/full/a/5/d/544750.jpg');
background-size: cover;
background-repeat: no-repeat;
height: 100%;
font-family: 'Numans', sans-serif;
}

.container{
height: 100%;
align-content: center;
}

.card{
height: 370px;
margin-top: auto;
margin-bottom: auto;
width: 400px;
background-color: rgba(0,0,0,0.5) !important;
}

.social_icon span{
font-size: 60px;
margin-left: 10px;
color: #FFC312;
}

.social_icon span:hover{
color: white;
cursor: pointer;
}

.card-header h3{
color: white;
}

.social_icon{
position: absolute;
right: 20px;
top: -45px;
}

.input-group-prepend span{
width: 50px;
background-color: #FFC312;
color: black;
border:0 !important;
}

input:focus{
outline: 0 0 0 0  !important;
box-shadow: 0 0 0 0 !important;

}

.remember{
color: white;
}

.remember input
{
width: 20px;
height: 20px;
margin-left: 15px;
margin-right: 5px;
}

.login_btn{
color: black;
background-color: #FFC312;
width: 100px;
}

.login_btn:hover{
color: black;
background-color: white;
}

.links{
color: white;
}

.links a{
margin-left: 4px;
}

@media (max-width: 150px){
  .card {
    margin-left:0%;
    width:400%;
  }
}

@media (max-width: 200px) and (min-width:150px){
  .card {
    margin-left:0%;
    width:300%;
  }
}

.ancho {
    max-width: 380px;
}

@media (max-width: 250px) and (min-width:200px){
  .card {
    margin-left:0%;
    width:200%;
  }
}

@media (max-width: 350px) and (min-width:250px){
  .card {
    margin-left:0%;
    width:150%;
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
            this.$modal.hide('mensaje-login');
            if(this.salta) router.push('/ui/login');
        },
        registrar: function(e) {
           e.preventDefault();          
           console.log('entramos tambien');
            if(this.clave.length < 8 ||
                (!(this.clave.toUpperCase() != this.clave)) ||
                (!(this.clave.toLowerCase() != this.clave)) ||
                (!(/\d/.test(this.clave))) ||
                (!(/[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(this.clave)))){
                this.titulo = "Error de regeneración de clave";
                this.msgErr = "La clave tiene que tener 8 caracteres, "+
                "una mayuscula, una minuscula, un caracter especial " +
                "y al menos un numero.";
                this.$modal.show('mensaje-login');
                return;
            }

            if(this.clave != this.clave2) {
                this.titulo = "Error de regeneración de clave";
                this.msgErr = 'La clave y su confirmación no coinciden';
                this.$modal.show('mensaje-login');
                return;
            }
           console.log(this.clave2);
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
                             console.log(this.clave2);
                    this.salta = true;
                    this.titulo = 'Felicidades !!!';
                    this.msgErr = 'La clave ha sido cambiada exitosamente';
                    this.$modal.show('mensaje-login');
                } else {
                    this.titulo = "Error de regeneración de clave";
                    this.msgErr = response.data['desc-exception'];
                    this.$modal.show('mensaje-login');
                }
            }).catch(error => {
                this.titulo = "Error de regeneración de clave";
                this.msgErr = "Ha ocurrido un error: " + error.response.data["desc-exception"];
                this.$modal.show('mensaje-login');
            }).finally(() => {
                this.loading =  false
            });            
        },
    },
}

</script>
