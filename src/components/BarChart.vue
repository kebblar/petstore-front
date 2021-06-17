<script>
import { Bar } from 'vue-chartjs'
import axios from 'axios'

export default {
  extends: Bar,
  data: () => ({
    datos:[],
    chartdata: {
      labels: ['Dic-2020','Ene-2021','Feb-2021','Mar-2021','Abr-2021','May-2021'],
      datasets: [
        {
          label: 'Aracnidos',
          backgroundColor: '#a73a28',
          data: [40, 20, 5, 9, 0,11],
        },
        {
          label: 'Caninos',
          backgroundColor: '#7D80DA',
          data: [40, 20, 5, 9, 0, 6, 20],
        },
        {
          label: 'Felinos',
          backgroundColor: '#28A744',
          data: [60, 20, 5, 9, 0, 6, 20],
        },
        {
          label: 'Reptiles',
          backgroundColor: '#281144',
          data: [60, 20, 5, 9, 0, 6, 20],
        },
        {
          label: 'Aves',
          backgroundColor: '#CC1244',
          data: [60, 20, 5, 9, 0, 6, 20],
        },
        {
          label: 'Peces',
          backgroundColor: '#75A775',
          data: [60, 20, 5, 9, 0, 6, 20],
        },
        {
          label: 'Roedores',
          backgroundColor: '#282784',
          data: [60, 20, 5, 9, 0, 6, 20],
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false
    }
  }),
  
  methods: {
    getDatos () {
      const path = 'http://127.0.0.1:9999/api/grafica-total-fechas-categoria.json'
      axios.get(path).then(respuesta => {
        console.log(respuesta.data)
        this.chartdata = respuesta.data
      })
      .catch((error) => {
        console.log(error)
      })
    }
  },
  created () {
    
  },



  mounted () {
    this.getDatos()
    //console.log(this.datos)
    this.renderChart(this.chartdata , this.options)
  }
}
</script>


  