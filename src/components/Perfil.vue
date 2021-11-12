<template>
  <div class="background ">
    <div class="contenedor">
      <div class="row py-3 mx-auto">
        <div class="col text-center">
          <h3>Modificar foto de perfil</h3>
          </div>
      </div>
      <div class="row w-50 mx-auto mb-3">
          <div class="foto">
            <input style="display: none" type="file" @change="onFileSelected" ref="fileInput" accept="image/*">
            <img :src="profilePicture"
                 class="imagen"
                 data-toggle="modal"
                 data-target="#uploadModal"
                @click="resetImage">
            <small id="black-label">Cambiar foto</small>
          </div>
        <div class="row mx-auto text-center text-justify mt-2">
          <small v-if="!finished && !pictureChosen" class="text-secondary">Haz clic en la imagen para modificar tu foto</small>
          <p v-if="finished" class="text-primary">Tu foto ha sido actualizada!</p>
          <p class="text-danger">{{errorMsg}}</p>
        </div>
      </div>
      <div v-if="pictureChosen" class="container text-center my-2 mb-5">
        <p class="text-primary">{{niceMessage}}</p>
        <button :disabled="bigPic" class="btn btn-primary" type="button" @click="sendPicture">Elegir foto</button>
      </div>
    </div>
    <div class="modal fade" id="uploadModal" tabindex="-1" role="dialog">
      <div class="modal-dialog modal-lg modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="float-right bg-light">
            <button type="button" class="close mr-2" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>

          <div class="modal-body mx-4 pb-4" style="height: auto">
            <div v-if="selectedFile===null" class="container square text-primary" @click="$refs.fileInput.click()">
              <i class="fas fa-upload fa-6x"></i>
              <p class="pt-4">Haz clic para subir una imagen</p>
              <small class="text-secondary ">Tu foto no debe pesar mas de 2mb</small>
              <p class="text-danger">{{message}}</p>
            </div>
            <div v-else class="img-cropper">
              <vue-cropper
                  ref="cropper"
                  :src="selectedFile"
                  preview=".preview"
                  :viewMode="3"
                  :zoomable="true"
                  :aspectRatio="1/1"
                  :auto-zoom="true"
              />
              <div class="container bg-dark text-light toolSet" >
                <div class="d-flex align-content-center flex-wrap flex-row justify-content-around pt-1" >
                  <div>
                    <a href="#" @click.prevent="zoom(0.3)" >
                      <i class="fa fa-search-plus text-light" aria-hidden="true"></i>
                    </a>
                  </div>
                  <div>
                    <a href="#" @click.prevent="zoom(-0.3)">
                      <i class="fa fa-search-minus text-light" aria-hidden="true"></i>
                    </a>
                  </div>
                  <div>
                    <a href="#" @click.prevent="rotate(45)">
                      <i class="fa fa-undo fa-flip-horizontal text-light" aria-hidden="true"></i>
                    </a>
                  </div>
                  <div>
                    <a href="#" @click.prevent="rotate(-45)">
                      <i class="fa fa-undo text-light" aria-hidden="true"></i>
                    </a>
                  </div>
                  <div>
                    <a href="#" @click.prevent="move(-10, 0)">
                      <i class="fa fa-arrow-left text-light" aria-hidden="true"></i></a>
                  </div>
                  <div>
                    <a href="#" @click.prevent="move(10, 0)">
                      <i class="fa fa-arrow-right text-light" aria-hidden="true"></i></a>
                  </div>
                  <div>
                    <a href="#" @click.prevent="move(0, -10)">
                      <i class="fa fa-arrow-up text-light" aria-hidden="true"></i></a>
                  </div>
                  <div>
                    <a href="#" @click.prevent="move(0, 10)">
                      <i class="fa fa-arrow-down text-light" aria-hidden="true"></i></a>
                  </div>
                  <div>
                    <a ref="flipX" href="#" @click.prevent="flipX">
                      <i class="fas fa-ruler-vertical text-light"></i></a>
                  </div>
                  <div>
                    <a ref="flipY" href="#" @click.prevent="flipY">
                      <i class="fas fa-ruler-horizontal text-light"></i></a>
                  </div>
                </div>
              </div>
              <div class="d-flex container justify-content-around p-2">
                <p>Nombre: {{fileName}}</p>
                <p>{{fileSize/1000}}MB</p>
              </div>

              <div class="container text-center mt-1">
                <button type="button" class="btn btn-dark" data-dismiss="modal" @click="cropImage">Seleccionar como foto de perfil</button>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import store from "../store";
