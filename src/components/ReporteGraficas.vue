<template>
  <div>
    <div>
      <b-card no-body>
        <b-tabs pills card vertical>
          <b-tab 
            v-on:click="graficar_importe_total_ventas"
            title="Importe total ventas"
            active
          >
            <b-card-text>
              <div
                class="ancho centra box-shadow"
                style="margin: auto; width: 100%"
              >
                <h1 class="title-style" style="margin-left: 5%; width: 80%">
                  Gráfica de importe total de ventas
                </h1>
                <button
                  @click="graficar_importe_total_ventas()"
                  class="btn btn-secondary mr-4"
                >
                  {{ nombre_boton_total }}
                </button>
                <line-chart
                  v-if="loaded_importe_total_ventas_filtro"
                  :chartdata="chartdata_importe_total_ventas_filtro"
                  :options="options_line_importe"
                  style="margin-left: 5%; width: 90%"
                />
                <div style="margin: auto; width: 100%">
                  <HotelDatePicker
                    @check-in-changed="checkIn_importe_total_ventas"
                    @check-out-changed="checkOut_importe_total_ventas"
                    format="YYYY-MM-DD"
                    style="margin-left: 15%; width: 60%"
                    :startDate="startDate"
                    :displayClearButton="false"
                    :positionRight="true"
                    :i18n="i18n"
                  />
                  <button
                    v-on:click="graficar_importe_total_ventas_filtro"
                    class="btn btn-info"
                    data-toggle="tooltip"
                    data-placement="left"
                    title="Selecciona un rango de fecha para mostrar gráfica."
                  >
                    <b-icon icon="funnel"></b-icon>
                    {{ nombre_boton_filtro }}
                  </button>
                </div>
                <label
                  name="error"
                  v-if="error_fecha_importe_total_ventas"
                  style="color: red"
                  >{{ mensaje_error_datos }}</label
                >
              </div>
            </b-card-text>
          </b-tab>
          <b-tab
            v-on:click="compradorG"
            title="Compradores más asiduos (Top 5)">
            <b-card-text>
              <div class="ancho centra box-shadow">
                <h1 class="title-style">Compradores más asiduos (Top 5)</h1>
                <button @click="compradorG()" class="btn btn-secondary mr-4">
                  {{ nombre_boton_total }}
                </button>
                <pie-chart
                  v-if="loaded_comprador"
                  :chartdata="compradorPie"
                  :options="options_pie"
                  style="margin-left:5%; width75%;"
                />
                <div v-if="hideMeCMAG">
                  <br />
                  <div style="display: inline-flex">
                    <p class="h3">
                      <b-icon icon="calendar-check" class="fa-fw"></b-icon>
                    </p>
                    <vue-monthly-picker
                      class="mr-4"
                      v-model="selectedMonthComprador"
                      :placeHolder="message"
                      :monthLabels="monthLabels"
                    />
                    <button
                      class="btn btn-success btn-sm mt-1"
                      style="height: 95%"
                      @click="findComprador"
                      data-toggle="tooltip"
                      data-placement="left"
                      title="Selecciona un mes para mostrar gráfica."
                    >
                      <b-icon icon="funnel"></b-icon>
                      {{ nombre_boton_filtro_mes }}
                    </button>
                  </div>
                  <br />
                </div>
                <label
                  name="error"
                  v-if="error_fecha_comprador"
                  style="color: red"
                  >{{ mensaje_error_datos }}</label
                >
              </div>
            </b-card-text>
          </b-tab>
          <b-tab
            v-on:click="graficar_numero_ordenes_total_ventas"
            title="Número total de órdenes de compra"
          >
            <b-card-text>
              <div class="ancho centra box-shadow">
                <h1 class="title-style">
                  Gráfica de número total de órdenes de compra
                </h1>
                <button
                  @click="graficar_numero_ordenes_total_ventas()"
                  class="btn btn-secondary mr-4"
                >
                  {{ nombre_boton_total }}
                </button>
                <line-chart
                  v-if="loaded_numero_ordenes_total_ventas_filtro"
                  :chartdata="chartdata_numero_ordenes_total_ventas_filtro"
                  :options="options_line"
                  style="margin-left: 5%; width: 90%"
                />
                <div style="margin;auto; width:100%">
                  <HotelDatePicker
                    @check-in-changed="checkIn_numero_ordenes_total_ventas"
                    @check-out-changed="checkOut_numero_ordenes_total_ventas"
                    format="YYYY-MM-DD"
                    style="margin-left: 15%; width: 60%"
                    :startDate="startDate"
                    :displayClearButton="false"
                    :positionRight="true"
                    :i18n="i18n"
                  />
                  <button
                    v-on:click="graficar_numero_ordenes_total_ventas_filtro"
                    class="btn btn-info"
                    data-toggle="tooltip"
                    data-placement="left"
                    title="Selecciona un rango de fecha para mostrar gráfica."
                  >
                    <b-icon icon="funnel"></b-icon>
                    {{ nombre_boton_filtro }}
                  </button>
                </div>
                <label
                  name="error"
                  v-if="error_fecha_numero_ordenes_total_ventas"
                  style="color: red"
                  >{{ mensaje_error_datos }}</label
                >
              </div>
            </b-card-text>
          </b-tab>
          <b-tab
            v-on:click="graficar_monto_categoria"
            title="Ventas totales por categoría con filtro de fechas"
          >
            <b-card-text>
              <div class="ancho centra font-shadow">
                <h1 class="title-style">
                  Gráfica de ventas totales por categoría con filtro de fechas
                </h1>
                <button
                  @click="graficar_monto_categoria()"
                  class="btn btn-secondary mr-4"
                >
                  {{ nombre_boton_total }}
                </button>
                <bar-chart
                  v-if="loaded_monto_categoria_filtro"
                  :chartdata="chartdata_monto_categoria_filtro"
                  :options="options_bar_importe"
                  style="margin-left: 5%; width: 90%"
                />
                <div style="margin;auto; width:100%">
                  <HotelDatePicker
                    @check-in-changed="checkIn_monto_categoria"
                    @check-out-changed="checkOut_monto_categoria"
                    format="YYYY-MM-DD"
                    style="margin-left: 15%; width: 60%"
                    :startDate="startDate"
                    :displayClearButton="false"
                    :positionRight="true"
                    :i18n="i18n"
                  />
                  <button
                    v-on:click="graficar_monto_categoria_filtro"
                    class="btn btn-info"
                    data-toggle="tooltip"
                    data-placement="left"
                    title="Selecciona un rango de fecha para mostrar gráfica."
                  >
                    <b-icon icon="funnel"></b-icon>
                    {{ nombre_boton_filtro }}
                  </button>
                </div>
                <label
                  name="error"
                  v-if="error_fecha_monto_categoria"
                  style="color: red"
                  >{{ mensaje_error_datos }}</label
                >
              </div>
            </b-card-text>
          </b-tab>
          <b-tab
            v-on:click="mascotaVendidaG"
            title="Categoría de mascota más vendida (Top 5)"
          >
            <b-card-text>
              <div class="ancho centra box-shadow">
                <h1 class="title-style">
                  Categoría de mascota más vendida (Top 5)
                </h1>
                <button
                  @click="mascotaVendidaG()"
                  class="btn btn-secondary mr-4"
                >
                  {{ nombre_boton_total }}
                </button>
                <pie-chart
                  v-if="loaded_mascota"
                  :chartdata="mascotaPoint"
                  :options="options_pie"
                  style="margin-left:5%; width75%;"
                />
                <div v-if="hideMe">
                  <br />
                  <div style="display: inline-flex">
                    <p class="h3">
                      <b-icon icon="calendar-check" class="fa-fw"></b-icon>
                    </p>
                    <vue-monthly-picker
                      class="mr-4"
                      v-model="selectedMonthMascota"
                      :placeHolder="message"
                      :monthLabels="monthLabels"
                    />
                    <button
                      class="btn btn-success btn-sm mt-1"
                      style="height: 95%"
                      @click="findMascotaVendida"
                      data-toggle="tooltip"
                      data-placement="left"
                      title="Selecciona un mes para mostrar gráfica."
                    >
                      <b-icon icon="funnel"></b-icon>
                      {{ nombre_boton_filtro_mes }}
                    </button>
                  </div>
                  <br />
                </div>
                <label
                  name="error"
                  v-if="error_fecha_mascota"
                  style="color: red"
                  >{{ mensaje_error_datos }}</label
                >
              </div>
            </b-card-text>
          </b-tab>
          <b-tab
            v-on:click="graficar_monto_tipo_pago"
            title="Ventas totales por tipo de pago"
          >
            <b-card-text>
              <div class="ancho centra box-shadow">
                <h1 class="title-style">
                  Gráfica de ventas totales por tipo de pago
                </h1>
                <button
                  @click="graficar_monto_tipo_pago()"
                  class="btn btn-secondary mr-4"
                >
                  {{ nombre_boton_total }}
                </button>
                <bar-chart
                  v-if="loaded_tipo_pago_filtro"
                  :chartdata="chartdata_tipo_pago_filtro"
                  :options="options_bar_importe"
                  style="margin-left: 5%; width: 90%"
                />
                <div style="margin;auto; width:100%">
                  <HotelDatePicker
                    @check-in-changed="checkIn_tipo_pago"
                    @check-out-changed="checkOut_tipo_pago"
                    format="YYYY-MM-DD"
                    style="margin-left: 15%; width: 60%"
                    :startDate="startDate"
                    :displayClearButton="false"
                    :positionRight="true"
                    :i18n="i18n"
                  />
                  <button
                    v-on:click="graficar_monto_tipo_pago_filtro"
                    class="btn btn-info"
                    data-toggle="tooltip"
                    data-placement="left"
                    title="Selecciona un rango de fecha para mostrar gráfica."
                  >
                    <b-icon icon="funnel"></b-icon>
                    {{ nombre_boton_filtro }}
                  </button>
                </div>
                <label
                  name="error"
                  v-if="error_fecha_tipo_pago"
                  style="color: red"
                  >{{ mensaje_error_datos }}</label
                >
              </div>
            </b-card-text>
          </b-tab>
          <b-tab
            v-on:click="paqueteriaUtilizadaG"
            title="Paquetería más popular"
          >
            <b-card-text>
              <div class="ancho centra box-shadow">
                <h1 class="title-style">Paquetería más popular</h1>
                <button
                  @click="paqueteriaUtilizadaG()"
                  class="btn btn-secondary mr-4"
                >
                  {{ nombre_boton_total }}
                </button>
                <pie-chart
                  v-if="loaded_paqueteria"
                  :chartdata="paqueteriaBar"
                  :options="options_pie"
                  style="margin-left:5%; width75%;"
                />
                <div v-if="hideMePMPG">
                  <br />
                  <div style="display: inline-flex">
                    <p class="h3">
                      <b-icon icon="calendar-check" class="fa-fw"></b-icon>
                    </p>
                    <vue-monthly-picker
                      class="mr-2"
                      v-model="selectedMonthPaqueteria"
                      :placeHolder="message"
                      :monthLabels="monthLabels"
                    />
                    <button
                      class="btn btn-success btn-sm mt-1"
                      style="height: 95%"
                      @click="findPaqueteriaUtilizada"
                      data-toggle="tooltip"
                      data-placement="left"
                      title="Selecciona un mes para mostrar gráfica."
                    >
                      <b-icon icon="funnel"></b-icon>
                      {{ nombre_boton_filtro_mes }}
                    </button>
                  </div>
                  <br />
                </div>
                <label
                  name="error"
                  v-if="error_fecha_paqueteria"
                  style="color: red"
                  >{{ mensaje_error_datos }}</label
                >
              </div>
            </b-card-text>
          </b-tab>
        </b-tabs>
      </b-card>
    </div>
  </div>
