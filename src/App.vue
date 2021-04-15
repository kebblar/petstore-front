<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
    name: "App"
}
</script>

<style>
#app {
    position: relative;
    padding-top: 100px;
    padding-bottom: 26px;
    color: #2c3e50;
    text-align: center;
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}
#contenedor {
  width: 100%;
  background-color: transparent;
  padding-bottom: 60px;
  padding-top: 20px;
}
.centra {
    margin: auto;
    padding-top: 40px;
    padding-bottom: 40px;
}
.loader {
    position: fixed;
    top:0px;
    right:0px;
    width:100%;
    height:100%;
    background-color:#ffffff;
    background-image: url('assets/wait.gif');
    background-repeat:no-repeat;
    background-position:center;
    z-index:10000000;
    opacity: 0.4;
    filter: alpha(opacity=40);
}
</style>
