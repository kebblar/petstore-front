<template>
  <div class="ancho centra">
    <div class="card" style="width:460px;">
      <div class="card-header">
        <label class="h4">Cambia Datos Personales</label>
      </div>
      <div class="card-body align">
        <a href='#' @click="open">abre</a>
      </div>
    </div>

    <Aviso 
      ref='avisoComp'
      ancho='420'
      alto='200'
      :target=destino
      :avisoMsg=listo
      avisoTitulo='Aviso del sistemita' />

  </div>
</template>

<script>
import Aviso from '../Aviso';

export default {
    data: function () {
        return {
          listo7: 'Mensaje del sistema 5',
          destino: ''
        }
    },
    components: {
      'Aviso': Aviso
    },
    methods: {
      open: function() {
        this.$refs.avisoComp.abre();
      }
    },
    computed: {
      listo: function() {
        return 'Mensaje del sistema 2'
      }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style> scoped
.anho {
  max-width: 400px;
}
</style>
