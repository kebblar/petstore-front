<template>
<div class="ancho centra" style="max-width:1200px">
    <div class="card defaultColor">
        <div class="card-header">
            <label class="control-label h4">Consulta de Estatus</label>
        </div>
        <div class="card-body align" style="margin:20px;">

            <div class="row">
                <div class="form-inline">
                    <label for="nombre" class="col-form-label mr-2">Nombre del estatus:</label>
                    <input type="text" required class="form-control mr-3" :class="className" placeholder="ENVIADO" v-model="name">
                    <!--small class="notValid">{{msgName}}</small-->

                    <button type="button" @click="submition" class="btn btn-primary mr-2">
                        <i class="fa fa-search fa-fw" aria-hidden="true"></i>Consultar</button>
                    <button type="button" @click="openAdd" class="btn btn-success mr-2">
                        <i class="fa fa-plus" aria-hidden="true"></i></button>
                </div>
            </div> <!-- end row -->

    <br><br>

            <div class="row">
                <table class="table table-hover table-sm table-striped">
                    <thead>
                        <tr>
                            <th scope="col">id</th>
                            <th scope="col">Nombre</th>
                            <th scope="col">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="estatusanuncio in estatusanuncios" :key="estatusanuncio.id">
                            <td>{{estatusanuncio.id}}</td>
                            <td>{{estatusanuncio.descripcion}}</td>
                            <td>
                                <button type="button" @click="openEdit(estatusanuncio.id, estatusanuncio.descripcion)" class="btn btn-success mb-2 mr-4">
                                    <i class="fa fa-edit" aria-hidden="true"></i></button>
                                <button type="button" @click="openDelete(estatusanuncio.id)" class="btn btn-danger mb-2 mr-4">
                                    <i class="fa fa-trash" aria-hidden="true"></i></button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div><!--  end row -->
        </div>
    </div><!-- ends header-->

        <!-- Modal -->

        <modal
            name="editarEstatusanuncio"
            :clickToClose="false"
            :reset="true"
            :width="480"
            :height="245">
            <div class="card">
                <div class="card-header">Editar estatusanuncio</div>
                <div class="card-body">
                    <!--label class="mr-2" style="width:220px">Id: {{idActual}}</label-->
                    <div class="form-group">
                        <label for="estatusanuncio">Nombre del estatus:</label>
                        <input id="estatusanuncio" type="text" required class="form-control" :class="className" placeholder="ENVIADO" v-model="nombreActual">
                        <small class="notValid">{{msgName}}</small>
                    </div>

                    <div class="form-group my-4" style="text-align: right;">
                        <b-button variant="primary" class="mr-2" @click="modificarEstatusanuncio">Aceptar</b-button>
                        <b-button variant="danger" class="mr-2" @click="closeModalEdit">Cancelar</b-button>
                    </div>
                </div>
            </div>
        </modal><!-- ends modal-->

        <!-- Modal -->

        <modal
            name="mensaje-exito"
            :clickToClose="false"
            :reset="true"
            :width="480"
            :height="245">
            <div class="card">
                <div class="card-header">Actualización Exitosa</div>
                <div class="card-body">
                    <h5 class="card-title">El estatusanuncio se actualizo correctamente</h5>
                    <p class="h1 mb-2" style="text-align:center;font-size:4em">
                        <b-icon icon="check-circle" variant="success"></b-icon>
                    </p>
                    <div style="text-align: right;">
                        <b-button variant="success" @click="closeModalExito">Aceptar</b-button>
                    </div>
                </div>
            </div>
        </modal><!-- ends modal-->

        <!-- Modal -->

        <modal
            name="agregarEstatusanuncio"
            :clickToClose="false"
            :reset="true"
            :width="480"
            :height="245">
            <div class="card">
                <div class="card-header">Agregar estatus</div>
                <div class="card-body">
                    <div class="form-group">
                        <label for="estatusanuncio">Nombre del estatus:</label>
                        <input id="estatusanuncio" type="text" required class="form-control" :class="classNameN" placeholder="ENVIADO" v-model="nombreNuevo">
                        <small class="notValid">{{msgNameN}}</small>
                    </div>

                    <div class="form-group my-4" style="text-align: right;">
                        <b-button
                            :disabled="habilitaBoton"
                            variant="primary"
                            class="mr-4"
                            @click="agregarEstatusanuncio">Aceptar</b-button>
                        <b-button variant="danger" @click="closeModalAdd2">Cancelar</b-button>
                    </div>
                </div>
            </div>
        </modal><!-- ends modal-->

        <!-- Modal -->

        <modal
            name="mensaje-exito-add"
            :clickToClose="false"
            :reset="true"
            :width="480"
            :height="245">
            <div class="card">
                <div class="card-header">Registro Exitoso</div>
                <div class="card-body">
                    <h5 class="card-title">El estatus se agrego correctamente</h5>
                    <p class="h1 mb-2" style="text-align:center;font-size:4em">
                        <b-icon icon="check-circle" variant="success"></b-icon>
                    </p>
                    <div style="text-align: right;">
                        <b-button variant="success" @click="closeModalAdd">Aceptar</b-button>
                    </div>
                </div>
            </div>
        </modal><!-- ends modal-->

        <!-- Modal -->

        <modal
            name="eliminarEstatusanuncio"
            :clickToClose="false"
            :reset="true"
            :width="480"
            :height="200">
            <div class="card">
                <div class="card-header">Eliminar estatus</div>
                <div class="card-body">
                    <p class="card-text">¿Está seguro que desea eliminar el estatus?</p>
                    <div class="my-4" style="text-align: right;">
                        <b-button variant="warning" class="mr-2" @click="eliminarEstatusanuncio">Si, eliminar!</b-button>
                        <b-button variant="danger" class="mr-2" @click="closeModalDelete">Cerrar</b-button>
                    </div>
                </div>
            </div>
        </modal><!-- ends modal-->

        <!-- Modal -->

        <modal
            name="mensaje-exito-delete"
            :clickToClose="false"
            :reset="true"
            :width="480"
            :height="245">
            <div class="card">
                <div class="card-header">Borrado Exitoso</div>
                <div class="card-body">
                    <h5 class="card-title">El estatus se elimino correctamente</h5>
                    <p class="h1 mb-2" style="text-align:center;font-size:4em">
                        <b-icon icon="check-circle" variant="success"></b-icon>
                    </p>
                    <div style="text-align: right;">
                        <b-button variant="success" @click="closeModalDelete2">Aceptar</b-button>
                    </div>
                </div>
            </div>
        </modal><!-- ends modal-->

        <modal
            name="modal-general"
            :clickToClose="false"
            :reset="true"
            :width="480"
            :height="245">
            <div class="card">
                <div class="card-header">Información</div>
                <div class="card-body">
                    <div class="form-group">
                        <h4>Se presenta lo siguiente:</h4>
                        <p>{{msnErrorIrreconocible}}</p>
                        <small>Favor de comunicar este mensaje con el administrador del sistema.</small>
                    </div>

                    <div class="form-group my-4" style="text-align: right;">
                        <b-button variant="info" @click="openGen">Aceptar</b-button>
                    </div>
                </div>
            </div>
        </modal><!-- ends modal-->
