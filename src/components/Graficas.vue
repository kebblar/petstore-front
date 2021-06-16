<template>
    <div class="ancho centra" style="max-width:1200px">
        <div class="card">
            <div class="card-body">
                <h1 class="card-title">Graficas</h1>
                
                <br><br><br>
                <h3 style="text-align:center;" class="text-secondary">Mascota más vendida</h3>
                <pie-chart :chart-data="paqueteriaPie" />
                
                <div v-if="hideMe">
                    <br>
                    <div style="display: inline-flex">
                        <p class="h3"><b-icon icon="calendar-check" class="fa-fw"></b-icon></p>
                        <vue-monthly-picker class="mr-4"
                            v-model="selectedMonth"
                            :placeHolder="message"
                            :monthLabels="monthLabels"/>
                        <button class="btn btn-success btn-sm mt-1" style="height:95%" @click='findMagic'><b-icon icon="search"></b-icon></button>
                    </div>
                    <br>
                </div>
                
                <button @click="mascotaVendidaG()" class="btn btn-secondary mr-4">Reset</button>
                <button @click="newGraph()" class="btn btn-info">Nuevos Datos </button>
                
                <br><br><hr><br>
                <h3 style="text-align:center;" class="text-secondary">Paqueterías más populares</h3>
                <bar-chart :chart-data="mascotaBar" />

                <div v-if="hideMePMPG">
                    <br>
                    <div style="display: inline-flex">
                        <p class="h3"><b-icon icon="calendar-check" class="fa-fw"></b-icon></p>
                        <vue-monthly-picker class="mr-2"
                            v-model="selectedMonth2"
                            :placeHolder="message"
                            :monthLabels="monthLabels"/>
                        <button class="btn btn-success btn-sm mt-1" style="height:95%" @click='findMagic'><b-icon icon="search"></b-icon></button>
                    </div>
                    <br>
                </div>

                <button @click="paqueteriaUtilizadaG()" class="btn btn-secondary mr-4">Reset</button>
                <button @click="newGraph2()" class="btn btn-info">Nuevos Datos </button>

                <br><br><hr><br>
                <h3 style="text-align:center;" class="text-secondary">Comprador más asiduo</h3>
                <point-chart :chart-data="compradorPoint" />
                
                <div v-if="hideMeCMAG">
                    <br>
                    <div style="display: inline-flex">
                        <p class="h3"><b-icon icon="calendar-check" class="fa-fw"></b-icon></p>
                        <vue-monthly-picker class="mr-4"
                            v-model="selectedMonth3"
                            :placeHolder="message"
                            :monthLabels="monthLabels"/>
                        <button class="btn btn-success btn-sm mt-1" style="height:95%" @click='findMagic'><b-icon icon="search"></b-icon></button>
                    </div>
                    <br>
                </div>

                <button @click="compradorG()" class="btn btn-secondary mr-4">Reset</button>
                <button @click="newGraph3()" class="btn btn-info">Nuevos Datos </button>
            </div>

            <!-- Modal -->
            <modal 
                name="info" 
                :clickToClose="true"
                :width="480"
                :height="220">
                <div class="card">
                    <div class="card-header">Error en búsqueda</div>
                    <div class="card-body">
                        <div class="card-text">
                            <p>No fue posible encontrar Información con al fecha especificada</p>
                            <div style="text-align: right;">
                                <a href="#" class="btn btn-primary" @click="closeModal">Aceptar</a>
                            </div>
                        </div>
                    </div>
                </div>
            </modal>

        </div>   
    </div>
</template>
<script>

import axios from 'axios';
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue';
import Vue from "vue"; 
import VueMonthlyPicker from 'vue-monthly-picker'

import { Pie,Bar,Line, mixins } from "vue-chartjs";
const { reactiveProp } = mixins;
Vue.use( BootstrapVue );
Vue.use( IconsPlugin );

Vue.component('pie-chart', {
    extends: Pie,
    mixins: [reactiveProp],
    props: ["options"],
    mounted () {
        this.renderChart(this.paqueteriaPie, {responsive: true, maintainAspectRatio: false});
    }
})

Vue.component('bar-chart', {
    extends: Bar,
    mixins: [reactiveProp],
    props: ["options"],
    mounted () {
        this.renderChart(this.mascotaBar, {responsive: true, maintainAspectRatio: false});
    }
})

Vue.component('point-chart', {
    extends: Line,
    mixins: [reactiveProp],
    props: ["options"],
    mounted () {
        this.renderChart(this.compradorPoint, {responsive: true, maintainAspectRatio: false, plugins: {legend:{ labels: {usePointStyle: true}}}});
    }
})


