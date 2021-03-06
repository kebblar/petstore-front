<template>
    <div id="contenedor">
    <div class="container">
        <div class="card" style="width: 450px; margin:auto;">
            <div class="card-header">
                <div class="row">
                    <div class="col-sm-12">
                        <label style="font-size:26px;">Edición de mi Perfil</label>
                    </div>
                </div>
            </div>
            <div class="card-body">
                 <table>
                  <tr>
                    <td>Correo</td>
                    <td><input type="text" class="form-control" style="color: gray;" v-model="user.mail" maxlength="25" disabled="disabled"/></td>
                  </tr>

                  <tr>
                    <td>Nombre</td>
                    <td><input type="text" class="form-control" v-model="nombre" maxlength="25" required/></td>
                  </tr>
                  <tr>
                    <td>Calle y Numero</td>
                    <td><input type="text" class="form-control" v-model="direccion" maxlength="25" required/></td>
                  </tr>
                  <tr>
                    <td>Estado</td>
                    <td><select class="form-control" v-model="estadoSelec" @change="leerMunicipios" required>
                    <option :value="estado.id" v-for="(estado) in estados" :key="estado.id">{{estado.nombre}}</option>
                    </select></td>
                  </tr>
                  <tr>
                    <td>Municipio</td>
                    <td><select class="form-control" v-model="municipioSelec" required>
                    <option :value="municipio.id" v-for="(municipio) in municipios" :key="municipio.id">{{municipio.nombre}}</option>
                    </select></td>
                  </tr>
                  <tr>
                    <td>Telefono</td>
                    <td><input type="tel" class="form-control" v-model="telefono" maxlength="10" pattern="[0-9]{10}" required/></td>
                  </tr>
                  <tr>
                    <td>Nacimiento</td>
                    <td><input type="date" class="form-control" v-model="fecha" value="userDetalles.fechaNacimiento" min="1920-01-01" max="2003-12-31"/></td>
                  </tr>
                </table>
                <div class="col-sm-12" style="text-align: center;">
                    <hr/>
                </div>

                <table style="margin:auto;">
                  <tr>
                    <td><button @click="guardar" class="btn btn-success">Guardar cambios</button></td>
                    <td><button @click="reiniciar" class="btn btn-danger">Reiniciar</button></td>
                  </tr>
                </table>
            </div>
        </div>

  <b-modal id="mensaje-perfil" hide-footer>
    <template #modal-title >
     Advertencia del sistema
    </template>
    <div class="d-block text-center">
      <h4>{{encabezado}}</h4>
      {{msg}}
    </div>
    <b-button class="mt-2" block @click="closeModal">Cerrar</b-button>
  </b-modal>






    </div>
    </div>
</template>

<script>
import axios from 'axios';
import store from '../store'

export default {
  data() {
    return {
      userDetalles: store.state.estado.usuarioDetalles ,
      user: store.state.estado.usuario,
      msg:'',
      encabezado:'',
      style:'',

      estados: [],
      estadoSelec: store.state.estado.usuarioDetalles.idEstado,
      municipios: [],
      municipioSelec: store.state.estado.usuarioDetalles.idMunicipio,
     
      fecha: store.state.estado.usuarioDetalles.fechaNacimiento.slice(0,10),
      nombre: store.state.estado.usuarioDetalles.nombre,
      direccion: store.state.estado.usuarioDetalles.calleNumero,
      telefono: store.state.estado.usuarioDetalles.telefono
    }
     
  },
  mounted () {
    this.leerEstados();
    this.leerMunicipios();
  },
  methods: {
    
  guardar: function() {
   
   if (this.estadoSelec === 0 || this.municipioSelec === 0){
     this.msg = "Selecciona un estado y un municipio por favor";
     this.encabezado = "Problema con tu dirección";
   } else if(this.nombre ==="" || this.telefono === "" || this.direccion === ""){
    this.msg = "Los campos no pueden ser vacíos";
    this.encabezado = "Ha ocurrido un problema";
   } else if (this.nombre.length < 3){
    this.encabezado = "Problema en el campo Nombre";
    this.msg = "El nombre debe tener más de 3 caracteres";
   } else if (this.telefono.length<10 || isNaN(this.telefono)){
    this.encabezado = "Problema con el número telefónico";
    if(this.telefono.length<10){
      this.msg = "Asegúrate de introducir 10 dígitos";
      } else {
      this.msg = "El teléfono solo debe contener números";}
   }else {

      axios.post('/api/update-user-detail',
        {
            id: this.user.id,
            mail: this.user.mail,
            nombre: this.nombre,
            idEstado: this.estadoSelec,
            idMunicipio: this.municipioSelec,
            telefono: this.telefono,
            calleNumero: this.direccion,
            fechaNacimiento: this.fecha
        },
        {
          headers: {
            'Content-type': 'application/json',
            'crossDomain': true,
            'Acces-Control-Allow-Origin': '*',
            "X-CSRFToken": store.state.estado.jwt
        }
        }).then((response) => {
          console.log(response);
            if(response.status>199 && response.status<300) {
                store.commit('setDetalles', {
                  'id': this.user.id,
                  'mail': this.user.mail,
                  'nombre':this.nombre,
                  'idEstado': this.estadoSelec,
                  'idMunicipio': this.municipioSelec,
                  'telefono':this.telefono,
                  'calleNumero':this.direccion,
                  'fechaNacimiento':this.fecha
                  });
                  this.msg = "Los datos se han actualizado exitosamente";
                  this.encabezado = "Operación exitosa";
            } else {
                this.msg = response.data['desc-exception'];
            }
        }).catch(e => {
          console.log(e);
          this.msg = "La fecha de nacimiento no es válida, no puedes ser menor de edad";
          this.encabezado = "Ha ocurrido un error";
          this.$bvModal.show('mensaje-perfil');});
      }
      this.$bvModal.show('mensaje-perfil');
    },
    leerEstados(){
      axios.get('/api/estados.json',
          {}).then(response => {
            console.log(response);
            this.estados = response.data;
           }).catch(e => {
             console.log(e);
             })
    },
  reiniciar: function(){
    this.nombre=store.state.estado.usuarioDetalles.nombre;
    this.estadoSelec= store.state.estado.usuarioDetalles.idEstado;
    this.municipioSelec=store.state.estado.usuarioDetalles.idMunicipio;
    
    this.fecha=store.state.estado.usuarioDetalles.fechaNacimiento.slice(0,10);
    this.direccion= store.state.estado.usuarioDetalles.calleNumero;
    this.telefono= store.state.estado.usuarioDetalles.telefono;
    axios.get('api/municipios.json?idEstado='+this.estadoSelec)
    .then(response => {
            console.log(response);
            this.municipios  = response.data;
            this.idMunicipio=this.store.state.estado.usuarioDetalles.idMunicipio;
            
            }) 

  },

    leerMunicipios(){
      axios.get('/api/municipios.json?idEstado='+this.estadoSelec)
          .then(response => {
            this.municipios = response.data;
            this.municipioSelec = response.data[0]?.id ?? this.municipioSelec
           })
          .catch(e => console.log(e))
          .finally(()=>this.$forceUpdate())
    },
    closeModal: function() {
      this.$bvModal.hide('mensaje-perfil');
                }
  }
}
</script>
<style scoped>
.form-control{
  margin-bottom:10px;
  margin-left:10px;
  width: 260px;
}
</style>
