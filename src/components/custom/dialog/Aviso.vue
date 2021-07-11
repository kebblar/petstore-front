<template>
  <!--
    Modal reutilizable
    -->
  <modal
    name="aviso"
    :clickToClose="false"
    :width=ancho
    :height=alto>
      <div class="popup-modal"> 
        <div class="window">
          <h2 style="margin-top: 0; text-align: center;">{{ avisoTitulo }}</h2>
          <p>{{ avisoMsg }}</p>
          <hr/>
          <div class="centrado">
              <button class="green-btn" @click="go">Aceptar</button>
          </div>
        </div>
      </div>
  </modal>

</template>

<script>
import router from '../../../router'

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

<style scoped>
.popup-modal {
    background-color: transparent;
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 0.5rem;
    display: flex;
    align-items: center;
    z-index: 1;
}

.window {
    background: #fff;
    border-radius: 5px;
    box-shadow: 2px 4px 8px rgba(0, 0, 0, 0.2);
    max-width: 320px;
    margin: auto;
    padding: 1rem;
    z-index: 10000;
}
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.3s;
}
.fade-enter,
.fade-leave-to {
    opacity: 0;
}


.btns {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}
.centrado {
    text-align: center;
}
.red-btn {
    padding: 0.5em 1em;
    background-color: #ffcccc;
    color: #cc2222;
    border: 2px solid #ff0000;
    border-radius: 5px;
    font-weight: bold;
    font-size: 16px;
    text-transform: uppercase;
    cursor: pointer;
}
.green-btn {
    padding: 0.5em 1em;
    background-color: #d5eae7;
    color: #35907f;
    border: 2px solid #0ec5a4;
    border-radius: 5px;
    font-weight: bold;
    font-size: 16px;
    text-transform: uppercase;
    cursor: pointer;
}
</style>