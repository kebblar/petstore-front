<template>
    <div class="ancho centra">

        <div class="card" >

            <div class="card-header">
                <div class="row">
                    <div class="col-sm-12">
                        <h2>{{ titulo }}</h2>
                    </div>
                </div>
            </div><!-- ends header-->

            <div class="card-body">
                <vue-dropzone
                    ref="myVueDropzone"
                    id="myVueDropzone"
                    v-on:vdropzone-sending="sendingEvent"
                    :options="dropzoneOptions">
                </vue-dropzone>
            </div>

            <button @click="sube" type="button" class="btn btn-lg btn-primary" >Carga archivos</button>
            <input type="text" class="form-control" v-model="uno" />
            <input type="text" class="form-control" v-model="dos" />
        </div>

    </div>
</template>

<script>

import Vue2Dropzone from 'vue2-dropzone'
import 'vue2-dropzone/dist/vue2Dropzone.min.css'
import axios from 'axios';
import store from '../store'

export default {
  components: {
    vueDropzone: Vue2Dropzone
  },
  data: function () {
    return {
        titulo: 'Interfase de carga de imágenes !',
        uno: 6789,
        dos: 'xyz',
        dropzoneOptions: {
            url: this.calcula(),
            maxFilesize: 0.5,
            thumbnailWidth: 140,
            thumbnailMethod: 'contain',
            addRemoveLinks: true,
            dictRemoveFile: 'Eliminar',
            dictDefaultMessage: 'Arrastra y suelta tus archivos a subir aqui.',
            headers: {
                "jwt": store.state.session.jwt
            },
            autoProcessQueue: false, // Make sure the files aren't queued until manually added
        }
    }
  },
  methods: {
        calcula: function() {
            return axios.defaults.baseURL + 'api/upload.json';
        },
        sube: function() {
            console.log('subeeeeeeeee');
            this.$refs.myVueDropzone.processQueue();
        },
        sendingEvent (file, xhr, formData) {
            formData.append("uno", this.uno);
            formData.append("dos", this.dos);
            console.log(formData);
        }
  }
}
</script>

/*
    @PostMapping(
            path = "/upload.json",
            produces = "application/json; charset=utf-8"
            )
    public UploadModel handleFileUploadWithKDMCopy(
            @RequestHeader("jwt") String jwt,
            @RequestParam("uno") int uno,
            @RequestParam("dos") String dos,
            @RequestParam("file") MultipartFile file
            ) throws UploadException {
        System.out.println(jwt);
        System.out.println(uno);
        System.out.println(dos);
        UploadModel upload = uploadService.storeOne(file, destinationFolder, max);
        return upload;
    }
 */
