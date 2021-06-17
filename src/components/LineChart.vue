<script>
import { Line } from "vue-chartjs";

export default {
  extends: Line,
  mounted() {
    this.renderChart(
      {
        labels: [
          "Ene",
          "Feb",
          "Mar",
          "Abr",
          "May",
          "Jun"
        ],
        datasets: [
          {
            label: "Mascotas Vendidas",
            data: [5, 7, 4, 9, 6, 3, 10],
            backgroundColor: "transparent",
            borderColor: "rgba(1, 116, 188, 0.50)",
            pointBackgroundColor: "rgba(171, 71, 188, 1)"
          },
          {
            label: "Mascotas entregadas",
            data: [5, 6, 4, 1, 6, 8, 10],
            backgroundColor: "transparent",
            borderColor: "rgba(116, 1, 188, 0.50)",
            pointBackgroundColor: "rgba(171, 71, 188, 1)"
          }
        ]
      },
      {
        responsive: true,
        maintainAspectRatio: false,
        title: {
          display: true,
          text: "Total de Mascotas Vendidas en todo el anio"
        }
      }
    );
  }
};
</script>