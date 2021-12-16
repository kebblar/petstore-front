<template>
  <div class="ancho centra">
    <div class="card" >
      <div class="card-header">
        <img :src="getGravatarURL('arellano.gustavo@gmail.com')" class="avatar" />
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
              <br><label>Backend Versión: {{ version }}</label>
              <br><label>Frontend Versión: {{ frontVersion }}</label>
              <br><label>Ambiente: {{ ambiente }}</label>
              <br><label>Deployment node address: {{ address }}</label>
              <br><label>Perfil: {{ profile }}</label>
              <br><label>Reverse proxy address: {{ remote }}</label>
              <br><label>Client Remote address: {{ remote2 }}</label>
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
import md5 from 'md5';

export default {
    data: function () {
        return {
          frontVersion: process.env.VUE_APP_VERSION, 
          version: 'v',
          ambiente: 'am',
          address: 'ad',
          profile: 'pr',
          remote: 'rm',
          remote2: 'rm',
        }
    },
    mounted() {
      this.obten();
    },    
    components: {
      'Aviso': Aviso
    },
    methods: {
      getGravatarURL( email ) {
        // Trim leading and trailing whitespace from
        // an email address and force all characters
        // to lower case
        const address = String( email ).trim().toLowerCase();

        // Create an MD5 hash of the final string
        const hash = md5( address );

        // Grab the actual image URL
        return `https://www.gravatar.com/avatar/${ hash }`;
      },      
      open: function() {
        this.$refs.avisoComp.abre();
      },
      obten: function() {
        axios.get('/api/health?inputData=ls', {
        }).then(response => {
            this.version = response.data['app.backend.version'];
            this.ambiente= response.data['app.profile.identifier'];
            this.address = response.data['local.address.1'];
            this.profile = response.data['kebblar.profile'];
            this.remote  = response.data['remote.add'];
            this.remote2  = response.data['remote.add.2'];
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
.avatar {
  padding-right: 10px;
  margin-right: 10px;
}
</style>