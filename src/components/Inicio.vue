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
                          <a href="#"><img src="../assets/catCaninos.png"/>
                          <div class="centered">Caninos</div></a>
                      </div>
                    </div>
                    <div class="col-sm-4" style="text-align: right;">
                      <div class="imagenes fill">
                          <a href="#"><img src="../assets/catFelinos.png"/>
                          <div class="centered">Felinos</div></a>
                      </div>
                    </div>
                    <div class="col-sm-4" style="text-align: right;">
                      <div class="imagenes fill">
                          <a href="#"><img src="../assets/catPeces.png"/>
                          <div class="centered">Peces</div></a>
                      </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-sm-4">
                      <div class="imagenes fill">
                          <a href="#"><img src="../assets/catAranas.png"/>
                          <div class="centered">Arañas</div></a>
                      </div>
                    </div>
                    <div class="col-sm-4" style="text-align: right;">
                      <div class="imagenes fill">
                          <a href="#"><img src="../assets/catReptiles.png"/>
                          <div class="centered">Reptiles</div></a>
                      </div>
                    </div>
                    <div class="col-sm-4" style="text-align: right;">
                      <div class="imagenes fill">
                          <a href="#"><img src="../assets/catAves.png"/>
                          <div class="centered">Aves</div></a>
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
  left: 25%;
  transform: translate(-50%, -50%);
  color: #ffffff;
  font-weight: bold;
}
.centered:hover {
  text-decoration: underline;
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
  height: 130px;
  width: 200px;
  padding: 2px;
  margin: 2px;
  opacity: 1;
}
.fill img:hover {
  opacity: 0.8;
}
.ancho {
    margin-top: -20px;
    max-width: 650px;
}
</style>
