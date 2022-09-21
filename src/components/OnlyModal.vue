<template>
    <!-- Modal for us to crop the given image -->
    <!-- TODO Make this componente reusable -->
    <div  class="modalx-overlay"  v-show="muestra">

        <!-- Hidden input file chooser -->
        <input 
            style="display: none" 
            type="file" 
            @change="setImage" 
            ref="fileInput" 
            accept="image/*" />

        <div class="modalx">
            <div class="modal-headerX">
                <div class="row">
                    <div class="col izquierda">
                        Image Selector
                    </div>
                    <div class="col">
                        <a href="#" class="modal-header-close" @click="toogleVentana">X</a>
                    </div>
                </div>
            </div>   
            <div class="img-cropper">
                <!-- Cropper -->
                <vue-cropper
                    ref="cropper"
                    :src=selectedFile
                    :img-style="{ 'width': 'auto', 'height': '266' }"
                    :aspectRatio=aspRad >
                </vue-cropper>
                <!-- Toolbox -->
                <div class="container bg-dark2 text-light toolSet" >
                    <div class="d-flex align-content-center flex-wrap flex-row justify-content-around pt-1" >
                        <div>
                            <a href="#" @click.prevent="zoom(0.3)" title="zoom in" class="link">
                                <i class="fa fa-search-plus" aria-hidden="true"></i>
                            </a>
                        </div>
                        <div>
                            <a href="#" @click.prevent="zoom(-0.3)" title="zoom out" class="link">
                                <i class="fa fa-search-minus" aria-hidden="true"></i>
                            </a>
                        </div>
                        <div>
                            <a href="#" @click.prevent="rotate(45)" title="rotate right" class="link">
                                <i class="fa fa-redo" aria-hidden="true"></i>
                            </a>
                        </div>
                        <div>
                            <a href="#" @click.prevent="rotate(-45)" title="rotate left" class="link">
                                <i class="fa fa-undo" aria-hidden="true"></i>
                            </a>
                        </div>
                        <div>
                            <a href="#" @click.prevent="move(-10, 0)" title="move left" class="link">
                                <i class="fa fa-arrow-left" aria-hidden="true"></i>
                            </a>
                        </div>
                        <div>
                            <a href="#" @click.prevent="move(10, 0)" title="move right" class="link">
                                <i class="fa fa-arrow-right" aria-hidden="true"></i>
                            </a>
                        </div>
                        <div>
                            <a href="#" @click.prevent="move(0, -10)" title="move up" class="link">
                                <i class="fa fa-arrow-up" aria-hidden="true"></i>
                            </a>
                        </div>
                        <div>
                            <a href="#" @click.prevent="move(0, 10)" title="move down" class="link">
                                <i class="fa fa-arrow-down" aria-hidden="true"></i>
                            </a>
                        </div>
                        <div>
                            <a ref="flipX" href="#" @click.prevent="flipX" title="flip vertical" class="link">
                                <i class="fas fa-ruler-vertical"></i>
                            </a>
                        </div>
                        <div>
                            <a ref="flipY" href="#" @click.prevent="flipY" title="flip horizontal" class="link">
                                <i class="fas fa-ruler-horizontal"></i>
                            </a>
                        </div>
                    </div>
                </div>
                <!-- Messages -->
                <div class="container justify-content-around p-2 bg-dark3">
                    <div class="row">
                        <div class="col">
                            <small><i class="fas fa-file"></i>  {{fileName}}</small>
                        </div>                                    
                    </div>
                    <div class="row">
                        <div class="col">
                            <small><i class="fas fa-ruler"></i>  {{ Math.trunc(fileSize/1024) }} kilo bytes</small>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-footerX">
                <button 
                    type="button" 
                    class="buttonX" 
                    @click="cropImage">Select</button>
                <button 
                    type="button" 
                    class="buttonX"
                    @click="toogleVentana"
                    >Cancel</button>    
            </div>
        </div>

    </div>
</template>

<script>
import def from '../assets/default.jpg';
//import test from './uploadFunction';
import VueCropper from 'vue-cropperjs';
import 'cropperjs/dist/cropper.css';


