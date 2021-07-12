<template>
  <div class="ancho centra">
    <div class="card" >
      <div class="card-header">
        <label class="h4">Créditos</label>
      </div>

      <div class="container">
        <div class="row">
          <div class="col-12 col-md-6 col-lg-3">
            <p class="cabecera">Equipo Azul</p>
            Edgar Eduardo Uribe Mendez<br>
            Fabiola Camilo Victoriano<br>
            Javier Chávez Barrios<br>
            Luz del Carmen Cuahonte Reyes<br>
            Maria Isabel Contreras García<br>
            <hr>
          </div>
          <div class="col-12 col-md-6 col-lg-3">
            <p class="cabecera">Equipo CodingLove</p>
            Juan Jesús Gómez Sotelo<br>
            Luis Ángel Martínez<br>
            Marco Antonio Santiago García<br>
            Marco Antonio Tapia Cervantes<br>
            <hr>
          </div>
          <div class="col-12 col-md-6 col-lg-3">
            <p class="cabecera">Equipo CloudStore</p>
            Josué Israel Romero Velasco<br>
            Diego González Sánchez<br>
            Francisco Javier Moreno Romero<br>
            José Francisco Espinosa Romero<br>
            Ulises Alejandro López Urbina<br>
            <hr>
          </div>
          <div class="col-12 col-md-6 col-lg-3">
            <p class="cabecera">Equipo Vimpollos</p>
            Fhernanda Montserrat Romo Olea<br>
            Luis Eduardo Martínez Hernández<br>
            Daniel Omar Alvarez Morales<br>
            Lizbeth Leal García<br>
            <hr>
          </div>
        </div>
      </div>

      <div class="leyenda">
        <hr style="width:99%"/>
        <div class="row">
          <div class="col">
            <a href='#' @click="open">Aprender, Enseñar y Trascender... esa es la misión.</a>
            <div class="info">
            <br><label>Versión: {{ version }}</label>
            <br><label>Ambiente: {{ ambiente }}</label>
            <br><label>Local address: {{ address }}</label>
            <br><label>Perfil: {{ profile }}</label>
            <br><label>Remote address: {{ remote }}</label>
            </div>
          </div>
        </div>
      </div>

    </div>

    <br>

    <Aviso
      ref='avisoComp'
      ancho='320'
      :target=destino
      :avisoMsg=listo
      avisoTitulo='Con la participación especial de...' />

  </div>
</template>

<script>
import axios from 'axios'
import Aviso from './custom/dialog/Aviso';

export default {
    data: function () {
        return {
          version: 'v',
          ambiente: 'am',
          address: 'ad',
          profile: 'pr',
          remote: 'rm'
        }
    },
    mounted() {
      this.obten();
    },    
    components: {
      'Aviso': Aviso
    },
    methods: {
      open: function() {
        this.$refs.avisoComp.abre();
      },
      obten: function() {
        axios.get('/api/health.json?inputData=ls', {
        }).then(response => {
            this.version = response.data['app.backend.version'];
            this.ambiente= response.data['app.profile.identifier'];
            this.address = response.data['local.address.1'];
            this.profile = response.data['kebblar.profile'];
            this.remote  = response.data['remote.add'];
        })
      },
    },
    computed: {
      listo: function() {
        return 'Super Goose Arellano !!! '
      },
      destino: function() {
        return ''
      }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.cabecera {
  margin-top: 10px;
  color:#ff0000;
}
.leyenda {
  text-align:center; 
  margin-bottom:20px;
}
.info {
  font-size: 10px;
  color: #330000;
}
</style>