<template>
<!-- 
  https://openbase.io/js/vue-upload-component
  https://github.com/lian-yue/vue-upload-component
  https://github.com/lian-yue/vue-upload-component/edit/master/docs/views/examples/Simple.vue
  https://github.com/lian-yue/vue-upload-component/blob/master/docs/views/App.vue
  https://openbase.io/packages/top-vue-file-uploader-libraries

  https://github.com/Agontuk/vue-cropperjs/blob/master/example/src/App.vue
-->

<div class="ancho centra">

    <div class="card" >

        <div class="card-header">
            <div class="row">
                <div class="col-sm-12">
                    <h2>Interfase de carga de imágenes</h2>
                </div>
            </div>
        </div><!-- ends header-->

        <div class="card-body">
          
          

          <div class="example-full">
            <button type="button" class="btn btn-danger float-right btn-is-option" @click.prevent="isOption = !isOption">
              <i class="fa fa-cog" aria-hidden="true"></i>
              Opciones
            </button>
<br/><br/><br/>
            <div v-show="$refs.upload && $refs.upload.dropActive" class="drop-active">
              <h3>Arrastra las imágenes a cargar</h3>
            </div>
            <div class="upload" v-show="!isOption">
              <div class="table-responsive">
                <table class="table table-hover">
                  <thead>
                    <tr>
                      <th>Miniatura</th>
                      <th>Nombre</th>
                      <th>Tamaño</th>
                      <th>Estatus</th>
                      <th>Acción</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-if="!files.length">
                      <td colspan="7">
                        <div class="text-center p-5">
                          <h4>Arrastra y suelta<br/>o bien,</h4>
                          <label :for="name" class="btn btn-lg btn-primary">Selecciona Imágenes</label>
                        </div>
                      </td>
                    </tr>
                    <tr v-for="(file) in files" :key="file.id">
                      <td>
                        <img v-if="file.thumb" :src="file.thumb" width="40" height="auto" />
                        <span v-else>Sin Imagen</span>
                      </td>
                      <td>
                        <div class="filename">
                          {{file.name}}
                        </div>
                        <div class="progress" v-if="file.active || file.progress !== '0.00'">
                          <div 
                            :class="{'progress-bar': true, 
                            'progress-bar-striped': true, 
                            'bg-danger': file.error, 
                            'progress-bar-animated': file.active}" 
                            role="progressbar" 
                            :style="{width: file.progress + '%'}">{{file.progress}}%</div>
                        </div>
                      </td>
                      <td>{{file.size | formatSize}}</td>

                      <td v-if="file.error">{{file.error}}</td>
                      <td v-else-if="file.success">success</td>
                      <td v-else-if="file.active">active</td>
                      <td v-else></td>
                      <td class="decora">
                        
                        <!-- vale por un sólo ícono desplegado... -->
                        <a href="#" 
                          v-if="file.active" @click.prevent="$refs.upload.update(file, {active: false})">
                          <i class="fas fa-stop-circle"></i>
                        </a>
                        <a href="#" 
                          v-else-if="file.error && file.error !== 'compressing' && $refs.upload.features.html5" @click.prevent="$refs.upload.update(file, {active: true, error: '', progress: '0.00'})">
                          <i class="fas fa-recycle"></i>
                        </a>
                        <a :class="{disabled: file.success || file.error === 'compressing'}" href="#" 
                          v-else @click.prevent="file.success || file.error === 'compressing' ? false : $refs.upload.update(file, {active: true})">
                          <i class="fas fa-upload"></i>
                        </a>

                        <a :class="{disabled: file.active || file.success || file.error === 'compressing'}" href="#" @click.prevent="file.active || file.success || file.error === 'compressing' ? false :  onEditFileShow(file)">
                          <i class="fas fa-edit"></i>
                        </a>

                        <a href="#" @click.prevent="$refs.upload.remove(file)">
                          <i class="fas fa-trash"></i>
                        </a>

                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div class="example-footer">
                <div class="footer-status float-right">
                <div class="btn-group">
                  <file-upload
                    class="btn btn-primary"
                    :post-action="postAction"
                    :put-action="putAction"
                    :extensions="extensions"
                    :accept="accept"
                    :multiple="multiple"
                    :directory="directory"
                    :size="size || 0"
                    :thread="thread < 1 ? 1 : (thread > 5 ? 5 : thread)"
                    :headers="headers"
                    :data="data"
                    :drop="drop"
                    :drop-directory="dropDirectory"
                    :add-index="addIndex"
                    v-model="files"
                    @input-filter="inputFilter"
                    @input-file="inputFile"
                    ref="upload">
                    <i class="fa fa-plus" aria-hidden="true" @click="onAddFolder"></i>
                    Agregar Imágenes
                  </file-upload>
                </div>
                &nbsp;
                <button type="button" class="btn btn-success" v-if="!$refs.upload || !$refs.upload.active" @click.prevent="$refs.upload.active = true">
                  <i class="fa fa-arrow-up" aria-hidden="true"></i>
                  Inicia Carga
                </button>
                <button type="button" class="btn btn-danger"  v-else @click.prevent="$refs.upload.active = false">
                  <i class="fa fa-stop" aria-hidden="true"></i>
                  Detén Carga
                </button>
              </div>
                </div>

            </div>


            <div class="option" v-show="isOption">
              <div class="form-group">
                <label for="accept">Acepta:</label>
                <input type="text" id="accept" class="form-control" v-model="accept">
                <small class="form-text text-muted">Permite subir el mime type</small>
              </div>
              <div class="form-group">
                <label for="extensions">Extensiones:</label>
                <input type="text" id="extensions" class="form-control" v-model="extensions">
                <small class="form-text text-muted">Permite subir la extension del archivo</small>
              </div>
              <div class="form-group">
                <label>PUT Upload:</label>
                <div class="form-check">
                  <label class="form-check-label">
                    <input class="form-check-input" type="radio" name="put-action" id="put-action" value="" v-model="putAction"> Apagado
                  </label>
                </div>
                <div class="form-check">
                  <label class="form-check-label">
                    <input class="form-check-input" type="radio" name="put-action" id="put-action" value="/upload/put" v-model="putAction"> Encendido
                  </label>
                </div>
                <small class="form-text text-muted">Después de una caida, usa el método POST para carga</small>
              </div>
              <div class="form-group">
                <label for="thread">Hilos:</label>
                <input type="number" max="5" min="1" id="thread" class="form-control" v-model.number="thread">
                <small class="form-text text-muted">También sube el numero de archivos al mismo tiempo (numero de hilos)</small>
              </div>
              <div class="form-group">
                <label for="size">Tamaño máximo:</label>
                <input type="number" min="0" id="size" class="form-control" v-model.number="size">
              </div>
              <div class="form-group">
                <label for="minSize">Tamaño mínimo:</label>
                <input type="number" min="0" id="minSize" class="form-control" v-model.number="minSize">
              </div>
              <div class="form-group">
                <label for="autoCompress">Comprime automáticamente:</label>
                <input type="number" min="0" id="autoCompress" class="form-control" v-model.number="autoCompress">
                <small class="form-text text-muted" v-if="autoCompress > 0">Mas de {{autoCompress | formatSize}} archivos son automáticamente comrimidos</small>
                <small class="form-text text-muted" v-else>Establece compresión automatica</small>
              </div>

              <div class="form-group">
                <div class="form-check">
                  <label class="form-check-label">
                    <input type="checkbox" id="add-index" class="form-check-input" v-model="addIndex"> Posición inicial para agregar
                  </label>
                </div>
                <small class="form-text text-muted">Agrega una lista de archivos para iniciar la ubicación a incorporar</small>
              </div>

              <div class="form-group">
                <div class="form-check">
                  <label class="form-check-label">
                    <input type="checkbox" id="drop" class="form-check-input" v-model="drop"> Soltar
                  </label>
                </div>
                <small class="form-text text-muted">Drag and drop upload</small>
              </div>
              <div class="form-group">
                <div class="form-check">
                  <label class="form-check-label">
                    <input type="checkbox" id="drop-directory" class="form-check-input" v-model="dropDirectory"> Suelta direcorio
                  </label>
                </div>
                <small class="form-text text-muted">No seleccionado filtra la carpeta dragueada</small>
              </div>
              <div class="form-group">
                <div class="form-check">
                  <label class="form-check-label">
                    <input type="checkbox" id="upload-auto" class="form-check-input" v-model="uploadAuto"> Auto start
                  </label>
                </div>
                <small class="form-text text-muted">Automaticamente activa la carga</small>
              </div>
              <div class="form-group">
                <button type="button" class="btn btn-primary btn-lg btn-block" @click.prevent="isOption = !isOption">Confirma</button>
              </div>
            </div>


            <!--div :class="{'modal-backdrop': true, 'fade': true, show: editFile.show}"></div -->
            <!-- div :class="{modal: true, fade: true, show: editFile.show}" id="modal-edit-file" tabindex="-1" role="dialog" -->
                  <modal 
                      id="modal-edit-file"
                      name="editFile" 
                      tabindex="-1"
                      role="dialog"
                      :clickToClose="false" 
                      :reset="true"
                      :width="400"
                      :height="600">

              <div style="width:400px;">
                <div class="modal-content">

                  <div class="modal-header">
                    <h5 class="modal-title">Recorta y Rota imágen</h5>
                    <button type="button" class="close"  @click="oculta()">
                      <span>&times;</span>
                    </button>
                  </div>

                  <form @submit.prevent="onEditorFile">
                    <div class="modal-body">
                      <div class="form-group" v-if="editFile.show && editFile.blob && editFile.type && editFile.type.substr(0, 6) === 'image/'">
                        <div class="edit-image">

                        <Cropper 
                          v-show="editFile.blob" 
                          ref="cropper" 
                          :src="editFile.blob" 
                          alt="Source Image">
                        </Cropper>


                        </div>

                        <div class="edit-image-tool">

                          <div class="btn-group" role="group">
                            <button type="button" class="btn btn-primary" @click="rotateRight()" title="cropper.rotate(-90)">
                              <i class="fa fa-repeat" aria-hidden="true"></i>
                            </button>
                            <button type="button" class="btn btn-primary" @click="rotateLeft()"  title="cropper.rotate(90)">
                              <i class="fa fa-undo" aria-hidden="true"></i>
                            </button>
                          </div>

                          <div class="btn-group" role="group" style="text-align: right;">
                            <button type="button" class="btn btn-primary" @click="onEditorFile()" title="cropper.crop()">
                              <i class="fa fa-check" aria-hidden="true"></i>
                            </button>
                            <button type="button" class="btn btn-primary" @click="oculta()"       title="cropper.clear()">
                              <i class="fa fa-times" aria-hidden="true"></i>
                            </button>
                          </div>

                        </div>

                      </div>
                    </div>
                    <div class="modal-footer">
                      <button type="button" class="btn btn-secondary" @click="oculta">Close</button>
                      <button type="submit" class="btn btn-primary">Save</button>
                    </div>
                  </form>
                </div>
              </div>
            </modal>



          </div>

        </div><!-- ends header-->

    </div><!-- ends card-->