export default {
  props: ['aspRad'],
  components: {
      VueCropper
  },
  data() {
      return {
          profilePicture : def,
          selectedFile : def,
          fileName : '',
          fileSize : 0,
          ancho : 366,
          alto : 266,
          muestra : false
      }
  },
  //TODO we can make every validation much more detailed ....
  methods: {
      invalid(file) {
          let kb = 1024
          this.fileName = file.name
          this.fileSize = file.size

          //console.log(file)

          if(file.size<16 || file.size>9000*kb) return "image too small or image too large: " + file.size
          //if(file.height<16 || file.height>8000*kb) return "Image Height to big or image too small: " + file.height
          //if(file.width<16 || file.width>8000*kb) return "Image Width to big or image too small: " + file.width
          if(!file.type.includes('image')) return "This is not an image file: " + file.type
          return "";
      },
      toogleVentana() {
          this.muestra=!this.muestra;
      },
      setImage(e) {
          const file = e.target.files[0];
          
          let message = this.invalid(file)
          if(message.length>0) {
              alert(message)
              return
          }

          if (typeof FileReader === 'function') {
              const reader = new FileReader();
              reader.readAsDataURL(file);
              reader.onload = (e) => {
                  this.$refs.cropper.replace(e.target.result)
              };
              reader.onloadend = (f) => {
                  this.toogleVentana();
                  this.selectedFile = f.target.result;
              };
          } else {
              alert('Sorry, FileReader API not supported');
          }
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
      fireChooser() {
          this.$refs.fileInput.click();
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
      cropImage() { 
          this.profilePicture = this.$refs.cropper.getCroppedCanvas().toDataURL()
          this.procesaImagen(this.profilePicture)
          this.toogleVentana()
      },
      procesaImagen(img) {
        // enviando la imagen al padre:
                this.$emit('procesa-imagen', img)

        // pero aqui también se podría simplemente invocar al axios de guardado
        // algo asi como lo siguiente:
        //      let result = uploadComponent.uploadImage('/api/upload', img); // internamente, es un axcios call
        //      if (result.length>0) message(result)
        //console.log(test.pba())

      } // para este método, podría haber una propiedad que indique si hacer lo primero, lo segundo o ambos
  }
}
</script>

<style>
  .izquierda{
      text-align: left !important;
      margin-left: 10px;
  }
  .croppedImage {
      display: block;
      width: 200px;
      height: auto;
  }
  #black-label {
      color:#fff;
      font-size: .7em;
  }
  .close {
      margin: 10% 0 0 16px;
      cursor: pointer;
  }    
  .link {
      color: green;
  }
  .link:hover {
      color: red;
  }
  .bg-dark2 {
      background-color: #ccc;
  } 
  .bg-dark3 {
      background-color: #fff;
  }   
  .foto {
      position: relative;
      background-color: #ff0000;
      display: inline-block;
      text-align: center;
      border-radius: 50%;
      overflow: hidden;
      transition: transform .2s;
      box-shadow: rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px;  
  }
  .foto:hover {
      transform: scale(1.1);
  }
  .modalx-overlay {
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      display: flex;
      justify-content: center;
      background-color: #00000088;
      height:800px;
  }
  .modalx {
      text-align: center;
      background-color: white;
      height: 400px;
      width: 300px;
      margin-top: 5%;
  }
  .buttonX {
      background-color: #ccc;
      color:#000;
      width: 120px;
      height: 40px;
      font-size: 14px;
      border-radius: 8px;
      margin-top: 20px;
      margin-right: 5px;
      padding-right: 5px;
  }
  .buttonX:hover {
      background-color: #201b1d;
      color: white;
  }
  .modal-header-close {
      text-decoration: none;
      color: #ff0000;
      padding:10px;
  }
  .modal-header-close:hover {
      text-decoration: none;
      color: #ff0000;
  }
  .modal-headerX {
      text-align: right;
      height: 40px;
  }
</style>




<!-- 
  1) Crear el componente de front para selección y edición de un imagen
  2) Crear el endpoint REST en backend que me trae la imagen de perfil del usuario N
  3) Crear el endpoint REST en backend que me permite actualizar mi imagen de perfil
  4) Crear un procedimiento de watermark
  5) Publicar en internet las imagenes subidas viu un docker de nginx que las publique
  6) Escalar el procedimiento (ya hecho) de watermark via la clonación de El y un proxy en reversa para round robin
  7) Escalar la publicación de las imagenes via el uso de un cloud front de AWS
  8) Crear un procedimiento que mueva la imagen con WM del servidor que la procesó al bucket de AWS
-->
