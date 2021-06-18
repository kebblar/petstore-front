
<script>
import { Bar } from 'vue-chartjs';
import axios from 'axios';

export default {
  extends: Bar,
  data () {
    return {
      chartdata: {},
      options: {
        responsive: true,
        maintainAspectRatio: false
      }
    }
  },

  mounted () {
    axios.get('/api/grafica-total-fechas-categoria.json').then(response => {
      this.chartdata = response.data;
      this.renderChart(this.chartdata.chartdata , this.options);
      console.log(response.data);
    }).catch((error) => {
      console.log(error)
    });
  }

}
</script>


  