<template>
<div class="ancho centra" style="max-width:1200px">
    <div class="card defaultColor">
        <div class="card-header">
            <label class="control-label h4">Consulta de Atributos</label>
        </div>
        <div class="card-body align" style="margin:20px;">

            <div class="row">
                <div class="form-inline">
                    <label for="nombre" class="col-form-label mr-2">Nombre del atributo:</label>
                    <input type="text" required class="form-control mr-3" :class="className" placeholder="PESO" v-model="name">
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
                            <th scope="col">Estatus</th>
                            <th scope="col">Acciones</th>
                            <th scope="col">Rango</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="atributo in atributos" :key="atributo.id">
                            <td>{{atributo.id}}</td>
                            <td>{{atributo.nombre}}</td>
                            <td class="center"><h4><span v-if="atributo.activo == 1" class="badge badge-info ml-2">Activo</span><span v-else class="badge badge-danger">Inactivo</span></h4></td>
                            <td>
                                <button type="button" @click="openEdit(atributo.id, atributo.nombre,atributo.activo)" class="btn btn-success mb-2 mr-4">
                                    <i class="fa fa-edit" aria-hidden="true"></i></button>
                                <button type="button" @click="openDelete(atributo.id)" class="btn btn-danger mb-2 mr-4">
                                    <i class="fa fa-trash" aria-hidden="true"></i></button>
                            </td>
                             <td>
                                <!-- Button trigger modal -->
                                <button type="button" @click="openModalRangos(atributo.id,atributo.nombre)"  class="btn btn-info mb-2 mr-4" data-toggle="modal" data-target="#exampleModalScrollable">
                                <i class="fa fa-eye" aria-hidden="true"></i>
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div><!--  end row -->
        </div>
    </div><!-- ends header-->

        <!-- Modal -->

        <modal
            name="editarAtributo"
            :clickToClose="false"
            :reset="true"
            :width="480"
            :height="245">
            <div class="card">
                <div class="card-header">Editar atributo</div>
                <div class="card-body">
                    <!--label class="mr-2" style="width:220px">Id: {{idActual}}</label-->
                    <div class="form-group">
                        <label for="atributo">Nombre del atributo:</label>
                        <input id="atributo" type="text" required class="form-control" :class="className" placeholder="PESO" v-model="nombreActual">
                        <small class="notValid">{{msgName}}</small>
                        <div class="custom-control custom-checkbox my-3">
                            <input type="checkbox"
                            v-model="estatusActual"  true-value="1"  false-value="0"
                             class="custom-control-input" id="customCheck1">
                            <label class="custom-control-label" for="customCheck1" >Activo</label>
                        </div>
                    </div>

                    <div class="form-group my-4" style="text-align: right;">
                        <b-button variant="primary" class="mr-2" @click="modificarAtributo">Aceptar</b-button>
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
                    <h5 class="card-title">El atributo se actualizo correctamente</h5>
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
            name="agregarAtributo"
            :clickToClose="false"
            :reset="true"
            :width="480"
            :height="245">
            <div class="card">
                <div class="card-header">Agregar atributo</div>
                <div class="card-body">
                    <div class="form-group">
                        <label for="atributo">Nombre del atributo:</label>
                        <input id="atributo" type="text" required class="form-control" :class="classNameN" placeholder="PESO" v-model="nombreNuevo">
                        <small class="notValid">{{msgNameN}}</small>
                    </div>

                    <div class="form-group my-4" style="text-align: right;">
                        <b-button
                            :disabled="habilitaBoton"
                            variant="primary"
                            class="mr-4"
                            @click="agregarAtributo">Aceptar</b-button>
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
                    <h5 class="card-title">El atributo se agrego correctamente</h5>
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
            name="eliminarAtributo"
            :clickToClose="false"
            :reset="true"
            :width="480"
            :height="200">
            <div class="card">
                <div class="card-header">Eliminar atributo</div>
                <div class="card-body">
                    <p class="card-text">¿Está seguro que desea eliminar el atributo?</p>
                    <div class="my-4" style="text-align: right;">
                        <b-button variant="warning" class="mr-2" @click="eliminarAtributo">Si, eliminar!</b-button>
                        <b-button variant="danger" class="mr-2" @click="closeModalDelete">Cerrar</b-button>
                    </div>
                </div>
            </div>
        </modal><!-- ends modal-->

        <modal
            name="eliminarRango"
            :clickToClose="false"
            :reset="true"
            :width="480"
            :height="200">
            <div class="card">
                <div class="card-header">Eliminar Rango</div>
                <div class="card-body">
                    <p class="card-text">¿Está seguro que desea eliminar el rango?</p>
                    <div class="my-4" style="text-align: right;">
                        <b-button variant="warning" class="mr-2" @click="eliminarAtributoRango" >Si, eliminar!</b-button>
                        <b-button variant="danger" class="mr-2" @click="closeModalDeleteRango" data-toggle="modal" data-target="#exampleModalScrollable">Cerrar</b-button>
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
                    <h5 class="card-title">El atributo se elimino correctamente</h5>
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
            name="mensaje-exito-delete-rango"
            :clickToClose="false"
            :reset="true"
            :width="480"
            :height="245">
            <div class="card">
                <div class="card-header">Borrado Exitoso</div>
                <div class="card-body">
                    <h5 class="card-title">El Rango se elimino correctamente</h5>
                    <p class="h1 mb-2" style="text-align:center;font-size:4em">
                        <b-icon icon="check-circle" variant="success"></b-icon>
                    </p>
                    <div style="text-align: right;">
                        <b-button variant="success" data-toggle="modal" data-target="#exampleModalScrollable" @click="closeModalDelete3">Aceptar</b-button>
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

        <modal
            name="closeErrorAnuncio"
            :clickToClose="false"
            :reset="true"
            :width="480"
            :height="260">
            <div class="card">
                <div class="card-header">Error</div>
                <div class="card-body">
                    <div class="form-group">
                        <h5>{{msnErrorAnuncion}}</h5>
                        <br>
                        <hr>
                    </div>

                    <div class="form-group my-4" style="text-align: right;">
                        <b-button variant="info" @click="closeErrorAnuncio">Aceptar</b-button>
                    </div>
                </div>
            </div>
        </modal><!-- ends modal-->

        <!-- -->
        <!-- Modal rango atributos -->
        <div class="modal fade" id="exampleModalScrollable" tabindex="-1" role="dialog" aria-labelledby="exampleModalScrollableTitle" aria-hidden="true">
        <div class="modal-dialog modal-dialog-scrollable" role="document">
            <div class="modal-content">
            <div class="modal-header">
                <h4>
                    <label style="font-weight:bold">Rango del atributo:</label>
                    <span class="badge badge-warning ml-3">{{this.titleModal}}</span>
                </h4>
            </div>
            <div class="modal-body">
            <div class="table-wrapper-scroll-y my-custom-scrollbar">

        <table class="table table-bordered table-striped mb-0">
            <thead>
            <tr>
                <th scope="col">ID</th>
                <th scope="col">Rango</th>
                <th scope="col">Estatus</th>
                <th scope="col">Acciones</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="rango in rangoAtributo" :key="rango.id">
                                    <td>{{rango.id}}</td>
                                    <td>{{rango.rango}}</td>
                                    <td class="center"><h4><span v-if="rango.activo == 1" class="badge badge-info ml-2">Activo</span><span v-else class="badge badge-danger">Inactivo</span></h4></td>
                                    <td width="200">
                                      <button type="button" @click="openEditRango(rango.id, rango.rango,rango.activo)" class="btn btn-success mb-2 mr-4" data-toggle="modal" data-dismiss="modal"  data-target="#exampleModalScrollable3">
                                            <i class="fa fa-edit" aria-hidden="true"></i>
                                      </button>
                                        <button type="button" @click="openDeleteRango(rango.id)" data-dismiss="modal" data-toggle="modal"  class="btn btn-danger mb-2 mr-4">
                                            <i class="fa fa-trash" aria-hidden="true"></i></button>
                                    </td>
                                </tr>
            </tbody>
        </table>

        </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
                <button type="button" @click="limpiarModalNuevoEdit" class="btn btn-success mx-2" data-dismiss="modal" data-toggle="modal" data-target="#exampleModalScrollable2">
                    <i class="fa fa-plus" aria-hidden="true"></i>
                </button>
            </div>
            </div>
        </div>
        </div>
      <!---->

    <modal
            name="agregarAtributoValor"
            :clickToClose="false"
            :reset="true"
            :width="480"
            :height="245">
            <div class="card">
                <div class="card-header">Agregar atributo</div>
                <div class="card-body">
                    <div class="form-group">
                        <label for="atributo">Rango:</label>
                        <input id="atributo" type="text" required class="form-control" :class="classNameN" placeholder="PESO" v-model="nombreNuevoRango">
                        <small class="notValid">{{msgNameN}}</small>
                        <div class="custom-control custom-checkbox my-3">
                            <input type="checkbox"
                            v-model="estatusRango"  true-value="1"  false-value="0"
                             class="custom-control-input" id="customCheck1">
                            <label class="custom-control-label" for="customCheck1" >Activo</label>
                        </div>
                    </div>

                    <div class="form-group my-4" style="text-align: right;">
                        <b-button
                            :disabled="habilitaBoton"
                            variant="primary"
                            class="mr-4"
                            @click="agregarAtributo">Aceptar</b-button>
                        <b-button variant="danger" @click="closeModalAdd2">Cancelar</b-button>
                    </div>
                </div>
            </div>
        </modal><!-- ends modal-->


                <!-- -->

