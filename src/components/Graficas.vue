<template>
    <div class="ancho centra" style="max-width:1200px">
        <div class="card">
            <div class="card-body">
                <h1 class="card-title">Graficas</h1>

                <br><br><hr><br>
                <h3 style="text-align:center;" class="text-secondary">Comprador más asiduo</h3>
                <pie-chart :chart-data="compradorPie" />

                <div v-if="hideMeCMAG">
                    <br>
                    <div style="display: inline-flex">
                        <p class="h3"><b-icon icon="calendar-check" class="fa-fw"></b-icon></p>
                        <vue-monthly-picker class="mr-4"
                            v-model="selectedMonthComprador"
                            :placeHolder="message"
                            :monthLabels="monthLabels"/>
                        <button class="btn btn-success btn-sm mt-1" style="height:95%" @click='findComprador'><b-icon icon="search"></b-icon></button>
                    </div>
                    <br>
                </div>

                <button @click="compradorG()" class="btn btn-secondary mr-4">Reset</button>
                <button @click="menuBusquedaCMAG()" class="btn btn-info">Nuevos Datos </button>

                <br><br><br>
                <h3 style="text-align:center;" class="text-secondary">Mascota más vendida</h3>
                <point-chart :chart-data="mascotaPoint" />

                <div v-if="hideMe">
                    <br>
                    <div style="display: inline-flex">
                        <p class="h3"><b-icon icon="calendar-check" class="fa-fw"></b-icon></p>
                        <vue-monthly-picker class="mr-4"
                            v-model="selectedMonthMascota"
                            :placeHolder="message"
                            :monthLabels="monthLabels"/>
                        <button class="btn btn-success btn-sm mt-1" style="height:95%" @click='findMascotaVendida'><b-icon icon="search"></b-icon></button>
                    </div>
                    <br>
                </div>

                <button @click="mascotaVendidaG()" class="btn btn-secondary mr-4">Reset</button>
                <button @click="menuBusquedaMVG()" class="btn btn-info">Nuevos Datos </button>

                <br><br><hr><br>
                <h3 style="text-align:center;" class="text-secondary">Paqueterías más populares</h3>
                <bar-chart :chart-data="paqueteriaBar" />

                <div v-if="hideMePMPG">
                    <br>
                    <div style="display: inline-flex">
                        <p class="h3"><b-icon icon="calendar-check" class="fa-fw"></b-icon></p>
                        <vue-monthly-picker class="mr-2"
                            v-model="selectedMonthPaqueteria"
                            :placeHolder="message"
                            :monthLabels="monthLabels"/>
                        <button class="btn btn-success btn-sm mt-1" style="height:95%" @click='findPaqueteriaUtilizada'><b-icon icon="search"></b-icon></button>
                    </div>
                    <br>
                </div>

                <button @click="paqueteriaUtilizadaG()" class="btn btn-secondary mr-4">Reset</button>
                <button @click="menuBusquedaPMPG()" class="btn btn-info">Nuevos Datos </button>


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
        this.renderChart(this.compradorPie, {responsive: true, maintainAspectRatio: false});
    }
})

Vue.component('bar-chart', {
    extends: Bar,
    mixins: [reactiveProp],
    props: ["options"],
    mounted () {
        this.renderChart(this.paqueteriaBar, {responsive: true, maintainAspectRatio: false, scales: {
            xAxes: [{
                barPercentage: 1.5,
                gridLines: {
                    display: true
                }
            }],
            yAxes: [{
                gridLines: {
                    display: true
                },
                ticks: {
                    precision: 0
                }
            }]
       } });
    }
})

Vue.component('point-chart', {
    extends: Line,
    mixins: [reactiveProp],
    props: ["options"],
    mounted () {
        this.renderChart(this.mascotaPoint, {responsive: true, scales: {
            xAxes: [{
               gridLines: {
                  display: true
               }
            }],
            yAxes: [{
               gridLines: {
                  display: true
               },
                ticks: {
                    precision: 0
                }
            }]
       }, maintainAspectRatio: false, plugins: { legend:{ labels: {usePointStyle: true}} }});
    }
})