</template>

<script>
import BarChart from "./ChartTemplate_Bar.vue";
import PieChart from "./ChartTemplate_Pie.vue";
import LineChart from "./ChartTemplate_Line.vue";
import HotelDatePicker from "vue-hotel-datepicker";
import "vue-hotel-datepicker/dist/vueHotelDatepicker.css";
import "vue-hotel-datepicker/dist/vueHotelDatepicker.umd.min.js";
import moment from "moment";

import axios from "axios";
import { BootstrapVue, IconsPlugin } from "bootstrap-vue";
import Vue from "vue";
import VueMonthlyPicker from "vue-monthly-picker";

Vue.use(BootstrapVue);
Vue.use(IconsPlugin);

export default {
  name: "GraficaMontoPorCategoriaContainer",
  components: {
    BarChart,
    PieChart,
    LineChart,
    HotelDatePicker,
    VueMonthlyPicker,
  },
  data: () => ({
    colores: [
      "#f44336",
      "#00BCD4",
      "#E91E63",
      "#9C27B0",
      "#2196F3",
      "#673AB7",
      "#3F51B5",
      "#009688",
      "#CDDC39",
      "#03A9F4",
      "#4CAF50",
      "#8BC34A",
      "#FFC107",
      "#FFEB3B",
      "#FF9800",
      "#FF5722",
      "#795548",
      "#9E9E9E",
      "#607D8B",
    ],
    monthLabels: [
      "Ene",
      "Feb",
      "Mar",
      "Abr",
      "May",
      "Jun",
      "Jul",
      "Ago",
      "Sep",
      "Oct",
      "Nov",
      "Dic",
    ],
    mensaje_error_datos: "No se encontraron datos",
    error_fecha_monto_categoria: false,
    error_fecha_tipo_pago: false,
    error_fecha_importe_total_ventas: false,
    error_fecha_numero_ordenes_total_ventas: false,
    error_fecha_comprador: false,
    error_fecha_mascota: false,
    error_fecha_paqueteria: false,
    selectedMonthMascota: "",
    selectedMonthPaqueteria: "",
    selectedMonthComprador: "",
    mascotaPoint: null,
    paqueteriaBar: null,
    compradorPie: null,
    hideMe: true,
    hideMePMPG: true,
    hideMeCMAG: true,
    message: "Seleccione un mes para filtrar",
    nombre_boton_total: "Todo",
    nombre_boton_filtro: "Filtrar",
    nombre_boton_filtro_mes: "Filtrar por mes",
    tabIndex: 0,
    loaded_monto_categoria_filtro: false,
    loaded_tipo_pago_filtro: false,
    loaded_comprador: false,
    loaded_mascota: false,
    loaded_paqueteria: false,
    loaded_importe_total_ventas_filtro: false,
    loaded_numero_ordenes_total_ventas_filtro: false,
    chartdata_monto_categoria_filtro: null,
    chartdata_tipo_pago_filtro: null,
    chartdata_importe_total_ventas_filtro: false,
    chartdata_numero_ordenes_total_ventas_filtro: false,
    dateRange: "",
    fechaInicio_monto_categoria: "",
    fechaFin_monto_categoria: "",
    fechaInicio_tipo_pago: "",
    fechaFin_tipo_pago: "",
    fechaInicio_importe_total_ventas: "",
    fechaFin_importe_total_ventas: "",
    fechaInicio_numero_ordenes_total_ventas: "",
    fechaFin_numero_ordenes_total_ventas: "",
    colores_graficas: {
      CANINOS: "#96590C",
      FELINOS: "#FF6400",
      ARACNIDOS: "#FF00D4",
      REPTILES: "#96FF33",
      PECES: "#00FFA2",
      AVES: "#85DBFC",
      ROEDORES: "#FFFA5A",
    },
    options_line_importe: {
      scales: {
        yAxes: [
          {
            title: {
              display: true,
              text: "Tipo",
              scale: "logaritmic",
            },
            ticks: {
              callback: function (value) {
                return "$" + value;
              },
            },
            gridLines: {
              display: true,
            },
          },
        ],
      },
      responsive: true,
      maintainAspectRatio: false,
      fill: false,
    },
    options_line: {
      scales: {
        yAxes: [
          {
            title: {
              display: true,
              text: "Tipo",
              scale: "logaritmic",
            },
            gridLines: {
              display: true,
            },
          },
        ],
      },
      responsive: true,
      maintainAspectRatio: false,
      fill: false,
    },
    options_bar_importe: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        xAxes: [
          {
            barPercentage: 0.8,
          },
        ],
        yAxes: [
          {
            gridLines: {
              display: true,
            },
            ticks: {
              precision: 0,
              callback: function (value) {
                return "$" + value;
              },
            },
            title: {
              display: true,
              text: "Tipo",
            },
          },
        ],
      },
    },
    options_pie: {
      responsive: true,
      maintainAspectRatio: false,
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
    checkIn_monto_categoria(val) {
      var fecha = moment(new Date(val)).format("YYYY-MM-DD");
      this.fechaInicio_monto_categoria = fecha;
    },
    checkOut_monto_categoria(val) {
      var fecha = moment(new Date(val)).format("YYYY-MM-DD");
      this.fechaFin_monto_categoria = fecha;
      this.graficar_monto_categoria_filtro();
    },
    checkIn_tipo_pago(val) {
      var fecha = moment(new Date(val)).format("YYYY-MM-DD");
      this.fechaInicio_tipo_pago = fecha;
    },
    checkOut_tipo_pago(val) {
      var fecha = moment(new Date(val)).format("YYYY-MM-DD");
      this.fechaFin_tipo_pago = fecha;
      this.graficar_monto_tipo_pago_filtro();
    },
    checkIn_importe_total_ventas(val) {
      var fecha = moment(new Date(val)).format("YYYY-MM-DD");
      this.fechaInicio_importe_total_ventas = fecha;
    },
    checkOut_importe_total_ventas(val) {
      var fecha = moment(new Date(val)).format("YYYY-MM-DD");
      this.fechaFin_importe_total_ventas = fecha;
      this.graficar_importe_total_ventas_filtro();
    },
    checkIn_numero_ordenes_total_ventas(val) {
      var fecha = moment(new Date(val)).format("YYYY-MM-DD");
      this.fechaInicio_numero_ordenes_total_ventas = fecha;
    },
    checkOut_numero_ordenes_total_ventas(val) {
      var fecha = moment(new Date(val)).format("YYYY-MM-DD");
      this.fechaFin_numero_ordenes_total_ventas = fecha;
      this.graficar_numero_ordenes_total_ventas_filtro();
    },
    async graficar_monto_categoria_filtro() {
      this.loaded_monto_categoria_filtro = false;
      try {
        const path_filtro =
          "/api/grafica-total-fechas-categoria-filtro?fechaFin=" +
          this.fechaFin_monto_categoria +
          "&fechaInicio=" +
          this.fechaInicio_monto_categoria;
        console.log(path_filtro);
        const response = await fetch(path_filtro).then((response) =>
          response.json()
        );
        this.chartdata_monto_categoria_filtro = response.chartdata;
        this.error_fecha_monto_categoria = false;
        this.loaded_monto_categoria_filtro = true;
      } catch (e) {
        console.error(e);
        this.error_fecha_monto_categoria = true;
      }
    },
    async graficar_monto_categoria() {
      this.loaded_monto_categoria_filtro = false;
      try {
        const response = await fetch(
          "/api/grafica-total-fechas-categoria"
        ).then((response) => response.json());
        this.chartdata_monto_categoria_filtro = response.chartdata;
        this.error_fecha_monto_categoria = false;
        this.loaded_monto_categoria_filtro = true;
      } catch (e) {
        console.error(e);
        this.error_fecha_monto_categoria = true;
      }
    },
    async graficar_monto_tipo_pago() {
      this.loaded_tipo_pago_filtro = false;
      try {
        const response = await fetch(
          "/api/grafica-tipo-pago"
        ).then((response) => response.json());
        this.chartdata_tipo_pago_filtro = response.chartdata;
        this.error_fecha_tipo_pago = false;
        this.loaded_tipo_pago_filtro = true;
      } catch (e) {
        console.error(e);
        this.error_fecha_tipo_pago = true;
      }
    },
    async graficar_monto_tipo_pago_filtro() {
      this.loaded_tipo_pago_filtro = false;
      try {
        const path_filtro =
          "/api/grafica-tipo-pago-rango?fechaFin=" +
          this.fechaFin_tipo_pago +
          "&fechaInicio=" +
          this.fechaInicio_tipo_pago;
        console.log(path_filtro);
        const response = await fetch(path_filtro).then((response) =>
          response.json()
        );
        this.chartdata_tipo_pago_filtro = response.chartdata;
        this.error_fecha_tipo_pago = false;
        this.loaded_tipo_pago_filtro = true;
      } catch (e) {
        console.error(e);
        this.error_fecha_tipo_pago = true;
      }
    },
    async graficar_importe_total_ventas() {
      this.loaded_importe_total_ventas_filtro = false;
      try {
        const response = await fetch(
          "/api/grafica-total-importe-ventas"
        ).then((response) => response.json());
        console.log("response");
        console.log(response);
        this.chartdata_importe_total_ventas_filtro = response.chartdata;
        this.error_fecha_importe_total_ventas = false;
        this.loaded_importe_total_ventas_filtro = true;
      } catch (e) {
        console.error(e);
        this.error_fecha_importe_total_ventas = true;
      }
    },
    async graficar_importe_total_ventas_filtro() {
      this.loaded_importe_total_ventas_filtro = false;
      try {
        const path_filtro =
          "/api/grafica-total-importe-ventas-filtro?fechaFin=" +
          this.fechaFin_importe_total_ventas +
          "&fechaInicio=" +
          this.fechaInicio_importe_total_ventas;
        console.log(path_filtro);
        const response = await fetch(path_filtro).then((response) =>
          response.json()
        );
        console.log("response");
        console.log(response);
        this.chartdata_importe_total_ventas_filtro = response.chartdata;
        this.error_fecha_importe_total_ventas = false;
        this.loaded_importe_total_ventas_filtro = true;
      } catch (e) {
        console.error(e);
        this.error_fecha_importe_total_ventas = true;
      }
    },
    async graficar_numero_ordenes_total_ventas() {
      this.loaded_numero_ordenes_total_ventas_filtro = false;
      try {
        const response = await fetch(
          "/api/grafica-total-numero-ordenes-ventas"
        ).then((response) => response.json());
        response.chartdata.datasets[0].borderColor = "#17a2b8";
        this.chartdata_numero_ordenes_total_ventas_filtro = response.chartdata;
        this.error_fecha_numero_ordenes_total_ventas = false;
        this.loaded_numero_ordenes_total_ventas_filtro = true;
      } catch (e) {
        console.error(e);
        this.error_fecha_numero_ordenes_total_ventas = true;
      }
    },
    async graficar_numero_ordenes_total_ventas_filtro() {
      this.loaded_numero_ordenes_total_ventas_filtro = false;
      try {
        const path_filtro =
          "/api/grafica-total-numero-ordenes-ventas-filtro?fechaFin=" +
          this.fechaFin_numero_ordenes_total_ventas +
          "&fechaInicio=" +
          this.fechaInicio_numero_ordenes_total_ventas;
        console.log(path_filtro);
        const response = await fetch(path_filtro).then((response) =>
          response.json()
        );
        this.chartdata_numero_ordenes_total_ventas_filtro = response.chartdata;
        this.error_fecha_numero_ordenes_total_ventas = false;
        this.loaded_numero_ordenes_total_ventas_filtro = true;
      } catch (e) {
        console.error(e);
        this.error_fecha_numero_ordenes_total_ventas = true;
      }
    },
    coloresGenerador() {
      let col = [];
      let arrColoresGenerados = [];
      while (arrColoresGenerados.length < 5) {
        let res = Math.floor(Math.random() * (19 + 0));
        if (!col.includes(res)) {
          col.push(res);
          arrColoresGenerados.push(this.colores[res]);
        }
      }
      return arrColoresGenerados;
    },
    generadorFechas(fecha) {
      let y = new Date(fecha).getFullYear();
      let m = new Date(fecha).getMonth() + 1;
      let ultimoDia = new Date(y, m, 0).getDate();
      let fecIni = y + "-" + m + "-01";
      let fecFin = y + "-" + m + "-" + ultimoDia;
      return [fecIni, fecFin];
    },
    async compradorG() {
      this.loaded_comprador = false;
      const { data } = await axios.get("/api/grafica-comprador-asiduo");
      let colores = this.coloresGenerador();
      this.compradorPie = {
        labels: data.chart.label,
        datasets: [
          {
            data: data.chart.data,
            backgroundColor: colores,
          },
        ],
      };
      this.error_fecha_comprador = false;
      this.loaded_comprador = true;
    },
    async mascotaVendidaG() {
      this.loaded_mascota = false;
      const { data } = await axios.get("/api/grafica-mascota-mas-vendida");
      let colores = ["", "", "", "", ""];
      let i = 0;
      for (let index in data.chart.label) {
        colores[i] = this.colores_graficas[data.chart.label[index]];
        i++;
      }
      this.mascotaPoint = {
        labels: data.chart.label,
        datasets: [
          {
            data: data.chart.data,
            backgroundColor: colores,
          },
        ],
      };
      this.error_fecha_mascota = false;
      this.loaded_mascota = true;
    },
    async paqueteriaUtilizadaG() {
      this.loaded_paqueteria = false;
      const { data } = await axios.get("/api/grafica-paqueteria");
      let colores = this.coloresGenerador();
      this.paqueteriaBar = {
        labels: data.chart.label,
        datasets: [
          {
            data: data.chart.data,
            backgroundColor: colores,
          },
        ],
      };
      this.error_fecha_paqueteria = false;
      this.loaded_paqueteria = true;
    },
    async buscarGrafica(update, data, objActual) {
      if (update) {
        let colores = this.coloresGenerador();
        if (objActual == "comprador") {
          let tmp = {
            labels: data.chart.label,
            datasets: [
              {
                backgroundColor: colores,
                data: data.chart.data,
              },
            ],
          };
          this.compradorPie = tmp;
        }
        if (objActual == "mascota") {
          let colores = ["", "", "", "", ""];
          let i = 0;
          for (let index in data.chart.label) {
            colores[i] = this.colores_graficas[data.chart.label[index]];
            i++;
          }
          let tmp = {
            labels: data.chart.label,
            datasets: [
              {
                backgroundColor: colores,
                data: data.chart.data,
              },
            ],
          };
          this.mascotaPoint = tmp;
        }
        if (objActual == "paqueteria") {
          let tmp = {
            labels: data.chart.label,
            datasets: [
              {
                backgroundColor: colores,
                data: data.chart.data,
              },
            ],
          };
          this.paqueteriaBar = tmp;
        }
      }
    },
    async findComprador() {
      this.loaded_comprador = false;
      let fechas = this.generadorFechas(this.selectedMonthComprador);
      const { data } = await axios.get(
        "/api/grafica-comprador-asiduo-rango/" +
          fechas[0] +
          "/" +
          fechas[1] +
          ".json"
      );
      console.log(
        "Se filtra usando Comprador fechas:\n" +
          fechas[0] +
          " - " +
          fechas[1] +
          "\nCon los siguientes datos:" +
          JSON.stringify(data)
      );
      if (!data) {
        this.error_fecha_comprador = true;
      } else {
        this.buscarGrafica(true, data, "comprador");
        this.error_fecha_comprador = false;
        this.loaded_comprador = true;
      }
    },
    async findMascotaVendida() {
      this.loaded_mascota = false;
      let fechas = this.generadorFechas(this.selectedMonthMascota);
      const { data } = await axios.get(
        "/api/grafica-mascota-mas-vendida-rango/" +
          fechas[0] +
          "/" +
          fechas[1] +
          ".json"
      );
      console.log(
        "Se filtra usando MascotaVendida fechas:\n" +
          fechas[0] +
          " - " +
          fechas[1] +
          "\nCon los siguientes datos:" +
          JSON.stringify(data)
      );
      if (!data) {
        this.error_fecha_mascota = true;
      } else {
        this.buscarGrafica(true, data, "mascota");
        this.error_fecha_mascota = false;
        this.loaded_mascota = true;
      }
    },
    async findPaqueteriaUtilizada() {
      this.loaded_paqueteria = false;
      let fechas = this.generadorFechas(this.selectedMonthPaqueteria);
      const { data } = await axios.get(
        "/api/grafica-paqueteria-rango/" + fechas[0] + "/" + fechas[1] 
      );
      console.log(
        "Se filtra usando PaqueteriaUtilizada fechas:\n" +
          fechas[0] +
          " - " +
          fechas[1] +
          "\nCon los siguientes datos:" +
          JSON.stringify(data)
      );
      if (!data) {
        this.error_fecha_paqueteria = true;
      } else {
        this.buscarGrafica(true, data, "paqueteria");
        this.error_fecha_paqueteria = false;
        this.loaded_paqueteria = true;
      }
    },
  },
  async mounted() {
    this.graficar_importe_total_ventas();
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
.nav-link.active {
  background-color: #28a745 !important;
  color: #fff !important;
}
.nav-link {
  color: #28a745 !important;
}
.chartS {
  margin: 15px auto;
  padding-top: 20px;
  padding-bottom: 15px;
  border-radius: 7px;
  box-shadow: 0px 0px 15px 2px #e9e9e9;
}
.Chart {
  padding: 20px;
  box-shadow: 0px 0px 20px 2px rgba(0, 0, 0, 0.4);
  border-radius: 20px;
  margin: 50px 0;
}
.box-shadow {
  width: 95%;
  margin-top: 5%;
  box-shadow: #6c757d 2px 2px 15px 2px;
  border-radius: 7px;
  padding: 15px;
}
.title-style {
  margin-left: 5%;
  font-size: 28px;
  font-weight: bold;
  text-shadow: -1px -1px 1px #333;
}
h1 {
  margin-left: 5%;
  width: 80%;
}
.btn-info {
  margin-left: 2% !important;
  background-color: #28a745 !important;
  color: #fff !important;
  border-color: #28a745 !important;
  border-radius: 0.25rem !important;
}
</style>