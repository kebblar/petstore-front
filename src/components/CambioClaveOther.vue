<template> 
    <div id="contenedor">
    <div class="container" >
        <div class="loader" v-if="loading"></div>
            <div >
                <div class="row ">
                    <div >
                        <h1  >Cambiar clave de acceso</h1>
                    </div>
                </div>
            </div>

        <div class="card ">
            <label  style="font-size:13px">Utiliza el siguiente formulario para cambiar la contraseña de tu cuenta de En que te ayudo?</label>
            
            

            <div class="card-body ">
                <div class="row ">
                    <div class="left-text" >
                      
                        <label for="clave" >Clave actual:</label>

                        <div class=" form-group">
                        <input type="password" class="form-control"  v-model="claveAnterior" />
                    </div>
                    </div>
                    

                    <div class="left-text"  >
                        <label for="clave">Nueva clave:</label>
                         <div class=" form-group">
                        <input type="password" class="form-control" v-model="claveNueva" />
                    </div>
                    </div>
                   

                    <div class=" left-text"  >
                        <label for="clave2">Vuelve a ingresar la nueva clave:</label>
                     <div class=" form-group">
                        <input type="password" class="form-control" v-model="confirmaClaveNueva" />
                    </div>
                    </div>
                   

                        <div  style="left:0">
                        <button @click="cambiar" class="btn btn-success">Cambiar Clave</button>
                    </div>
                </div>
            </div>

        </div>

        <modal 
            name="mensaje" 
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
    </div>
</template>

<script>
import axios from 'axios';
import router from '../router'
import store from '../store'

export default {
  data() {
    return {
      claveAnterior: "",
      claveNueva: "",
      confirmaClaveNueva: "",
      msgErr: "",
      loading: "",
      titulo: "",
      salta: false
    }
  },
  methods: {
    cambiar: function() {
        if(this.claveNueva.length < 8 ||
            (!(this.claveNueva.toUpperCase() != this.clave)) ||
            (!(this.claveNueva.toLowerCase() != this.clave)) ||
            (!(/\d/.test(this.claveNueva)))){
            this.titulo = 'Error al cambiar la clave';
            this.msgErr = "La clave tiene que tener 8 caracteres, "+
            "una mayuscula, una minuscula, un caracter especial " +
            "y al menos un numero.";
            this.$modal.show('mensaje');
            return;
        }
        

        if(this.claveNueva != this.confirmaClaveNueva) {
            this.titulo = 'Error al cambiar la clave';
            this.msgErr = 'La clave y su confirmación no coinciden';
            this.$modal.show('mensaje');
            return;
        }
        
        
        // Si la clave y su confirmación fueron iguales:
        this.loading =  true;
        axios.post('api/modificacion-clave.json', 
        {
            usr: store.state.estado.usuario.mail,
            nuevaClave: this.claveNueva,
            claveAnterior: this.claveAnterior
        }, 
        {
            headers: {
                'Content-type': 'application/json',
                'crossDomain': true,
                'Acces-Control-Allow-Origin': '*',
                'X-CSRFToken': store.state.estado.jwt
            }
        }).catch(error => {
            this.titulo = 'Error al cambiar la clave';
            this.msgErr = "Ha ocurrido un error de red: " + error;
            this.$modal.show('mensaje');
        }).then(response => {
            if(response.status===200) {
                this.salta = true;
                this.titulo = 'Felicidades !!!';
                this.msgErr = 'La clave ha sido cambiada exitosamente';
                this.$modal.show('mensaje');
            } else {
                this.msgErr = response.data['desc-exception'];
                this.$modal.show('mensaje');
            }
        }).finally(() => {
            this.loading =  false
        });
    },
    closeModal: function() {
        this.$modal.hide('mensaje');
        if(this.salta) router.push('/ui/login');
    }
  }
}
</script>



<!-- Add "scoped" attribute to limit CSS to this component only -->
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

.container{
    width:50%
}
h1{
    font-weight: 400;
    font-size: 28px;
    line-height: 1.2;
    margin-left: 10px;
}
.left{
    float:left;

}
.card {
    padding: 10px;

}
.left-text {
    text-align: left;
    align-content:flex-end;
}
.row{
    display: table;
    font-weight: 700;
    font-size: 13px;
}
.btn{
    display: table;
}
</style>