</div>

</template>

<style>
td a {
  color:#000;
  margin-right: 8px;
}
td a:hover {
  color:#aaaaff;
}

.ancho {
    max-width: 640px;
}
.example-full {
  width: 600px;
}
.example-full .btn-group .dropdown-menu {
  display: block;
  visibility: hidden;
  transition: all .2s
}
.example-full .btn-group:hover > .dropdown-menu {
  visibility: visible;
}

.example-full label.dropdown-item {
  margin-bottom: 0;
}

.example-full .btn-group .dropdown-toggle {
  margin-right: .6rem
}

.modal-header {
  background-color: #b6b6b6;
}

.example-full .filename {
  margin-bottom: .3rem
}

.example-full .btn-is-option {
  margin-top: 0.25rem;
}
.example-full .example-footer {
  padding: .5rem 0;
  border-top: 1px solid #b6b6b6;
}

.example-full .edit-image img {
  /* width: 600px;
    max-width: 100%; */
    height: 440px;
}

.example-full .edit-image-tool {
  margin-top: .6rem;
}

.example-full .edit-image-tool .btn-group{
  margin-right: .6rem;
}

.example-full .footer-status {
  padding-top: .4rem;
}

.example-full .drop-active {
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  position: fixed;
  z-index: 9999;
  opacity: .6;
  text-align: center;
  background: #000;
}

