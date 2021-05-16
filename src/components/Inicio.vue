<template>
  <div class="ancho centra">
    <div class="card defaultColor" style="width:650px;">
      <div class="card-header" style="text-align: center;">
          <label class="control-label h4" >Categorías</label>
          <br/>
          <label class="control-label" >Una selección de las mascotas mas buscadas</label>
      </div>
      <div class="card-body align" style="margin-top:20px;">
                <div class="row">
                    <div class="col-sm-4">
                      <div class="imagenes fill">
                          <img src="../assets/caninos.jpeg"/>
                          <div class="centered">Caninos</div>
                      </div>
                    </div>
                    <div class="col-sm-4" style="text-align: right;">
                      <div class="imagenes fill">
                          <img src="../assets/felinos.jpeg"/>
                          <div class="centered">Felinos</div>
                      </div>
                    </div>
                    <div class="col-sm-4" style="text-align: right;">
                      <div class="imagenes fill">
                          <img src="../assets/peces.jpeg"/>
                          <div class="centered">Peces</div>
                      </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-sm-4">
                      <div class="imagenes fill">
                          <img src="../assets/aranas.jpeg"/>
                          <div class="centered">Arañas</div>
                      </div>
                    </div>
                    <div class="col-sm-4" style="text-align: right;">
                      <div class="imagenes fill">
                          <img src="../assets/reptiles.jpeg"/>
                          <div class="centered">Reptiles</div>
                      </div>
                    </div>
                    <div class="col-sm-4" style="text-align: right;">
                      <div class="imagenes fill">
                          <img src="../assets/aves.jpeg"/>
                          <div class="centered">Aves</div>
                      </div>
                    </div>
                </div>
      </div>
    </div>
  </div>
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>







.imagenes2 {
  box-shadow: 3px 1px 6px #859295;
  border-radius: 3px;
} 
.centered {
  position: absolute;
  top: 50%;
  left: 35%;
  transform: translate(-50%, -50%);
  color: transparent;
  font-weight: bold;
}
.fill {
  display: flex;
  justify-content: center;
  align-items: center;
}
.fill img {
  box-shadow: 3px 1px 6px #859295;
  border-radius: 3px;
  flex-shrink: 0;
  height: auto;
  width: 200px;
  padding: 2px;
  margin: 2px;
}
.ancho {
    margin-top: -20px;
    max-width: 650px;
}
</style>
