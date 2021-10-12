<template>
<div v-if="!isMobile()">
  <RegeneraClaveWeb />
</div>
<div v-else>
  <RegeneraClavePhone />
</div>
</template>

<script>
  import RegeneraClaveWeb from './RegeneraClaveWeb';
  import RegeneraClavePhone from './RegeneraClavePhone';
  
  export default {
      data() {
        return {
          correo: '',
        }
      },
      components: {
        RegeneraClaveWeb, RegeneraClavePhone
      },
      methods: {
        isMobile() {
          console.log(navigator.userAgent);
          if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
            return true
          } else {
            return false
          }
        }
      }
  }
</script>