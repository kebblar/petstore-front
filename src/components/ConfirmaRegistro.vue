<template>
  <div class="ancho centra">
    <div class="card" style="width:390px;">
      <div class="card-header">
        <label class="h4">Confirma tu registro</label>
      </div>

      <div class="card-body align">
          <small class="form-text text-muted text-center">Un token de 6 dígitos fue enviado a tu correo electrónico, por favor introdúcelo a continuación:</small>
          <br>
          <div class ="form-group form-row">
            <div class="col-sm-4">
              <label for="correo">Token:</label>
            </div>
            <div class = "col form-group">
              <input type="text" class="form-control" id="token" placeholder="XXXXXX" />
            </div>
          </div>
          <hr class="dashed">
          <div class="form-group row text-center">
            <div class="col text-center">
              <button type="button" class="btn btn-success">Completar registro</button>
            </div>
          </div>
      </div><!-- card-body ends -->

    </div><!-- card ends -->
  </div>

</template>

<style>

hr.dashed {
  border-top: 3px dashed #bbb;
}

</style>