import axios from 'axios';
import def from '../assets/default.jpg';
import VueCropper from 'vue-cropperjs';
import 'cropperjs/dist/cropper.css';

export default {

  name: 'Perfil',
  components: {
    VueCropper
  },
   data() {
     return {
       originalPic : def,
       profilePicture : '',
       selectedFile : null,
       fileType : '',
       message : '',
       fileName : '',
       fileSize : 0,
       pictureChosen: false,
       fd:null,
       niceMessage:'',
       niceMessageArray:["Wow! Excelente elección", "Me encanta esa foto!", "Te ves genial!", "Gran cambio!"],
       errorMsg:'',
       ruta : '',
       finished : false,
       bigPic : true
     }
   } ,
  mounted() {
    this.getPicture();
    this.ruta = process.env.VUE_APP_URL_MEDIA;
  },
  methods: {
    resetImage() {
      this.message='';
      this.selectedFile=null;
      this.niceMessage='';
      this.pictureChosen=false;
      this.bigPic=true;
      this.errorMsg='';
    },
     getPicture() {
       axios.get('/api/get-foto-perfil/'+store.state.session.idUser+'.json', {"jwt":store.state.session.jwt}).then(response => {
         if (response.data !== null && response.data.foto !== null) {
           this.profilePicture = this.ruta+response.data.foto;
           this.originalPic = this.ruta+response.data.foto;
           this.fileName = response.data.foto;
         } else {
           this.profilePicture = def;
           this.fileName = 'demo';
         }
       }).catch(error => {
         console.log(error);
         this.profilePicture = def;
         this.msgErr = "No podemos cargar tu configuración en este momento";
       })
     },

    cropImage() {
      this.profilePicture = this.$refs.cropper.getCroppedCanvas().toDataURL(this.fileType, 0.5);
      this.pictureChosen = true;
      this.fd = new FormData();
      this.$refs.cropper.getCroppedCanvas().toBlob((b) => {
        if(b.size>20097152){
          this.errorMsg='El archivo seleccionado es demasiado grande, recortalo por favor';
        } else {
          this.bigPic=false;
          this.fd.append('image', b);
          this.niceMessage = this.niceMessageArray[Math.floor((Math.random()*this.niceMessageArray.length))]
          this.errorMsg='';

        }
      });
     },
    sendPicture(){
      const headers = {
        "Content-Type": "multipart/form-data",
        "Access-Control-Allow-Origin": "*",
        "jwt": store.state.session.jwt,
        "idUser": store.state.session.idUser
      };
      axios.post("/api/foto-perfil.json", this.fd, {
        headers
      }).then(response =>{
        console.log(response.data);
        this.profilePicture = this.ruta+response.data.nuevoNombre;
        this.originalPic = this.ruta+response.data.nuevoNombre;
        this.resetImage();
        this.finished =true;
      }).catch(error => {
            console.log(error.response);
            if (error.response.data['invalid-token']===null) {
              this.errorMsg = 'Tu sesión ha expirado, por favor recarga la página';
            }
            if( error.response.data.exceptionTypeNumber===1020) {
              this.errorMsg= error.response.data.exceptionLongDescription;
            } else {
             this.errorMsg = 'Ha ocurrido un error con tu archivo, inténtalo más tarde';
            }
            this.profilePicture = this.originalPic;
            this.resetImage();
      });
    },
    onFileSelected(event){
      this.message ='';
      let blob = event.target.files[0];
      let reader = new FileReader();
      reader.readAsArrayBuffer(blob);
      reader.onload = (e) => {
         let header = "";
         let arr = (new Uint8Array(e.target.result)).subarray(0, 4);
         for (let i = 0; i < arr.length; i++) {
           header += arr[i].toString(16);
         }
         this.fileType = this.getMimeType(header);
         if (this.fileType === 'unknown') {
           console.log('Lo que se subió no era una imágen');
           this.message = "Por favor solamente elegir imagenes";
         }
      };
      reader.onloadend = (a) => {
        console.log(a);
         if (this.message==='') {
           this.selectedFile = URL.createObjectURL(blob);
           this.fileName = blob.name;
           this.fileSize = blob.size;
           this.message='';
         } else {
           reader.abort();
         }
       };
     },

    getMimeType(header) {
      switch (header) {
        case "89504e47":
          return "image/png";
        case "47494638":
          return "image/gif";
        case "ffd8ffe0":
        case "ffd8ffe1":
        case "ffd8ffe2":
        case "ffd8ffe3":
        case "ffd8ffe8":
          return "image/jpeg";
        default:
          return "unknown";
      }
    },

      flipX() {
        const dom = this.$refs.flipX;
        let scale = dom.getAttribute('data-scale');
        scale = scale ? -scale : -1;
        this.$refs.cropper.scaleX(scale);
        dom.setAttribute('data-scale', scale);
      },
      flipY() {
        const dom = this.$refs.flipY;
        let scale = dom.getAttribute('data-scale');
        scale = scale ? -scale : -1;
        this.$refs.cropper.scaleY(scale);
        dom.setAttribute('data-scale', scale);
      },
      rotate(deg) {
        this.$refs.cropper.rotate(deg);
      },
      move(offsetX, offsetY) {
        this.$refs.cropper.move(offsetX, offsetY);
      },
      zoom(percent) {
        this.$refs.cropper.relativeZoom(percent);
      },
    }
  }
