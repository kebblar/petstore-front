<template>
  <div class="w-100 my-5" style="height: 100%;">
    <div class="contenedor my-3">
      <div class="row px-3">
        <p>Ingresa los valores:</p>
      </div>
      <textarea :disabled="!enEdicion" rows="5" class="form-control input-elem" @input="hayEntrada"></textarea>
      <div class="container mt-3">
        <div class="text-right">
            <button type="button" class="btn btn-outline-dark " @click="showFields">{{!enEdicion ? 'Editar' : 'OK'}}</button>
        </div>
      </div>

    </div>

    <div v-if="pushed" class="contenedor">
      <div class="form-group row">
          <label for="op1" class="col-sm-4 col-form-label">Opcion 1</label>
        <div class="col-sm-8">
          <select id="input1" class="form-control" v-model="opcionActual" @change="cambiaAtributos(opcionActual)">
            <option v-for="elem in difference" :value="elem.id" :key="elem.id">{{elem.name}}</option>
          </select>
        </div>
      </div>

      <div class="form-group row">
          <label for="op2" class="col-sm-4 col-form-label">Opcion 2</label>
        <div class="col-sm-8">
          <select id="input2" :disabled="opcionActual===-1" class="form-control" v-model="atributoActual">
            <option v-for="elem in atributosActuales" :value="elem.ordinal" :key="elem.ordinal">{{elem.value}}</option>
          </select>
        </div>
      </div>
      <div class="container my-3">
        <button type="button" :disabled="camposCorrectos" class="btn btn-dark float-right" @click="agregaLista()">Done!</button>
      </div>

      <div v-if="selected.length!==0 && !resultado" class="respuestas">
          <div class="row align-items-center text-center mt-3" v-for="a in agregados" :key="a.id">
            <div class="col">{{a.name}}</div>
            <div class="col">{{a.option}}</div>
            <div class="col text-right"><button type="button" class="btn btn-danger btn-sm red-cross" @click="quita(a)">x</button></div>
          </div>
        <div class="container text-center">
          <button type="button" class="btn btn-outline-light my-3" @click="enviaSeleccion">Listo</button>
        </div>
      </div>
      <div v-if="resultado" class="text-center py-2 px-5">
        <p>Json Generado = {{selected}}</p>
      </div>
    </div>
  </div>

</template>
<script>
export default {
  name: 'selector',
  created() {
    this.data.unshift({id : -1, name : 'selecciona'});
  },
  data(){
    return{
      selected : [{id:1, selected:3}],
      //[{id:0, selected:0},{id:1, selected:3}]
      data : [
          {id : 0,
           name : 'estatus',
           options : [{ordinal : 0, value : 'nuevo'},
                      {ordinal : 1, value : 'usado'}]},
          {id : 1,
           name : 'color',
           options : [{ordinal : 0, value: 'rojo'},
                      {ordinal : 1, value: 'verde'},
                      {ordinal : 2, value: 'amarillo'},
                      {ordinal : 3, value: 'azul'},
                      {ordinal : 4, value: 'negro'},
                      {ordinal : 5, value: 'rosa'}],
          },
          {id : 2,
          name : 'nacionalidad',
          options : [{ordinal : 0, value: 'colombiana'},
                     {ordinal : 1, value: 'mexicana'},
                     {ordinal : 2, value: 'canadiense'},
                     {ordinal : 3, value: 'inglesa'},
                     {ordinal : 4, value: 'pakistani'},
                     {ordinal : 5, value: 'australiana'}],
          },
          {id : 3,
          name : 'edad',
          options : [{ordinal : 0, value: 'de 12 a 17'},
                     {ordinal : 1, value: 'de 18 a 29'},
                     {ordinal : 2, value: 'de 30 a 39'},
                     {ordinal : 3, value: 'de 40 a 49'},
                     {ordinal : 4, value: 'de 50 a 59'},
                     {ordinal : 5, value: '60+'}],
          }
      ],
      opcionActual: -1,
      atributosActuales: [],
      atributoActual: -1,

      pushed: false,
      enEdicion:true,
      resultado:false
    }
  },
  computed: {
    difference(){
      return this.data.filter(e => this.selected.find(s => e.id === s.id) === undefined);
    },
    camposCorrectos(){
      return this.opcionActual === -1 || this.atributoActual === -1;
    },
    agregados(){
      const sel = this.data.filter(obj => this.selected.find(s => obj.id === s.id) !== undefined);
      let temp = [];
      for(let i=0;i<this.selected.length; i++){
        let elem = sel.find(x => this.selected[i].id === x.id);
        let val = elem.options.find(x => x.ordinal === this.selected[i].selected);
        temp[i]={name: elem.name, option: val.value};
        }
      return temp;
    }
  },
  methods: {
    enviaSeleccion(){
      this.resultado=true;
    },
    quita(elem){
      let obj = this.selected.indexOf(this.selected.find(e => elem.id === e.id));
      this.selected.splice(obj,1);
    },
    showFields(){
      this.enEdicion = !this.enEdicion;
      this.pushed = !this.pushed;
    },
    hayEntrada(event){
      this.selected = event.target.value
    },
    cambiaAtributos(idA){
      let obj = this.data.find(item => item.id === idA);
      this.atributosActuales = obj.options;
    },
    agregaLista() {
      this.selected.unshift({id:this.opcionActual, selected:this.atributoActual});
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
  z-index: 2;
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

