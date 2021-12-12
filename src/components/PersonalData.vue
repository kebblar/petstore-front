<template>
  <div class="ancho centra">
    <label class="p-1">Cuéntanos como eres...</label>
  
    <div v-for="(e, index) in datos" :key="index">
      <b-card no-body class="mb-1">
        <b-card-header header-tag="header" class="p-1" role="tab">
          <b-button :class="cambia(sel[index])" block v-b-toggle="e.cabecera.idacc">{{ e.cabecera.desc }}::: {{ info(e.ordinal, sel[index]) }} </b-button>          
        </b-card-header>
        <b-collapse :id="e.cabecera.idacc" accordion="my-accordion" role="tabpanel">
          <b-card-body>
            <b-form-group :label="e.cabecera.longdesc" v-slot="{ ariaDescribedby }">
            <b-form-radio-group
              :id="e.cabecera.id"
              v-model="sel[index]"
              :options="e.contenido"
              value-field="valor"
              text-field="leyenda"
              :aria-describedby="ariaDescribedby"
              :name="e.cabecera.name" 
              :ref="e.cabecera.name"
              stacked
            ></b-form-radio-group>
            <br/>
          </b-form-group>
          </b-card-body>
        </b-collapse>
      </b-card>
    </div>

    <br/>
    <button @click="pinta" class="btn btn-success">Salvar descripión</button>
    <br/><br/>
    <label>{{ result }}</label>
    <br/><br/>
    <label>{{ answer }}</label>
  </div>
</template>

<script>
  import axios from 'axios';
  import store from '../store';
  import json from './datos2.json'; 

  export default {
    data() {
      return {
        datos: json.data,
        sel: json.selection,
        result:'',
        answer:''
      }
    },
    mounted() {
      this.carga();
    },  
    methods: {
      pinta: function() {
        let temp = [];
        this.result =  "";
        for(var i=0; i<this.datos.length; i++) {
          if(this.sel[i]>0) {
            //this.result += "{"+ this.datos[i].ordinal + ', '+ this.sel[i]+"}     ";
            temp.push( {id: this.datos[i].ordinal, selected: this.sel[i], hash:0} );
          }
        }
        this.result = temp;

        axios.post('api/guarda', temp,
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

      },
      cambia: function(index) {
        return (index<1)?"warning":"done";
      },
      info: function(ordinal, sel_de_index) {
        return (sel_de_index<1)?"Sin seleccion":this.datos[ordinal].contenido[sel_de_index].leyenda; 
      },
      carga: function() {
        // el siguiente json debe provenir del backend, de la base de datos.
        // OJO: NO trae los "ord" cuyo val es "0":
        //const loads = [{'id':2, 'selected':3},{'id':0, 'selected':2}];
        var loads = [];
        axios.get('/api/consulta', {
        },
        {
          headers: {
            'jwt': store.state.session.jwt
          }
        }).then(response => {
          loads = response.data;
          this.answer =loads;

          // ahora, procedemos a gargar la selección:

          for(var i=0; i<loads.length; i++) {
            this.sel[loads[i].id] = loads[i].selected;
          }

        }).catch(error => {
          this.answer =error;
          console.log(error);
        });

        
        

      }
    } // methods
  }
</script>

<style scoped>
.done {
  border-color:rgb(96, 161, 99);
  border-width: 1px;
  box-shadow: 1px 1px 3px #d8dcdd;
  background: url(../assets/check.png) no-repeat scroll;
  background-position:right ;
  background-size: 17px;
  background-position-x: 96%;
  background-color: #999;
}
.warning {
  border-color:rgb(96, 161, 99);
  border-width: 1px;
  box-shadow: 1px 1px 3px #d8dcdd;
  background: url(../assets/warning.png) no-repeat scroll;
  background-position:right ;
  background-size: 17px;
  background-position-x: 96%;
  background-color: #999;
}
</style>