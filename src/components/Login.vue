<template>
    <div class="ancho centra">

        <div class="row">
            <div class="col-sm-6" >
                <img src="../assets/login.jpg" width="100%"/>
            </div>
            <div class="col-sm-6">
                <div class="card">

                    <div class="card-header">
                        <div class="row">
                            <div class="col-sm-12">
                                <label>Ingresar al sistema</label>
                            </div>
                        </div>
                    </div><!-- ends header-->

                    <div class="card-body">
                        <div class="row">
                            <div class="col-sm-12 text-left">
                                <div class="form-group">
                                    <label for="precioVenta">Usuario</label>
                                    <input type="text" class="form-control" v-model="usr" />
                                </div>
                                <div class="form-group">
                                    <div class="row">
                                        <div class="col-sm-6 text-left">
                                            <label for="cantidadVenta">Clave</label>
                                        </div>
                                        <div class="col-sm-6 text-right">
                                            <a href="#" @click="openForgotPage">Olvidé mi clave</a>
                                        </div>
                                    </div>
                                    <input type="password" class="form-control" v-model="psw" />
                                </div>
                            </div>
                            <div class="col-sm-12" style="text-align: center;">
                                <button @click="checkCredentials" class="btn btn-warning">Ingresar al sistema</button>
                            </div>
                            <div class="col-sm-12" style="text-align: center;">
                                <hr/>
                                <a href="#" @click="openRegistroPage" >Deseo registrarme al sistema</a>
                            </div>

                        </div>
                    </div><!-- ends body-->

                </div><!-- ends card-->
            </div>
        </div>

        <Aviso
        ref='avisoComp'
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
import Aviso from './custom/dialog/Aviso';

export default {
    components: {
      'Aviso': Aviso
    },
    data: function () {
        return {
          usr: "",
          psw: "",
          msgErr: "",
          version: process.env.VUE_APP_VERSION
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
        openRegistroPage: function() {
            router.push({'name':'registro'});
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
                this.$refs.avisoComp.abre();
            })
        }
    },
}
</script>

<style scoped>
.ancho2 {
    max-width: 340px;
}
</style>