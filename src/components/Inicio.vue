<template>
  <div class="ancho centra">
    <div class="card">
      <div class="card-header card-custom-header"> 
        <label class="control-label h4" >Categorías</label>
        <br/>
        <label class="control-label" >Una selección de las mascotas mas buscadas Rosa Angelica</label>
      </div>
      <div class="card-body align">
        <div class="row">
            <div class="col-sm-4">
              <div class="imagenes fill">
                  <a href="#" @click="consultaAnuncios(1)"><img src="../assets/catCaninos.png"/>
                  <div class="centered">Caninos</div></a>
              </div>
            </div>
            <div class="col-sm-4" style="text-align: right;">
              <div class="imagenes fill">
                  <a href="#" @click="consultaAnuncios(2)"><img src="../assets/catFelinos.png"/>
                  <div class="centered">Felinos</div></a>
              </div>
            </div>
            <div class="col-sm-4" style="text-align: right;">
              <div class="imagenes fill">
                  <a href="#" @click="consultaAnuncios(5)"><img src="../assets/catPeces.png"/>
                  <div class="centered">Peces</div></a>
              </div>
            </div>
        </div>
        <div class="row">
            <div class="col-sm-4">
              <div class="imagenes fill">
                  <a href="#" @click="consultaAnuncios(3)"><img src="../assets/catAranas.png"/>
                  <div class="centered">Arañas</div></a>
              </div>
            </div>
            <div class="col-sm-4" style="text-align: right;">
              <div class="imagenes fill">
                  <a href="#" @click="consultaAnuncios(4)"><img src="../assets/catReptiles.png"/>
                  <div class="centered">Reptiles</div></a>
              </div>
            </div>
            <div class="col-sm-4" style="text-align: right;">
              <div class="imagenes fill">
                  <a href="#" @click="consultaAnuncios(6)"><img src="../assets/catAves.png"/>
                  <div class="centered">Aves</div></a>
              </div>
            </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import router from '../router';
import store from '../store';

export default ({
  methods: {
    consultaAnuncios(idCatInit) {
     router.push({path:'/ui/consulta-anuncios-publico/'+idCatInit}).catch(()=>{});
    }
  },
  mounted() {
     store.commit('setToggleSidebar', false);// Pero mostrar header y footer
  }
})
</script>

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
</style>
