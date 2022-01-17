<template>
    <div class="ancho centra">
        <label class="p-1">Cuéntanos qué habilidades tienes...</label>

        <table class="anchoTable table table-striped table-hover table-sm table-dark">
            <thead>
                <tr>
                    <th></th>
                    <th>No ofrezco este servicio</th>
                    <th>Servicio incluido en el precio</th>
                    <th>Servicio con costo adicional</th>
                </tr>    
            </thead>
            <tbody>
                <tr v-for="(e, index) in datos" :key="index">
                    <td>{{ e.label }}</td>
                    <td><b-form-radio :id="'r'+e.id+'c0'" @change="asigna(e.id,0)" :name="'name' + e.id" /></td>
                    <td><b-form-radio :id="'r'+e.id+'c1'" @change="asigna(e.id,1)" :name="'name' + e.id" /></td>
                    <td><b-form-radio :id="'r'+e.id+'c2'" @change="asigna(e.id,2)" :name="'name' + e.id" /></td>
                </tr>
            </tbody>
        </table>
        <button @click="guarda" class="btn btn-success">Salvar</button>

    </div>
</template>

<script>
//import json from './datos.json'
import axios from 'axios';

export default {
    data() {
      return {
        datos: [],
        result: [],
      }
    },
    mounted() {
      this.obten();
    },
    methods: {
        guarda: function() {
            this.result[0] = -1;
            console.log(this.result);
        },
        asigna: function(index, value) {
            this.result[index] = value;
        },
        helper: function(x,y) {
            document.getElementById('r'+x+'c'+y).checked = true;
        },
        obten: function() {
            axios.get('/api/habilidad', {
            }).then(response => {
                this.datos = response.data;
                this.reemplaza();
            }).catch(error => {
                console.log(error);
            })
        },
        reemplaza: function() {
            axios.get('/api/habilidad/2', {
            }).then(response => {
                for(var j=1; j<=19; j++) {
                    this.result[j] = 0;
                    this.helper(j, 0);
                }
                var r = [];
                r = response.data;
                for(var i=0; i<r.length; i++) {
                    let pivote = r[i];
                    if(pivote.val<1) {
                        // servicio gratuito, ya que el val = 0
                        this.result[pivote.id] = 1;
                        this.helper(pivote.id, 1);
                    } else {
                        // servicio con costo, ya que el val > 0
                        this.result[pivote.id] = 2;
                        this.helper(pivote.id, 2);
                    }
                }
            }).catch(error => {
                console.log(error);
            })
        },        
    }
}
</script>
