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
              >
                <h1
                  class="title-style"
                >
                  Gráfica de importe total de ventas
                </h1>
                <line-chart
                  v-if="loaded_importe_total_ventas"
                  :chartdata="chartdata_importe_total_ventas"
                  :options="options_line"
                  style="margin-left:5%; width75%;"
                />
              </div>
            </b-card-text>
          </b-tab>
          <b-tab
            v-on:click="graficar_importe_total_ventas_filtro"
            title="Importe total ventas con filtro de fechas"
          >
            <b-card-text>
              <div
                class="ancho centra box-shadow"
              >
                <h1
                  class="title-style"
                >
                  Gráfica de importe total de ventas con filtro de fechas
                </h1>
                <div style="margin;auto; width:80%">
                  <HotelDatePicker
                    @check-in-changed="checkIn_importe_total_ventas"
                    @check-out-changed="checkOut_importe_total_ventas"
                    format="YYYY-MM-DD"
                    style="margin-left: 15%; width: 50%"
                    :startDate="startDate"
                    :i18n="i18n"
                  />
                  <button
                    v-on:click="graficar_importe_total_ventas_filtro"
                    class="btn btn-info"
                    style="
                      margin-left: 2%;
                      background-color: #28a745;
                      color: #fff;
                      border-radius: 0.25rem;
                    "
                    data-toggle="tooltip"
                    data-placement="left"
                    title="Selecciona un rango de fecha para mostrar gráfica."
                  >
                    Actualizar
                  </button>
                </div>
                <line-chart
                  v-if="loaded_importe_total_ventas_filtro"
                  :chartdata="chartdata_importe_total_ventas_filtro"
                  :options="options_bar"
                  style="margin-left: 15%; width: 75%"
                />
              </div>
            </b-card-text>
          </b-tab>
          <b-tab
            v-on:click="compradorG"
            title="Compradores más asiduos (Top 5)"
          >
            <b-card-text>
              <div
                class="ancho centra box-shadow"
              >
                <h1
                  class="title-style"
                >
                  Compradores más asiduos (Top 5)
                </h1>

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
                      @click="findComprador()"
                    >
                      <b-icon icon="search"></b-icon>
                    </button>
                  </div>
                  <br />
                </div>

                <button @click="compradorG()" class="btn btn-secondary mr-4">
                  Total
                </button>
                <button
                  @click="menuBusquedaCMAG()"
                  class="btn btn-info"
                  style="
                    margin-left: 2%;
                    background-color: #28a745;
                    color: #fff;
                    border-radius: 0.25rem;
                  "
                >
                  Filtrar por mes
                </button>
              </div>
            </b-card-text>
          </b-tab>
          <b-tab
            v-on:click="graficar_numero_ordenes_total_ventas"
            title="Número total de órdenes de compra"
          >
            <b-card-text>
              <div
                class="ancho centra box-shadow"
              >
                <h1
                  class="title-style"
                >
                  Gráfica de número total de órdenes de compra
                </h1>
                <line-chart
                  v-if="loaded_numero_ordenes_total_ventas"
                  :chartdata="chartdata_numero_ordenes_total_ventas"
                  :options="options_line"
                  style="margin-left:5%; width75%;"
                />
              </div>
            </b-card-text>
          </b-tab>
          <b-tab
            v-on:click="graficar_numero_ordenes_total_ventas_filtro"
            title="Número total de órdenes de compra con filtro de fechas"
          >
            <b-card-text>
              <div
                class="ancho centra box-shadow"
              >
                <h1
                  class="title-style"
                >
                  Gráfica de número total de órdenes de compra con filtro de
                  fechas
                </h1>
                <div style="margin;auto; width:80%">
                  <HotelDatePicker
                    @check-in-changed="checkIn_numero_ordenes_total_ventas"
                    @check-out-changed="checkOut_numero_ordenes_total_ventas"
                    format="YYYY-MM-DD"
                    style="margin-left: 15%; width: 50%"
                    :startDate="startDate"
                    :i18n="i18n"
                  />
                  <button
                    v-on:click="graficar_numero_ordenes_total_ventas_filtro"
                    class="btn btn-info"
                    style="
                      margin-left: 2%;
                      background-color: #28a745;
                      color: #fff;
                      border-radius: 0.25rem;
                    "
                    data-toggle="tooltip"
                    data-placement="left"
                    title="Selecciona un rango de fecha para mostrar gráfica."
                  >
                    Actualizar
                  </button>
                </div>
                <line-chart
                  v-if="loaded_numero_ordenes_total_ventas_filtro"
                  :chartdata="chartdata_numero_ordenes_total_ventas_filtro"
                  :options="options_bar"
                  style="margin-left: 15%; width: 75%"
                />
              </div>
            </b-card-text>
          </b-tab>
          <b-tab
            v-on:click="graficar_monto_categoria"
            title="Ventas totales por categoría"
          >
            <b-card-text>
              <div
                class="ancho centra box-shadow"
              >
                <h1
                  class="title-style"
                >
                  Gráfica de ventas totales por categoría
                </h1>
                <bar-chart
                  v-if="loaded"
                  :chartdata="chartdata"
                  :options="options_bar"
                  style="margin-left:5%; width75%;"
                />
              </div>
            </b-card-text>
          </b-tab>

          <b-tab
            v-on:click="graficar_monto_categoria_filtro"
            title="Ventas totales por categoría con filtro de fechas"
          >
            <b-card-text>
              <div
                class="ancho centra font-shadow"
              >
                <h1
                  class="title-style"
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
                    class="btn btn-info"
                    style="
                      margin-left: 2%;
                      background-color: #28a745;
                      color: #fff;
                      border-radius: 0.25rem;
                    "
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
                  :options="options_bar"
                  style="margin-left: 15%; width: 75%"
                />
              </div>
            </b-card-text>
          </b-tab>
          <b-tab
            v-on:click="mascotaVendidaG"
            title="Categoría de mascota más vendida (Top 5)"
          >
            <b-card-text>
              <div
                class="ancho centra box-shadow"
              >
                <h1
                  class="title-style"
                >
                  Categoría de mascota más vendida (Top 5)
                </h1>

                <line-chart
                  v-if="loaded_mascota"
                  :chartdata="mascotaPoint"
                  :options="options_line"
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
                    >
                      <b-icon icon="search"></b-icon>
                    </button>
                  </div>
                  <br />
                </div>

                <button
                  @click="mascotaVendidaG()"
                  class="btn btn-secondary mr-4"
                >
                  Total
                </button>
                <button
                  @click="menuBusquedaMVG()"
                  class="btn btn-info"
                  style="
                    margin-left: 2%;
                    background-color: #28a745;
                    color: #fff;
                    border-radius: 0.25rem;
                  "
                >
                  Filtrar por mes
                </button>
              </div>
            </b-card-text>
          </b-tab>
          <b-tab
            v-on:click="graficar_monto_tipo_pago"
            title="Ventas totales por tipo de pago"
          >
            <b-card-text>
              <div
                class="ancho centra box-shadow"
              >
                <h1
                  class="title-style"
                >
                  Gráfica de ventas totales por tipo de pago
                </h1>
                <bar-chart
                  v-if="loaded_tipo_pago"
                  :chartdata="chartdata_tipo_pago"
                  :options="options_bar"
                  style="margin-left:5%; width75%;"
                />
              </div>
            </b-card-text>
          </b-tab>
          <b-tab
            v-on:click="graficar_monto_tipo_pago_filtro"
            title="Ventas totales por tipo de pago con filtro de fechas"
          >
            <b-card-text>
              <div
                class="ancho centra box-shadow"
              >
                <h1
                  class="title-style"
                >
                  Gráfica de ventas totales por tipo de pago con filtro de
                  fechas
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
                    class="btn btn-info"
                    style="
                      margin-left: 2%;
                      background-color: #28a745;
                      color: #fff;
                      border-radius: 0.25rem;
                    "
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
                  :options="options_bar"
                  style="margin-left: 15%; width: 75%"
                />
              </div>
            </b-card-text>
          </b-tab>

          <b-tab
            v-on:click="paqueteriaUtilizadaG"
            title="Paquetería más popular"
          >
            <b-card-text>
              <div
                class="ancho centra box-shadow"
              >
                <h1
                  class="title-style"
                >
                  Paquetería más popular
                </h1>

                <bar-chart
                  v-if="loaded_paqueteria"
                  :chartdata="paqueteriaBar"
                  :options="options_bar"
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
                    >
                      <b-icon icon="search"></b-icon>
                    </button>
                  </div>
                  <br />
                </div>

                <button
                  @click="paqueteriaUtilizadaG()"
                  class="btn btn-secondary mr-4"
                >
                  Total
                </button>
                <button
                  @click="menuBusquedaPMPG()"
                  class="btn btn-info"
                  style="
                    margin-left: 2%;
                    background-color: #28a745;
                    color: #fff;
                    border-radius: 0.25rem;
                  "
                >
                  Filtrar por mes
                </button>
              </div>
            </b-card-text>
          </b-tab>
        </b-tabs>
      </b-card>

      <!-- Modal -->
      <modal name="info" :clickToClose="true" :width="480" :height="220">
        <div class="card">
          <div class="card-header">Error en búsqueda</div>
          <div class="card-body">
            <div class="card-text">
              <p>
                No fue posible encontrar información con la fecha especificada
              </p>
              <div style="text-align: right">
                <a href="#" class="btn btn-primary" @click="closeModal"
                  >Aceptar</a
                >
              </div>
            </div>
          </div>
        </div>
      </modal>
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
    selectedMonthMascota: "",
    selectedMonthPaqueteria: "",
    selectedMonthComprador: "",
    mascotaPoint: null,
    paqueteriaBar: null,
    compradorPie: null,
    paqueteriaOptions: null,
    hideMe: false,
    hideMePMPG: false,
    hideMeCMAG: false,
    message: "Seleccione una fecha a filtrar",
    tabIndex: 0,
    loaded: false,
    loaded_filtro: false,
    loaded_tipo_pago: false,
    loaded_tipo_pago_filtro: false,
    loaded_comprador: false,
    loaded_mascota: false,
    loaded_paqueteria: false,
    loaded_importe_total_ventas: false,
    loaded_importe_total_ventas_filtro: false,
    loaded_numero_ordenes_total_ventas: false,
    loaded_numero_ordenes_total_ventas_filtro: false,
    chartdata: null,
    chartdata_filtro: null,
    chartdata_tipo_pago: null,
    chartdata_tipo_pago_filtro: null,
    chartdata_importe_total_ventas: false,
    chartdata_importe_total_ventas_filtro: false,
    chartdata_numero_ordenes_total_ventas: false,
    chartdata_numero_ordenes_total_ventas_filtro: false,
    dateRange: "",
    fechaInicio: "",
    fechaFin: "",
    fechaInicio_tipo_pago: "",
    fechaFin_tipo_pago: "",
    fechaInicio_importe_total_ventas: "",
    fechaFin_importe_total_ventas: "",
    fechaInicio_numero_ordenes_total_ventas: "",
    fechaFin_numero_ordenes_total_ventas: "",
    options_line: {
      responsive: true,
      maintainAspectRatio: false,
      fill: false,
    },
    options_bar: {
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
    checkIn(val) {
      var fecha = moment(new Date(val)).format("YYYY-MM-DD");
      this.fechaInicio = fecha;
    },
    checkOut(val) {
      var fecha = moment(new Date(val)).format("YYYY-MM-DD");
      this.fechaFin = fecha;
    },
    checkIn_tipo_pago(val) {
      var fecha = moment(new Date(val)).format("YYYY-MM-DD");
      this.fechaInicio_tipo_pago = fecha;
    },
    checkOut_tipo_pago(val) {
      var fecha = moment(new Date(val)).format("YYYY-MM-DD");
      this.fechaFin_tipo_pago = fecha;
    },
    checkIn_importe_total_ventas(val) {
      var fecha = moment(new Date(val)).format("YYYY-MM-DD");
      this.fechaInicio_importe_total_ventas = fecha;
    },
    checkOut_importe_total_ventas(val) {
      var fecha = moment(new Date(val)).format("YYYY-MM-DD");
      this.fechaFin_importe_total_ventas = fecha;
    },
    checkIn_numero_ordenes_total_ventas(val) {
      var fecha = moment(new Date(val)).format("YYYY-MM-DD");
      this.fechaInicio_numero_ordenes_total_ventas = fecha;
    },
    checkOut_numero_ordenes_total_ventas(val) {
      var fecha = moment(new Date(val)).format("YYYY-MM-DD");
      this.fechaFin_numero_ordenes_total_ventas = fecha;
    },
    async graficar_monto_categoria_filtro() {
      this.loaded_filtro = false;
      try {
        const path_filtro =
          "/api/grafica-total-fechas-categoria-filtro.json?fechaFin=" +
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
          "/api/grafica-total-fechas-categoria.json"
        ).then((response) => response.json());
        this.chartdata = response.chartdata;
        this.loaded = true;
      } catch (e) {
        console.error(e);
      }
    },
    async graficar_monto_tipo_pago() {
      this.loaded_tipo_pago = false;
      try {
        const response = await fetch(
          "/api/grafica-tipo-pago.json"
        ).then((response) => response.json());
        this.chartdata_tipo_pago = response.chartdata;
        this.loaded_tipo_pago = true;
      } catch (e) {
        console.error(e);
      }
    },
    async graficar_monto_tipo_pago_filtro() {
      this.loaded_tipo_pago_filtro = false;
      try {
        const path_filtro =
          "/api/grafica-tipo-pago-rango.json?fechaFin=" +
          this.fechaFin_tipo_pago +
          "&fechaInicio=" +
          this.fechaInicio_tipo_pago;
        console.log(path_filtro);
        const response = await fetch(path_filtro).then((response) =>
          response.json()
        );
        this.chartdata_tipo_pago_filtro = response.chartdata;
        this.loaded_tipo_pago_filtro = true;
      } catch (e) {
        console.error(e);
      }
    },
    async graficar_importe_total_ventas() {
      this.loaded_importe_total_ventas = false;
      try {
        const response = await fetch(
          "/api/grafica-total-importe-ventas.json"
        ).then((response) => response.json());
        this.chartdata_importe_total_ventas = response.chartdata;
        this.loaded_importe_total_ventas = true;
      } catch (e) {
        console.error(e);
      }
    },
    async graficar_importe_total_ventas_filtro() {
      this.loaded_importe_total_ventas_filtro = false;
      try {
        const path_filtro =
          "/api/grafica-total-importe-ventas-filtro.json?fechaFin=" +
          this.fechaFin_importe_total_ventas +
          "&fechaInicio=" +
          this.fechaInicio_importe_total_ventas;
        console.log(path_filtro);
        const response = await fetch(path_filtro).then((response) =>
          response.json()
        );
        this.chartdata_importe_total_ventas_filtro = response.chartdata;
        this.loaded_importe_total_ventas_filtro = true;
      } catch (e) {
        console.error(e);
      }
    },
    async graficar_numero_ordenes_total_ventas() {
      this.loaded_numero_ordenes_total_ventas = false;
      try {
        const response = await fetch(
          "/api/grafica-total-numero-ordenes-ventas.json"
        ).then((response) => response.json());
        this.chartdata_numero_ordenes_total_ventas = response.chartdata;
        this.loaded_numero_ordenes_total_ventas = true;
      } catch (e) {
        console.error(e);
      }
    },
    async graficar_numero_ordenes_total_ventas_filtro() {
      this.loaded_numero_ordenes_total_ventas_filtro = false;
      try {
        const path_filtro =
          "/api/grafica-total-numero-ordenes-ventas-filtro.json?fechaFin=" +
          this.fechaFin_numero_ordenes_total_ventas +
          "&fechaInicio=" +
          this.fechaInicio_numero_ordenes_total_ventas;
        console.log(path_filtro);
        const response = await fetch(path_filtro).then((response) =>
          response.json()
        );
        this.chartdata_numero_ordenes_total_ventas_filtro = response.chartdata;
        this.loaded_numero_ordenes_total_ventas_filtro = true;
      } catch (e) {
        console.error(e);
      }
    },
    linkClass(idx) {
      if (this.tabIndex === idx) {
        this.graficar_monto_categoria();
        return ["bg-primary", "text-light"];
      } else {
        this.graficar_monto_categoria();
        return ["bg-light", "text-info"];
      }
    },
    closeModal() {
      this.$modal.hide("info");
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
    generadorDataset(dataObj) {
      let labels = [];
      let recolector = {};
      let data = {};
      Object.assign(data, {
        labels: [
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
          "Diciembre",
        ],
      });
      Object.assign(data, { datasets: [] });

      dataObj.chart.map(function (i) {
        if (!labels.includes(i.label)) {
          labels.push(i.label);
          recolector[i.label] = [];
          recolector[i.label].push([i.mes - 1, i.data]);
        } else {
          recolector[i.label].push([i.mes - 1, i.data]);
        }
      });

      let colores = this.coloresGenerador();
      let i = 0;
      for (let key in recolector) {
        let arrData = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        recolector[key].forEach(function (e) {
          for (var i = 0; i < 12; i++) {
            if (e[0] == i) {
              arrData[i] += e[1];
            }
          }
        });
        data.datasets.push({
          label: key,
          data: arrData,
          backgroundColor: colores[i],
        });
        i++;
      }
      return data;
    },
    async compradorG() {
      this.loaded_comprador = false;
      const { data } = await axios.get("/api/grafica-comprador-asiduo.json");
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
      this.loaded_comprador = true;
      this.hideMeCMAG = false;
    },
    async mascotaVendidaG() {
      this.loaded_mascota = false;
      const { data } = await axios.get("/api/grafica-mascota-mas-vendida.json");
      let colores = this.coloresGenerador();
      const source = {
        fill: false,
        borderWidth: 2,
        pointStyle: "triangle",
        pointRadius: 10,
        pointBorderColor: "rgb(0, 0, 0)",
      };
      let dataGenerada = this.generadorDataset(data);
      let i = 0;
      dataGenerada.datasets.map(function (e) {
        Object.assign(e, source);
        Object.assign(e, { borderColor: colores[i] });
        i++;
      });

      this.mascotaPoint = dataGenerada;
      this.showMe = true;
      this.loaded_mascota = true;
      this.hideMe = false;
    },
    async paqueteriaUtilizadaG() {
      this.loaded_paqueteria = false;
      const { data } = await axios.get("/api/grafica-paqueteria.json");
      console.log("data de paqueteria: " + JSON.stringify(data));
      this.paqueteriaBar = this.generadorDataset(data);
      this.hideMePMPG = false;
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
          let colores = this.coloresGenerador();
          const source = {
            fill: false,
            borderWidth: 2,
            pointStyle: "triangle",
            pointRadius: 10,
            pointBorderColor: "rgb(0, 0, 0)",
          };
          let dataGenerada = this.generadorDataset(data);
          let i = 0;
          dataGenerada.datasets.map(function (e) {
            Object.assign(e, source);
            Object.assign(e, { borderColor: colores[i] });
            i++;
          });
          this.mascotaPoint = dataGenerada;
        }
        if (objActual == "paqueteria") {
          this.paqueteriaBar = this.generadorDataset(data);
        }
      }
    },
    menuBusquedaCMAG() {
      this.hideMeCMAG = true;
    },
    menuBusquedaMVG() {
      this.hideMe = true;
    },
    menuBusquedaPMPG() {
      this.hideMePMPG = true;
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
        this.$modal.show("info");
      } else {
        this.buscarGrafica(true, data, "comprador");
      }
      this.loaded_comprador = true;
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
      if (data.chart.length == 0) {
        this.$modal.show("info");
      } else {
        this.buscarGrafica(true, data, "mascota");
      }
      this.loaded_mascota = true;
    },
    async findPaqueteriaUtilizada() {
      this.loaded_paqueteria = false;
      let fechas = this.generadorFechas(this.selectedMonthPaqueteria);
      const { data } = await axios.get(
        "/api/grafica-paqueteria-rango/" + fechas[0] + "/" + fechas[1] + ".json"
      );
      console.log(
        "Se filtra usando PaqueteriaUtilizada fechas:\n" +
          fechas[0] +
          " - " +
          fechas[1] +
          "\nCon los siguientes datos:" +
          JSON.stringify(data)
      );
      if (data.chart.length == 0) {
        this.$modal.show("info");
      } else {
        this.buscarGrafica(true, data, "paqueteria");
      }
      this.loaded_paqueteria = true;
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
.box-shadow{
    width: 95%;
    margin-top: 5%;
    box-shadow: #6c757d 2px 2px 15px 2px;
    border-radius: 7px;
    padding: 15px;
}
.title-style{
  margin-left: 15%;
  font-size: 28px;
  font-weight: bold;
  /*text-shadow: -1px -1px 1px #333;*/
}
</style>
