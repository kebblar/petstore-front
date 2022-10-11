<template>
    <div class="container">

        <div style="width=600px;">
          <Carousel>
            <Slide v-for="slide in 42" :key="slide">
              <div class="carousel__item"><img :src="hola(slide)"  /></div>
            </Slide>
            <template #addons>
              <Navigation />
              <Pagination />
            </template>
          </Carousel>
        </div>

        <a href="#" class="btn  btn-warning" @click="abreToast">test</a>

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

// from: https://github.com/Maronato/vue-toastification#installation
import { useToast } from "vue-toastification";

// from: https://ismail9k.github.io/vue3-carousel/examples.html#hiddenarrows
import 'vue3-carousel/dist/carousel.css';
import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel';

export default {
  setup() {
      // Get toast interface
      const toast = useToast();
      // Make it available inside methods
      return { toast }
  },    
  components: {
    OnlyModal,
    Carousel,
    Slide,
    Pagination,
    Navigation,
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
    hola(n){
      let z = n+10
      //return "https://media.visitanos.net/video/2022/09/04/"+z+".jpg"
      return "http://localhost:9876/"+z+".jpg"
    },
        procesa(imagen) {
            // se puede hacer esto:
            this.profilePicture = imagen;
            // o simplemente aqui recargar de la base de
            // datos la imagen guardada por el cropper
        },
        fireChooser() {
            this.$refs.onlyModal.fireChooser();
        },
        abreToast() {    
            //this.toast.info("I'm an info toast!");
            // from: https://vue-toastification.maronato.dev/
            this.toast.error("Yo soy super gus!", {
                position: "bottom-right",
                timeout: 5000,
                closeOnClick: true,
                pauseOnFocusLoss: true,
                pauseOnHover: true,
                draggable: true,
                draggablePercent: 0.6,
                showCloseButtonOnHover: false,
                hideProgressBar: false,
                closeButton: "button",
                icon: true,
                rtl: false
            });
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







.carousel__item {
  min-height: 200px;
  width: 400px;
  background-color: var(--vc-clr-primary);
  color:  var(--vc-clr-white);
  font-size: 20px;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
}

img {
  height: 300px;
}

.carousel__slide {
  padding: 10px;
}

.carousel__prev,
.carousel__next {
  box-sizing: content-box;
  border: 5px solid white;
}

</style>
