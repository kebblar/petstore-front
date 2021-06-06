<template>
  <!-- 
    Modal reutilizable 
    -->
  <modal 
    name="aviso" 
    :clickToClose="false" 
    :reset="true"
    :width=ancho
    :height=alto>
    <div class="card">
        <div class="card-header text-white" style="text-align: center; background-color: #363636;">
          <label class="control-label h4" >{{ avisoTitulo }}</label>
        </div>
        <div class="card-body">
            <label class="control-label h4" >{{ avisoMsg }}</label>
            <hr/>
            <div class="aceptar">
                <a href="#" class="btn btn-primary" @click="go">Aceptar</a>
            </div>
        </div>
    </div>
  </modal>

</template>

<script>
import router from './router'

export default {
    props: ['avisoTitulo', 'avisoMsg','target','ancho','alto'],
    data: function () {
        return {
          //ancho:720
        }
    },
    methods: {
      go: function() {
        if(this.target.length>0) {
          router.push(this.target);          
        } else {
          this.$modal.hide('aviso');
        }
      },
      abre: function() {
        this.$modal.show('aviso');
      }
    }
}
</script>

