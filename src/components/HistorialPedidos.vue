<template>
  <div class="ancho centra">
    <div class="card" style="margin-left:-50%;width: 200%;border: none;">
      <div class="card-header" style="margin-bottom:-1%">
        <h4 class="control-label" style="text-align:center"><b>Historial de pedidos</b></h4>
      </div>
      <div class="card-body align">
        <hr style="background-color:black">
          <div class="container">
            <div class="row" v-for="compra in comprasActivas" :key="compra.idCompra" style="background-color:#D7EAF9;margin-bottom:1%">
                <div class="col-sm" >
                    <img class="rounded img-thumbnail" :src="compra.urlImagen" alt="imagen mascota" style="max-height: 100px; width: auto;float:left">
                    <p><b>{{compra.nombreAnuncio}}</b></p>
                    <div class="container">
                        <div class="row">
                            <div class="col-sm" style="color:#c2b280;font-size:small">
                                Entrega pendiente
                            </div>
                            <div class="col-sm">
                                <p style="font-size:x-large">&#128337;</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-sm">
                    <p style="margin-bottom:0%">Compra realizada el {{compra.fechaHoraCompra}}</p>
                    <p style="color:blue;font-size:small;margin-bottom:0%">{{compra.metodoPago}}</p>
                    <p style="color:blue;font-size:xx-small">{{compra.correo}}</p>
                </div>
            </div>

            <div class="row" v-for="compra in comprasInactivas" :key="compra.idCompra" style="background-color:#D7EAF9;margin-bottom:1%">
                <div class="col-sm" >
                    <img class="rounded img-thumbnail" :src="'https://photos.ci.ultrasist.net/' + compra.urlImagen" alt="imagen mascota" style="max-height: 100px; width: auto;float:left">
                    <p><b>{{compra.nombreAnuncio}}</b></p>
                    <div class="container">
                        <div class="row">
                            <div class="col-sm" style="color:blue">
                                <p style="margin-bottom:0%">Enviado</p>
                            </div>
                            <div class="col-sm">
                                <p style="font-size:x-large">&#x2705;</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-sm">
                    <p style="margin-bottom:0%">Compra realizada el {{compra.fechaHoraCompra}}</p>
                    <p style="color:blue;font-size:small;margin-bottom:0%">{{compra.metodoPago}}</p>
                    <p style="color:blue;font-size:xx-small">{{compra.correo}}</p>
                </div>
            </div>
          </div>
    </div>
  </div>
            <modal
            name="aviso"
            :clickToClose="false"
            :reset="true"
            :width="480"
            :height="260">
            <div class="card">
                <div class="card-header">Advertencia del sistema</div>
                <div class="card-body">
                    <h5 class="card-title">{{titulo}}</h5>
                    <p class="card-text">{{ descripcion }}</p>
                    <div style="text-align: right;">
                        <a href="#" class="btn btn-primary" @click="closeModal">Aceptar</a>
                    </div>
                </div>
            </div>
        </modal>
</div>

</template>

<script>
import axios from 'axios';
import store from '../store';

export default {
  name: "HistorialPedidos.vue",
  data(){
    return {
      comprasActivas: [],
      comprasInactivas: [],
      compras: [],
      titulo : '',
      descripcion: '',
    }
  },
  mounted () {
    this.getHistorial();
  },
methods: {
    closeModal: function() {
        this.$modal.hide('aviso');
    },
    getHistorial(){
      axios.get('api/historial-compras.json/'.concat(store.state.session.idUser)).then(response => {
          response.data.forEach((value) => {
            if(!value.estadoEnvio){
              this.comprasActivas.push(value);
            }else{
              this.comprasInactivas.push(value);
            }
          });
      }).catch(() => {
          this.$modal.show('aviso');
          this.titulo = "Error!"
          this.descripcion = "Ha ocurrido un error de nuestro lado, por favor vuelva a intentarlo más tarde."
      })
    }
},

}
</script>

<style>

hr.dotted {
  border-top: 2px dotted #bbb;
}
.shadowing {
  box-shadow: 1px 1px 3px #d8dcdd;
}
.shortSpace{
  margin-top: 5px;
  line-height: 90%;
  font-size: 12px;
  letter-spacing: -0.5px;
}
</style>