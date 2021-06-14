
<template>
  <div class="ancho centra mb-5">

    <div class="card" style="width: 380px;">

      <div class="card-body text-center">
        <h4>Felicidades</h4>
        <div class="container mx-auto my-5">
          <img class="img-thumbnail" src="../assets/suave_lomito.jpg" alt="Mi bicho" style="">
        </div>
        <h5 class="my-3">Tu compra está siendo procesada</h5>

        <p class="my-4">En breve te enviaremos un correo electrónico con los detalles de tu compra</p>

        <div class="container">
          <button type="button" class="btn btn-primary btn-sm mx-2" @click="goOrders">Ver mis compras</button>
          <button type="button" class="btn btn-primary btn-sm mx-2" @click="goHome">Ir al inicio</button>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import router from '../router'

export default {

  methods: {
    goHome(){
      router.push({'name':'inicio'});
    },
    goOrders(){
      router.push('compras');
    }
  }

}

</script>

<style>

</style>