<template>
    <div class="ancho centra">

        <div class="card" style="width: 380px;">

            <div class="card-header">
                <div class="row">
                    <div class="col-sm-6">
                        <label>Ingresar al sistema</label>
                    </div>
                    <div class="col-sm-6" style="text-align: right;">
                        <label>V. {{ version }}</label>
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

        <modal 
            name="mensaje-login" 
            :clickToClose="false" 
            :reset="true"
            :width="480"
            :height="260">
            <div class="card">
                <div class="card-header">Advertencia del sistema</div>
                <div class="card-body">
                    <h5 class="card-title">Error de ingreso al sistema</h5>
                    <p class="card-text">{{ msgErr }}</p>
                    <div style="text-align: right;">
                        <a href="#" class="btn btn-primary" @click="closeModal">Aceptar</a>
                    </div>
                </div>
            </div>
        </modal><!-- ends modal-->

    </div>
</template>

<script>
import axios from 'axios';
import router from '../router'
import store from '../store'

export default {
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
                return '/ui/inicio';
            } else {
                for(var i=0; i<roles.length; i++) {
                    switch(roles[i].nombre) {
                        case 'admin': return '/ui/admin'; // rol 1 = administrador
                        case 'user': return '/ui/user'; // rol 2 = usuario comun y corriente
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
                console.log(response.data);
                store.commit('setSession', {
                    nombreCompleto: ud.nombre + ' ' + ud.apellidoPaterno + ' ' + ud.apellidoMaterno,
                    roles:        rd.roles,
                    correo:       rd.correo,
                    ultimoAcceso: rd.ultimoAcceso,
                    idUser:       ud.id,
                    jwt:          rd.jwt
                });
                const target = this.detecta(rd.roles);
                router.push(target);
            }).catch(error => {
                // el catch ocurre aun si el post está bien pero ud es null, por ejemplo !!!!
                this.msgErr = error;
                if(error.response) {
                    this.msgErr = error.response.data['exceptionLongDescription'];
                }
                this.$modal.show('mensaje-login');
            })
        }
    }
}
</script>

<style scoped>
.ancho {
    max-width: 400px;
}
</style>