<template>
  <div class="centra">
<!--input referenciado para la subida de imagenes-->
    <input ref="input" type="file" name="image" accept="image/*" @change="setImage" />

    <div class="section mx-auto mt-3 p-0 p-md-2 p-lg-5" style="width: 90%; box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;">
      <div class="card w-100" style="border: 0">
        <div class="card-header" style="border: 0">
          <div class="row">
            <div class="col mx-auto text-center">
              <div class="h5 my-auto">Ajuste y carga de imagenes a la nube</div>
            </div>
          </div>
        </div>
        <div class="card-body pt-2" style="position: relative">
<!--          Toolset -->
          <div class="container bg-dark text-light toolset my-1">
            <div class="row no-gutters">
              <div class="col-md-6 col-12">
                <div class="d-flex align-content-center flex-wrap flex-sm-row justify-content-around pt-1" >
                  <div>
                    <a href="#" @click.prevent="zoom(0.2)" title="zoom in">
                      <i class="fa fa-search-plus text-light" aria-hidden="true"></i>
                    </a>
                  </div>

                  <div>
                    <a href="#" @click.prevent="zoom(-0.2)" title="zoom out">
                      <i class="fa fa-search-minus text-light" aria-hidden="true"></i>
                    </a>
                  </div>
                  <div>
                    <a href="#" @click.prevent="rotate(45)"  title="rotate right">
                      <i class="fa fa-undo fa-flip-horizontal text-light" aria-hidden="true"></i>
                    </a>
                  </div>
                  <div>
                    <a href="#" @click.prevent="rotate(-45)"  title="rotate left">
                      <i class="fa fa-undo text-light" aria-hidden="true"></i>
                    </a>
                  </div>
                  <div>
                    <a href="#" @click.prevent="move(-10, 0)" title="move left">
                      <i class="fa fa-arrow-left text-light" aria-hidden="true"></i></a>
                  </div>
                </div>
              </div>
            <div class="col">
              <div class="d-flex align-content-center flex-wrap flex-sm-row justify-content-around pt-1" >
                <div>
                  <a href="#" @click.prevent="move(10, 0)" title="move right">
                    <i class="fa fa-arrow-right text-light" aria-hidden="true"></i></a>
                </div>
                <div>
                  <a href="#" @click.prevent="move(0, -10)" title="move up">
                    <i class="fa fa-arrow-up text-light" aria-hidden="true"></i></a>
                </div>
                <div>
                  <a href="#" @click.prevent="move(0, 10)" title="move down">
                    <i class="fa fa-arrow-down text-light" aria-hidden="true"></i></a>
                </div>
                <div>
                  <a ref="flipX" href="#" @click.prevent="flipX" title="Mirror H">
                    <i class="fas fa-ruler-vertical text-light"></i></a>
                </div>
                <div>
                  <a ref="flipY" href="#" @click.prevent="flipY" title="Mirror V">
                    <i class="fas fa-ruler-horizontal text-light"></i></a>
                </div>
              </div>
            </div>
            </div>
          </div>
<!--          Toolset end-->
          <div class="w-100">
            <div class="img-cropper">
              <vue-cropper
                  ref="cropper"
                  :src="imgSrc"
                  preview=".preview"
              />
            </div>
            </div>

