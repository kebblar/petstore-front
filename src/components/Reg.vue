<template>
    <div class="ancho centra">
        <div class="card" style="width: 380px;">
            <div class="card-header">
                <div class="row">
                    <div class="col-sm-6">
                        <label>Registro al sistema</label>
                    </div>
                    <div class="col-sm-6" style="text-align: right;">
                        <label>V. {{ version }}</label>
                    </div>
                </div>
            </div><!-- ends header-->
            <div class="card-body">
                <div class="row">
                    <div class="col-sm-12 text-left">
                          <label>Fecha de nacimiento</label>
                          <b-form-datepicker 
                             id="fecha-nacimiento"
                             v-model="fNacimiento"
                             :initial-date="dateConfig.initial"
                             :max="dateConfig.max"
                             :min="dateConfig.min"
                             calendar-width="100%"
                             class="mb-2"
                             hide-header
                             locale="es"
                             menu-class="w-100"
                             nav-button-variant="secondary" 
                             placeholder="MM-DD-YYYY"
                             show-decade-nav 
                             v-bind:value-as-date=true
                             />
                    </div>


                    <input type="text" class="form-control" v-model="name" />
                    <button @click="prueba" :disabled="checa()" class="btn btn-warning">Ingresar al sistema</button>
                </div>
                <div  class="row">
                    <br/>
                    <hr/>
                    <h5>{{data.monedas}}</h5>
                </div>

                    <table class="table table-striped table-responsive-md btn-table">
                      <thead class="thead-dark">
                      <tr>
                        <td>Nombre</td>
                        <td>Valor</td>
                      </tr>
                      </thead>
                      <tbody>
                        <tr v-for="moneda in data.monedas" :key="moneda.nombre">
                          <td>{{moneda.nombre}}</td>
                          <td>{{moneda.valor}}</td>
                        </tr>
                      </tbody>
                    </table>

                    <range-slider
                      class="slider"
                      min="130"
                      max="195"
                      step="5"
                      v-model="sliderValue"
                    />
                    <div>{{ sliderValue }}</div>

            </div>
        </div>
  </div>
</template>

<script>
import axios from 'axios';
import datos from "./datos.json";
import RangeSlider from "vue-range-slider";
import "vue-range-slider/dist/vue-range-slider.css";

export default {
    data: function () { 
        return {
          dateConfig: {
            min: new Date(1954,3,6),
            max: new Date(2027,4,7),
            initial: this.fNacimiento,
          },
          fNacimiento: new Date(2021,3,27),
          version: process.env.VUE_APP_VERSION,
          data: datos,
          name: 7,
          sliderValue: 50
        }
    },
    methods: {
      checa: function() {
        return this.sliderValue < 150;
      },
      prueba: function() {
            console.log(this.data);
            axios.post('api/pba002.json', {
                id: 1,
                nombre: this.name,
                apellidoPaterno: 'Lopez',
                apellidoMaterno: 'z',
                fechaNacimiento: this.fNacimiento,
                nickName: 'w',
                telefonoCasa:'1',
                telefonoCelular:'2'
            }).then(response => {
                console.log("hola");
                console.log(response);
                console.log(response.status);
                console.log(response.data);
            }).catch(error => {
                console.log(error.response.status);
                console.log(error.response.data);
                this.msgErr = error.response.data['exceptionLongDescription'];
                this.$modal.show('mensaje-login');
            })
      }
    },
    components: {
      RangeSlider
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style src="@vueform/slider/themes/default.css"></style>
