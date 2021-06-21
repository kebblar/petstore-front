<template>
  <div>
    <div>
      <b-card no-body>
        <b-tabs pills card vertical>
          <b-tab v-on:click="graficar_monto_categoria" title="Ventas totales por categoría" active>
            <b-card-text>
              <div
                class="ancho centra"
                style="
                  width: 95%;
                  margin-top: 5%;
                  box-shadow: 0px 10px 10px black;
                "
              >
                <h1
                  style="
                    margin-left: 15%;
                    font-size: 28px;
                    text-shadow: -1px -1px 1px #333;
                  "
                >
                  Gráfica de ventas totales por categoría
                </h1>
                <bar-chart
                  v-if="loaded"
                  :chartdata="chartdata"
                  :options="options"
                  style="margin-left:5%; width75%;"
                />
              </div>
            </b-card-text>
          </b-tab>
          <b-tab v-on:click="graficar_monto_categoria_filtro" title="Ventas totales por categoría con filtro de fechas">
            <b-card-text>
              <div
                class="ancho centra"
                style="
                  width: 95%;
                  margin-top: 5%;
                  box-shadow: 0px 10px 10px black;
                "
              >
                <h1
                  style="
                    margin-left: 15%;
                    font-size: 28px;
                    text-shadow: -1px -1px 1px #333;
                  "
                >
                  Gráfica de ventas totales por categoría con filtro de fechas
                </h1>
                <div style="margin;auto; width:80%">
                  <HotelDatePicker
                    @check-in-changed="checkIn"
                    @check-out-changed="checkOut"
                    format="YYYY-MM-DD"
                    style="margin-left: 15%; width: 50%"
                    :startDate="startDate"
                    :i18n="i18n"
                  />
                  <button
                    v-on:click="graficar_monto_categoria_filtro"
                    style="margin-left: 2%; background-color:#28a745; color:#fff; border-radius:.25rem;"
                    data-toggle="tooltip"
                    data-placement="left"
                    title="Selecciona un rango de fecha para mostrar gráfica."
                  >
                    Actualizar
                  </button>
                </div>
                <bar-chart
                  v-if="loaded_filtro"
                  :chartdata="chartdata_filtro"
                  :options="options"
                  style="margin-left: 15%; width: 75%"
                />
              </div>
            </b-card-text>
          </b-tab>
          <b-tab v-on:click="graficar_monto_tipo_pago" title="Ventas totales por tipo de pago">
            <b-card-text>
              <div
                class="ancho centra"
                style="
                  width: 95%;
                  margin-top: 5%;
                  box-shadow: 0px 10px 10px black;
                "
              >
                <h1
                  style="
                    margin-left: 15%;
                    font-size: 28px;
                    text-shadow: -1px -1px 1px #333;
                  "
                >
                  Gráfica de ventas totales por tipo de pago
                </h1>
                <bar-chart
                  v-if="loaded_tipo_pago"
                  :chartdata="chartdata_tipo_pago"
                  :options="options"
                  style="margin-left:5%; width75%;"
                />
              </div>
            </b-card-text>
          </b-tab>
          <b-tab v-on:click="graficar_monto_tipo_pago_filtro" title="Ventas totales por tipo de pago con filtro de fechas">
            <b-card-text>
              <div
                class="ancho centra"
                style="
                  width: 95%;
                  margin-top: 5%;
                  box-shadow: 0px 10px 10px black;
                "
              >
                <h1
                  style="
                    margin-left: 15%;
                    font-size: 28px;
                    text-shadow: -1px -1px 1px #333;
                  "
                >
                  Gráfica de ventas totales por tipo de pago con filtro de fechas
                </h1>
                <div style="margin;auto; width:80%">
                  <HotelDatePicker
                    @check-in-changed="checkIn_tipo_pago"
                    @check-out-changed="checkOut_tipo_pago"
                    format="YYYY-MM-DD"
                    style="margin-left: 15%; width: 50%"
                    :startDate="startDate"
                    :i18n="i18n"
                  />
                  <button
                    v-on:click="graficar_monto_tipo_pago_filtro"
                    style="margin-left: 2%; background-color:#28a745; color:#fff; border-radius:.25rem;"
                    data-toggle="tooltip"
                    data-placement="left"
                    title="Selecciona un rango de fecha para mostrar gráfica."
                  >
                    Actualizar
                  </button>
                </div>
                <bar-chart
                  v-if="loaded_tipo_pago_filtro"
                  :chartdata="chartdata_tipo_pago_filtro"
                  :options="options"
                  style="margin-left: 15%; width: 75%"
                />
              </div>
            </b-card-text>
          </b-tab>
        </b-tabs>
      </b-card>
    </div>
  </div>
</template>


<script src="vue-hotel-datepicker/dist/vueHotelDatepicker.umd.min.js"></script>
<script>
import BarChart from "./GraficaMontoPorCategoriaTemplate.vue";
import HotelDatePicker from "vue-hotel-datepicker";
import "vue-hotel-datepicker/dist/vueHotelDatepicker.css";
import moment from "moment";

