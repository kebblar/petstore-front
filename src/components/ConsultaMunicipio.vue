<template>
<div class="ancho centra" style="max-width:1200px">
    <div class="card defaultColor">
        <div class="card-header">
            <label class="control-label h4">Consulta de Municipio</label>
        </div>
        <div class="card-body align" style="margin:20px;">

            <div class="row">
                <div class="form-inline">
                    <label for="nombre" class="col-form-label mr-2"> Nombre del municipio:</label>
                    <input type="text" required class="form-control mr-3" :class="className" placeholder="Ixtapaluca" v-model="name">
                    <!--small class="notValid">{{msgName}}</small-->

                    <button type="button" @click="submition" class="btn btn-primary mr-2">
                        <i class="fa fa-search fa-fw" aria-hidden="true"></i>Consultar</button>
                    <button type="button" @click="openAdd" class="btn btn-success mr-2">
                        <i class="fa fa-plus" aria-hidden="true"></i></button>
                </div>
            </div> <!-- end row -->

    <br><br>

            <div class="row">
                <b-table
                        id="my-table"
                        class="table table-hover table-sm table-striped"
                        :items="items"
                        :per-page="perPage"
                        :current-page="currentPage"
                        :fields="fields"
                        ref="table">
                        <template #cell(Acciones)="row">
                            <b-button variant="success" @click="openEdit(row.item.id, row.item.nombre, row.item.idEstado)" class="mr-4">
                                <i class="fa fa-edit" aria-hidden="true"></i></b-button>
                            <b-button variant="danger" @click="openDelete(row.item.id)">
                                <i class="fa fa-trash" aria-hidden="true"></i></b-button>
                        </template>
                </b-table>
            </div><!--  end row -->
    <hr>
            <div class="overflow-auto">
                <b-pagination
                    v-model="currentPage"
                    :total-rows="rows"
                    :per-page="perPage"
                    aria-controls="my-table"
                    align="center"
                    :limit="6"
                    first-number
                    last-number>
                </b-pagination>
            </div><!-- end pagination-->
        </div>
    </div><!-- ends header-->

        <!-- Modal -->

        <modal
            name="agregarMunicipio"
            :clickToClose="false"
            :reset="true"
            :width="600"
            :height="400">
            <div class="card">
                <div class="card-header">Agregar Municipio</div>
                <div class="card-body">
                    <div class="form-group">
                        <label for="municipio">Nombre del municipio:</label>
                        <input id="municipio" type="text" required class="form-control" :class="classNameN" placeholder="Ixtapaluca" v-model="nombreNuevo">
                        <small class="notValid">{{msgNameN}}</small>
                    </div>

                    <div class="form-group mt-3">
                        <label for="pais">País:</label>
                        <select id="pais" v-model="idPais" @change="findEstadoByPais(idPais)" class="custom-select" :class="className">
                            <option v-for="pais in paises" v-bind:key="pais.id" v-bind:value="pais.id">
                                {{ pais.nombre }}
                            </option>
                        </select>
                    </div>

                    <div class="form-group mt-3">
                        <label for="estado">Estado:</label>
                        <select id="estado" v-model="idEstado" class="custom-select" :class="className">
                            <option v-for="estado in estados" v-bind:key="estado.id" v-bind:value="estado.id">
                                {{ estado.nombre }}
                            </option>
                        </select>
                    </div>

                    <div class="form-group my-4" style="text-align: right;">
                        <b-button 
                            :disabled="habilitaBoton"
                            variant="primary"
                            class="mr-4"
                            @click="agregarMunicipio">Aceptar</b-button>
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
                    <h5 class="card-title">El municipio se agrego correctamente</h5>
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
            name="editarMunicipio"
            :clickToClose="false"
            :reset="true"
            :width="600"
            :height="420">
            <div class="card">
                <div class="card-header">Editar Municipio</div>
                <div class="card-body">
                    <!--label for="nombre" class="mr-2" style="width:220px">ID:{{this.idActual}}</label-->
                    <div class="form-group">
                        <label for="municipio">Nombre del municipio:</label>
                        <input id="municipio" type="text" required class="form-control" :class="className" placeholder="Ixtapaluca" v-model="nombreActual">
                        <small class="notValid">{{msgName}}</small>
                    </div>

                    <div class="form-group mt-3">
                        <label for="pais">País:</label>
                        <select id="pais" v-model="idPaisNuevo" @change="findEstadoByPais(idPaisNuevo)" class="custom-select" :class="className">
                            <option v-for="pais in paises" v-bind:key="pais.id" v-bind:value="pais.id">
                                {{ pais.nombre }}
                            </option>
                        </select>
                    </div>

                    <div class="form-group mt-3">
                        <label for="estado">Estado:</label>
                        <select id="estado" v-model="idEstadoNuevo" class="custom-select" :class="className">
                            <option v-for="estado in estados" v-bind:key="estado.id" v-bind:value="estado.id">
                                {{ estado.nombre }}
                            </option>
                        </select>
                    </div>

                    <div class="form-group my-4" style="text-align: right;">
                        <b-button variant="primary" class="mb-2 mr-4" @click="modificarMunicipio">Aceptar</b-button>
                        <b-button variant="danger" class="mb-2 mr-4" @click="closeModalEdit">Cancelar</b-button>
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
                    <h5 class="card-title">El municipio se actualizo correctamente</h5>
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
            name="eliminarMunicipio"
            :clickToClose="false"
            :reset="true"
            :width="480"
            :height="200">
            <div class="card">
                <div class="card-header">Eliminar municipio</div>
                <div class="card-body">
                    <p class="card-text">¿Está seguro que desea eliminar el municipio?</p>
                    <div class="my-4" style="text-align: right;">
                        <b-button variant="warning" class="mr-4" @click="eliminarMunicipio">Si, eliminar</b-button>
                        <b-button variant="danger" class="mr-4" @click="closeModalDelete">Cerrar</b-button>
                    </div>
                </div>
            </div>
        </modal><!-- ends modal-->

        <modal
            name="mensaje-exito-delete"
            :clickToClose="false"
            :reset="true"
            :width="480"
            :height="245">
            <div class="card">
                <div class="card-header">Borrado Exitoso</div>
                <div class="card-body">
                    <h5 class="card-title">El municipio se elimino correctamente</h5>
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
                <div class="card-header">Error</div>
                <div class="card-body">
                    <div class="form-group">
                        <h4>Favor de comunicar este Código de error con el administrador del sistema.</h4>
                        <p>{{msnErrorIrreconocible}}</p>
                        <small></small>
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
    import { BootstrapVue } from 'bootstrap-vue';
    import Vue from "vue"; 
    Vue.use(BootstrapVue);
    export default {
        components: {
        },
        data() {
            return {
                perPage: 15,
                currentPage: 1,
                items: [],
                fields: [
                    {
                        key: 'id', 
                        label: 'Id'
                    }, 
                    {
                        key: 'nombre', 
                        label: 'Nombre'
                    }, 
                    {
                        key: 'nombreEstado', 
                        label: 'Estado'
                    }, 
                    {
                        key: 'nombrePais', 
                        label: 'Pais'
                    },
                    {
                        key: 'idEstado',
                        thClass: 'd-none',
                        tdClass: 'd-none'
                    },
                    'Acciones'
                ],
                name: '',
                msgName : null,
                msgNameN : null,
                idActual: 0,
                nombreActual: '',
                municipios: null,
                nombreNuevo: '',
                estado: null,
                idEstado: 0,
                idEstadoNuevo: 0,
                paises: null,
                estados: null,
                idPais:0,
                idPaisNuevo:0,
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
            nombreNuevo(){
                this.msgNameN="";
                this.classNameN="greenColor correct";
                if (this.nombreNuevo.trim().length<3) {
                    this.msgNameN="El pais debe contener más de 3 letras";
                    this.classNameN="redColor incorrect";
                }
                this.nombreNuevo= this.nombreNuevo.length===1 ? this.nombreNuevo.toUpperCase() : this.nombreNuevo;
            }
        },
        computed: {
            rows() {
                return this.items.length;
            },
            habilitaBoton: function() {
                var dato = true && this.nombreNuevo && this.nombreNuevo.length>3
                return !dato;
            }
        },
        methods: {
            openGen(){
                this.$modal.hide('modal-general');
            },
            openEdit(id, nombre, idEstado){
                this.idActual=id;
                this.nombreActual=nombre;
                this.idEstadoNuevo=idEstado;
                axios.get('api/estado/'+idEstado+'.json', {
                }).then(response => {
                    console.log("enviado");
                    console.log(response);
                    this.estado=response.data;
                    this.idPaisNuevo = this.estado.idPais;
                    axios.get('api/estados/pais/'+this.idPaisNuevo +'.json', {
                    }).then(response => {
                        console.log("enviado");
                        console.log(response);
                        this.estados=response.data;
                    }).catch(error => {
                        console.log(error.response.status);
                        console.log(error.response.data);
                        this.msgErr = error.response.data['exceptionLongDescription'];
                    });
                }).catch(error => {
                    console.log(error.response.status);
                    console.log(error.response.data);
                    this.msgErr = error.response.data['exceptionLongDescription'];
                });
                axios.get('api/paises.json', {
                }).then(response => {
                    console.log("enviado");
                    console.log(response);
                    this.paises=response.data;
                }).catch(error => {
                    console.log(error.response.status);
                    console.log(error.response.data);
                    this.msgErr = error.response.data['exceptionLongDescription'];
                });
                this.$modal.show('editarMunicipio');
            },
            openDelete(id){
                this.idActual=id;
                this.$modal.show('eliminarMunicipio');
            },
            closeModalDelete: function() {
                this.$modal.hide('eliminarMunicipio');
            },
            closeModalDelete2: function() {
                this.$modal.hide('mensaje-exito-delete');
            },
            closeModalEdit: function() {
                this.$modal.hide('editarMunicipio');
            },
            openAdd(){
                this.nombreNuevo = null;
                this.idEstado = 0;
                this.idPais = 0;
                axios.get('api/paises.json', {
                }).then(response => {
                    console.log("enviado");
                    console.log(response);
                    this.paises=response.data;
                }).catch(error => {
                    console.log(error.response.status);
                    console.log(error.response.data);
                    this.msgErr = error.response.data['exceptionLongDescription'];
                });
                this.nombreNuevo= '',
                this.$modal.show('agregarMunicipio');
            },
            closeModalAdd: function() {
                this.$modal.hide('mensaje-exito-add');
            },
            closeModalAdd2: function() {
                this.$modal.hide('agregarMunicipio');
            },
            closeModalExito: function() {
                this.$modal.hide('mensaje-exito');
                this.$modal.hide('editarMunicipio');
            },
            submition() {
                if (this.name) {
                    axios.get('api/municipios/list/'+this.name+'.json', {
                    }).then(response => {
                        console.log("enviado");
                        console.log(response);
                        this.municipios=response.data;
                        this.perPage= 15;
                        this.currentPage= 1;
                        this.items= this.municipios;
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
                    axios.get('api/municipios/list/descripcion.json', {
                    }).then(response => {
                        console.log("enviado");
                        console.log(response);
                        this.municipios=response.data;
                        this.perPage= 15;
                        this.currentPage= 1;
                        this.items= this.municipios;
                    }).catch(error => {
                        console.log(error.response.status);
                        console.log(error.response.data);
                        this.msgErr = error.response.data['exceptionLongDescription'];
                        this.msnErrorIrreconocible = this.msgErr;
                        this.$modal.show('modal-general');
                    });
                }
            },
            modificarMunicipio() {
                axios.put('api/municipio.json', {
                    id:this.idActual,
                    idEstado: this.idEstadoNuevo,
                    nombre : this.nombreActual
                }).then(response => {
                    console.log("enviado");
                    console.log(response);
                
                    this.$modal.hide('editarMunicipio');
                    
                    if (this.name) {
                        axios.get('api/municipios/list/'+this.name+'.json', {
                        }).then(response => {
                            console.log("enviado");
                            console.log(response);
                            this.municipios=response.data;
                            this.items= this.municipios;
                        }).catch(error => {
                            console.log(error.response.status);
                            console.log(error.response.data);
                            this.msgErr = error.response.data['exceptionLongDescription'];
                        })
                    }
                    else {
                        console.log(store.state);
                        axios.get('api/municipios.json', {
                        }).then(response => {
                            console.log("enviado");
                            console.log(response);
                            this.municipios=response.data;
                            this.items= this.municipios;
                        }).catch(error => {
                            console.log(error.response.status);
                            console.log(error.response.data);
                            this.msgErr = error.response.data['exceptionLongDescription'];
                        });
                        if (this.name) {
                            axios.get('api/municipios/list/'+this.name+'.json', {
                            }).then(response => {
                                console.log("enviado");
                                console.log(response);
                                this.municipios=response.data;
                                this.items= this.municipios;
                            }).catch(error => {
                                console.log(error.response.status);
                                console.log(error.response.data);
                                this.msgErr = error.response.data['exceptionLongDescription'];
                            })
                        }
                        else {
                            console.log(store.state);
                            axios.get('api/municipios/list/descripcion.json', {
                            }).then(response => {
                                console.log("enviado");
                                console.log(response);
                                this.municipios=response.data;
                                this.items= this.municipios;
                            }).catch(error => {
                                console.log(error.response.status);
                                console.log(error.response.data);
                                this.msgErr = error.response.data['exceptionLongDescription'];
                            });
                        }
                    }
                    this.$modal.show('mensaje-exito');
                }).catch(error => {
                    console.log(error.response.status);
                    console.log(error.response.data);
                    this.msgErr = error.response.data['exceptionLongDescription'];
                })
            },
            agregarMunicipio() {
                console.log(store.state);
                axios.post('api/municipio.json', {
                    nombre : this.nombreNuevo,
                    idEstado : this.idEstado
                }).then(response => {
                    console.log("enviado");
                    console.log(response);
                    axios.get('api/municipios/list/'+this.name+'.json', {
                    }).then(response => {
                        console.log("enviado-list");
                        console.log(response);
                        this.municipios=response.data;
                        this.items= this.municipios;
                    }).catch(error => {
                        console.log(error.response.status);
                        console.log(error.response.data);
                        this.msgErr = error.response.data['exceptionLongDescription'];
                    })
                    this.$modal.hide('agregarMunicipio');
                    this.$modal.show('mensaje-exito-add');
                }).catch(error => {
                    console.log(error.response.status);
                    console.log(error.response.data);
                    this.msgErr = error.response.data['exceptionLongDescription'];
                })
            },
            eliminarMunicipio() {
                axios.delete('api/municipio.json', {
                    data : {
                        id : this.idActual
                    }
                }).then(response => {
                    console.log("enviado");
                    console.log(response);
                    this.municipios=response.data;
                    this.items= this.items.filter(items=>items.id!=this.idActual)
                    this.$modal.hide('eliminarMunicipio');
                    this.$modal.show('mensaje-exito-delete');
                    if (this.name) {
                        axios.get('api/municipios/list/'+this.name+'.json', {
                        }).then(response => {
                            console.log("enviado");
                            console.log(response);
                            this.municipios=response.data;
                            this.items= this.items.filter(items=>items.id!=this.idActual)
                        }).catch(error => {
                            console.log(error.response.status);
                            console.log(error.response.data);
                            this.msgErr = error.response.data['exceptionLongDescription'];
                        })
                    }
                    else {
                        console.log(store.state);
                        axios.get('api/municipios.json', {
                        }).then(response => {
                            console.log("enviado");
                            console.log(response);
                            this.municipios=response.data;
                            this.items= this.items.filter(items=>items.id!=this.idActual)
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
            },
            findEstadoByPais(pais){
                axios.get('api/estados/pais/'+pais+'.json', {
                }).then(response => {
                    console.log("enviado");
                    console.log(response);
                    this.estados=response.data;
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