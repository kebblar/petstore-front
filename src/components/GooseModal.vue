<template>
  <div>  
    <div class="background">
        <!-- TODO es ta perfecto!!! Hidden input file chooser -->
        <input 
            style="display: none" 
            type="file" 
            @change="setImage" 
            ref="fileInput" 
            accept="image/*" />

        <input
            ref="abreVentana"
            type="button"
            data-toggle="modal"
            data-target="#uploadModal"
            value="Abre ventana"
        />

        <!-- Result after crop -->
        <div class="cropped-image">
            <div class="foto" @click="fireChooser">
                <img class="croppedImage"
                    v-if="profilePicture" 
                    :src="profilePicture"
                    alt="Cropped Image"
                />
                <small id="black-label">Change Image</small>
            </div>
        </div>
        
        <!-- Modal for us to crop the given image -->
        <div id="uploadModal"
            class="modal fade"
            tabindex="-1"
            role="dialog">
            <div class="modal-dialog modal-md modal-dialog-centered" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Ajustes de imagen</h5>
                        <button
                            type="button"
                            class="close"
                            data-toggle="modal"
                            data-target="#uploadModal"
                            aria-label="Close">&times;</button>
                    </div>
                    <div class="modal-body mx-4 pb-4 " style="height: auto">
                        <div class="img-cropper">
                            <vue-cropper
                                id="cropper"
                                ref="cropper"
                                :src="selectedFile"
                                :aspectRatio="1/1"
                                preview=".preview"/>
                            <div class="container bg-dark2 text-light toolSet" >
                                <div class="d-flex align-content-center flex-wrap flex-row justify-content-around pt-1" >
                                    <div>
                                        <a href="#" @click.prevent="zoom(0.3)" title="zoom in" class="link">
                                            <i class="fa fa-search-plus text-light" aria-hidden="true"></i>
                                        </a>
                                    </div>
                                    <div>
                                        <a href="#" @click.prevent="zoom(-0.3)" title="zoom out" class="link">
                                            <i class="fa fa-search-minus text-light" aria-hidden="true"></i>
                                        </a>
                                    </div>
                                    <div>
                                        <a href="#" @click.prevent="rotate(45)" title="rotate right" class="link">
                                            <i class="fa fa-undo fa-flip-horizontal text-light" aria-hidden="true"></i>
                                        </a>
                                    </div>
                                    <div>
                                        <a href="#" @click.prevent="rotate(-45)" title="rotate left" class="link">
                                            <i class="fa fa-undo text-light" aria-hidden="true"></i>
                                        </a>
                                    </div>
                                    <div>
                                        <a href="#" @click.prevent="move(-10, 0)" title="move left" class="link">
                                            <i class="fa fa-arrow-left text-light" aria-hidden="true"></i>
                                        </a>
                                    </div>
                                    <div>
                                        <a href="#" @click.prevent="move(10, 0)" title="move right" class="link">
                                            <i class="fa fa-arrow-right text-light" aria-hidden="true"></i>
                                        </a>
                                    </div>
                                    <div>
                                        <a href="#" @click.prevent="move(0, -10)" title="move up" class="link">
                                            <i class="fa fa-arrow-up text-light" aria-hidden="true"></i>
                                        </a>
                                    </div>
                                    <div>
                                        <a href="#" @click.prevent="move(0, 10)" title="move down" class="link">
                                            <i class="fa fa-arrow-down text-light" aria-hidden="true"></i>
                                        </a>
                                    </div>
                                    <div>
                                        <a ref="flipX" href="#" @click.prevent="flipX" title="flip vertical" class="link">
                                            <i class="fas fa-ruler-vertical text-light"></i>
                                        </a>
                                    </div>
                                    <div>
                                        <a ref="flipY" href="#" @click.prevent="flipY" title="flip horizontal" class="link">
                                            <i class="fas fa-ruler-horizontal text-light"></i>
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <div class="d-flex container justify-content-around p-2">
                                <div class="row">
                                <small><i class="fas fa-file text-light"></i>{{fileName}}</small>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">

                        <button 
                            type="button" 
                            class="btn btn-dark"
                            @click="fireChooser">take file</button>



                        <button 
                            type="button" 
                            class="btn btn-dark" 
                            data-toggle="modal"
                            data-target="#uploadModal"                            
                            @click="cropImage">Select</button>
                            
                        <button 
                            type="button" 
                            class="btn btn-dark"
                            data-toggle="modal"
                            data-target="#uploadModal"
                            >Cancel</button>    
                    </div>
                </div>
            </div>
            <div v-if="active" class="modal-backdrop fade show"></div>
        </div>
        
    </div>
  </div>
