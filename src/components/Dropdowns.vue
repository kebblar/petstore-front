<template>
  <div class="w-100 my-5" style="height: 100%;">

    <div class="contenedor">
      <div class="form-group row">
        <h4>Interfaz de selección de criterios</h4>
        <hr/>
      </div>
      <div class="form-group row">
          <label for="op1" class="col-sm-4 col-form-label">Categoría</label>
        <div class="col-sm-8">
          <select id="input1" :disabled="resultado" class="form-control" v-model="opcionActual" @change="cambiaAtributos(opcionActual)">
            <option v-for="elem in difference" :value="elem.id" :key="elem.id">{{elem.name}}</option>
          </select>
        </div>
      </div>

      <div class="form-group row">
          <label for="op2" class="col-sm-4 col-form-label">Valor</label>
        <div class="col-sm-8">
          <select id="input2" :disabled="opcionActual===-1" class="form-control" v-model="atributoActual">
            <option v-for="elem in atributosActuales" :value="elem.ordinal" :key="elem.ordinal">{{elem.value}}</option>
          </select>
        </div>
      </div>
      <div class="container my-3">
        <button type="button" :disabled="camposCorrectos" class="btn btn-dark float-right" @click="agregaLista()">Agregar criterio</button>
      </div>
      <hr/>
      <div v-if="consulta.length!==0 && !resultado" class="respuestas">
          <div class="row align-items-center text-center mt-3" v-for="a in agregados" :key="a.id">
            <div class="col">{{a.name}}</div>
            <div class="col">{{a.option}}</div>
            <div class="col text-right"><button type="button" class="btn btn-danger btn-sm red-cross" @click="quita(a.id)">Eliminar criterio</button></div>
          </div>
        <div class="container text-center">
          <button type="button" class="btn btn-outline-light my-3" @click="enviaSeleccion">Salvar criterios</button>
        </div>
      </div>
      <div v-if="resultado" class="text-center py-2 px-5">
        <p>Criterios guardados exitosamente !!!</p>
      </div>
    </div>

  </div>

</template>
<script>
import axios from 'axios';
import store from '../store';
import d from './datos.json';

export default {
  name: 'selector',

  mounted() {
    store.commit('setToggleHeader', false);
    store.commit('setToggleFooter', false);

    axios.get('/api/consulta.json', {
    },
    {
      headers: {
        'jwt': store.state.session.jwt
      }
    }).then(response => {
      this.consulta = response.data;
    }).catch(error => {
      console.log(error);
    });
    this.data.unshift({id : -1, name : 'selecciona'});
  },
  data(){
    return{
      consulta : [],
      data : d,

      opcionActual: -1,
      atributosActuales: [],
      atributoActual: -1,
      resultado:false,
      answer: []
    }
  },
  computed: {
    difference(){
      return this.data.filter(e => this.consulta.find(s => e.id === s.id) === undefined);
    },
    camposCorrectos(){
      return this.opcionActual === -1 || this.atributoActual === -1;
    },
    agregados(){
      let temp = [];
      const sel = this.data.filter(obj => this.consulta.find(s => obj.id === s.id) !== undefined);
      for(let i=0; i<this.consulta.length; i++) {
        let elem =          sel.find(x => this.consulta[i].id === x.id);
        let val  = elem.options.find(x => x.ordinal === this.consulta[i].selected);
        temp[i]={id: elem.id, name: elem.name, option: val.value};
      }
      return temp;
    }
  },
  methods: {
    enviaSeleccion(){
      console.log('se envia al back:',this.consulta);
      axios.post('api/guarda.json', this.consulta,
          {
            headers: {
              'jwt': store.state.session.jwt
            }
          }
      ).then(response => {
        this.answer=response.data;
      }).catch(error => {
        this.answer=error.response.data;
      });
      this.resultado=true;
    },
    quita(aid){
      let obj = this.consulta.indexOf(this.consulta.find(e => aid === e.id));
      this.consulta.splice(obj,1);
    },
    cambiaAtributos(idA){
      let obj = this.data.find(item => item.id === idA);
      this.atributosActuales = obj.options;
    },
    agregaLista() {
      this.consulta.unshift({id:this.opcionActual, selected:this.atributoActual});
      this.atributosActuales = [];
      this.opcionActual=-1;
      this.atributoActual=-1;
    }
  }
}


</script>
<style scoped>

.contenedor {
  display: grid;
  background-color: rgba(14, 197, 164, 0.5);
  border: solid #42b0a0 3px;
  border-radius: 10px;
  height: auto;
  align-items: center;
  width: 60%;
  position: relative;
  right: -20%;
  top: 5%;
  padding: 18px;
  font-family: Courier;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  min-width: 300px;
}
.respuestas {
  display: block;
  background-color: #2c3e50;
  width: 100%;
  height: auto;
  color: white;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  border-radius: 3px;
  padding: 8px 16px;
}

.red-cross{
  height: 20px;
  padding-top: 0;
}
.input-elem{
  height: 70px;
  overflow: scroll;
}

</style>

