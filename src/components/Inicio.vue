<template>
  <div class="busqueda">
    <div>
      <b-container>
        <b-row>
          <b-col>
            <select class="custom-select my-select" v-model="oficio">
              <option :value="0" selected>Oficio</option>
              <option v-for="ofi in oficios" :key="ofi.id" :value="ofi">
                {{ofi.descripcion}}
              </option>
            </select>
          </b-col>
          <b-col>
            <select class="custom-select my-select" v-model="estado" @change="updateMunicipios">
              <option :value="0" selected>Estado</option>
              <option v-for="edo in estados" :key="edo.id" :value="edo">
                {{edo.nombre}}
              </option>
            </select>
          </b-col>
          <b-col>
            <select class="custom-select my-select" v-model="municipio" :disabled="!estado">
              <option :value="0" selected>Municipio</option>
              <option v-for="mun in municipios" :key="mun.id" :value="mun">
                {{mun.nombre}}
              </option>
            </select>
          </b-col>
          <b-col>
            <select class="custom-select my-select" v-model="pago">
              <option :value="0" selected>Método de pago</option>
              <option v-for="pay in pagos" :key="pay.id" :value="pay">
                {{pay.nombre}}
              </option>
            </select>
          </b-col>
          <b-col>
            <button class="btn btn-outline-info" type="submit" @click="busca">
              Ir
            </button>
          </b-col>
        </b-row>
      </b-container>
    </div>

    <div class="album py-2">
      <div class="container">

        <div class="row">
          <div class="col-md-4">
            <div class="card mb-4 box-shadow">
              <a href="#" @click="buscaOficios(2)">
                <img class="card-img-top" src='/albanileria.jpg' alt="Card image cap">
                <div class="card-img-overlay">
                  <h3 class="card-title"> Servicio de albañilería </h3>
                </div>
              </a>
            </div>
          </div>
          <div class="col-md-4">
            <div class="card mb-4 box-shadow">
              <a href="#" @click="buscaOficios(1)">
                <img class="card-img-top" src='/carpinteria.jpg' alt="Servicio Carpinteria">
                <div class="card-img-overlay">
                  <h3 class="card-title" > Servicio de carpintería </h3>
                </div>
              </a>
            </div>
          </div>
          <div class="col-md-4">
            <div class="card mb-4 box-shadow">
              <a href="#" @click="buscaOficios(9)">
                <img class="card-img-top" src='/cocina.jpg' alt="Card image cap">
                <div class="card-img-overlay">
                  <h3 class="card-title"> Servicio de cocina </h3>
                </div>
              </a>
            </div>
          </div>

          <div class="col-md-4">
            <div class="card mb-4 box-shadow">
              <a href="#" @click="buscaOficios(8)">
                <img class="card-img-top" src='/chofer.jpg' alt="Card image cap">
                <div class="card-img-overlay">
                  <h3 class="card-title"> Servicio de conductor </h3>
                </div>
              </a>
            </div>
          </div>
          <div class="col-md-4">
            <div class="card mb-4 box-shadow">
              <a href="#" @click="buscaOficios(5)">
                <img class="card-img-top" src='/herreria.jpg' alt="Card image cap">
                <div class="card-img-overlay">
                  <h3 class="card-title"> Servicio de herrería </h3>
                </div>
              </a>
            </div>
          </div>
          <div class="col-md-4">
            <div class="card mb-4 box-shadow">
              <a href="#" @click="buscaOficios(3)">
                <img class="card-img-top" src='/jardineria.jpg' alt="Card image cap">
                <div class="card-img-overlay">
                  <h3 class="card-title"> Servicio de jardinería </h3>
                </div>
              </a>
            </div>
          </div>

          <div class="col-md-4">
            <div class="card mb-4 box-shadow">
              <a href="#" @click="buscaOficios(4)">
                <img class="card-img-top" src='/plomero.jpg' alt="Card image cap">
                <div class="card-img-overlay">
                  <h3 class="card-title"> Servicio de plomería </h3>
                </div>
              </a>
            </div>
          </div>
          <div class="col-md-4">
            <div class="card mb-4 box-shadow">
              <a href="#" @click="buscaOficios(7)">
                <img class="card-img-top" src='/sastre.jpg' alt="Card image cap">
                <div class="card-img-overlay">
                  <h3 class="card-title"> Servicio de sastrería </h3>
                </div>
              </a>
            </div>
          </div>
          <div class="col-md-4">
            <div class="card mb-4 box-shadow">
              <a href="#" @click="buscaOficios(6)">
                <img class="card-img-top" src='/zapatero.jpg' alt="Card image cap">
                <div class="card-img-overlay">
                  <h3 class="card-title"> Servicio de zapatería </h3>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>

    <modal name="mensaje" :clickToClose="false" :reset="true" :width="480" :height="160">
      <div class="card">
        <div class="card-header" id="Titulo">Aviso del sistema</div>
        <div class="card-body">
          <h5 class="card-title">{{ msg }}</h5>
          <div style="text-align: right;">
            <a href="#" class="btn btn-primary" @click="cerrar('mensaje')">OK</a>
          </div>
        </div>
      </div>
    </modal>

  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      oficio: 0,
      oficios: [],
      estado: 0,
      estados: [],
      municipio: 0,
      municipios: [],
      pago: 0,
      pagos: [],
      anuncios: [],
      msg: '',
      loading: false
    }
  },
  mounted () {
    this.updateOficios();
    this.updateEstados();
    this.updatePagos();
  },
  methods: {
    updateOficios: function() {
      axios.get('/api/all-oficios',
      {
        headers: {
                'Content-type': 'application/json',
                'crossDomain': true,
                'Acces-Control-Allow-Origin': '*'
        }
      }).then(response => {
        console.log(response.data);
        this.oficios = response.data;
      }).catch(error => {
        this.msg = "Error de conexión.";
        console.log(error + this.msg);
        this.$modal.show('mensaje');
      }).finally(() => {
        this.loading =  false
      });
    },
    updateEstados: function() {
      axios.get('/api/estados.json',
      {
        headers: {
                'Content-type': 'application/json',
                'crossDomain': true,
                'Acces-Control-Allow-Origin': '*'
        }
      }).then(response => {
        console.log(response.data);
        this.estados = response.data;
        this.estados.shift();
      }).catch(error => {
        this.msg = "Error de conexión.";
        console.log(error + this.msg);
        this.$modal.show('mensaje');
      }).finally(() => {
          this.loading =  false
      });
    },
    updateMunicipios: function() {
      if (this.estado != 0) {
        axios.get('/api/municipios.json?idEstado='+this.estado.id,
        {
          headers: {
            'Content-type': 'application/json',
            'crossDomain': true,
            'Acces-Control-Allow-Origin': '*'
          }
        }).then(response => {
          console.log(response.data);
          this.municipios = response.data;
        }).catch(error => {
          this.msg = "Error de conexión.";
          console.log(error + this.msg);
          this.$modal.show('mensaje');
        }).finally(() => {
          this.loading =  false
        });
      } else {
        this.municipio = 0
      }
    },
    updatePagos: function() {
      axios.get('/api/pagos.json',
      {
        headers: {
                'Content-type': 'application/json',
                'crossDomain': true,
                'Acces-Control-Allow-Origin': '*'
        }
      }).then(response => {
        console.log(response.data);
        this.pagos = response.data;
      }).catch(error => {
        this.msg = "Error de conexión.";
        console.log(error + this.msg);
        this.$modal.show('mensaje');
      }).finally(() => {
          this.loading =  false
      });
    },
    busca: function() {
      axios.get('api/getanuncios.json',
      {
        params: {
          idOficio: this.oficio.id,
          idEstado: this.estado.id,
          idMunicipio: this.municipio.id,
          idPago: this.pago.id
        }
      },
      {
        headers: {
                'Content-type': 'application/json',
                'crossDomain': true,
                'Acces-Control-Allow-Origin': '*'
        }
      }).then(response => {
        console.log(response.data);
        this.anuncios = response.data;
        if (this.anuncios.length === 0) {
          this.msg = "No se encontraron resultados.";
          this.$modal.show('mensaje');
        } else {
          this.$router.push({name: 'busqueda-resultados', params: {anuncios: this.anuncios}});
        }
      }).catch(error => {
        this.msg = "Error de conexión.";
        console.log(error + this.msg);
        this.$modal.show('mensaje');
      }).finally(() => {
          this.loading =  false
      });
    },
    buscaOficios: function(idOficio) {
      axios.get('api/getanuncios.json',
      {
        params: {
          idOficio: idOficio
        }
      },
      {
        headers: {
                'Content-type': 'application/json',
                'crossDomain': true,
                'Acces-Control-Allow-Origin': '*'
        }
      }).then(response => {
        console.log(response.data);
        this.anuncios = response.data;
        if (this.anuncios.length === 0) {
          this.msg = "No se encontraron resultados.";
          this.$modal.show('mensaje');
        } else {
          this.$router.push({name: 'busqueda-resultados', params: {anuncios: this.anuncios}});
        }
      }).catch(error => {
        this.msg = "Error de conexión.";
        console.log(error + this.msg);
        this.$modal.show('mensaje');
      }).finally(() => {
          this.loading =  false
      });
    },
    cerrar: function(nombre) {
      this.$modal.hide(nombre);
    }
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import url(https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css);

h3 {
  margin: 40px 0 0;
  display: block;
  margin-top: 2.7em;
  font-weight: bold;
  color: white;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}

.card-header {
  background-color: #353A3F;
}
.my-select {
  color: black;
  border-color: black;
  border-radius: 20px;
  cursor: pointer;
  margin: 12px 1px;
}
.btn-outline-info {
  border-radius: 20px;
  position: relative;
  cursor: pointer;
  top: 12px;
  text-align: center;
  width: 150px
}

#Titulo{
  color: white
}
</style>
