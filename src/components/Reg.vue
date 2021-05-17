<template>
  <div class="caja">
    <a href="#" @click="goLogin">Hello</a>
    <br/>
    {{pinta}}
  </div>
</template>

<script>
  import router from '../router'
  import datos from './datos.json'
  export default {
      methods: {
        goLogin: function() {
          router.push('/ui/login').catch(()=>{});
        }
      },
      computed: {
        pinta: function() {
          return datos;
        }
      }
  }
</script>

<style>
.caja {
  min-height: 150px;
  background-color: yellow;
}
</style>