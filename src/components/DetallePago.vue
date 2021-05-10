<template>
  <div class="ancho centra">
    <div class="card" style="width:450px;">
      <div class="card-header">
        <h4 class="control-label">Detalles de la compra</h4>
      </div>
      <div class="card-body align">

        <div class="form-group" align="center">
          <div class="col" style="margin-top: 10px;"><h6 class="text-info" style=" line-height: 155%;">Por favor completa la siguiente información para comenzar a procesar tu compra</h6></div>
        </div>
        <hr class="dotted">
        <div class="row">
          <div class="col-sm-4 " align="center" >
            <img class="rounded img-thumbnail" src="../assets/bicho1.jpg" alt="imagen mascota" style="max-height: 130px; width: auto;">
          </div>
          <div class="col" style="margin-top: 15px;">
            <div class="row">
              <div class="row">
                <h5 class="col-sm-11" align="center"><b>{{nombreMascota}}</b></h5>
                <div class="w-100 d-none d-md-block"></div>
                <div class="col-sm-11" style="margin-top: 10px;">
                  <button class="shadowing btn btn-link dropdown-toggle btn-block" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">Paquetería de envío</button>
                </div>
              </div>

            </div>
          </div>
        </div>

        <div id="collapseOne" class="collapse" aria-labelledby="headingOne" data-parent="#accordion">
          <div class="card-body">
            <div class="row ">
              <div class="col-sm-1"></div>
              <div class="col">
                <div v-for="pa in paqueterias" :key="pa.id">
                  <div class="row" style="margin-bottom: 5px;">
                    <div class="col-sm-1" style="margin-top: 5px;">
                      <input type="radio" v-model="paqSelected" name="paqSelected" :value="pa.id">
                    </div>
                    <div class="col-sm-7">
                      <b style="font-size: 14px;">{{pa.nombre}}</b>
                      <div class="w-100 d-none d-md-block"></div>
                      <p class="shortSpace">{{pa.breveDescripcion}}</p>
                    </div>
                    <div class="col-sm-1"></div>
                    <div class="col text-primary">
                      ${{pa.precio}}
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-sm-1"></div>
                  <div class="col"  style="margin-top: 10px;">
                    <a href="#" class="text-primary">Más información sobre envíos y paqueterías</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {{paqSelected}}
        <hr class="dotted">

        <div class="card-body">
          <div class="row">
            <div class="col-sm-3">
              <small class="text-secondary">Enviar a</small>
            </div>
            <div class="col">
              <div v-for="dir in direcciones" :key="dir.id">
                <div class="row">
                  <div class="col-sm-1" style="margin-top: 5px;">
                    <input type="radio" v-model="dirSelected" name="dirSelected" :value="dir.id">
                  </div>
                  <div class="col">
                    <b style="font-size: 14px;">{{nombreCliente}}</b>
                    <div class="w-100 d-none d-md-block"></div>
                    <p class="shortSpace">{{procesada(dir)}}</p>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-sm-1"></div>
                <div class="col text-primary">
                  <a href="#">Añadir una nueva dirección</a>
                </div>
              </div>
              {{dirSelected}}
            </div>
          </div>
        </div>
        <hr class="dotted">

        <div class="card-body">
          <div class="row">
            <div class="col-sm-3">
              <small class="text-secondary">Pagar con</small>
            </div>
            <div class="col">
              <div class="row">
                <div class="col-sm-1" style="margin-top: 2px;">
                  <input type="radio" v-model="paymentSelected" name="paymentSelected" :value="2">
                </div>
                <div class="col">
                  <b style="font-size: 14px;">Pagar con <i class="text-primary">PayPal</i></b>
                </div>
              </div>
              <div class="row separation">
                <div class="col-sm-1" >
                  <img src="../assets/bb-bitcoin.jpg" width="20px">
                </div>
                <div class="col" >
                  <b >Pago con Cripto-monedas</b>
                </div>
              </div>
              <div class="row" style="margin-top: 5px;">
                <div class="col-sm-1">
                  <input type="radio" v-model="paymentSelected" name="paymentSelected" :value="3">
                </div>
                <div class="col">
                  <p class="shortSpace">Bitcoin</p>
                </div>
                <div class="col-sm-1">
                  <input type="radio" v-model="paymentSelected" name="paymentSelected" :value="4">
                </div>
                <div class="col">
                  <p class="shortSpace">Ethereum</p>
                </div>
              </div>
              <div class="row" style="margin-top: -5px;">
                <div class="col-sm-1"></div>
                <div class="col">
                  <a href="#">Ver mis carteras digitales</a>
                </div>
              </div>

              <div class="row separation">
                <div class="col-sm-1" >
                  <img src="../assets/cc.png" width="20px">
                </div>
                <div class="col" >
                  <b >Pago con tarjeta bancaria</b>
                </div>
              </div>
              <div v-for="ta in getTarjetas" :key="ta.numeroPago">
                <div class="row">
                  <div class="col-sm-1" >
                    <input type="radio" v-model="paymentSelected" name="paymentSelected" :value="ta.numeroPago">
                  </div>
                  <div class="col">
                    <div class="row">
                      <div class="col-sm-8">
                        <p class="shortSpace" style="line-height: 115%">Tarjeta terminada en <b>{{getLastDigits(ta.numeroPago)}}</b>
                        Expira el: {{ta.expiracion}}</p>
                      </div>
                      <div class="col">
                          <input v-if="paymentSelected===ta.numeroPago" type="text" v-model="cvv" maxlength="3" placeholder="CVV" style="width: 50px; font-size: 10px;">
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="row" style="margin-top: -5px;">
                <div class="col-sm-1"></div>
                <div class="col">
                  <a href="#">Añadir una nueva tarjeta</a>
                  {{paymentSelected}}
                </div>
              </div>
            </div>
          </div>

        </div>

        <hr class="dotted">

        <div class="card-body">
          <div class="row">
            <div class="col-sm-3">
              <small class="text-secondary">Resumen de pedido</small>
            </div>
            <div class="col-sm-1"></div>
            <div class="col">

              <table class="table table-sm table-borderless mb-0">
                <tbody>
                  <tr>
                    <td>Mascota</td>
                    <td class="text-primary" align="right">$ {{precio}}</td>
                  </tr>
                  <tr>
                    <td>Envío</td>
                    <td align="right" class="text-primary">$ {{getPrecioEnvio}}</td>
                  </tr>
                </tbody>
              </table>
              <table class="table table-sm mt-1">
                <thead>
                <td>Total</td>
                <td class="text-primary" align="right">$ {{ precio + getPrecioEnvio }}</td>
                </thead>
              </table>
            </div>

            <div class="col-sm-1"></div>

          </div>
        </div>
        <div class="container mb-2" align="center">
          <button type="button" class="btn btn-success">Realizar pedido</button>
        </div>

      </div>
    </div>
  </div>

