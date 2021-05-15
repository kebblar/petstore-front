<template>
  <div class="ancho centra">
    <div class="card" style="width:390px;">
      <div class="card-header">
        <label class="h4">Cambia tu clave</label>
      </div>
      <div class="card-body align">
        <form>
          <small class="form-text text-muted text-center">Un token de 6 dígitos fue enviado a tu correo electrónico, por favor introdúcelo a continuación:</small>
          <br>
          <div class ="form-group form-row">
            <div class="col-sm-4">
              <label for="correo">Token:</label>
            </div>
            <div class = "col form-group">
              <input type="text" class="form-control" id="token" placeholder="XXXXXX">
            </div>



          </div>
        </form>

        <hr class="dashed">

        <form>
          <small class="form-text text-muted text-center">Ingresa tu nueva clave y su confirmación</small>
          <br>
          <div class ="form-group form-row">
            <div class="col-sm-4">
              <label for="clave">Clave nueva:</label>
            </div>
            <div class = "col form-group">
              <input type="password" class="form-control" id="token" placeholder="******" readonly>
            </div>
          </div>

          <div class ="form-group form-row">
            <div class="col-sm-4">
              <label for="clave">Confirmación:</label>
            </div>
            <div class = "col form-group">
              <input type="password" class="form-control" id="token" placeholder="******" readonly>
            </div>
          </div>
        </form>

        <div class="form-group row text-center">
          <div class="col text-center">
            <button type="button" class="btn btn-success">Cambiar mi clave</button>
          </div>
        </div>

      </div>
    </div>
  </div>

</template>

<style>

hr.dashed {
  border-top: 3px dashed #bbb;
}

</style>