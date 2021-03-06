<template> 
    <div>
    <div class="container">
        <div class="loader" v-if="loading"></div>

        <div >
            <div class="card" id="tarjeta">

                <div class="card-header">
                    <div class="row">
                        <div class="col-sm-12">
                            <label style="font-size:26px;">Cambiar clave de acceso</label>
                        </div>
                    </div>
                </div>

                <div class="card-body">
                    <div class="row">
                        <div class="col-sm-6" >
                            <label for="clave" >Clave Anterior</label>
                        </div>
                        <div class="col-sm-6 form-group">
                            <input type="password" class="form-control"  v-model="claveAnterior" />
                        </div>

                        <div class="col-sm-6" >
                            <label for="clave">Clave Nueva</label>
                        </div>
                        <div class="col-sm-6 form-group">
                            <input type="password" class="form-control" v-model="claveNueva" />
                        </div>

                        <div class="col-sm-6"  >
                            <label for="clave2">Confirma Clave Nueva</label>
                        </div>
                        <div class="col-sm-6 form-group">
                            <input type="password" class="form-control" v-model="confirmaClaveNueva" />
                        </div>

                        <div class="col-sm-12">
                            <hr/>
                        </div>
                        <div class="col-sm-12" style="text-align: center;">
                            <button @click="cambiar" class="btn btn-success">Cambiar Clave</button>
                        </div>
                    </div>
                </div>

            </div>
        </div>

   <div>

  <b-modal id="mensaje" hide-footer>
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
            this.$bvModal.show('mensaje');
            return;
        }
        

        if(this.claveNueva != this.confirmaClaveNueva) {
            this.titulo = 'Error al cambiar la clave';
            this.msgErr = 'La clave y su confirmación no coinciden';
            this.$bvModal.show('mensaje');
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
            this.msgErr =  error.response.data["desc-exception"];
            this.$bvModal.show('mensaje');
        }).then(response => {
            if(response.status===200) {
                this.salta = true;
                this.titulo = 'Felicidades !!!';
                this.msgErr = 'La clave ha sido cambiada exitosamente';
                this.$bvModal.show('mensaje');
            } else {
                this.msgErr = response.data['desc-exception'];
                this.$bvModal.show('mensaje');
            }
        }).finally(() => {
            this.loading =  false
        });
    },
    closeModal: function() {
        this.$bvModal.hide('mensaje');
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
.card-header{
    background-color: #fff;
}

</style>
