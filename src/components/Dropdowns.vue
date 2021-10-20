<template>
  <div class="w-100" style="height: 500px;">
    <div class="contenedor">
      <div class="form-group row">
          <label for="op1" class="col-sm-4 col-form-label">Opcion 1</label>
        <div class="col-sm-8">
          <select id="inputPais" class="form-control" v-model="opcionActual" @change="cambiaAtributos(opcionActual)">
            <option v-for="elem in entrada.filter(elem => !elem.selected)" :value="elem.id" :key="elem.id">{{elem.name}}</option>
          </select>
        </div>
      </div>
      <div class="form-group row">
          <label for="op2" class="col-sm-4 col-form-label">Opcion 2</label>
        <div class="col-sm-8">
          <select id="inputPais" class="form-control" v-model="atributoActual">
            <option v-for="elem in atributosActuales" :value="elem.id_op" :key="elem.id_op">{{elem.name}}</option>
          </select>
        </div>
      </div>
      <div class="container mb-3">
        <button type="button" :disabled="camposCorrectos" class="btn btn-dark float-right" @click="agregaLista()">Done!</button>
      </div>
      <div v-if="agregados.length!==0" class="respuestas">
          <div class="row align-items-center text-center mt-2" v-for="elem in agregados" :key="elem.idx">
            <div class="col">{{elem.name}}</div>
            <div class="col">{{elem.optionSelected}}</div>
            <div class="col text-right"><button type="button" class="btn btn-danger btn-sm red-cross" @click="quita(elem.idx)">x</button></div>
          </div>
      </div>
    </div>
  </div>

</template>
<script>
export default {
  name: 'selector',
  data(){
    return{

      entrada : [
          {id : 1,
           name : 'color',
           selected : false,
           options : [{id_op : 1, name: 'rojo'},
                      {id_op : 2, name: 'verde'},
                      {id_op : 3, name: 'azul'},
                      {id_op : 4, name: 'negro'},
                      {id_op: 5, name: 'rosa'}],
            optionSelected : 0,
          },
          {id : 2,
            name : 'nacionalidad',
            selected : false,
            options : [{id_op : 1, name: 'mexicana'},
                       {id_op : 2, name: 'canadiense'},
                       {id_op : 3, name: 'inglesa'},
                       {id_op : 4, name: 'pakistani'},
                       {id_op: 5, name: 'australiana'}],
            optionSelected : 0
          },
          {id : 3,
            name : 'edad',
            selected : false,
            options : [{id_op : 1, name: 'de 18 a 29'},
              {id_op : 2, name: 'de 30 a 39'},
              {id_op : 3, name: 'de 40 a 49'},
              {id_op : 4, name: 'de 50 a 59'},
              {id_op: 5, name: '60+'}],
            optionSelected : 0
          }
      ],
      opcionActual: 0,
      atributosActuales: [],
      atributoActual:0,
      agregados: []
    }
  },
  created() {
    this.entrada.unshift({id : 0, name : 'Selecciona'});
    this.reinicia();
  },
  computed: {
    camposCorrectos(){
      return this.opcionActual === 0 || this.atributoActual === 0;
    }
  },
  methods: {
    quita(idA){
      let obj = this.entrada.find(item => item.id === idA);
      obj.selected = false;
      obj.optionSelected = 0;
      this.agregados.splice(this.agregados.indexOf(obj),1);
    },
    reinicia() {
      this.opcionActual = 0;
      this.atributosActuales = [{id_op : 0, name : 'Selecciona'}];
      this.atributoActual = 0;
    },
    cambiaAtributos(idA){
      if(idA===0){
        this.reinicia();
        return; }
      let obj = this.entrada.find(item => item.id === idA);
      this.atributosActuales = obj.options;
      this.atributosActuales.unshift({id_op : 0, name : 'Selecciona'});
    },
    agregaLista() {
      let obj = this.entrada.find(item => item.id === this.opcionActual);
      obj.selected=true;
      obj.optionSelected=this.atributoActual;
      this.reinicia();
      this.agregados.unshift({idx : obj.id, name : obj.name, optionSelected : obj.options.find(item => item.id_op === obj.optionSelected).name});
      console.log(this.agregados);
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
  top: 10%;
  padding: 18px;
  font-family: Courier;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
}
.respuestas {
  display: block;
  background-color: #2c3e50;
  width: 100%;
  height: auto;
  color: white;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  border-radius: 3px;
  padding: 5px 16px;
}

.red-cross{
  height: 20px;
  padding-top: 0;
}

</style>