<!--          Barra herramientas inferior-->
          <div class="container-fluid bg-dark my-1 w-50">
            <div class="d-flex align-content-center flex-nowrap flex-row justify-content-center pt-1">
              <div class="mx-0">
                <a href="#" class="btn" @click.prevent="cropImage" title="Accept selection">
                  <i class="fas fa-check text-light"></i>
                </a>
              </div>
              <div class="mx-0">
                <a href="#" class="btn" @click.prevent="showFileChooser" title="Load new Image">
                  <i class="fa fa-camera text-light" aria-hidden="true"></i>
                </a>
              </div>
              <div class="mx-0">
                <a href="#" class="btn" @click.prevent="reset" title="reset default">
                  <i class="fas fa-window-close text-light"></i>
                </a>
              </div>
            </div>
          </div>
          <!--        End barra de herramientas inferior-->
          </div>


        <div class="container-fluid">

          <div class="row my-3">
            <div class="col text-center" v-if="verifica">
              <div class="seleccion">
                <h3>Archivos seleccionados</h3>
                <div class="preview7" />
                <hr/>

                <!--
                <p>Imagen ajustada</p>
                <div class="cropped-image">
                  <img
                    v-if="cropImg"
                    :src="cropImg"
                    alt="Cropped Image"
                  />
                  <div v-else class="crop-placeholder" />
                  <br><label>Nuevo tamaño: {{ this.newSize }}</label>
                  <br><label>Nuevo tipo: {{ this.newType }}</label>
                </div>
                -->

                <table  class="table table-hover table-sm table-striped">
                  <thead class="thead-dark centered">
                  <tr style="text-align:center;">
                    <th></th>
                    <th>Tamaño</th>
                    <th>Borrar</th>
                    <th>Subir</th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr class="text-center" v-for="(renglon, index) in caja" :key="index">
                    <td>
                      <img :src=renglon.picture width="40" />
                    </td>
                    <td>
                      {{ renglon.tam }} kb
                    </td>
                    <td>
                      <a href="#" @click.prevent="elimina(index)"><i class="fa fa-trash" aria-hidden="true"></i></a>
                    </td>
                    <td>
                      <a href="#" @click.prevent="subir(index)"><i class="fa fa-upload" aria-hidden="true"></i></a>
                    </td>
                  </tr>
                  </tbody>
                </table>

                <br>

                <div>
                  <a href="#" class="btn btn-success" alt="hola" @click.prevent="sube">
                    <i class="fa fa-upload" aria-hidden="true"></i> Subir imagenes </a>
                </div>

              </div>
            </div>

            <div class="w-100"></div>

            <div class="col">
              <div id="accordion2">
                <div class="card">
                  <div class="card-header" id="headingTwo">
                    <a href="#" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo"><i class="fa fa-info-circle" aria-hidden="true"></i> info</a>
                  </div>
                  <div id="collapseTwo" class="collapse" aria-labelledby="headingTwo" data-parent="#accordion2">
                    <div class="card-body">
                      <label>Nombre: {{ this.fileName }}</label><br>
                      <label>Tamaño: {{ this.fileSize }} bytes</label><br>
                      <label>Tipo: {{ this.fileType }}</label><br>
                    </div>
                  </div>
                </div>
              </div>
              <ul v-for="(url, index) in respuesta" :key="index">
                <li>
                  <a :href=salta(url.nuevoNombre) target="_blank">liga {{ index }}</a>
                </li>
              </ul>
            </div>
          </div>

        </div>
      </div>
    </div>


  </div>
</template>

<script>
import axios from 'axios';
import store from '../store';
import VueCropper from 'vue-cropperjs';
import 'cropperjs/dist/cropper.css';
import Vue from 'vue';
import VueToast from 'vue-toast-notification';

Vue.use(VueToast);