</template>

<script>
import axios from 'axios';
export default {
  name: "DetallePago.vue",

  mounted () {
    this.getPaqueterias();
  },

  data(){
    return {
      nombreCliente : "Ana Guevara",
      nombreMascota: "Camaleon pantera macho 13 meses",
      precio: 6000,
      paqueterias: [],
      paqSelected: 0,
      direcciones: [
          {'id': 1, 'calleNumero': 'Calle 1', 'colonia': 'Colonia 1', 'pais': 'Mexico', 'estado': 'DF', 'municipio': 'Benito Juarez', 'tipoDireccion': 'casa', 'cp': '00040', 'referencias': '' },
          {'id': 2, 'calleNumero': 'Calle 7', 'colonia': 'Colonia 3', 'pais': 'Mexico', 'estado': 'DF', 'municipio': 'Benito Juarez', 'tipoDireccion': 'trabajo', 'cp': '00060', 'referencias': '' }
        ],
      dirSelected: 0,
      metodosPago: [
          {'idCliente': 1, 'tipoPago': 1, 'numeroPago': '1243777789093623', 'expiracion':'10-22' },
          {'idCliente': 1, 'tipoPago': 1, 'numeroPago': '1234567890564534', 'expiracion': '11-25'}
      ],
      paymentSelected: 0,
      cvv:""
    }
  },

watch:{
    direcciones(){

    }
},
methods: {
    procesada(obj){
      return obj.calleNumero + ", " + obj.municipio + ", " + obj.colonia + ", " + obj.cp + ", " + obj.estado + ", " + obj.pais;
    },
    getLastDigits(obj){
      return obj.slice(-4);
    },
    getPaqueterias(){
      axios.get('/api/paqueterias.json', {}).then(response => {
        console.log(response.data);
        this.paqueterias=response.data;
      }).catch(e => {
        console.log(e.response.status);
        console.log(e.response.data);
      });
    }

  // getCarteraBTC(){
  //     for(let i=0;i<this.metodosPago.length;i++){
  //       if(this.checkIsBTC(this.metodosPago[i],3)){
  //         return this.metodosPago[i].numeroPago;
  //       }
  //     }
  //     return null;
  //   },
  //   checkIsBTC(obj,num){
  //     return obj.tipoPago===num;
  //   }
},
computed: {
    getPrecioEnvio(){
      if(this.paqSelected!=0){
        return this.paqueterias[this.paqSelected-1].costo;
      }
      return 0;
    },
    getTarjetas(){
      var arr=[];
      for (var i=0;i<this.metodosPago.length;i++){
        if (this.metodosPago[i].tipoPago===1){
          arr.push(this.metodosPago[i]);
        }
      }
      return arr;
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
  line-height: 96%;
  font-size: 12px;
}
.separation{
  font-size: 14px;
  margin-top: 30px;
  margin-bottom: 10px;
}

</style>