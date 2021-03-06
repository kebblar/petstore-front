<template>
  <div>
    <div class="container">
        <form @submit.prevent="handleSubmit">
            <div class="form-group">
                <input type="file" @change="uploadFile" multiple>
            </div>
            <div class="form-group">
                <button class="btn btn-success btn-block btn-lg">Upload</button>
            </div>
        </form>
    </div>   
    <button @click="ok()">OK</button> 

    <br/>
    <hr/>
    <br/>

    <div class="container">
      <div class="row">
        <div class="col text-left">
            <div class="row fondo-gris">
                <!-- Foto y Titulo -->
                <div class="align-self-center mini-pad">
                  <!--img width="100px" v-bind:src="perfil.avatar" /-->
                  <img 
                    class="rounded-circle" 
                    width="48px" 
                    v-bind:src="perfil.avatar"
                    data-holder-rendered="true">
                </div>
                <div class="col text-center align-self-center">
                  <label class="letra">{{perfil.titulo}}</label>
                </div>
            </div>
            <div class="row">
              <div class="col">

                 <!-- seccion roja -->
                 <div class="row fondo-rojo-oscuro">
                   <div class="col text-right">
                    <label class="letra-blanca-simple" v-html="perfil.categoria" />
                    <label class="letra-blanca-simple">{{perfil.ubicacion}} - {{perfil.fechaPublicacion}}</label>
                   </div>
                 </div>
                 <!-- Fin seccion roja-->

                 <div class="row fondo-amarillo"><!-- seccion descripcion -->
                   <label v-html="perfil.descripcion" />
                 </div>

                 <div class="row"> <!-- seccion biometricos -->
                   <table class="bio">
                     <tr>
                       <td>Edad:</td><td class="borde">{{perfil.perfilBio.edad}}</td>
                       <td>Piel:</td><td class="borde">{{perfil.perfilBio.colorPiel}}</td>
                       <td>Idioma 1:</td><td class="borde">{{perfil.perfilBio.idioma1}}</td>
                       <td>Busto:</td><td class="borde">{{perfil.perfilBio.busto}}</td>
                     </tr>
                     <tr>
                       <td>Estatura:</td><td class="borde">{{perfil.perfilBio.estatura}}</td>
                       <td>Pelo:</td><td class="borde">{{perfil.perfilBio.colorPelo}}</td>
                       <td>Idioma 2:</td><td class="borde">{{perfil.perfilBio.idioma2}}</td>
                       <td>Cintura:</td><td class="borde">{{perfil.perfilBio.cintura}}</td>
                     </tr>
                     <tr>
                       <td>Peso:</td><td class="borde">{{perfil.perfilBio.peso}}</td>
                       <td>Ojos:</td><td class="borde">{{perfil.perfilBio.colorOjos}}</td>
                       <td>Idioma 3:</td><td class="borde">{{perfil.perfilBio.idioma3}}</td>
                       <td>Cadera:</td><td class="borde">{{perfil.perfilBio.cadera}}</td>
                     </tr>
                   </table>
                 </div>

                 <div class="row"> <!-- seccion pestañas -->

                  <!-- Tabs navs -->
                  <ul class="nav nav-tabs mb-3" id="ex1" role="tablist">
                    <li class="nav-item" role="presentation">
                      <a
                        class="nav-link active"
                        id="ex1-tab-1"
                        data-toggle="tab"
                        href="#ex1-tabs-1"
                        role="tab"
                        aria-controls="ex1-tabs-1"
                        aria-selected="true"
                        >Servicios</a
                      >
                    </li>
                    <li class="nav-item" role="presentation">
                      <a
                        class="nav-link"
                        id="ex1-tab-2"
                        data-toggle="tab"
                        href="#ex1-tabs-2"
                        role="tab"
                        aria-controls="ex1-tabs-2"
                        aria-selected="false"
                        >Tarifas</a
                      >
                    </li>
                    <li class="nav-item" role="presentation">
                      <a
                        class="nav-link"
                        id="ex1-tab-3"
                        data-toggle="tab"
                        href="#ex1-tabs-3"
                        role="tab"
                        aria-controls="ex1-tabs-3"
                        aria-selected="false"
                        >Contacto</a
                      >
                    </li>
                  </ul>
                  <!-- Tabs navs -->

                  <!-- Tabs content -->
                  <div class="tab-content" id="ex1-content">
                    <div id="ex1-tabs-1" role="tabpanel" aria-labelledby="ex1-tab-1" class="tab-pane fade show active">
                      <div v-for="(servicio, index) in perfil.servicios" :key="index"> 
                          <label class="serv" v-html="servicio" />
                      </div>
                    </div>
                    <div id="ex1-tabs-2" role="tabpanel" aria-labelledby="ex1-tab-2" class="tab-pane fade" >
                      <div v-for="(costo, index) in perfil.costos" :key="index"> 
                          <label class="serv" v-html="costo.tarifa" />
                      </div>
                    </div>
                    <div id="ex1-tabs-3" role="tabpanel" aria-labelledby="ex1-tab-3" class="tab-pane fade" >
                      <div v-for="(contacto, index) in perfil.contactos" :key="index"> 
                          <label class="serv" v-html="contacto.cnt" />
                      </div>
                    </div>
                  </div>
                  <!-- Tabs content -->

                 </div>

              </div>
              <div class="col-sm-5 text-right"> <!-- Electornic Sore -->
                  <div class="row">
                    <label>Electronic Store</label>
                  </div>
                  <div class="row">
                    
                  </div>
              </div>              
            </div>
        </div>

        <div class="col-sm-5 fondo-rojo">
        <div class="title-images">Scroll to view free content !</div>
        <div class="visor-imagenes visor-imagenes-altura">
          <div v-for="(img, index) in perfil.imagenes" :key="index"> 
            <div v-if="esVideo(img.url)">
              <video 
                width=300px 
                height=auto 
                preload="metadata"
                controls
                loop onmouseover="this.play()" onmouseout="this.pause();">
                <source :src="img.url" type="video/mp4">
                Your browser does not support the video tag.
              </video>
            </div>
            <div v-else>
              <img class="ancho-imagen" :src="img.url" /> 
            </div>
          </div>



        </div>
        </div><!-- columna de fotos -->

      </div>
    </div>
  </div>

