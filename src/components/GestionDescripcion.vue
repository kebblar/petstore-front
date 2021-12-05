<template>
  <div class="container-fluid px-5 w-100 h-100 my-5">
      <div class="row mt-5">
        <div class="col-12">
          <div class="card">
            <div class="card-body align">
                <small class="form-text text-muted text-center">Describe tu personalidad</small>
                <br>
                <div class ="form-group">
                  <vue-editor 
                    v-model="descripcion" 
                    maxLength=10 
                    @input="onEditorInput"
                    :editor-toolbar="customToolbar" 
                    ref="innerTextDescripcion">
                    </vue-editor>
                  <small>
                    Te quedan {{ longitudDescripcion }} caracteres para tu descripción. (Cortaremos mas allá del carater {{ limite }})
                  </small>
                </div>
                <br>
                <div class="form-group row text-center">
                  <div class="col">
                    <button type="button" @click="guardar" class="btn btn-success">Salvar</button>
                  </div>
                  <div class="col">
                    <a href="#" class="btn btn-warning" @click="openLoginPage">Regresar a login</a>
                  </div>
                </div>
            </div>
          </div>
        </div>
      </div>
      <div class="row mt-5"> 
        <div v-html="descripcion" class="cuadrito" />
      </div>
  </div>
</template>

<script>
  import { VueEditor } from 'vue2-editor';
  import router from '../router'
  import axios from 'axios'
  import store from '../store'
  
  export default {
      data() {
        return {
          descripcion: '',
          customToolbar:  [
            //[{ header: [false, 1, 2, 3, 4, 5, 6] }],
            ["bold", "italic","underline"], // toggled buttons
            [
              { align: "" },
              { align: "center" },
              { align: "right" },
              { align: "justify" }
            ],
          // ["blockquote", "code-block"],
            [{ list: "ordered" }, { list: "bullet" }],
            //[{ indent: "-1" }, { indent: "+1" }], // outdent/indent
            [{ color: [] }], // dropdown with defaults from theme
            ["link"],
            ["clean"] // remove formatting button
          ],
          dpt:'',
          limite: 2000,
          longitudDescripcion: this.limite
        }
      },
      methods: {
        guardar() {
          axios.post('api/descripcion', {
            descripcion: this.descripcion,
            correo: store.state.session.correo,
            descripcionPlaneText: this.dpt.substring(0,this.limite)
          }).then(response => {
            console.log(response);
            console.log(response.data);
            console.log(response.status);
          }).catch(error => {
            if(error.response) {
                console.log(error);
            }
          }).finally(
            console.log('finaliza proceso de guardado de descrpcion')
          );
          //router.push('/ui/regenera-clave-confirma').catch(()=>{});
        }, 
        openLoginPage() {
          router.push('/ui/login').catch(()=>{});
        },
        onEditorInput(data){
          var element = this.$refs.innerTextDescripcion;
          if(data!=''){
            console.log("valor longitud: "+element.quill.container.innerText.length);
            this.dpt = this.$refs.innerTextDescripcion.quill.container.innerText;
            console.log(this.dpt);
            this.longitudDescripcion=this.limite - element.quill.container.innerText.length;
            //this.longitudDescripcion=100*this.descripcion.length
          }else{
            this.longitudDescripcion=this.limite
          }
        }
      }, 
      mounted() {
        this.longitudDescripcion=this.limite
        //store.commit('setToggleHeader', false);
        //store.commit('setToggleFooter', false);
        //store.commit('setToggleSidebar', false);
      },
      components: {
        VueEditor
      }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.cuadrito {
    border-style: dashed;
    border-block-color: red;
    border-radius: 0.5;
}
</style>