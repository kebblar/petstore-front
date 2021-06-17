<template>
    <div class="ancho centra" style="max-width:1200px">
        <div class="card">
            <div class="card-body">
                <h1 class="card-title">Gráficas</h1>
                    
                <br><br>
                <h3>Total de ventas por categoria de mascota</h3>
<!--                 <span>Filtrar por: </span>
                
                <b-form-select class="col-sm-4" v-model="selected" :options="options" @change="selectOpc"></b-form-select> -->
                    <div class='chartS'><BarChart /></div>
            </div>
        </div>   
    </div>
</template>
<script>
//import LineChart from './LineChart.vue'
//import PieChart from "./PieChart.vue";
import BarChart from "./BarChart.vue";
//import LineCharAsync from './LineCharAsync.vue'
import Vue from "vue"; 
import { BFormInput } from 'bootstrap-vue'
Vue.component('b-form-input', BFormInput)

export default {
    components: { 

      BarChart,

    },
    data() {
        return {
            selected: null,
            options: [
                { value: null, text: 'Seleccione una opcion' },
                { value: 'semana', text: 'Semana' },
                { value: 'mes', text: 'Mes' },
                { value: 'anio', text: 'Anio' },
                //{ value: 'd', text: 'This one is disabled', disabled: true }
            ],
            chartdata: {
                labels: ["Aranias", "Gatos", "Conejos", 'Serpientes'],
                datasets: [
                    {
                        backgroundColor: ["#0CCDB1", "#CD450C", "#0C88CD", "#88CD0C"], //[this.gradient, this.gradient2, "#00D8FF"],
                        data: [5,10,7,1]
                    }
                ]
            },
            optionsChart: {
                responsive: true,
                maintainAspectRatio: false
            }
        };
    },
    methods:{
        selectOpc(opc){
            console.log("imprimir " + opc);
            if(opc == 'semana'){
                console.log("mi semana");
                this.BarChart.data.chartdata.labels = ['lunes','martes','miercoles','jueves','viernes'];
                //this.PieChart.renderChart(this.chartdata, this.optionsChart);
                //PieChart.chartdata = {
                  //  labels: ["Aranias", "Gatos", "Conejos", 'Serpientes'],
                    //datasets: [
                      //  {
                        //    backgroundColor: ["#0CCDB1", "#CD450C", "#0C88CD", "#88CD0C"], //[this.gradient, this.gradient2, "#00D8FF"],
                          //  data: [5,10,7,1]
                //        }
                  //  ]
               // }
                //PieChart.update();
            }
        }
    }
};
</script>

<style>
.chartS{
    margin:15px auto; 
    padding-top:20px;
    padding-bottom:15px;
    border-radius:7px; 
    box-shadow: 0px 0px 15px 2px #e9e9e9;
}
</style>