export default {
    components: {
        VueMonthlyPicker
    },
    data () {
      return {
        colores: ['#f44336','#00BCD4','#E91E63','#9C27B0','#2196F3','#673AB7','#3F51B5','#009688','#CDDC39','#03A9F4','#4CAF50','#8BC34A','#FFC107','#FFEB3B','#FF9800','#FF5722','#795548','#9E9E9E','#607D8B'],
        monthLabels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
        selectedMonthMascota:'',
        selectedMonthPaqueteria:'',
        selectedMonthComprador:'',
        mascotaPoint: null,
        paqueteriaBar: null,
        compradorPie: null,
        paqueteriaOptions: null,
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
        coloresGenerador(){
            let col =[]
            let arrColoresGenerados = []
            while(arrColoresGenerados.length < 5){
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
        generadorDataset(dataObj){
            let labels = []
            let recolector = {}
            let data = {}
            Object.assign(data, { labels: ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'] })
            Object.assign(data, {datasets: []})

            dataObj.chart.map(function(i) {
                if(!labels.includes(i.label)) {
                    labels.push(i.label)
                    recolector[i.label] = []
                    recolector[i.label].push([i.mes-1, i.data])
                }
                else {
                    recolector[i.label].push([i.mes-1, i.data])
                }
            })

            let colores = this.coloresGenerador()
            let i = 0
            for(let key in recolector) {
                let arrData = [0,0,0,0,0,0,0,0,0,0,0,0]
                recolector[key].forEach(function(e) {
                    for (var i = 0; i < 12; i++) {
                        if(e[0] == i) {
                            arrData[i] += e[1]
                        }
                    }
                })
                data.datasets.push({ label: key, data: arrData, backgroundColor: colores[i] })
                i++;
            }
            return data
        },
        async compradorG(){
            const { data } = await axios.get('/api/grafica-comprador-asiduo.json')
            let colores = this.coloresGenerador()
            this.compradorPie = {
                labels: data.chart.label,
                datasets: [{
                    data: data.chart.data,
                    backgroundColor: colores
                }]
            }
            this.hideMeCMAG = false
        },
        async mascotaVendidaG(){
            const { data } = await axios.get('/api/grafica-mascota-mas-vendida.json')
            let colores = this.coloresGenerador()
            const source = {
                        fill: false,
                        borderWidth: 2,
                        pointStyle: 'triangle',
                        pointRadius: 10,
                        pointBorderColor: 'rgb(0, 0, 0)'
                    }
            let dataGenerada = this.generadorDataset(data)
            let i = 0
            dataGenerada.datasets.map(function(e){
                Object.assign(e, source)
                Object.assign(e,{borderColor: colores[i]})
                i++
            })

            this.mascotaPoint = dataGenerada
            this.showMe = true
            this.hideMe = false
        },
        async paqueteriaUtilizadaG(){
            const { data } = await axios.get('/api/grafica-paqueteria.json')
            console.log("data de paqueteria: " + JSON.stringify(data))
            this.paqueteriaBar = this.generadorDataset(data)
            this.hideMePMPG = false
        },
        async buscarGrafica(update, data, objActual) {
            if(update){
                let colores = this.coloresGenerador()
                if(objActual == "comprador"){
                    let tmp = {
                    labels: data.chart.label,
                    datasets: [
                        {
                            backgroundColor: colores,
                            data: data.chart.data
                        },
                        ]
                    }
                    this.compradorPie = tmp
                }
                if(objActual == 'mascota'){
                    let colores = this.coloresGenerador()
                    const source = {
                                fill: false,
                                borderWidth: 2,
                                pointStyle: 'triangle',
                                pointRadius: 10,
                                pointBorderColor: 'rgb(0, 0, 0)'
                            }
                    let dataGenerada = this.generadorDataset(data)
                    let i = 0
                    dataGenerada.datasets.map(function(e){
                        Object.assign(e, source)
                        Object.assign(e,{borderColor: colores[i]})
                        i++
                    })
                    this.mascotaPoint = dataGenerada
                }
                if(objActual == 'paqueteria'){
                    this.paqueteriaBar = this.generadorDataset(data)
                }
            }
        },
        menuBusquedaCMAG(){
            this.hideMeCMAG = true
        },
        menuBusquedaMVG() {
            this.hideMe = true
        },
        menuBusquedaPMPG(){
            this.hideMePMPG = true
        },
        async findComprador(){
            let fechas = this.generadorFechas(this.selectedMonthComprador)
            const { data } = await axios.get('/api/grafica-comprador-asiduo-rango/'+fechas[0]+'/'+fechas[1]+'.json')
            console.log("se Filtra usando Comprador fechas:\n" + fechas[0] + ' - ' + fechas[1] + "\nCon los siguientes datos:" + JSON.stringify(data))
            if(!data){
                this.$modal.show('info');
            }else{
                this.buscarGrafica(true, data, "comprador")
            }
        },
        async findMascotaVendida(){
            let fechas = this.generadorFechas(this.selectedMonthMascota)
            const { data } = await axios.get('/api/grafica-mascota-mas-vendida-rango/'+fechas[0]+'/'+fechas[1]+'.json')
            console.log("se Filtra usando MascotaVendida fechas:\n" + fechas[0] + ' - ' + fechas[1] + "\nCon los siguientes datos:" + JSON.stringify(data))
            if(data.chart.length == 0){
                this.$modal.show('info');
            }else{
                this.buscarGrafica(true, data, "mascota")
            }
        },
        async findPaqueteriaUtilizada(){
            let fechas = this.generadorFechas(this.selectedMonthPaqueteria)
            const { data } = await axios.get('/api/grafica-paqueteria-rango/'+fechas[0]+'/'+fechas[1]+'.json')
            console.log("se Filtra usando PaqueteriaUtilizada fechas:\n" + fechas[0] + ' - ' + fechas[1] + "\nCon los siguientes datos:" + JSON.stringify(data))
            if(data.chart.length == 0){
                this.$modal.show('info');
            }else{
                this.buscarGrafica(true, data, "paqueteria")
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
.Chart {
    padding: 20px;
    box-shadow: 0px 0px 20px 2px rgba(0, 0, 0, .4);
    border-radius: 20px;
    margin: 50px 0;
  }
</style>
