<template>
  <div class="lego">
    <div class="container-fluid">	<!-- Esto es un contenedor -->
      <div class="container-header"> <!-- Esto es la cabecera de un conenedor. -->
        <h2> Nombre\s Apellido_P Apellido_M </h2>
        <h4 style="color:#839192"> {{salta.mail}} </h4>
      </div>
      <div class="container-sidebar">
        <p style="color: white"> Calificación. ({{calificacion}}) </p>
        <div class="p-2">
          <span class="fa fa-star checked" v-for="j in calificacion" :key="j"></span>
          <span class="fa fa-star" v-for="i in (5-calificacion)" :key="i"></span>
        </div>
      </div>
      <div class="container-body">
        <p> Aqui se puede poner más información del usuario. </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import url(https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css);

.lego{
	padding-bottom: 7.5rem;
}

.container-fluid {
	display: block;
	width: 95%;
	margin-left: 10px;
	margin: auto;
	font-family: sans-serif;
}

.container-header {
	display: block;
	border-radius: .25rem;
	margin-bottom: 5px;
}

.container-sidebar {
	display: block;
	float: right;
	width: 150px;
	margin-bottom: 200px;
	background-color: #34495E;
	border-radius: .25rem;
	text-align: center;
	font-size: 16px;
	font-family: sans-serif;
}

.container-body {
	display: block;
	margin-right: 9.5rem;
	background-color: #F4F6F7;
	border-radius: .25rem;
	font-size: 16px;
	font-family: sans-serif;
}

.checked {
	color: orange;
}

.fa-star {
  width: 20px;
}
</style>

<script>
import store from '../store'
import axios from 'axios';

export default {
  data() {
    return {
      salta: store.state.estado.usuario,
      calificacion : 0
    }
  },
  mounted () {
    this.getCalificacion(this.salta.id);
  },
  methods: {
    getCalificacion : function(idUsuario) {
      axios.get('/api/getcalificacion.json',
      {
        params: {
          idUsuario : idUsuario
        }
      },
      {
        headers: {
          'Content-type': 'application/json',
          'crossDomain': true,
          'Acces-Control-Allow-Origin': '*'
        }
      }).catch(error => {
        alert(error)
      }).then(response => {
        console.log(response.data);
        this.calificacion = Math.floor(response.data);
      }).finally(() => {
        this.loading =  false
      });
    }
  }
}
</script>