</template>

<script>
import def from '../assets/default.jpg';
import VueCropper from 'vue-cropperjs';
import 'cropperjs/dist/cropper.css';

export default {
    components: {
        VueCropper
    },
    data() {
        return {
            active: false,
            profilePicture : '',
            originalPic : def,
            fileName : '',
            fileSize : 0,
            fileheight : 0,
            selectedFile : null,
            message :'',

            fileType : '',
            pictureChosen: false,
            fd:null,
            niceMessage:'',
            niceMessageArray:["Wow! Excelente elección", "Me encanta esa foto!", "Te ves genial!", "Gran cambio!"],
            errorMsg:'',
            ruta : '',
            finished : false,
            bigPic : true,
        }
    },
    mounted() {
        this.profilePicture = def;
    },
    //TODO es correcto
    methods: {
        resetImage() {
            this.message='';
            this.selectedFile=null;
            this.niceMessage='';
            this.pictureChosen=false;
            this.bigPic=true;
            this.errorMsg='';
        },

        setImage1(event){
            this.message ='';
            let file = event.target.files[0];
            let reader = new FileReader();
            reader.readAsArrayBuffer(file);
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
                    this.selectedFile = URL.createObjectURL(file);
                    this.fileName = file.name;
                    this.fileSize = file.size;
                    this.fileheight = file.height;
                    this.message='';
                    this.$refs.abreVentana.click();
                    this.$refs.cropper.replace(event.target.result);
                } else {
                    reader.abort();
                }
            }
            if(this.message.length<1) {
                reader.readAsDataURL(file);
            }
        },

        setImage(e) {
            const file = e.target.files[0];
            console.log(file.type)
            if (file.type.indexOf('image/') === -1) {
                console.log('Lo que se subió no era una imágen')
                this.message = "Por favor solamente elegir imagenes"
                return;
            }
            if (typeof FileReader === 'function') {
                const reader = new FileReader();
                reader.readAsArrayBuffer(file);
                reader.onload = (event) => {
                    /*
                    let header = "";
                    let arr = (new Uint8Array(e.target.result)).subarray(0, 4);
                    for (let i = 0; i < arr.length; i++) {
                        header += arr[i].toString(16)
                    }
                    this.fileType = this.getMimeType(header);
                    if (this.fileType === 'unknown') {
                        console.log('Lo que se subió no era una imágen')
                        this.message = "Por favor solamente elegir imagenes"
                        reader.abort();
                        return;
                     }
                    */
                    //this.fileType = this.getMimeType(file.type);
                    //this.imgSrc = event.target.result;
                    // rebuild cropperjs with the updated source
                    this.$refs.abreVentana.click();
                    this.$refs.cropper.replace(event.target.result);
                    
                };
                reader.onloadend = (a) => {
                    console.log(a);
                    if (this.message.length<1) {
                        this.selectedFile = URL.createObjectURL(file);
                        this.fileName = file.name;
                        this.fileSize = file.size;
                        this.fileheight = file.height;
                    } else {
                        reader.abort();
                        return;
                    }
                };
                if(this.message.length<1) {
                    reader.readAsDataURL(file);
                }
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
            this.profilePicture = this.$refs.cropper.getCroppedCanvas().toDataURL();
            //this.modalToggle();
        }
    }
}
</script>

<style scoped>

    .img-cropper{
      width: 100%;
      height: 100%;
    }
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
    
    @media only screen and (max-width: 575px) {
      .modal-dialog{
        position: relative;
        left: 20%;
        top:25%;
        display: table; /* This is important */
        overflow-y: auto;
        overflow-x: auto;
        width: auto;
        min-width: 300px;
      }
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
