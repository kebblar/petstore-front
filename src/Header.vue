<template>
    <div>
        <div class="barra">
          <div class="row">
              <div class="col-sm-6">x</div>
              <div class="col-sm-6" style="text-align: right;">
                <input type="button" class="btn btn-success" value="Registrarse" />
                &nbsp;
                <input type="button" class="btn btn-info" value="Ingresar" />
              </div>
          </div>
        </div>

        <div class="top">
        <img id="image" src="./assets/pajaro_01.png" width="50%" />
        </div>

        <div class="buscador">
          <label>Bienvenido</label>
          <div class="row">
              <div class="col-sm-9">
              <input 
                  type="text" 
                  class="form-control" 
                  placeholder="palabras de búsqueda" 
                  value="" />
              </div>
              <div class="col-sm4">
              <input type="button" class="btn btn-success" value="Buscar" />
              </div>
          </div>
        </div>

    </div>
</template>

<style>
.top {
  text-align: right;
  background-color: #006600;
}
.top img {
  margin-right: 10%;
}
.buscador {
  width: 300px;
  min-width: 300px;
  text-align: left;
  margin-top: -140px;
  margin-left: 10%;
  z-index: 10;
}
.buscador label {
  color: #ffff;
  font-size: 28px;
}
.barra {
  margin: 10px;
}
</style>