</div>
</template>



<script>
    import axios from 'axios';
    import store from '../store';
    import "vue-range-slider/dist/vue-range-slider.css";
  //import { mapMutations } from 'vuex'
    export default {
        components: {
        },
        data() {
            return {
                name: '',
                msgName : null,
                msgNameN : null,
                idActual: 0,
                estatus:0,
                estatusActual:0,
                nombreActual: '',
                estatusanuncios: null,
                nombreNuevo: '',
                className: 'defaultColor',
                classNameN: 'defaultColor',
                styleCarac : 'color:grey;',
                styleUpper : 'color:grey;',
                styleNum : 'color:grey;',
                styleCarac2 : 'show',
                styleUpper2 : 'show',
                styleNum2 : 'show',
                styleCalendar : '',
                isVisible : 'hidden',
                activoClave : true, //Cambia el valor del booleano para ver las distintas versiones de validaciones de la clave
                dateConfig : {
                    initial : new Date(2000,0,1),
                    min : new Date(1930,0,1),
                    max : new Date(2003,11,30)
                },
                sliderValue : 100,
                pwConfDisabled: true,
                msnErrorIrreconocible: '',
            }
        },
        watch: {
            nombreNuevo() {
                this.msgNameN="";
                this.classNameN="greenColor correct";
                if (this.nombreNuevo.trim().length<3) {
                    this.msgNameN="La estatusanuncio debe contener más de 3 letras";
                    this.classNameN="redColor incorrect";
                }
                this.nombreNuevo= this.nombreNuevo.length===1 ? this.nombreNuevo.toUpperCase() : this.nombreNuevo;
            }
        },
        computed: {
            habilitaBoton: function() {
                var dato = true && this.nombreNuevo && this.nombreNuevo.length>3;
                return !dato;
            }
        },
        methods: {
            openGen(){
                this.$modal.hide('modal-general');
            },
            openEdit(id, nombre,estatus){
                this.idActual=id;
                this.nombreActual=nombre;
                this.estatusActual=estatus;
                this.$modal.show('editarEstatusanuncio');
            },
            openDelete(id){
                this.idActual=id;
                this.$modal.show('eliminarEstatusanuncio');
            },
            closeModalDelete: function() {
                this.$modal.hide('eliminarEstatusanuncio');
            },
            closeModalDelete2: function() {
                this.$modal.hide('mensaje-exito-delete');
            },
            closeModalEdit: function() {
                this.$modal.hide('editarEstatusanuncio');
            },
            openAdd(){
                this.nombreNuevo= '';
                this.$modal.show('agregarEstatusanuncio');
                this.estatus=0;
            },
            closeModalAdd: function() {
                this.$modal.hide('mensaje-exito-add');
            },
            closeModalAdd2: function() {
                this.$modal.hide('agregarEstatusanuncio');
            },
            closeModalExito: function() {
                this.$modal.hide('mensaje-exito');
                this.$modal.hide('editarEstatusanuncio');
            },
            submition() {
                console.log("submition");
                if (this.name) {
                    axios.get('api/estatusanuncios/list/'+this.name+'.json', {
                    }).then(response => {
                        console.log("enviado");
                        console.log(response);
                        this.estatusanuncios=response.data;
                    }).catch(error => {
                        console.log(error.response.status);
                        console.log(error.response.data);
                        this.msgErr = error.response.data['exceptionLongDescription'];
                        this.msnErrorIrreconocible = this.msgErr;
                        this.$modal.show('modal-general');
                    })
                }
                else {
                    console.log(store.state);
                    axios.get('api/estatus-anuncios.json', {
                    }).then(response => {
                        console.log("enviado-estatusanuncios");
                        console.log(response);
                        this.estatusanuncios=response.data;
                    }).catch(error => {
                        console.log(error.response.status);
                        console.log(error.response.data);
                        this.msgErr = error.response.data['exceptionLongDescription'];
                        this.msnErrorIrreconocible = this.msgErr;
                        this.$modal.show('modal-general');
                    });
                }
            },
            modificarEstatusanuncio() {
                axios.put('api/estatus-anuncio.json', {
                    id:this.idActual,
                    descripcion : this.nombreActual,
                }).then(response => {
                    console.log("enviado");
                    console.log(response);
                    if (this.name) {
                        axios.get('api/estatusanuncios/list/'+this.name+'.json', {
                        }).then(response => {
                            console.log("enviado");
                            console.log(response);
                            this.estatusanuncios=response.data;
                        }).catch(error => {
                            console.log(error.response.status);
                            console.log(error.response.data);
                            this.msgErr = error.response.data['exceptionLongDescription'];
                        })
                    }
                    else {
                        console.log(store.state);
                        axios.get('api/estatus-anuncios.json', {
                        }).then(response => {
                            console.log("enviado");
                            console.log(response);
                            this.estatusanuncios=response.data;
                        }).catch(error => {
                            console.log(error.response.status);
                            console.log(error.response.data);
                            this.msgErr = error.response.data['exceptionLongDescription'];
                        });
                    }
                    this.$modal.show('mensaje-exito');
                }).catch(error => {
                    console.log(error.response.status);
                    console.log(error.response.data);
                    this.msgErr = error.response.data['exceptionLongDescription'];
                })
            },
            agregarEstatusanuncio() {
                console.log(store.state);
                axios.post('api/estatus-anuncio.json', {
                    descripcion : this.nombreNuevo,
                }).then(response => {
                    console.log("enviado");
                    console.log(response);
                    this.$modal.hide('agregarEstatusanuncio');
                    this.$modal.show('mensaje-exito-add');
                    if (this.name) {
                        axios.get('api/estatusanuncios/list/'+this.name+'.json', {
                        }).then(response => {
                            console.log("enviado");
                            console.log(response);
                            this.estatusanuncios=response.data;
                        }).catch(error => {
                            console.log(error.response.status);
                            console.log(error.response.data);
                            this.msgErr = error.response.data['exceptionLongDescription'];
                        })
                    }
                    else {
                        console.log(store.state);
                        axios.get('api/estatus-anuncios.json', {
                        }).then(response => {
                            console.log("enviado");
                            console.log(response);
                            this.estatusanuncios=response.data;
                        }).catch(error => {
                            console.log(error.response.status);
                            console.log(error.response.data);
                            this.msgErr = error.response.data['exceptionLongDescription'];
                        });
                    }
                }).catch(error => {
                    console.log(error.response.status);
                    console.log(error.response.data);
                    this.msgErr = error.response.data['exceptionLongDescription'];
                })
            },
            eliminarEstatusanuncio() {
                axios.delete('api/estatus-anuncio.json', {
                    data:{id:this.idActual}
                }).then(response => {
                    console.log("enviado");
                    console.log(response);
                    this.estatusanuncios=response.data;
                    this.$modal.hide('eliminarEstatusanuncio');
                    this.$modal.show('mensaje-exito-delete');
                    if (this.name) {
                        axios.get('api/estatusanuncios/list/'+this.name+'.json', {
                        }).then(response => {
                            console.log("enviado");
                            console.log(response);
                            this.estatusanuncios=response.data;
                        }).catch(error => {
                            console.log(error.response.status);
                            console.log(error.response.data);
                            this.msgErr = error.response.data['exceptionLongDescription'];
                        })
                    }
                    else {
                        console.log(store.state);
                        axios.get('api/estatus-anuncios.json', {
                        }).then(response => {
                            console.log("enviado");
                            console.log(response);
                            this.estatusanuncios=response.data;
                        }).catch(error => {
                            console.log(error.response.status);
                            console.log(error.response.data);
                            this.msgErr = error.response.data['exceptionLongDescription'];
                        });
                    }
                }).catch(error => {
                    console.log(error.response.status);
                    console.log(error.response.data);
                    this.msgErr = error.response.data['exceptionLongDescription'];
                });
            }
        }
    }
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.align {
    text-align: left;
}
.notValid{
    color:rgb(235, 74, 74);
}
.greenColor:focus{
    background-color: #eefaee;
    box-shadow: 2px 1px 4px #bdd3ae;
}
.correct{
    border-color:rgb(96, 161, 99);
    border-width: 1px;
    box-shadow: 1px 1px 3px #d8dcdd;
    background: url(../assets/check.png) no-repeat scroll;
    background-position:right ;
    background-size: 17px;
    background-position-x: 96%;
}
.redColor:focus{
    background-color:   #fff3f3  ;
    box-shadow: 2px 1px 4px #dba6a6;
}
.incorrect{
    border-color:rgb(235, 74, 74);
    border-width: 1px;
    box-shadow: 1px 1px 3px #d8dcdd;
    background: url(../assets/danger.jpg) no-repeat scroll;
    background-position:right ;
    background-size: 20px;
    background-position-x: 96%;
}
.defaultColor{
    background-color: white;
    box-shadow: 1px 1px 3px #d8dcdd;
}
.hidden{
    display: none;
}
.show{
    display: block;
}
</style>