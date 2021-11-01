<template>
  <div class="background">
    <div class="contenedor">
      <div class="row">
        <div class="col-sm-4 col-md-4 col-lg-3">
          <div class="foto">
            <input style="display: none" type="file" @change="onFileSelected" ref="fileInput">
            <img @click="$refs.fileInput.click()"
                 src="../assets/default.jpg"
                 class="imagen">
            <small id="black-label">Cambiar foto</small>
          </div>
          <div class="mini-menu py-2">
            <ul class="options">
              <li>Mi cuenta</li>
              <li>Mis compras</li>
              <li>Cambio de clave</li>
            </ul>
          </div>
        </div>
        <div class="offset-md-1 col-sm-8 col-md-7 col-lg-8">
          <div class="container py-3 px-5">
            <h3>Mi cuenta</h3>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
 name: 'Perfil',
 data() {
   return {
     selectedFile : null,
     showLabel : false
   }
 } ,
  methods: {
   onFileSelected(event){
      this.selectedFile = event.target.file[0]
     console.log(this.selectedFile)
   }
  }
}
</script>
<style scoped>

.background {
  background-image: url(https://images.adsttc.com/media/images/5d44/14fa/284d/d1fd/3a00/003d/large_jpg/eiffel-tower-in-paris-151-medium.jpg?1564742900);
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-position: center center;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
  padding: 3% 0;
}

.contenedor {
  height: auto;
  width: 80%;
  background: white;
  position: relative;
  right: 10%;
  left: 10%;
  border-radius: 5px;
  padding: 2% 2%;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset;
}

.foto {
  margin: 10% 10%;
  text-align: center;
  border-radius: 50%;
  overflow: hidden;
  position: relative;
  transition: transform .2s;
  }

.foto:hover {
  transform: scale(1.1);
}

.imagen {
  width: 100%;
  border-radius: 50%;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  cursor: pointer;
}

.options{
  list-style-type: none;
  padding-left: 15%;
}

li {
  margin-top: 15%;
  line-height: 95%;
}
#black-label {
  position: absolute;
  margin: auto auto;
  left: 0;
  right: 0;
  bottom: -25%;
  height: 25%;
  padding-top: 5%;
  text-align: center;
  display: block;
  color: #3f3e3e;
  font-size: 10px;
  background-color: rgba(21, 21, 21, 0.34);
  transition: .5s ease;
}

.imagen:hover ~ #black-label {
  position: absolute;
  bottom: 0%;
}


@media only screen and (max-width: 575px) {
  #black-label {
    font-size: 130%;
  }
}
@media only screen and (min-width: 775px) {
    #black-label {
      font-size: 85%;
    }
  }

</style>