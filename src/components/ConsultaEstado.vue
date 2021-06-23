<template>
<div class="ancho centra" style="max-width:1200px">
    <div class="card defaultColor">
        <div class="card-header">
            <label class="control-label h4">Consulta de Estado</label>
        </div>
        <div class="card-body align" style="margin:20px;">

            <div class="row">
                <div class="form-inline">
                    <label for="nombre" class="col-form-label mr-2"> Nombre del estado:</label>
                    <input type="text" required class="form-control mr-3"  placeholder="Ciudad de México" v-model="name">
                    <!--small class="notValid">{{msgName}}</small-->

                    <button type="button" @click="submition" class="btn btn-primary mr-2">
                        <i class="fa fa-search fa-fw" aria-hidden="true"></i>Consultar</button>
                    <button type="button" @click="openAdd" class="btn btn-success mr-2">
                        <i class="fa fa-plus" aria-hidden="true"></i></button>
                </div>
            </div> <!-- end row -->
            <br>
            <div class="row">
                <label for="pais" class="mr-2 mt-1">País:</label>
                <select id="pais" class="custom-select col-4"  v-model="filtroPaisValue" @change="filtrarPais()">
                    <option value="0">Todos</option>
                    <option v-for="pais in paises" v-bind:key="pais.id" v-bind:value="pais.id">
                        {{ pais.nombre }}
                    </option>
                </select>
            </div>

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
                            <b-button variant="success" @click="openEdit(row.item.id, row.item.nombre, row.item.idPais)" class="mr-4">
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
            name="editarEstado"
            :clickToClose="false"
            :reset="true"
            :width="600"
            :height="330">
            <div class="card">
                <div class="card-header">Editar estado</div>
                <div class="card-body">
                    <!--label class="mr-2" style="width:220px">Id: {{idActual}}</label-->
                    <div class="form-group">
                        <label for="estado">Nombre del estado:</label>
                        <input id="estado" type="text" required class="form-control" :class="className" placeholder="México" v-model="nombreActual">
                        <small class="notValid">{{msgName}}</small>
                    </div>

                    <div class="form-group mt-3">
                        <label for="pais">País:</label>
                        <select id="pais" v-model="idPaisNuevo" class="custom-select" :class="className">
                            <option v-for="pais in paises" v-bind:key="pais.id" v-bind:value="pais.id">
                                {{ pais.nombre }}
                            </option>
                        </select>
                    </div>

                    <div class="form-group my-4" style="text-align: right;">
                        <b-button variant="primary" :disabled="habilitaBotonActual" class="mr-4" @click="modificarEstado">Aceptar</b-button>
                        <b-button variant="danger" class="mr-4" @click="closeModalEdit">Cancelar</b-button>
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
                    <h5 class="card-title">El estado se actualizo correctamente</h5>
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
            name="agregarEstado"
            :clickToClose="false"
            :reset="true"
            :width="600"
            :height="330">
            <div class="card">
                <div class="card-header">Agregar estado</div>
                <div class="card-body">
                    <div class="form-group">
                        <label for="estado">Nombre del estado:</label>
                        <input id="estado" type="text" required class="form-control" :class="classNameN" placeholder="Ciudad de México" v-model="nombreNuevo">
                        <small class="notValid">{{msgNameN}}</small>
                    </div>

                    <div class="form-group mt-3">
                        <label for="pais">Pais:</label>
                        <select id="pais" v-model="idPais" class="custom-select" :class="className">
                            <option v-for="pais in paises" v-bind:key="pais.id" v-bind:value="pais.id">
                                {{ pais.nombre }}
                            </option>
                        </select>
                    </div>

                    <div class="form-group my-4" style="text-align: right;">
                        <b-button
                            :disabled="habilitaBoton"
                            variant="primary"
                            class="mr-4"
                            @click="agregarEstado">Aceptar</b-button>
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
                    <h5 class="card-title">El estado se agrego correctamente</h5>
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
            name="eliminarEstado"
            :clickToClose="false"
            :reset="true"
            :width="480"
            :height="200">
            <div class="card">
                <div class="card-header">Eliminar estado</div>
                <div class="card-body">
                      <p class="card-text">¿Está seguro que desea eliminar el estado?</p>
                    <div class="my-4" style="text-align: right;">
                        <b-button variant="warning" class="mr-4" @click="eliminarEstado">Si, eliminar</b-button>
                        <b-button variant="danger" class="mr-4" @click="closeModalDelete">Cerrar</b-button>
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
                    <h5 class="card-title">El estado se elimino correctamente</h5>
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
                        <h4>Favor de mostrar este Código de error con el administrador del sistema.:</h4>
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
                        key: 'nombrePais',
                        label: 'Pais'
                    },
                    {
                        key: 'idPais',
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
                estados: null,
                nombreNuevo: '',
                paises: null,
                idPais: 0,
                idPaisNuevo: 0,
                filtroPaisValue: 0,

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
                    this.msgNameN="El estado debe contener más de 3 letras";
                    this.classNameN="redColor incorrect";
                }
                this.nombreNuevo= this.nombreNuevo.length===1 ? this.nombreNuevo.toUpperCase() : this.nombreNuevo;
            },  nombreActual(){
                this.msgName="";
                this.className="greenColor correct";
                if (this.nombreActual.trim().length<3) {
                    this.msgName="El estado debe contener más de 3 letras";
                    this.className="redColor incorrect";
                }
                this.nombreActual= this.nombreActual.length===1 ? this.nombreActual.toUpperCase() : this.nombreActual;
            }
        },
        computed: {
            rows() {
                return this.items.length;
            },
            habilitaBoton: function() {
                var dato = true && this.nombreNuevo && this.nombreNuevo.length>2
                &&  this.idPais != 0
                return !dato;
            },
            habilitaBotonActual: function() {
                var dato = true && this.nombreActual && this.nombreActual.length>2
                &&  this.idPaisNuevo != 0
                return !dato;
            }
        },  
        beforeMount(){
            this.onInitPaises();
        },
        methods: {
            openGen(){
                this.$modal.hide('modal-general');
            },
            onInitPaises(){
                axios.get('api/paises.json', {
                }).then(response => {
                    this.paises=response.data;
                })
            },      
            filtrarPais(){
              this.submition();

            },
            openEdit(id, nombre, idPais){
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
                this.idActual=id;
                this.nombreActual=nombre;
                this.idPaisNuevo = idPais;
                this.$modal.show('editarEstado');
            },
            openDelete(id){
                this.idActual=id;
                this.$modal.show('eliminarEstado');
            },
            closeModalDelete: function() {
                this.$modal.hide('eliminarEstado');
            },
            closeModalDelete2: function() {
                this.$modal.hide('mensaje-exito-delete');
            },
            closeModalEdit: function() {
                this.$modal.hide('editarEstado');
            },
            openAdd(){
                this.nombreNuevo ="";
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
                this.$modal.show('agregarEstado');
            },
            closeModalAdd: function() {
                this.$modal.hide('mensaje-exito-add');
            },
            closeModalAdd2: function() {
                this.$modal.hide('agregarEstado');
            },
            closeModalExito: function() {
                this.$modal.hide('mensaje-exito');
                this.$modal.hide('editarEstado');
            },
            submition() {
                if ((this.name && this.filtroPaisValue > 0)||this.name) {
                    axios.get('api/estados/list/'+this.name+'/'+this.filtroPaisValue+'.json', {
                    }).then(response => {
                        console.log("enviado");
                        console.log(response);
                        this.estados=response.data;
                        this.perPage= 15;
                        this.currentPage= 1;
                        this.items= this.estados;
                    }).catch(error => {
                        console.log(error.response.status);
                        console.log(error.response.data);
                        this.msgErr = error.response.data['exceptionLongDescription'];
                        this.msnErrorIrreconocible = this.msgErr;
                        this.$modal.show('modal-general');
                    })
                }  else if( this.filtroPaisValue > 0) {
                     axios.get('api/estados/pais/'+this.filtroPaisValue+'.json', {
                    }).then(response => {
                        this.estados=response.data;
                        this.perPage= 15;
                        this.currentPage= 1;
                        this.items= this.estados;
                    })
                }
                else {
                    console.log(store.state)
                    axios.get('api/estados-nombre-pais.json', {
                    }).then(response => {
                        console.log("enviado");
                        console.log(response);
                        this.estados=response.data;
                        this.perPage= 15;
                        this.currentPage= 1;
                        this.items= this.estados;
                    }).catch(error => {
                        console.log(error.response.status);
                        console.log(error.response.data);
                        this.msgErr = error.response.data['exceptionLongDescription'];
                        this.msnErrorIrreconocible = this.msgErr;
                        this.$modal.show('modal-general');
                    });
                }
            },
            modificarEstado() {
                axios.put('api/estado.json', {
                    id:this.idActual,
                    idPais: this.idPaisNuevo,
                    nombre : this.nombreActual
                }).then(response => {
                    console.log("enviado");
                    console.log(response);
                    this.submition();
                   this.$modal.show('mensaje-exito');
                }).catch(error => {
                    console.log(error.response.status);
                    console.log(error.response.data);
                    this.msgErr = error.response.data['exceptionLongDescription'];
                })
            },
            agregarEstado() {
                console.log(store.state);
                axios.post('api/estado.json', {
                    nombre : this.nombreNuevo,
                    idPais : this.idPais
                }).then(response => {
                    console.log("enviado");
                    console.log(response);
                    this.$modal.hide('agregarEstado');
                    this.$modal.show('mensaje-exito-add');

                     this.submition();
                }).catch(error => {
                    console.log(error.response.status);
                    console.log(error.response.data);
                    this.msgErr = error.response.data['exceptionLongDescription'];
                })
            },
            eliminarEstado() {
                axios.delete('api/estado.json', {
                    data: {
                        id:this.idActual
                    }
                }).then(response => {
                    console.log("enviado");
                    console.log(response);
                    this.estados=response.data;
                    this.items= this.items.filter(items=>items.id!=this.idActual)
                    this.$modal.hide('eliminarEstado');
                    this.$modal.show('mensaje-exito-delete');
                    this.submition();
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