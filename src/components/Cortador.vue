<template>
  <div class="ancho centra">

    <input
      ref="input"
      type="file"
      name="image"
      accept="image/*"
      @change="setImage" />

    <div class="card">

      <div class="card-header card-custom-header" >
        <label class="control-label h4">Ajuste y carga de imagenes a la nube</label>
      </div><!-- ends header -->

      <div class="card-body" style="background-color: #f6f6f6;">
        

          <div class="row">
            <div class="col-sm-6">
                <div class="actions">
                
                <div class="img-cropper">
                  <vue-cropper
                    ref="cropper"
                    :src="imgSrc"
                    preview=".preview"
                  />
                </div>

                <br>

                  <a
                    href="#"
                    class="btn btn-danger"
                    @click.prevent="showFileChooser">Seleccionar <i class="fa fa-camera" aria-hidden="true"></i></a>

                  <a
                    href="#"
                    class="btn btn-warning"
                    @click.prevent="reset">R</a>

                <a
                    href="#"
                    class="btn btn-success"
                    @click.prevent="cropImage"><i class="fa fa-plus" aria-hidden="true"></i></a>

                  <hr/>

                  <a
                    href="#"
                    class="btn btn-outline-success"
                    @click.prevent="zoom(0.2)"><i class="fa fa-search-plus" aria-hidden="true"></i></a>
                  <a
                    href="#"
                    class="btn btn-outline-success"
                    @click.prevent="zoom(-0.2)"><i class="fa fa-search-minus" aria-hidden="true"></i></a>
                  <a
                    href="#"
                    class="btn btn-outline-success"
                    @click.prevent="rotate(45)"><i class="fa fa-undo fa-flip-horizontal" aria-hidden="true"></i></a>
                  <a
                    href="#"
                    class="btn btn-outline-success"
                    @click.prevent="rotate(-45)"><i class="fa fa-undo" aria-hidden="true"></i></a>

                  <hr/>


              <div id="accordion1">
                <div class="card">
                  <div class="card-header" id="headingOne">
                    <a href="#" data-toggle="collapse" data-target="#collapseOne" aria-expanded="false" aria-controls="collapseOne"><i class="fa fa-wrench" aria-hidden="true"></i> Mas opciones</a>
                  </div>
                    <div id="collapseOne" class="collapse" aria-labelledby="headingOne" data-parent="#accordion1">
                      <div class="card-body">
                      <a
                        href="#"
                        class="btn btn-outline-success"
                        @click.prevent="move(-10, 0)"><i class="fa fa-arrow-left" aria-hidden="true"></i></a>
                      <a
                        href="#"
                        class="btn btn-outline-success"
                        @click.prevent="move(10, 0)"><i class="fa fa-arrow-right" aria-hidden="true"></i></a>
                      <a
                        href="#"
                        class="btn btn-outline-success"
                        @click.prevent="move(0, -10)"><i class="fa fa-arrow-up" aria-hidden="true"></i></a>
                      <a
                        href="#"
                        class="btn btn-outline-success"
                        @click.prevent="move(0, 10)"><i class="fa fa-arrow-down" aria-hidden="true"></i></a>

                      <hr/>

                      <a
                        ref="flipX"
                        href="#"
                        class="btn btn-outline-success"
                        @click.prevent="flipX">Ref. Horiz.</a>
                      <a
                        ref="flipY"
                        href="#"
                        class="btn btn-outline-success"
                        @click.prevent="flipY">Ref. Vert.</a>

                      </div>
                    </div>
                </div>
              </div>
              
              <br>
              
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

                  <div v-if="false">
                    <hr/>

                    <a
                      href="#"
                      role="button"
                      @click.prevent="getData">Get Data</a>
                    <a
                      href="#"
                      role="button"
                      @click.prevent="setData">Set Data</a>

                    <hr/>

                    <a
                      href="#"
                      role="button"
                      @click.prevent="getCropBoxData">Get CropBox Data</a>
                    <a
                      href="#"
                      role="button"
                      @click.prevent="setCropBoxData">Set CropBox Data</a>

                    <textarea v-model="data" />

                  </div>

                </div>
                <hr>
            </div>
            <div class="col-sm-6">
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
                  <thead class="thead-dark">
                    <tr>
                      <th></th>
                      <th></th>
                      <th>Tamaño</th>
                      <th><i class="fa fa-trash" aria-hidden="true"></i></th>
                      <th><i class="fa fa-upload" aria-hidden="true"></i></th>
                    </tr>
                  </thead>
                  <tbody>
                  <tr v-for="(renglon, index) in caja" :key="index">
                    <td>
                      <div v-if="index<1">
                        <input type="radio" name="principal" id="principal" checked />
                      </div>
                      <div v-else>
                        <input type="radio" name="principal" id="principal" />
                      </div>
                    </td>
                    <td>
                      <img :src=renglon.picture width="50" height="50" />
                    </td>
                    <td>{{ renglon.tam }} kb</td>
                    <td><a href="#" @click="caja.splice(index,1)"><i class="fa fa-trash" aria-hidden="true"></i></a></td>
                    <td><a href="#" @click="caja.splice(index,1)"><i class="fa fa-upload" aria-hidden="true"></i></a></td>
                  </tr>
                  </tbody>
                </table>

                <br>

                <div v-if="cropImg">
                  <a
                    href="#"
                    class="btn btn-success" alt="hola"
                    @click.prevent="sube"><i class="fa fa-upload" aria-hidden="true"></i> Subir imagenes</a>
                </div>

                <br>
                <label></label>
                <ul v-for="(url, index) in respuesta" :key="index">
                  <li><a :href=salta(url.nuevoNombre) target="_blank">liga {{ index }}</a></li>
                </ul>
              </div>
            </div>
          </div>
          
        
      </div><!-- ends body -->

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
      cropImg: '',
      data: null,
      formData: new FormData(),
      newType: 'image/unknown',
      fileType: 'image/unknown',
      fileName: 'unknown',
      fileSize: 0,
      newSize: 0,
      caja:[],
      respuesta:[]
    };
  },
  methods: {
    sube() {
      const headers = {
        "Content-Type": "multipart/form-data",
        "Access-Control-Allow-Origin": "*",
        "jwt": store.state.session.jwt,
        "idAnuncio":1
      }; 
      axios.post("/api/up/imagen2.json", this.formData, { 
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
    cropImage() {
      this.cropImg = this.$refs.cropper
        .getCroppedCanvas()
        .toDataURL(this.newType, 0.5);

      this.$refs.cropper
        .getCroppedCanvas()
        .toBlob(blob => {
            this.newSize = blob.size;
            //this.formData = new FormData();
            this.formData.append("file", blob, this.fileName);
            this.caja.push({
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
      this.fileType = file.type;
      this.fileName = file.name;
      this.fileSize = file.size;
      if (file.type.indexOf('image/') === -1) {
          Vue.$toast.open({
              message: "Sólo seleccionar imágenes, por favor",
              type: 'error',
              duration: 5000,
              position:'top'
          });
          return;
      }

      if (typeof FileReader === 'function') {
        const reader = new FileReader();

        reader.onload = (event) => {
          this.imgSrc = event.target.result;
          this.fileType = this.dataURLtoMimeType(this.imgSrc);
          // rebuild cropperjs with the updated source
          this.$refs.cropper.replace(event.target.result);
        };

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
        var mimeType = 'desconocido';
        var contentType = [];
        var parts = [];
        var i = 0;

        var BASE64_MARKER = ';base64,';
        var data;

        if(contentType==null) console.log("raro");

        if (dataURL.indexOf(BASE64_MARKER) == -1) {
            parts = dataURL.split(',');
            contentType = parts[0].split(':')[1];
            data = decodeURIComponent(parts[1]);
        } else {
            parts = dataURL.split(BASE64_MARKER);
            contentType = parts[0].split(':')[1];
            var raw = window.atob(parts[1]);
            var rawLength = raw.length;

            data = new Uint8Array(rawLength);

            for (i = 0; i < rawLength; ++i) {
                data[i] = raw.charCodeAt(i);
            }
        }

        var arr = data.subarray(0, 4);
        var header = "";
        for(i = 0; i < arr.length; i++) {
            header += arr[i].toString(16);
        }
        //console.log(header+"___________________kkkk");
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
                mimeType = "image/png"; // Or you can use the blob.type as fallback
                break;
        }
        return mimeType;
    },
    calc(num) {
      return num.toString().match(/^-?\d+(?:\.\d{0,2})?/)[0]
    },
    salta(url) {
      return 'https://photos.ci.ultrasist.net/_'+url
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

.content {
  display: flex;
  justify-content: space-between;
}

.cropper-area {
  width: 400px;
}

.img-cropper {
  width: 300px;
}

.seleccion {
  margin-top: 1rem;
}

.actions {
  margin-top: 1rem;
  width: 300px;
}

.actions a {
  display: inline-block;
  padding: 5px 15px;
  margin-right: 1rem;
  margin-bottom: 1rem;
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