<!-- Modal atributos add-->
<div class="modal fade" id="exampleModalScrollable2" tabindex="-1" role="dialog" aria-labelledby="exampleModalScrollableTitle2" aria-hidden="true">
  <div class="modal-dialog modal-dialog-scrollable" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalScrollableTitle2">
            <h4>
                <label style="font-weight:bold">Agregar rango al atributo:</label>
                <span class="badge badge-warning ml-3">{{this.titleModal}}</span>
            </h4>
        </h5>

      </div>
      <div class="modal-body">
     <div class="form-group">
              <label for="atributo">Rango:</label>
                 <input id="atributo" type="text" required class="form-control" :class="className" placeholder="10 a 20" v-model="nombreNuevoRango">
                <small class="notValid">{{msgName}}</small>
              </div>
      </div>
        <div class="modal-footer">
            <button type="button"  data-toggle="modal"  data-target="#exampleModalScrollable" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
            <button type="button"  data-toggle="modal"  data-target="#exampleModalScrollable"  @click="openAddRango" class="btn btn-success" data-dismiss="modal">Guardar</button>

        </div>
        </div>
    </div>
    </div>
     <!---->


<!-- Modal atributos Edit Rango-->
<div class="modal fade" id="exampleModalScrollable3" tabindex="-1" role="dialog" aria-labelledby="exampleModalScrollableTitle3" aria-hidden="true">
  <div class="modal-dialog modal-dialog-scrollable" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h4>
            <label style="font-weight:bold">Editar rango al atributo:</label>
            <span class="badge badge-warning ml-3">{{this.titleModal}}</span>
        </h4>
      </div>
      <div class="modal-body">
     <div class="form-group">
              <label for="atributo">Rango: {{idRangoActual}}</label>
                 <input id="atributo" type="text" required class="form-control" :class="className" placeholder="10 a 20" v-model="nombreNuevoRango">
                <small class="notValid">{{msgName}}</small>
                <div class="custom-control custom-checkbox my-3">
                 <input type="checkbox"
                    v-model="estatusRango"  true-value="1"  false-value="0"
                    class="custom-control-input" id="customCheck1">
                    <label class="custom-control-label" for="customCheck1" >Activo</label>
                </div>
              </div>
      </div>
        <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-toggle="modal"  data-target="#exampleModalScrollable"  data-dismiss="modal">Cerrar</button>
            <button type="button" @click="editRango" class="btn btn-success" data-dismiss="modal">Guardar</button>

        </div>
        </div>
    </div>
    </div>
     <!---->


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
                estatusRango:0,
                idRangoActual:0,
                estatusActual:0,
                titleModal:'',
                nombreActual: '',
                atributos: null,
                rangoAtributo:null,
                nombreNuevo: '',
                nombreNuevoRango:'',
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
                msnErrorAnuncion: '',
            }
        },
        watch: {
            nombreNuevo() {
                this.msgNameN="";
                this.classNameN="greenColor correct";
                if (this.nombreNuevo.trim().length<3) {
                    this.msgNameN="La atributo debe contener más de 3 letras";
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
            }, limpiarModalNuevoEdit () {
                this.nombreNuevoRango="";
                this.estatusRango=0;
            },
            openModalRangos(id, nombre){
                this.idActual=id;
                this.titleModal=nombre;
                this.nombreNuevoRango="";
                this.estatusRango=0;
                axios.get('api/valor-atributo/atributo/'+this.idActual+'.json', {
                    }).then(response => {
                        console.log("enviado");
                        console.log(response);
                        this.rangoAtributo=response.data;
                    }).catch(error => {
                        console.log(error.response.status);
                        console.log(error.response.data);
                        this.msgErr = error.response.data['exceptionLongDescription'];
                        this.msnErrorIrreconocible = this.msgErr;
                        this.$modal.show('modal-general');
                    });
            },
            openAddRango() {
               console.log(store.state);
                axios.post('api/valor-atributo.json', {
                    idAtributo:this.idActual,
                    rango : this.nombreNuevoRango,
                    activo:1
                }).then(response => {
                    console.log("enviado");
                    console.log(response);
                   axios.get('api/valor-atributo/atributo/'+this.idActual+'.json', {
                    }).then(response => {
                        console.log("enviado");
                        console.log(response);
                        this.rangoAtributo=response.data;
                    }).catch(error => {
                        console.log(error.response.status);
                        console.log(error.response.data);
                        this.msgErr = error.response.data['exceptionLongDescription'];
                        this.msnErrorIrreconocible = this.msgErr;
                        this.$modal.show('modal-general');
                    });

                }).catch(error => {
                    console.log(error.response.status);
                    console.log(error.response.data);
                    this.msgErr = error.response.data['exceptionLongDescription'];
                })
            },

            editRango() {
               console.log(store.state);
                axios.put('api/valor-atributo.json', {
                    idAtributo:this.idActual,
                    id:this.idRangoActual,
                    rango : this.nombreNuevoRango,
                    activo:this.estatusRango
                }).then(response => {
                    console.log("enviado");
                    console.log(response);
                   axios.get('api/valor-atributo/atributo/'+this.idActual+'.json', {
                    }).then(response => {
                        console.log("enviado");
                        console.log(response);
                        this.rangoAtributo=response.data;
                    }).catch(error => {
                        console.log(error.response.status);
                        console.log(error.response.data);
                        this.msgErr = error.response.data['exceptionLongDescription'];
                        this.msnErrorIrreconocible = this.msgErr;
                        this.$modal.show('modal-general');
                    });

                }).catch(error => {
                    console.log(error.response.status);
                    console.log(error.response.data);
                    this.msgErr = error.response.data['exceptionLongDescription'];
                })
            },
            eliminarAtributoRango() {
                axios.delete('api/valor-atributo.json', {
                    data:{id:this.idRangoActual}
                }).then(response => {
                    console.log("enviado");
                    console.log(response);
                    //this.atributos=response.data;
                    this.$modal.hide('eliminarRango');
                    this.$modal.show('mensaje-exito-delete-rango');
                    axios.get('api/valor-atributo/atributo/'+this.idActual+'.json', {
                    }).then(response => {
                        console.log("enviado");
                        console.log(response);
                        this.rangoAtributo=response.data;
                    }).catch(error => {
                        console.log(error.response.status);
                        console.log(error.response.data);
                        this.msgErr = error.response.data['exceptionLongDescription'];
                        this.msnErrorIrreconocible = this.msgErr;
                        this.$modal.show('modal-general');
                    });
                }).catch(error => {
                    console.log(error.response.status);
                    console.log(error.response.data);
                    this.msgErr = error.response.data['exceptionLongDescription'];
                });
            },
            openEditRango(id, nombre,estatus){
                this.idRangoActual=id;
                this.nombreNuevoRango=nombre;
                this.estatusRango=estatus;
            },
            openEdit(id, nombre,estatus){
                this.idActual=id;
                this.nombreActual=nombre;
                this.estatusActual=estatus;
                this.$modal.show('editarAtributo');
            },
            openDelete(id){
                this.idActual=id;
                this.$modal.show('eliminarAtributo');
            },
            openDeleteRango(id){
                this.idRangoActual=id;
                this.$modal.show('eliminarRango');
            },
            closeModalDelete: function() {
                this.$modal.hide('eliminarAtributo');
            },
            closeModalDeleteRango: function() {
                this.$modal.hide('eliminarRango');
            },
            closeModalDelete2: function() {
                this.$modal.hide('mensaje-exito-delete');
            },
            closeModalDelete3: function() {
                this.$modal.hide('mensaje-exito-delete-rango');
            },
            closeModalEdit: function() {
                this.$modal.hide('editarAtributo');
            },
            closeErrorAnuncio(){
                this.$modal.hide('closeErrorAnuncio');
            },
            openAdd(){
                this.nombreNuevo= '';
                this.$modal.show('agregarAtributo');
                //this.estatus=0;
            },
            closeModalAdd: function() {
                this.$modal.hide('mensaje-exito-add');
            },
            closeModalAdd2: function() {
                this.$modal.hide('agregarAtributo');
            },
            closeModalExito: function() {
                this.$modal.hide('mensaje-exito');
                this.$modal.hide('editarAtributo');
            },
            submition() {
                console.log("submition");
                if (this.name) {
                    axios.get('api/atributos/list/'+this.name+'.json', {
                    }).then(response => {
                        console.log("enviado");
                        console.log(response);
                        this.atributos=response.data;
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
                    axios.get('api/atributos.json', {
                    }).then(response => {
                        console.log("enviado-atributos");
                        console.log(response);
                        this.atributos=response.data;
                    }).catch(error => {
                        console.log(error.response.status);
                        console.log(error.response.data);
                        this.msgErr = error.response.data['exceptionLongDescription'];
                        this.msnErrorIrreconocible = this.msgErr;
                        this.$modal.show('modal-general');
                    });
                }
            },
            modificarAtributo() {
                axios.put('api/atributo.json', {
                    id:this.idActual,
                    nombre : this.nombreActual,
                    activo: this.estatusActual
                }).then(response => {
                    console.log("enviado");
                    console.log(response);
                    if (this.name) {
                        axios.get('api/atributos/list/'+this.name+'.json', {
                        }).then(response => {
                            console.log("enviado");
                            console.log(response);
                            this.atributos=response.data;
                        }).catch(error => {
                            console.log(error.response.status);
                            console.log(error.response.data);
                            this.msgErr = error.response.data['exceptionLongDescription'];
                        })
                    }
                    else {
                        console.log(store.state);
                        axios.get('api/atributos.json', {
                        }).then(response => {
                            console.log("enviado");
                            console.log(response);
                            this.atributos=response.data;
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
            agregarAtributo() {
                console.log(store.state);
                axios.post('api/atributo.json', {
                    nombre : this.nombreNuevo,
                    activo:1//this.estatus
                }).then(response => {
                    console.log("enviado");
                    console.log(response);
                    this.$modal.hide('agregarAtributo');
                    this.$modal.show('mensaje-exito-add');
                    if (this.name) {
                        axios.get('api/atributos/list/'+this.name+'.json', {
                        }).then(response => {
                            console.log("enviado");
                            console.log(response);
                            this.atributos=response.data;
                        }).catch(error => {
                            console.log(error.response.status);
                            console.log(error.response.data);
                            this.msgErr = error.response.data['exceptionLongDescription'];
                        })
                    }
                    else {
                        console.log(store.state);
                        axios.get('api/atributos.json', {
                        }).then(response => {
                            console.log("enviado");
                            console.log(response);
                            this.atributos=response.data;
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
            eliminarAtributo() {
                axios.delete('api/atributo.json', {
                    data:{id:this.idActual}
                }).then(response => {
                    console.log("enviado");
                    console.log(response);
                    this.atributos=response.data;
                    this.$modal.hide('eliminarAtributo');
                    this.$modal.show('mensaje-exito-delete');
                    if (this.name) {
                        axios.get('api/atributos/list/'+this.name+'.json', {
                        }).then(response => {
                            console.log("enviado");
                            console.log(response);
                            this.atributos=response.data;
                        }).catch(error => {
                            console.log(error.response.status);
                            console.log(error.response.data);
                            this.msgErr = error.response.data['exceptionLongDescription'];
                        })
                    }
                    else {
                        console.log(store.state);
                        axios.get('api/atributos.json', {
                        }).then(response => {
                            console.log("enviado");
                            console.log(response);
                            this.atributos=response.data;
                        }).catch(error => {
                            console.log(error.response.status);
                            console.log(error.response.data);
                            this.msgErr = error.response.data['exceptionLongDescription'];
                        });
                    }
                }).catch(error => {
                    this.msnErrorAnuncion = 'Error al intentar eliminar el atributo, ya que cuenta se encuentra en uso por al menos una Categoria';
                    this.$modal.show('closeErrorAnuncio');
                    this.$modal.hide('eliminarAtributo');
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