export default {
  name: "GraficaMontoPorCategoriaContainer",
  components: { BarChart, HotelDatePicker },
  data: () => ({
    tabIndex: 0,
    loaded: false,
    loaded_filtro: false,
    loaded_tipo_pago: false,
    loaded_tipo_pago_filtro: false,
    chartdata: null,
    chartdata_filtro: null,
    chartdata_tipo_pago: null,
    chartdata_tipo_pago_filtro: null,
    dateRange: "",
    fechaInicio: "",
    fechaFin: "",
    fechaInicio_tipo_pago: "",
    fechaFin_tipo_pago: "",
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        yAxis: {
          title: {
            display: true,
            text: "Monto de venta total [$]",
            align: "center",
          },
        },
      },
      plugins: {
        title: {
          display: true,
          text: "Grafica",
        },
      },
    },
    startDate: new Date(2020, 11, 1),
    i18n: {
      night: "Día",
      nights: "Días",
      week: "Semana",
      weeks: "Semanas",
      "day-names": ["Dom", "Lun", "Mar", "Mie", "Jue", "Vie", "Sab"],
      "check-in": "Inicio",
      "check-out": "Fin",
      "month-names": [
        "Enero",
        "Febrero",
        "Marzo",
        "Abril",
        "Mayo",
        "Junio",
        "Julio",
        "Agosto",
        "Septiembre",
        "Octubre",
        "Noviembre",
        "Deciembre",
      ],
    },
  }),
  methods: {
    checkIn(val) {
      var fecha = moment(new Date(val)).format("YYYY-MM-DD");
      this.fechaInicio = fecha;
    },
    checkOut(val) {
      var fecha = moment(new Date(val)).format("YYYY-MM-DD");
      this.fechaFin = fecha;
    },
    checkIn_tipo_pago(val){
      var fecha = moment(new Date(val)).format("YYYY-MM-DD");
      this.fechaInicio_tipo_pago = fecha;
    },
    checkOut_tipo_pago(val) {
      var fecha = moment(new Date(val)).format("YYYY-MM-DD");
      this.fechaFin_tipo_pago = fecha;
    },
    async graficar_monto_categoria_filtro() {
      this.loaded_filtro = false;
      try {
        const path_filtro =
          "http://127.0.0.1:9999/api/grafica-total-fechas-categoria-filtro.json?fechaFin=" +
          this.fechaFin +
          "&fechaInicio=" +
          this.fechaInicio;
        console.log(path_filtro);
        const response = await fetch(path_filtro).then((response) =>
          response.json()
        );
        this.chartdata_filtro = response.chartdata;
        console.log(this.chartdata_filtro);
        this.loaded_filtro = true;
      } catch (e) {
        console.error(e);
      }
    },
    async graficar_monto_categoria() {
      this.loaded = false;
      try {
        const response = await fetch(
          "http://127.0.0.1:9999/api/grafica-total-fechas-categoria.json"
        ).then((response) => response.json());
        this.chartdata = response.chartdata;
        this.loaded = true;
      } catch (e) {
        console.error(e);
      }
    },
    async graficar_monto_tipo_pago(){
      this.loaded_tipo_pago = false;
      try {
        const response = await fetch(
          "http://127.0.0.1:9999/api/grafica-tipo-pago.json"
        ).then((response) => response.json());
        this.chartdata_tipo_pago = response.chartdata;
        this.loaded_tipo_pago = true;
      } catch (e) {
        console.error(e);
      }
    },
    async graficar_monto_tipo_pago_filtro(){
      this.loaded_tipo_pago_filtro = false;
      try {
        const path_filtro = "http://127.0.0.1:9999/api/grafica-tipo-pago-rango.json?fechaFin="+this.fechaFin_tipo_pago+"&fechaInicio="+this.fechaInicio_tipo_pago;
        console.log(path_filtro);
        const response = await fetch(path_filtro).then((response) =>
          response.json()
        );
        this.chartdata_tipo_pago_filtro = response.chartdata;
        console.log(this.chartdata_tipo_pago_filtro);
        this.loaded_tipo_pago_filtro = true;
      } catch (e) {
        console.error(e);
      }
    },
    linkClass(idx) {
      if (this.tabIndex === idx) {
        this.graficar_monto_categoria()
        return ["bg-primary", "text-light"];
      } else {
        this.graficar_monto_categoria()
        return ["bg-light", "text-info"];
      }
    },
  },

  async mounted() {
    this.loaded = false;
    try {
      const response = await fetch(
        "http://127.0.0.1:9999/api/grafica-total-fechas-categoria.json"
      ).then((response) => response.json());
      this.chartdata = response.chartdata;
      this.loaded = true;
    } catch (e) {
      console.error(e);
    }
  },
  renderTriggered() {
    console.log(this.fechaInicio);
  },
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  color: #2c3e50;
  margin-top: 60px;
}

.nav-link.active{
  background-color: #28a745 !important;
  color: #fff !important;
}
.nav-link{
  color: #28a745 !important;
}
</style>