export default {
  components: {
    VueCropper,
  },
  data() {
    return {
      imgSrc: 'https://3.bp.blogspot.com/--C1wpaf_S4M/W7V__10nRoI/AAAAAAAAK24/1NSfapuYSIY0f0wzXY9NgoH0FjQLT07YACKgBGAs/s1600/maxresdefault.jpg',
      cropImg: 'x',
      data: null,
      formData: new FormData(),
      newType: 'image/unknown',
      fileType: 'image/unknown',
      fileName: 'unknown',
      fileSize: 0,
      fileId: 0,
      newSize: 0,
      caja:[],
      respuesta:[],
      url_img: process.env.VUE_APP_URL_MEDIA
    };
  },
  computed: {
    verifica(){
      return (this.caja.length !== 0)
      }
  },
  methods: {

    sube() {
      const headers = {
        "Content-Type": "multipart/form-data",
        "Access-Control-Allow-Origin": "*",
        "jwt": store.state.session.jwt,
        "idAnuncio":1
      }; 
      axios.post("/api/up/imagen2", this.formData, { 
        headers 
      }).then(response =>{ 
        this.respuesta = response.data;
      }).catch(error => {
        let currentMsg='';
        if(error.response && error.response.data && error.response.data.exceptionLongDescription) {
          currentMsg = error.response.data.exceptionLongDescription;
        } else {
          currentMsg = error;
        }
        Vue.$toast.open({
            message: currentMsg,
            type: 'error',
            duration: 5000,
            position:'top'
        });
      });
      this.formData = new FormData();
      this.caja = [];
    },
    elimina(index){
      var fileid = this.caja[index].id
      this.caja.splice(index,1)
      var arr = this.formData.getAll("file")
      for (var i=0; i<arr.length; i++) {
        if (fileid == arr[i].name) {
          arr.splice(i,1)
          console.log("listo")
        }
      }
      this.formData = new FormData();
      for(var v of arr){
        this.formData.append("file", v)
      }
    },
    subir(index){
      console.log(index)
      var caja2 = this.caja
      var fileid = this.caja[index].id
      this.caja.splice(index, 1);
      var arr = this.formData.getAll("file")
      this.formData = new FormData();
      for (var i=0; i<arr.length; i++) {
        if (fileid == arr[i].name) {
          this.formData.append("file",arr[i])
          this.sube()
          arr.splice(i,1)
        }
      }
      this.formData = new FormData();
      this.caja = caja2
      for(var v of arr){
        this.formData.append("file", v)
      }
    },

    cropImage() {
      this.fileId +=1;
      this.cropImg = this.$refs.cropper
        .getCroppedCanvas()
        .toDataURL(this.newType, 0.5);

      this.$refs.cropper
        .getCroppedCanvas()
        .toBlob(blob => {
            this.newSize = blob.size;
            this.formData.append("file", blob, this.fileId);
            this.caja.push({
              'id':this.fileId,
              'picture':this.cropImg, 
              'tam':this.calc(this.newSize/1000), 
              'tipo':this.newType
              });               
          }, 
          this.newType, 
          0.8
        );
     
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
    getCropBoxData() {
      this.data = JSON.stringify(this.$refs.cropper.getCropBoxData(), null, 4);
    },
    getData() {
      this.data = JSON.stringify(this.$refs.cropper.getData(), null, 4);
    },
    move(offsetX, offsetY) {
      this.$refs.cropper.move(offsetX, offsetY);
    },
    reset() {
      this.$refs.cropper.reset();
    },
    rotate(deg) {
      this.$refs.cropper.rotate(deg);
    },
    setCropBoxData() {
      if (!this.data) return;
      this.$refs.cropper.setCropBoxData(JSON.parse(this.data));
    },
    setData() {
      if (!this.data) return;
      this.$refs.cropper.setData(JSON.parse(this.data));
    },

    setImage(e) {
      const file = e.target.files[0];

      if (typeof FileReader === 'function') {
        var reader = new FileReader();

        reader.onload = (event) => {
          this.imgSrc = event.target.result;
          console.log(this.imgSrc)
          this.fileType = this.dataURLtoMimeType(this.imgSrc);
          console.log(this.fileType)
          if (this.fileType === 'unknown') {
            Vue.$toast.open({
              message: "Sólo seleccionar imágenes, por favor",
              type: 'error',
              duration: 5000,
              position:'top'
            });
            return;
          }
          // rebuild cropperjs with the updated source
          this.$refs.cropper.replace(event.target.result);
        };

        this.fileType = file.type;
        this.fileName = file.name;
        this.fileSize = file.size;

        reader.readAsDataURL(file);
      } else {
        alert('Sorry, FileReader API not supported');
      }
    },
    showFileChooser() {
      this.$refs.input.click();
    },
    zoom(percent) {
      this.$refs.cropper.relativeZoom(percent);
    },

    dataURLtoMimeType(dataURL) {
        // FROM: https://github.com/fengyuanchen/cropper/issues/542
        var mimeType = 'unknown';
        var contentType = [];
        var parts = [];
        var i = 0;

        var data;

        if(contentType==null) console.log("raro");

        if (dataURL.indexOf(';base64,') == -1) {
            parts = dataURL.split(',');
            contentType = parts[0].split(':')[1];
            data = decodeURIComponent(parts[1]);
        } else {
            parts = dataURL.split(';base64,');
            contentType = parts[0].split(':')[1];
            var raw = window.atob(parts[1]);
            var rawLength = raw.length;

            data = new Uint8Array(rawLength);

            for (i = 0; i < rawLength; ++i) {
                data[i] = raw.charCodeAt(i);
            }
        }

        var arr = data.subarray(0, 4);
        console.log(arr)
        var header = "";
        for(i = 0; i < arr.length; i++) {
            header += arr[i].toString(16);
        }
        this.newType = "image/png";
        switch (header) {
            case "3c3f786d":
                mimeType = "image/svg+xml";
                break;                
            case "52494646":
                mimeType = "image/webp";
                this.newType = "image/jpeg";
                break;                
            case "89504e47":
                mimeType = "image/png";
                break;
            case "47494638":
                mimeType = "image/gif";
                break;
            case "ffd8ffe0":
            case "ffd8ffe1":
            case "ffd8ffe2":
                mimeType = "image/jpeg";
                this.newType = "image/jpeg";
                break;
            default:
                mimeType = "unknown"; // Or you can use the blob.type as fallback
              this.newType = "unknown"
                break;
        }
        return mimeType;
    },
    calc(num) {
      return num.toString().match(/^-?\d+(?:\.\d{0,2})?/)[0]
    },
    salta(url) {
      return this.url_img+'_'+url
    }
  },

};
</script>

<style scoped>

.ancho {
    max-width: 700px;
    min-width: 360px;
    padding: 10px;
}

input[type="file"] {
  display: none;
}

.toolset {
  position: relative;
  right: 0;
  left: 0;
  box-sizing:border-box;
  width: 100%;
  padding-top: 3px;
}

.content {
  display: flex;
  justify-content: space-between;
}

.cropper-area {
  width: 400px;
}

.quita-margen {
  margin: 0;
}

/*.tooltip {*/
/*  position: relative;*/
/*  display: inline-block;*/
/*  border-bottom: 1px dotted black;*/
/*}*/

/*.tooltip .tooltiptext {*/
/*  visibility: hidden;*/
/*  width: 120px;*/
/*  background-color: black;*/
/*  color: #fff;*/
/*  text-align: center;*/
/*  border-radius: 6px;*/
/*  padding: 5px 0;*/

/*  !* Position the tooltip *!*/
/*  position: absolute;*/
/*  z-index: 1;*/
/*}*/

/*.tooltip:hover .tooltiptext {*/
/*  visibility: visible;*/
/*}*/

.seleccion {
  margin-top: 1rem;
}


textarea {
  width: 100%;
  height: 100px;
}

.preview-area {
  width: 400px;
}

.preview-area p {
  font-size: 1.25rem;
  margin: 0;
  margin-bottom: 1rem;
}

.preview-area p:last-of-type {
  margin-top: 1rem;
}

.preview {
  height: calc(372px * (9 / 16));
  overflow: hidden;
  background-color: #b6b6b6;
}

.crop-placeholder {
  width: 100%;
  height: 300px;
  background: #b6b6b6;
}

.cropped-image img {
  background-color: #b6b6b6;
  max-width: 300px;
  max-height: 300px;
}
</style>
