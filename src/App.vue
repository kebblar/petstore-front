<template>
  <div id="app">
    <Header/>
    <router-view></router-view>
    <Footer/>
  </div>
</template>

<script>
  import Footer from './Footer';
  import Header from './Header';

  export default {
    name: "App",
    components: {
      'Header': Header,
      'Footer' : Footer
    }
  }
</script>

<style>

html,body {
  height:100%;
  background-color: #fff;
}

#app {
  position: relative;
  color: #2c3e50;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
#contenedor {
  width: 100%;
  background-color: transparent;
  padding-bottom: 60px;
  padding-top: 0px;
}
.centra {
  margin: auto;
  padding: 20px;
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