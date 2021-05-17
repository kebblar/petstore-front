<template>
  <div class="ancho centra">
    <div class="card" style="width:390px;">
      <div class="card-header">
        <label class="h4">Regeneración de clave de acceso</label>
      </div>
      <div class="card-body align">
        <form>
          <small class="form-text text-muted text-center">Por favor introduce el correo electrónico con el que te registraste en el sistema para recuperar tu cuenta</small>
          <br>
          <div class ="form-group text-center">
            <label for="correo">Correo electrónico</label>
            <input type="email" class="form-control" id="mail" placeholder="ejemplo@gmail.com">
          </div>
          <br>
          <div class="form-group row text-center">
            <div class="col text-center">
              <button type="button" @click="goConfirma" class="btn btn-success">Recuperar mi clave</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>

</template>

<script>
  import router from '../router'
  export default {
      methods: {
        goConfirma: function() {
          router.push('/ui/regenera-clave-confirma').catch(()=>{});
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