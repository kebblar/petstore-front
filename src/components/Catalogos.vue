<template>
    <div class="ancho centra">
        <b-card>

            <b-tabs pills card vertical>

                <b-tab 
                    v-on:click="graficar_importe_total_ventas"
                    title="Paises"
                    active>
                    <b-card-text>
                        <div class="ancho centra box-shadow">
                            <ConsultaPais />
                        </div>
                    </b-card-text>
                </b-tab>

                <b-tab 
                    v-on:click="graficar_importe_total_ventas"
                    title="Estados">
                    <b-card-text>
                        <div class="ancho centra box-shadow">
                            <ConsultaEstado />
                        </div>
                    </b-card-text>
                </b-tab>

                <b-tab 
                    v-on:click="graficar_importe_total_ventas"
                    title="Municipios">
                    <b-card-text>
                        <div class="ancho centra box-shadow">
                            <ConsultaMunicipio />
                        </div>
                    </b-card-text>
                </b-tab>

                <b-tab 
                    v-on:click="graficar_importe_total_ventas"
                    title="Estatus para Anuncios">
                    <b-card-text>
                        <div class="ancho centra box-shadow">
                            <ConsultaEstatusAnuncio />
                        </div>
                    </b-card-text>
                </b-tab>

                <b-tab 
                    v-on:click="graficar_importe_total_ventas"
                    title="Servicios de Paqueteria">
                    <b-card-text>
                        <div class="ancho centra box-shadow">
                            <ConsultaPaqueteria />
                        </div>
                    </b-card-text>
                </b-tab>

                <b-tab 
                    v-on:click="graficar_importe_total_ventas"
                    title="Tipos de Multimedia">
                    <b-card-text>
                        <div class="ancho centra box-shadow">
                            <ConsultaMediaTipo />
                        </div>
                    </b-card-text>
                </b-tab>

                <b-tab 
                    v-on:click="graficar_importe_total_ventas"
                    title="Categirias de Animales">
                    <b-card-text>
                        <div class="ancho centra box-shadow">
                            <ConsultaCategoria />
                        </div>
                    </b-card-text>
                </b-tab>

                <b-tab 
                    v-on:click="graficar_importe_total_ventas"
                    title="Atributos de Categiria">
                    <b-card-text>
                        <div class="ancho centra box-shadow">
                            <ConsultaAtributo />
                        </div>
                    </b-card-text>
                </b-tab>








            </b-tabs>
        </b-card>
    </div>
  
</template>

<script>
import ConsultaPais from './ConsultaPais'
import ConsultaEstado from './ConsultaEstado'
import ConsultaMunicipio from './ConsultaMunicipio'
import ConsultaEstatusAnuncio from './ConsultaEstatusAnuncio'
import ConsultaPaqueteria from './ConsultaPaqueteria'
import ConsultaMediaTipo from './ConsultaMediaTipo'
import ConsultaAtributo from './ConsultaAtributo'
import ConsultaCategoria from './ConsultaCategoria'

export default {
    components: {
      ConsultaPais, 
      ConsultaEstado,
      ConsultaMunicipio,
      ConsultaEstatusAnuncio,
      ConsultaPaqueteria,
      ConsultaMediaTipo,
      ConsultaAtributo,
      ConsultaCategoria
    },
}
</script>

<style scoped>
.ancho {
    max-width: 95%;
}
</style>