<template>
  <div class="ancho centra">
    <div class="card" style="margin-left:-50%;width: 200%;border: none;">
      <div class="card-header" style="margin-bottom:-1%">
        <h4 class="control-label"><b>Historial de pedidos</b></h4>
      </div>
      <div class="card-body align">
        <hr style="background-color:black">
          <div class="container">
            <div class="row" v-for="compra in compras" :key="compra.idCompra" style="background-color:#D7EAF9;margin-bottom:1%">
                <div class="col-sm" >
                    <img class="rounded img-thumbnail" :src="compra.urlImagen" alt="imagen mascota" style="max-height: 100px; width: auto;float:left">
                    <p><b>{{compra.descripcion}}</b></p>
                    <div class="container" v-if="!compra.entregado">
                        <div class="row">
                            <div class="col-sm" style="color:#c2b280;font-size:small">
                                Entrega pendiente
                            </div>
                            <div class="col-sm">
                                <p style="font-size:x-large">&#128337;</p>
                            </div>
                        </div>
                    </div>
                    <div class="container" v-if="compra.entregado">
                        <div class="row">
                            <div class="col-sm" style="color:blue">
                                <p style="margin-bottom:0%">Entregado el</p>
                                <p style="font-size:x-small">{{compra.fechaEntrega}}</p>
                            </div>
                            <div class="col-sm">
                                <p style="font-size:x-large">&#x2705;</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-sm">
                    <p style="margin-bottom:0%">Compra realizada el {{compra.fechaCompra}}</p>
                    <button @click="generarFactura(compra.urlFactura)" class="btn btn-primary btn-sm">Factura en pdf</button>
                    <p style="color:blue;font-size:small;margin-bottom:0%">{{compra.metodoPago}}</p>
                    <p style="color:blue;font-size:xx-small">{{compra.correo}}</p>
                </div>
            </div>
          </div>
    </div>
  </div>
</div>

</template>

<script>
export default {
  name: "HistorialPedidos.vue",
  data(){
    return {
      compras: [
        {
          idCompra: 1,
          fechaCompra : "09/09/2020",
          entregado: false,
          fechaEntrega: "",
          descripcion: "Hermoso camaleon",
          metodoPago: "Paypal",
          correo: "mail@mail.com",
          urlFactura: "www.foo.com",
          urlImagen: "/img/bicho1.3bbaca63.jpg"
        },
        {
          idCompra: 2,
          fechaCompra : "09/09/2020",
          entregado: true,
          fechaEntrega: "11/02/2021",
          descripcion: "Hermoso camaleon de nuevo",
          metodoPago: "Paypal",
          correo: "mail@mail.com",
          urlFactura: "www.foo2.com",
          urlImagen: "/img/bicho1.3bbaca63.jpg"
        }
      ]
    }
  },
methods: {
    generarFactura(urlFactura){
      alert("se ha generado la factura :v con la url ".concat(urlFactura))
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