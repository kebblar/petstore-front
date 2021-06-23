<template>
  <div class="ancho centra">
    <div class="card" style="width:1050px;">
      <div class="card-header">
        <label class="h4">Créditos</label>
      </div>
      <div class="card-body align">
          <table>
              <thead>
                <tr>
                    <td>Equipo Azul</td>
                    <td>Equipo CodingLove</td>
                    <td>Equipo CloudStore</td>
                    <td>Equipo Vimpollos</td>
                </tr>
              </thead>
              <tbody>
                <tr>
                    <td>Edgar Eduardo Uribe Mendez</td>
                    <td>Juan Jesús Gómez Sotelo</td>
                    <td>Josué Israel Romero Velasco</td>
                    <td>Fhernanda Montserrat Romo Olea</td>
                </tr>
                <tr>
                    <td>Fabiola Camilo Victoriano</td>
                    <td>Luis Ángel Martínez</td>
                    <td>Diego González Sánchez</td>
                    <td>Luis Eduardo Martínez Hernández</td>
                </tr>
                <tr>
                    <td>Javier Chávez Barrios</td>
                    <td>Marco Antonio Santiago García</td>
                    <td>Francisco Javier Moreno Romero</td>
                    <td>Daniel Omar Alvarez Morales</td>
                </tr>
                <tr>
                    <td>Luz del Carmen Cuahonte Reyes</td>
                    <td>Marco Antonio Tapia Cervantes</td>
                    <td>José Francisco Espinosa Romero</td>
                    <td>Lizbeth Leal García</td>
                </tr>
                <tr>
                    <td>Maria Isabel Contreras García</td>
                    <td>Ulises Alejandro López Urbina</td>
                    <td></td>
                    <td></td>
                </tr>
              </tbody>
          </table>

        <div style="width:100%; text-align:center">
            <hr/>
        <a href='#' @click="open">Aprender, Enseñar y Trascender... esa es la misión.</a>
        </div>
      </div>
    </div>

    <Aviso
      ref='avisoComp'
      ancho='420'
      alto='200'
      :target=destino
      :avisoMsg=listo
      avisoTitulo='Con la participación especial de...' />

  </div>
</template>

<script>
import Aviso from '../Aviso';
export default {
    data: function () {
        return {
          listo7: 'Super Goose !!!',
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
        return 'Super Goose Arellano !!! '
      }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.ancho {
  max-width: 1050px;
}
table tbody tr td {
    width: 256px;
}
table thead tr td {
    color:red;
}
</style>