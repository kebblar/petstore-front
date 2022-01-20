<template>
    <div class="ancho centra">
        <label class="p-1">Cuéntanos qué servicios ofreces por una iguala mensual</label>

        <table class="anchoTable table table-striped table-hover table-sm table-dark">
            <thead>
                <tr>
                    <th></th>
                    <th>Servicio no disponible</th>
                    <th>Incluido en el precio</th>
                    <th>Con costo adicional</th>
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
import store from '../store';
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
            // El primer valor del arreglo SIEMPRE será el user ID:
            this.result[0] = store.state.session.idUser;
            console.log(this.result);

            axios.post('api/habilidad', this.result, {
                headers: {
                    'jwt': store.state.session.jwt 
                }
            }).then(response => {
                console.log(response.data);
            }).catch(error => {
                console.log(error.response.data);
            });
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
            var id = store.state.session.idUser;
            console.log("User id: "+id);
            axios.get('/api/habilidad/'+id, {
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