</script>
<style scoped>

.background {
  background-image: url(https://images.adsttc.com/media/images/5d44/14fa/284d/d1fd/3a00/003d/large_jpg/eiffel-tower-in-paris-151-medium.jpg?1564742900);
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-position: center center;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
  padding: 5% 0;
}

.contenedor {
  height: auto;
  width: 70%;
  background: white;
  position: relative;
  right: 10%;
  left: 15%;
  border-radius: 5px;
  padding: 2% 2%;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset;
}

.foto {
  margin: 8%;
  width: 84%;
  text-align: center;
  border-radius: 50%;
  overflow: hidden;
  position: relative;
  transition: transform .2s;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px;  }

.foto:hover {
  transform: scale(1.1);
}

.square {
  height: auto;
  width: 100%;
  background-color: #e6ebef;
  text-align: center;
  border-radius: 10px;
  padding: 10% 2%;
  cursor: pointer;
}

.toolSet {
  position: relative;
  top: 1%;
  right: 0;
  left: 0;
  z-index: 1;
  box-sizing:border-box;
  opacity: 0.8;
  width: 100%;
  border-radius: 0 0 10px 10px;
}

.imagen {
  width: 100%;
  object-fit: contain;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  cursor: pointer;
}

.options{
  list-style-type: none;
  padding-left: 15%;
}

li {
  margin-top: 15%;
  line-height: 95%;
}
#black-label {
  position: absolute;
  margin: auto auto;
  left: 0;
  right: 0;
  bottom: -25%;
  height: 25%;
  padding-top: 5%;
  text-align: center;
  display: block;
  color: #f5eded;
  font-size: 10px;
  background-color: rgba(21, 21, 21, 0.44);
  transition: .5s ease;
}

.imagen:hover ~ #black-label {
  position: absolute;
  bottom: 0%;
}


@media only screen and (max-width: 575px) {
  #black-label {
    font-size: 65%;
  }
}
@media only screen and (min-width: 675px) {
    #black-label {
      font-size: 100%;
    }
  }



</style>