</template>

<script>
import axios from "axios";
import profile from '../perfil.json'


export default {
  data() {
      return {
        files: null,
        perfil: profile
      };
    },
  methods: {
        esVideo(url) {
          //return url.endsWith("mp4");
          return url.indexOf("#t=") > -1
        },
        poster(url) {
          return url + ".png"
        },
        uploadFile (event) {
            this.files = event.target.files
        },
        ok() {
          console.log(this.perfil)
        },
        handleSubmit() {
          const formData = new FormData();
          for (const i of Object.keys(this.files)) {
            formData.append('files', this.files[i])
          }
          axios.post('/api/upload2.json', formData, {
          }).then((res) => {
            console.log(res)
          })
        }  
    }

}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Ballet&display=swap');
/*
Above from: https://fonts.google.com/specimen/Ballet?preview.text_type=custom&sidebar.open=true&selection.family=Ballet
*/
.container {
  max-width: 900px;
}
.fondo-azul {
  background-color: blue;
}
.fondo-rojo1 {
  background-color: #d7d7d7;
}
.fondo-amarillo {
  background-color: #f0f8d4;
  font-size: 10pt;
}
.fondo-rojo-oscuro {
  background-color: #770000;
}
.fondo-gris {
  background-color: #360611;
}
.mini-pad {
  padding-left: 2%;
}
.letra-blanca-simple {
  color:#fff;
  font-size: 10pt;
}
.letra {
  font-family: 'Ballet', cursive;
  font-size: 18pt;
  color:#e6e6e6;
  padding-top: 5%;
  font-weight: normal;
}
.title-images {
  background-color: #360611;
  padding: 6pt;
  margin-top: 0pt;
  color:#fff;
}
.visor-imagenes-altura {
    height: 400px;
}
.ancho-imagen {
  width: 300px;
  padding: 4pt;
}
.visor-imagenes {
  margin: auto;
  margin-top: 10pt;
  background-color: #000000;
  padding-top: 6px;
  overflow-y: scroll;
  margin-bottom: 40px;
  overflow: -moz-scrollbars-vertical; 
}
.bio {
  width: 100%;
  font-size: 8pt;
}

.borde {
  color: #000;
  border: 1px solid #ccc; border-width: 0 1px 0 0;
}

.serv {
  padding-left: 10pt;
  min-width: 200px;
}

.cuadro2 {
  border: thin;
  border-color: red;
  border-left: thin;
  border-style: dotted;
  width: 300px;
  height: 100px;
}

</style>