export default {
    components: {
        VueMonthlyPicker
    },
    data () {
      return {
        colores: ['#f44336','#00BCD4','#E91E63','#9C27B0','#2196F3','#673AB7','#3F51B5','#009688','#CDDC39','#03A9F4','#4CAF50','#8BC34A','#FFC107','#FFEB3B','#FF9800','#FF5722','#795548','#9E9E9E','#607D8B'],
        meses: {'enero': '1','febrero': '2','marzo': '3','abril': '4','mayo': '5','junio': '6','julio': '7','agosto': '8','septiembre': '9','octubre': '10','noviembre': '11','diciembre': '12'},
        monthLabels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
        selectedMonth:'',
        selectedMonth2:'',
        selectedMonth3:'',
        fechaFiltro1: '',
        paqueteriaPie: null,
        mascotaBar: null,
        compradorPoint: null,
        paqueteriaOptions: null,
        midata: {},
        showMe: true,
        hideMe: false,
        hideMePMPG: false,
        hideMeCMAG: false,
        message: 'Seleccione una fecha a filtrar',
      }
    },
    methods: {
        closeModal() {
            this.$modal.hide('info');
        },
        coloresGenerador(dataLabels){
            let col =[]
            let arrColoresGenerados = []
            while(arrColoresGenerados.length < dataLabels.length){
                let res = Math.floor(Math.random() * (19+0))
                if(!col.includes(res)){
                    col.push(res)
                    arrColoresGenerados.push(this.colores[res])
                }
            }
            return arrColoresGenerados
        },
        generadorFechas(fecha){
            let y = new Date(fecha).getFullYear()
            let m = new Date(fecha).getMonth() + 1
            let ultimoDia = new Date(y, m , 0).getDate()
            let fecIni = y + '-' + m + '-01'
            let fecFin = y + '-' + m + '-' + ultimoDia
            return [fecIni, fecFin]
        },
        async mascotaVendidaG(){
            const { data } = await axios.get('/api/grafica-mascota-mas-vendida.json')
            let colores = this.coloresGenerador(data.chart.label)
            this.paqueteriaPie = {
                labels: data.chart.label,
                datasets: [
                {
                    backgroundColor: colores,
                    data: data.chart.data
                },
                ]
            };
            this.showMe = true
            this.hideMe = false
        },
        async paqueteriaUtilizadaG(){
            const { data } = await axios.get('/api/grafica-paqueteria.json')
            let colores = this.coloresGenerador(data.chart.label)
            let datasets = []
            for(let i = 0; i < data.chart.label.length; i++){
                let datasetPorLabel = {}
                let datos = {
                    label: data.chart.label[i],
                    data: [data.chart.data[i],3,4],
                    backgroundColor: colores[i],//'#ffbf00',
                }
                Object.assign(datasetPorLabel, datos)
                datasets.push(datasetPorLabel)
            }
            this.mascotaBar = {
                labels: data.chart.mes,
                datasets: datasets
            };
            this.hideMePMPG = false
        },
        async compradorG(){
            const { data } = await axios.get('/api/grafica-comprador-asiduo.json')
            let colores = this.coloresGenerador(data.chart.label)
            
            const source = {
                        fill: false,
                        borderWidth: 2,
                        pointStyle: 'triangle',
                        pointRadius: 10,
                        pointBorderColor: 'rgb(0, 0, 0)'
                    }
            let datasets = []
            for(let i = 0; i < data.chart.label.length; i++){
                let datasetPorLabel = {}
                let datos = {
                    label: data.chart.label[i],
                    data: [data.chart.data[i],5,3,2,1],
                    borderColor: colores[i],
                    backgroundColor: '#ffbf00',
                }
                Object.assign(datasetPorLabel, datos)
                Object.assign(datasetPorLabel, source)
                datasets.push(datasetPorLabel)
            }
            
            this.compradorPoint = {
                labels: [data.chart.mes, 'junio', 'julio', 'agosto', 'septiembre'],
                datasets: datasets
            }
            this.hideMeCMAG = false
        },
        async newGraph() {
            this.showMe = false
            this.hideMe = true
            let colores = this.coloresGenerador(['a','c','c','c'])
            this.paqueteriaPie = {
                labels: ['a','b','c','d'],
                datasets: [
                {
                    backgroundColor: colores,
                    data: [5,6,8,7]
                },
                ]
            };
        },
        newGraph2(){
            this.hideMePMPG = true
            //this.selectedMonth2
        },
        newGraph3(){
            this.hideMeCMAG = true
            //this.selectedMonth3
        },
        async findMagic(){
            //this.selectedMonth
            //2021-05-10 //2021-06-30
            let fechas = this.generadorFechas(this.selectedMonth)
            const { data } = await axios.get('/api/grafica-mascota-mas-vendida-rango.json/'+fechas[0]+'/'+fechas[1])
            console.log("seFiltra usando fechas:" + fechas[0] + ' - ' + fechas[1] + "Con los siguientes datos:" + JSON.stringify(data))
            if(!data){
                this.$modal.show('info');
            }
        },
    },
    mounted(){
        this.mascotaVendidaG()
        this.paqueteriaUtilizadaG()
        this.compradorG()
    }
  }
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
