<template>
  <div>
    <div>
      <b-card no-body>
        <b-tabs pills card vertical>
          <b-tab title="Ventas totales por categoría" active>
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
          <b-tab title="Ventas totales por categoría con filtro de fechas">
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
                    v-on:click="graficar"
                    style="margin-left: 2%"
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
        </b-tabs>
      </b-card>
    </div>
  </div>
</template>


<script src="vue-hotel-datepicker/dist/vueHotelDatepicker.umd.min.js"></script>
<script>
import BarChart from "./ChartTemplate_Bar.vue";
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
    chartdata: null,
    chartdata_filtro: null,
    dateRange: "",
    fechaInicio: "",
    fechaFin: "",
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
      console.log(val);
      var fecha = moment(new Date(val)).format("YYYY-MM-DD");
      this.fechaInicio = fecha;
    },
    checkOut(val) {
      console.log(val);
      var fecha = moment(new Date(val)).format("YYYY-MM-DD");
      this.fechaFin = fecha;
    },
    async graficar() {
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
    linkClass(idx) {
      if (this.tabIndex === idx) {
        return ["bg-primary", "text-light"];
      } else {
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
    this.loaded_filtro = false;
    try {
      const path_filtro =
        "http://127.0.0.1:9999/api/grafica-total-fechas-categoria-filtro.json?fechaFin=" +
        this.fechaFin +
        "&fechaInicio=" +
        this.fechaInicio;
      const response = await fetch(path_filtro).then((response) =>
        response.json()
      );
      this.chartdata_filtro = response.chartdata;
      this.loaded_filtro = true;
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
</style>
