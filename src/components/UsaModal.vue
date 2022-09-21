<template>
    <div class="container">
        <div class="foto" @click="fireChooser">
            <img class="croppedImage"
                v-if="profilePicture" 
                :src="profilePicture"
                alt="Cropped Image" />
            <small class="black-label">Change Image</small>
        </div>
        <OnlyModal :asp-rad=aspectRadio ref="onlyModal" @procesa-imagen="procesa" />
    </div>
</template>

<script>
import def from '../assets/default.jpg';
import OnlyModal from './OnlyModal.vue'

export default {
  components: {
    OnlyModal
  },
  data() {
    return {
        profilePicture : def,
        aspectRadio : 1/1
        // aspRadio puede ser: 
        //    0 (formato libre), 
        //    1/1 (cuadrado), 
        //    16/9 (rectángulo horizontal), 
        //    9/16 (rectangulo vertical), etc
    }
  },
  methods: {
        procesa(imagen) {
            // se puede hacer esto:
            this.profilePicture = imagen;
            // o simplemente aqui recargar de la base de
            // datos la imagen guardada por el cropper
        },
        fireChooser() {
            this.$refs.onlyModal.fireChooser();
        },
  }
}
</script>

<style>
    .croppedImage {
        display: block;
        width: 200px;
        height: auto;
    }
    .black-label {
        color:#fff;
        font-size: .7em;
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

</style>