.example-full .drop-active h3 {
  margin: -.5em 0 0;
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  -webkit-transform: translateY(-50%);
  -ms-transform: translateY(-50%);
  transform: translateY(-50%);
  font-size: 40px;
  color: #fff;
  padding: 0;
}
</style>

<script>
import Cropper from 'vue-cropperjs'
import 'cropperjs/dist/cropper.css'
import ImageCompressor from '@xkeshi/image-compressor'
import FileUpload from 'vue-upload-component'

export default {
  components: {
    FileUpload, Cropper
  },

  data() {
    return {
      files: [],
      accept: 'image/png,image/gif,image/jpeg,image/webp',
      extensions: 'gif,jpg,jpeg,png,webp',
      // extensions: ['gif', 'jpg', 'jpeg','png', 'webp'],
      // extensions: /\.(gif|jpe?g|png|webp)$/i,
      minSize: 1024,
      size: 1024 * 1024 * 10,
      multiple: true,
      directory: false,
      drop: true,
      dropDirectory: true,
      addIndex: false,
      thread: 3,
      name: 'file',
      postAction: 'http://localhost:9999/' +'api/upload.json', // OJO: aqui lo repito el de abajo porque NO tengo mas que 1 endpoint !!!!!!!!
      putAction: 'http://localhost:9999/' +'api/upload2.json', 
      headers: {
        'X-Csrf-Token': 'xxxx',
      },
      data: {
        '_csrf_token': 'xxxxxx',
      },

      autoCompress: 1024 * 1024,
      uploadAuto: false,
      isOption: false,

      addData: {
        show: false,
        name: '',
        type: '',
        content: '',
      },


      editFile: {
        show: false,
        name: '',
      },

      cropper: null,
  
    }
  },
  filters: {
    formatSize: function () {
      return 100;
    }
	},
  watch: {
    'addData.show'(show) {
      if (show) {
        this.addData.name = ''
        this.addData.type = ''
        this.addData.content = ''
      }
    },
  },

  methods: {
    resetCropper () {
      this.$refs.cropper.reset()
    },
    rotateLeft () {
      this.$refs.cropper.rotate(-90)
    },
    rotateRight () {
      this.$refs.cropper.rotate(90)
    },
    pinta: function() {
      this.$modal.show('editFile');
    },
    oculta: function() {
      this.$modal.hide('editFile');
    },
    inputFilter(newFile, oldFile, prevent) {
      if (newFile && !oldFile) {
        // Before adding a file

        // Filter system files or hide files
        if (/(\/|^)(Thumbs\.db|desktop\.ini|\..+)$/.test(newFile.name)) {
          return prevent()
        }

        // Filter php html js file
        if (/\.(php5?|html?|jsx?)$/i.test(newFile.name)) {
          return prevent()
        }

        // Automatic compression
        if (newFile.file && newFile.type.substr(0, 6) === 'image/' && this.autoCompress > 0 && this.autoCompress < newFile.size) {
          newFile.error = 'compressing'
          const imageCompressor = new ImageCompressor(null, {
            convertSize: Infinity,
            maxWidth: 512,
            maxHeight: 512,
          })
          imageCompressor.compress(newFile.file)
            .then((file) => {
              this.$refs.upload.update(newFile, { error: '', file, size: file.size, type: file.type })
            })
            .catch((err) => {
              this.$refs.upload.update(newFile, { error: err.message || 'compress' })
            })
        }
      }


      if (newFile && (!oldFile || newFile.file !== oldFile.file)) {

        // Create a blob field
        newFile.blob = ''
        let URL = window.URL || window.webkitURL
        if (URL && URL.createObjectURL) {
          newFile.blob = URL.createObjectURL(newFile.file)
        }

        // Thumbnails
        newFile.thumb = ''
        if (newFile.blob && newFile.type.substr(0, 6) === 'image/') {
          newFile.thumb = newFile.blob
        }
      }
    },
    inputFile(newFile, oldFile) {
      if (newFile && oldFile) {
        // update

        if (newFile.active && !oldFile.active) {
          // beforeSend

          // min size
          if (newFile.size >= 0 && this.minSize > 0 && newFile.size < this.minSize) {
            this.$refs.upload.update(newFile, { error: 'size' })
          }
        }

        if (newFile.progress !== oldFile.progress) {
          // progress
        }

        if (newFile.error && !oldFile.error) {
          // error
        }

        if (newFile.success && !oldFile.success) {
          // success
        }
      }


      if (!newFile && oldFile) {
        // remove
        if (oldFile.success && oldFile.response.id) {
          // $.ajax({
          //   type: 'DELETE',
          //   url: '/upload/delete?id=' + oldFile.response.id,
          // })
        }
      }


      // Automatically activate upload
      if (Boolean(newFile) !== Boolean(oldFile) || oldFile.error !== newFile.error) {
        if (this.uploadAuto && !this.$refs.upload.active) {
          this.$refs.upload.active = true
        }
      }
    },

    onEditFileShow(file) {
      this.$modal.show('editFile');
      this.editFile = { ...file, show: true }
      this.$refs.upload.update(file, { error: 'editado' })
    },

    onEditorFile() {
      if (!this.$refs.upload.features.html5) {
        alert('Your browser does not support')
        this.editFile.show = false
        return
      }

      let data = {
        name: this.editFile.name,
      }
      if (this.$refs.cropper) {
        let binStr = atob(this.$refs.cropper.getCroppedCanvas().toDataURL(this.editFile.type).split(',')[1])
        let arr = new Uint8Array(binStr.length)
        for (let i = 0; i < binStr.length; i++) {
          arr[i] = binStr.charCodeAt(i)
        }
        data.file = new File([arr], data.name, { type: this.editFile.type })
        data.size = data.file.size
      }
      this.$refs.upload.update(this.editFile.id, data)
      this.editFile.error = ''
      this.editFile.show = false
      this.oculta()
    },

    onAddFolder() {
      if (!this.$refs.upload.features.directory) {
        alert('Your browser does not support')
        return
      }

      let input = this.$refs.upload.$el.querySelector('input')
      input.directory = true
      input.webkitdirectory = true
      this.directory = true

      input.onclick = null
      input.click()
      input.onclick = (e) => {
        console.log(e)
        this.directory = false
        input.directory = false
        input.webkitdirectory = false
      }
    },

  }
}
</script>
