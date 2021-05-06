<template>
  <div class="ancho centra">
    <div class="card" style="width: 500px;">
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
          <div class="col" style="margin-top: 15px; margin-bottom: 10px;">
            <div class="row">
              <div class="row">
                <h5 class="col-sm-11" align="center">{{nombreMascota}}</h5>
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
            <div class="row">
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
                      <p class="shortSpace">{{pa.breveDesc}}</p>
                    </div>
                    <div class="col-sm-1"></div>
                    <div class="col text-primary">
                      {{pa.costo}}
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
                    <p style="font-size: 12px; line-height: 90%;">{{procesada(dir)}}</p>
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
              <div v-for="pago in pagos" :key="pago.id">
                <div class="row">
                  <div class="col-sm-1" style="margin-top: 5px;">
                    <input type="radio" v-model="pagoSelected" name="pagoSelected" :value="pago.id">
                  </div>
                  <div class="col">
                    <b style="font-size: 14px;">{{pago.nombre}}</b>
                    <div class="w-100 d-none d-md-block"></div>
                    <p style="font-size: 12px; line-height: 90%;">{{}}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
export default {
  name: "DetallePago.vue",
  data(){
    return {
      nombreCliente : "Ana Guevara",
      nombreMascota: "Camaleon pantera macho 13 meses",
      precio: 6000,
      paqueterias: [
          {'id':1, 'nombre': 'Estafeta', 'breveDesc': 'Entrega proritaria de 1 a 2 días', 'costo': '$250'},
          {'id':2, 'nombre': 'DHL', 'breveDesc': 'Entrega al día siguiente', 'costo': '$350'},
          {'id':3, 'nombre': 'Aeromexico Cargo', 'breveDesc': 'Entrega en unas horas o al día siguiente', 'costo': '$950'}
      ],
      paqSelected: "",
      direcciones: [
          {'id': 1, 'calleNumero': 'Calle 1', 'colonia': 'Colonia 1', 'pais': 'Mexico', 'estado': 'DF', 'municipio': 'Benito Juarez', 'tipoDireccion': 'casa', 'cp': '00040', 'referencias': '' },
          {'id': 2, 'calleNumero': 'Calle 7', 'colonia': 'Colonia 3', 'pais': 'Mexico', 'estado': 'DF', 'municipio': 'Benito Juarez', 'tipoDireccion': 'trabajo', 'cp': '00060', 'referencias': '' }
        ],
      dirSelected: ""
    }
  },

watch:{
    direcciones(){

    }
},
methods: {
    procesada(obj){
      return obj.calleNumero + ", " + obj.municipio + ", " + obj.colonia + ", " + obj.cp + ", " + obj.estado + ", " + obj.pais;
    }
},
computed: {
    getPrecio(){
      return "$"+ this.precio.toString()+".00";
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