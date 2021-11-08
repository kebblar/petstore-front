<template>
  <div class="row">
    <div v-if="tipo!=='password'">
      <input :type="tipo" class="form-control" :id="idInput"/>
      <span :class="{icono, errspan:true}"></span>
    </div>
    <div v-else>
      <div class="row px-3">
        <input :type=pwInputValue class="form-control" :id="idInput"/>
        <div v-if="icono">
          <span :class="{icono, errspan:true}"></span>
        </div>
        <div class="put-right">
          <a href="#" @click="oculta">
            <div class="icon-wrapper">
              <i :class="[pwVisible ? 'fas fa-eye-slash' : 'fas fa-eye']"></i>
            </div>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "InputField",
  props: {
    icono: {
      type: String,
      required: false
    },
    tipo: {
      type: String,
      required: true
    },
    idInput: {
      type: String,
      required: true
    },
    binded : {
      type: String,
      required: true
    }
  },
  data: function () {
    return {
      pwInputValue : "password",
      pwVisible: false
    }
  },
  methods: {
    oculta () {
      this.pwVisible = !this.pwVisible;
      this.pwInputValue = (this.pwVisible) ? "text" : "password";
    }
  }
}
</script>
<style>
.errspan{
  left: 29px;
  margin-top: 11px;
  position: absolute;
  z-index: 2;
  color: #0073ff;
}
.put-right{
  position: absolute;
  right: 28px;
  margin-top: 9px;
  z-index: 2;
}
</style>