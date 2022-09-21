<template>
    <div class="container">

        <button type="button" class="btn btn-primary" id="liveToastBtn">Show live toast</button>

<div class="position-fixed bottom-0 end-0 p-3" style="z-index: 11">
  <div id="liveToast" class="toast hide" role="alert" aria-live="assertive" aria-atomic="true">
    <div class="toast-header">
      <strong class="me-auto">Bootstrap</strong>
      <small>11 mins ago</small>
      <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
    </div>
    <div class="toast-body">
      Hello, world! This is a toast message.
    </div>
  </div>
</div>



        <a href="#" class="btn  btn-warning" @click="toast">test</a>

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
import def from '@/assets/default.jpg';
import OnlyModal from '@/components/OnlyModal.vue'

//import Vue from 'vue';
//import VueToast from 'vue-toast-notification';
//import 'vue-toast-notification/dist/theme-sugar.css'
//Vue.use(VueToast);


/*
import {createApp} from 'vue';
import {useToast} from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-sugar.css';

const app = createApp({});
app.mount('#app');

const $toast = useToast();
let instance = $toast.success('You did it!');
*/
//import {useToast} from 'vue-toast-notification';

//const $toast = useToast();

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
        toast() {    
            // from: https://vue-toastification.maronato.dev/
            // $toast("I'm a toast!", {
            //     position: "top-right",
            //     timeout: 5000,
            //     closeOnClick: true,
            //     pauseOnFocusLoss: true,
            //     pauseOnHover: true,
            //     draggable: true,
            //     draggablePercent: 0.6,
            //     showCloseButtonOnHover: false,
            //     hideProgressBar: true,
            //     closeButton: "button",
            //     icon: true,
            //     rtl: false
            // });
        }
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
