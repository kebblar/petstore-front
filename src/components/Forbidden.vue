<template>
  <div>
    <a href="#"><img src="../assets/forbidden.webp" @click="goLogin"/></a>
  </div>
</template>


<script>
import router from '../router'

export default {
    methods: {
      goLogin: function() {
        router.push('/ui/login').catch(()=>{});
      }
    }
}
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
h3 {
  margin: 40px 0 0;
  display: block;
  margin-top: 2.7em;
  font-weight: bold;
  color: rgb(7, 7, 7);
}
</style>
