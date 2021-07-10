<template>
  <div class="ancho centra">
    <div class="card">
      <div class="card-header">
        <div class="row justify-content-between">
            <div class="col-6">
              <label>Administración de anuncios</label>
            </div>
            <div class="mr-1">
              <button type="button" class="btn btn-danger" @click="regresar">Cancelar</button>
            </div> 
        </div>
      </div>
      <div>
        <form-wizard id="wizard" ref="wizard"
          :start-index.sync="activeTabIndex"
          :title="null"
          :subtitle="null"
          next-button-text="Siguiente"
          back-button-text="Regresar"
          finish-button-text="Confirmar"
          color="green"
          @on-complete="onComplete">
          <h2 slot="title">{{tituloProceso}}</h2>
           <tab-content title="Datos generales" :before-change="validarDatos">
            <div class="col-sm-12 text-left">
              <div v-if="id != 0" class="form-group">
                <label for="folio">FOLIO</label>
                <label class="font-weight-bold m-2">{{folio}}</label>
                <input type="hidden" v-model="id"/>
              </div>
              <div class="form-group">
                <label for="titulo" class="required">Titulo </label>
                <input type="text" class="form-control" :class="classTitulo" maxlength="50" v-model="titulo"/>
                <small class="notValid">{{msgTitulo}}</small>
              </div>

              <div class="form-group">
                <label for="descripcion" class="required">Descripción</label><label class="requerido"></label>
                <vue-editor v-model="descripcion" @input="onEditorInput"
                :editor-toolbar="customToolbar" ref="innerTextDescripcion"></vue-editor>
                <small class="notValid">{{msgDescripcion}}</small>
              </div>

              <div class="form-group">
                <div class="row">
                  <div class="col-12 col-sm-6">
                      <label for="fechaInicioVigencia">Inicio de vigencia</label>
                      <b-form-datepicker v-model="fechaInicioVigencia" :min="min"  locale="es" placeholder="dd/mm/aaaa"
                       :date-format-options="{ year: 'numeric', month: '2-digit', day: '2-digit' }"></b-form-datepicker>
                  </div>
                  <div class="col-12 col-sm-6">
                      <label for="fechaFinVigencia">Fin de vigencia</label>
                     <b-form-datepicker v-model="fechaFinVigencia" :min="min"  locale="es" placeholder="dd/mm/aaaa"
                       :date-format-options="{ year: 'numeric', month: '2-digit', day: '2-digit' }"></b-form-datepicker>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-6">
                   <label for="precio" class="required">Precio</label>
                   <input type="number" pattern="[0-9]" required onkeypress="return (event.charCode >= 48 && event.charCode <= 57) || event.charCode == 46" step="1" :class="classPrecio" class="form-control" v-model="precio" min="0" maxlength="9" />
                   <small class="notValid">{{msgPrecio}}</small>
                </div>
                <div class="col-6">
                  <label for="categoria" class="required">Categoria</label>
                  <select class="form-control" required :class="classCategoria" v-model="idCategoria" @change="onChangeCategoria">
                    <option value="0">Seleccione</option>
                    <option :value="t.id" v-for="t in tipoCategorias" :key="t.id">
                      {{ t.valor }}
                    </option>
                  </select>
                  <small class="notValid">{{msgCategoria}}</small>
                </div>
              </div>
              <div class="row col-12 mt-3">
                   <h5 class="text-center font-weight-bold">Caracteristicas</h5>
              </div>
              <hr/>
              <div class="row" v-if="atributosByCategoria.length>0">
                    <div class="col-6" v-for="(c, index) in atributosByCategoria" :key="index">
                        <div class="form-group">
                          <label>{{c.nombre}}</label>
                          <select class="form-control select" :id="index" :name="c.id" @change="onChangeAtributo">
                            <option value="0" selected>Selecione</option>
                            <option :value="o.idValorAtributo" v-for="o in c.options" :key="o.id"
                                 :selected="(atributos[index].valor ===  o.idValorAtributo)?'selected':''">
                                {{ o.valor }}
                             </option>
                         </select>
                        </div>
                    </div>
              </div>
            </div>
          </tab-content>

          <!-- Sección de la IMAGEN -->
          <tab-content title="Imagenes">
            <Imagen :imagenes="this.imagenes" :id="this.id"></Imagen>
          </tab-content>

          <!-- Sección de la RESUMEN -->
          <tab-content title="Resumen">
            <div class="row col-12">
              <div class="alert alert-primary font-weight-bold" role="alert">
                A continuación se desglosa la información del anuncio, para su
                previa revisión antes de publicar el anuncio a nuestros usuarios
                finales.
              </div>
            </div>

            <div class="card">
              <div class="card-header text-center">
                <h5 class="font-weight-bold">Información del anuncio</h5>
              </div>
              <div class="card-body">
                <div class="container">
                  <div class="row">
                    <div class="col-4 text-right font-weight-bold">FOLIO</div>
                    <div class="text-left">
                      {{ folio }}
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-4 text-right font-weight-bold">Titulo</div>
                    <div class="text-left">
                      {{ titulo }}
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-4 text-right font-weight-bold">
                      Categoria
                    </div>
                    <div class="text-left" v-if="(idCategoria-1) >= 0">
                      {{ tipoCategorias[idCategoria-1].valor}}
                    </div>
                    <div class="text-left" v-if="(idCategoria-1) < 0">
                      ------------
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-4 col-sm-4 text-right font-weight-bold">
                      Fecha de vigencia
                    </div>
                    <div class="text-left">
                      {{ fechaInicioVigencia }} - {{ fechaFinVigencia }}
                    </div>
                  </div>

                  <div class="row">
                    <div class="col-4 col-xs-12 text-right font-weight-bold">
                      Descripción
                    </div>
                    <div class="col-xs-12 col-8" style="padding-left: 0">
                      <!-- <blockquote class="blockquote"> -->
                      <p v-html="descripcion">{{ descripcion }}</p>
                      <!--  </blockquote> -->
                    </div>
                  </div>

                  <div class="row">
                    <div class="col-8 col-sm-9 text-right font-weight-bold">
                      <h4 class="font-weight-bold">Precio</h4>
                    </div>
                    <div class="col-xs-12" style="padding-left: 0">
                      <h4 style="color: green" class="font-weight-bold">
                        $ {{ precio }}
                      </h4>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Seccion de caracteristicas del anuncio -->
             <div class="card text-center mt-2">
              <div class="card-header text-center">
                <h5 class="font-weight-bold">Caracteristicas del anuncio</h5>
              </div>
              <div class="card-body">
                <div class="row" v-if="atributosByCategoria.length>0">
                  <div class="col-xs-12 col-4" v-for="(atributo, index) in atributos" v-bind="atributos" :key="index">
                    <div class="form-group">
                        <div class="col-12 font-weight-bold">
                           {{ atributosByCategoria[index].nombre}}
                        </div>
                        <div>
                           {{getOptionSelect(atributosByCategoria[index].options, atributo.valor)}}
                        </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Seccion de las imagenes -->
            <div class="card text-center mt-2">
              <div class="card-header text-center">
                <h5 class="font-weight-bold">Imagenes del anuncio</h5>
              </div>
              <div class="card-body">
                <div class="row col-12">
                    <div class="col-3" v-for="(item, index) in imagenes" :key="index">
                      <div class="text-center">
                        <div v-if="!item.uuid.includes('mp4') && !item.uuid.includes('avi')">
                          <img :src="ruta+item.uuid" class="img-fluid" :style="item.principal?'border: 5px solid #469b27;':''" width="150px" height="150px" /><br/>
                          {{ item.imagen }}
                        </div>
                        <div v-else>
                            <video poster="../../assets/processing.gif" class="video-fluid" autoplay loop muted style="padding: 2%" :style="item.principal?'border: 5px solid #469b27;':''" width="150px" height="150px">
                            <source :src="rutaVideo + item.uuid" type="video/mp4" />
                          </video>
                        </div>

                      </div>
                    </div>
              </div>
              </div>
            </div>
          </tab-content>
        </form-wizard>
      </div>
    </div>
  </div>
</template>
<script>
import {FormWizard, TabContent} from 'vue-form-wizard'
import 'vue-form-wizard/dist/vue-form-wizard.min.css'
//import VueToast from 'vue-toast-notification'; 
//import 'vue-toast-notification/dist/theme-sugar.css';
import Imagen from '@/components/admin/Imagen';
import moment from 'moment';
import Vue from 'vue';
import axios from 'axios';
import { VueEditor } from 'vue2-editor';

//Vue.use(VueToast);

export default {
  components: {
     FormWizard,
     TabContent,
     Imagen,
     VueEditor
  },
  data: function () {
    const minDate = new Date()
    return {
      min: minDate,
      showCharCount: true,
      activeTabIndex:0,
      tituloProceso:null,
      atributosByCategoria:[],
      tipoCategorias: [],
      atributosByCategoriaDefault:[],
      folio: null,
      titulo: "",
      descripcion:"",
      fechaInicioVigencia: null,
      fechaFinVigencia: null,
      idCategoria: 0,
      precio: null,
      atributos:[],
      imagenes:[],
      id:0,
      msgTitulo:"",
      classTitulo: 'defaultColor',
      msgDescripcion:"",
      classDescripcion:"defaultColor",
      msgPrecio:"",
      classPrecio:"defaultColor",
      msgCategoria:"",
      classCategoria:"defaultColor",
      selectAtribValid: false,
      msgSelectDin:"defaultColor",
      optionsGeneral:[],
      ruta:'',
      rutaVideo:'',
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
      longitudDescripcion:0,
    };
  },
  created() {
    axios.get('api/categorias.json').then(response => {
        response.data.forEach((obj, key) => {
            console.log("--> Obj "+obj +" Key "+key);
            Vue.set(this.tipoCategorias, key, { id: obj.id, valor:obj.categoria});
        });
    });
     axios.get('api/atributos-detalles.json').then(response => {
        response.data.forEach((obj) => {
            let optionsS = [];
            obj.rangos.forEach((obj) => {
               optionsS.push({ idValorAtributo: obj.id, valor: obj.rango});
            });
            this.optionsGeneral.push(
                {
                  id: obj.id, //Peso
                  nombre: obj.nombre,
                  options: optionsS
                }
            );
        });
    });

    axios.get('api/categoria-atributos.json').then(response => {
        let idCategoria = 0;
        let atributosGenerales = response.data;
        response.data.forEach((obj) => {
            if(idCategoria < obj.idCategoria){
              idCategoria =  obj.idCategoria;
              let atributosS = [];
              atributosGenerales.forEach((aux) => {
                if(aux.idCategoria === obj.idCategoria){
                    atributosS.push(aux.idAtributo);
                }
              });
              this.atributosByCategoriaDefault.push(
                  {
                    id: obj.idCategoria,
                    atributos:atributosS
                  }
              );
            }
        });
      });
  },
   mounted () {
    this.ruta = process.env.VUE_APP_URL_MEDIA;
    this.rutaVideo = process.env.VUE_APP_URL_MEDIA_VIDEO;
    if(this.$route.params.id === undefined){
      this.tituloProceso = "Registro del anuncio"
      this.id = 0;
      this.$refs.wizard.activeTabIndex=0;
    }else{
      this.tituloProceso = "Actualización del anuncio";
      this.id = this.$route.params.id;
      //Realizamos la consulta al servicio para consultar la información
       axios.get('api/anuncios/'+this.id+'.json').then(response => {
          console.log(response.data);
          this.$refs.wizard.activeTabIndex=2;
          this.$refs.wizard.changeTab(0,2);
          let anuncio = response.data;
          this.id = anuncio.id;
          this.folio = anuncio.folio;
          this.titulo = anuncio.titulo;
          this.descripcion = anuncio.descripcion;
          if(anuncio.fechaInicioVigencia != null){
            this.fechaInicioVigencia = moment(anuncio.fechaInicioVigencia).format('YYYY-MM-DD');
          }
          if(anuncio.fechaFinVigencia != null){
            this.fechaFinVigencia = moment(anuncio.fechaFinVigencia).format('YYYY-MM-DD');
          }
          this.idCategoria = anuncio.idCategoria;
          this.precio = anuncio.precio;
          this.longitudDescripcion = anuncio.descripcion.length;
          anuncio.atributos.forEach((aux) => {
              this.atributos.push({idValorAtributo: aux.idAtributo, valor: aux.valor });
          });
          axios.get('api/categoria-atributos.json').then(response => {
              let idCategoria = 0;
              let atributosGenerales = response.data;
              response.data.forEach((obj) => {
                  if(idCategoria < obj.idCategoria){
                    idCategoria =  obj.idCategoria;
                    let atributosS = [];
                    atributosGenerales.forEach((aux) => {
                      if(aux.idCategoria === obj.idCategoria){
                          atributosS.push(aux.idAtributo);
                      }
                    });
                    this.atributosByCategoriaDefault.push(
                        {
                          id: obj.idCategoria,
                          atributos:atributosS
                        }
                    );
                  }
              });
            });
          this.imagenes = anuncio.imagenes;
          this.atributos.forEach((value, key) => {

            this.getOptiones(key,value.idValorAtributo);
          });
          this.$nextTick(() => {
              this.validarSelect();
          });
        }).catch(error => {
            let msgErr = 'No es posible consultar la información, intente mas tarde.';
            if(error.response != undefined){
              msgErr = error.response.data['exceptionLongDescription'];
            }
            Vue.$toast.open({
                message: msgErr,
                type: 'error',
                duration: 8000,
                position:'top'
            });
            this.$router.push('/ui/admin') ;
        });
    }
  },
  methods: {
    regresar() {
      this.$router.push('/ui/admin-consulta-anuncio') ;
    },
    guardar(resolve){
      console.log("--> Guardando datos --- ");
      console.log(this.atributos);
      if(this.id == 0){ //Registro
        axios.post('api/anuncios.json',  {
          titulo: this.titulo,
          descripcion: this.descripcion,
          fechaInicioVigencia: this.fechaInicioVigencia,
          fechaFinVigencia: this.fechaFinVigencia,
          idCategoria: this.idCategoria,
          precio: this.precio,
          mascotaValorAtributo: this.atributos
        }).then(response => {
          console.log(response.data);
          if(this.id == 0){
            this.id = response.data.id;
            this.folio = response.data.folio;
            let msgOK = '<center>Anuncio registrado correctamente <br/> FOLIO <strong> '+this.folio +' </strong></center>';
            Vue.$toast.open({
                message: msgOK,
                type: 'success',
                duration: 8000
            });
          }
          resolve(true);
        }).catch(error => {
          resolve(false);
          let msgErr = "";
          if(error.response == undefined){
            msgErr = "No hay comunicación con el servicio";
          }else{
            if(error.response.data.errorType === '3001') {
              error.response.data.errors.forEach((obj, key) => {
                  console.log("--> Obj "+obj +" Key "+key);
                  msgErr+=obj.description+"\n";
              });
            }else{
              msgErr = error.response.data['exceptionLongDescription'];
            }
          }
          Vue.$toast.open({
              message: msgErr,
              type: 'error',
              duration: 8000,
              position:'top'
          });
        });
      }else{
        axios.put('api/anuncios.json',  {
          id:this.id,
          titulo: this.titulo,
          descripcion: this.descripcion,
          fechaInicioVigencia: this.fechaInicioVigencia,
          fechaFinVigencia: this.fechaFinVigencia,
          idCategoria: this.idCategoria,
          precio: this.precio,
          mascotaValorAtributo: this.atributos
        }).then(response => {
          console.log(response.data);
          resolve(true);
        }).catch(error => {
          resolve(false);
          let msgErr = "";
          if(error.response == undefined){
            msgErr = "No hay comunicación con el servicio";
          }else{
            if(error.response.data.errorType === '3001') {
              error.response.data.errors.forEach((obj, key) => {
                  console.log("--> Obj "+obj +" Key "+key);
                  msgErr+=obj.description+"\n";
              });
            }else{
              msgErr = error.response.data['exceptionLongDescription'];
            }
          }
          Vue.$toast.open({
              message: msgErr,
              type: 'error',
              duration: 8000,
              position:'top'
          });
        });
      }
    },
    onComplete() {
      let msgOK = '<center>Se confirma el anuncio de manera correcta para su publicación <br/> FOLIO <strong> '+this.folio +' </strong></center>';
      axios.put('api/anuncios/confirmar/'+this.id+'.json').then(response => {
          console.log(response.data);
          Vue.$toast.open({
            message: msgOK,
            type: 'success',
            duration: 8000
           });
           this.$router.push('/ui/admin') ;
      }).catch(error => {
        let msgErr = '';
        if(error.response == undefined){
            msgErr = "No hay comunicación con el servicio";
        }else{
            msgErr = error.response.data['exceptionLongDescription'];
        }
        Vue.$toast.open({
          message: msgErr,
          type: 'error',
          duration: 8000,
          position:'top'
        });
      });
    },
    onChangeCategoria(event){
      this.atributos.splice(0);
      this.atributosByCategoria.splice(0);
      if(event.target.selectedIndex != 0){
          document.getElementsByClassName("select").forEach((obj) => {
            document.getElementById(obj.id).value=0;
         });
         let obj = this.atributosByCategoriaDefault[(event.target.selectedIndex-1)];
         if(obj != null){
            obj.atributos.forEach((value, key) => {
              Vue.set(this.atributos, key, { idValorAtributo: value, valor:0});
              this.getOptiones(key,value);
            });
         }
      }
    },
    getOptiones(index,id){// Este puede ser un llamado al servicio para obtener las opciones de cada atributo
      this.optionsGeneral.forEach((obj) => {
        if(obj.id === id){
          Vue.set(this.atributosByCategoria, index, obj);
        }
      });
      this.validarSelect();
    },
    onChangeAtributo(event){
      Vue.set(this.atributos, parseInt(event.target.id), {
        idValorAtributo: parseInt(event.target.name), valor:parseInt(event.target.value)
      });
      this.validarSelect();
    },
    validarSelect(){
      this.selectAtribValid = false;
      document.getElementsByClassName("select").forEach((obj) => {
        var element = document.getElementById(obj.id);
        element.value = obj.value;
        element.classList.remove("greenColor");
        element.classList.remove("correct");
        element.classList.remove("redColor");
        element.classList.remove("incorrect");
        //valores.push(obj.value);
        if(obj.value==='0'){
          element.classList.add("redColor");
          element.classList.add("incorrect");
        }else{
          element.classList.add("greenColor");
          element.classList.add("correct");
        }
      });
    },
    validarFormulario(){
        let selectValid = true;
        if(this.atributos.length > 0){
          this.atributos.forEach((atributo) =>{
              if(atributo.valor == 0){
                selectValid = false;
              }
          });
        }else{
           selectValid = false;
        }

        let isValid = true
          && this.msgTitulo == '' && this.titulo.trim().length>2
          && this.msgDescripcion == '' && this.descripcion != null
          && this.longitudDescripcion>9
          && this.descripcion.trim().length<10000
          && this.msgPrecio == '' && this.precio != null
          && this.msgCategoria == '' && this.idCategoria != 0
          && selectValid;
          if(!selectValid)
            this.validarSelect();
        return isValid;
    },
    validarDatos(){
      return new Promise((resolve, reject) => {
        console.log("Validar datos "+resolve+ " "+reject);
        let valido = this.validarFormulario();
        if(valido){
          this.guardar(resolve);
          //resolve(true);
        }else{
          resolve(valido);
        }
     })
    },
    getOptionSelect(options,valor){
        var leyenda = "----------";
        options.forEach((option) =>{
           if(option.idValorAtributo === valor){
              leyenda = option.valor;
           }
        });
        return leyenda;
    },
    onEditorInput(data){
      var element = this.$refs.innerTextDescripcion;
      console.log("element ",element)
      if(data!=''){
        console.log("valor longitud: "+element.quill.container.innerText.length);
        this.longitudDescripcion=element.quill.container.innerText.length;
      }else{
         this.longitudDescripcion=0;
      }
    }
  },
  watch: {
    titulo(){
      this.msgTitulo="";
      this.classTitulo="greenColor correct";
      if (this.titulo.trim().length<3){
        this.msgTitulo="El titulo debe contener más de 3 letras";
        this.classTitulo="redColor incorrect";
      }
    },
    descripcion(){
      this.msgDescripcion="";
      this.classDescripcion="greenColor correct";
      console.log(this.longitudDescripcion);
      if(this.descripcion.trim().length>10000){
        this.msgDescripcion="La descripción excede la longitud permitida";
        this.classDescripcion="redColor incorrect";
      }else{
        if (this.longitudDescripcion<=9){
          this.msgDescripcion="La descripción debe ser de al menos 10 caracteres";
          this.classDescripcion="redColor incorrect";
        }
      }

    },
    precio(){
      this.msgPrecio="";
      this.classPrecio="greenColor correct";
      if (this.precio === null || this.precio.length<1){
        this.msgPrecio="El precio es obligatorio";
        this.classPrecio="redColor incorrect";
      }else{
        if (!(/\d+$/).test(this.precio)){
          this.precio = this.precio.replace(/^d+$/, '');
        }
      }
    },
    idCategoria(){
      this.msgCategoria="";
      this.classCategoria="greenColor correct";
      if (this.idCategoria === null || this.idCategoria === "0"){
        this.msgCategoria="La categoria es obligatoria";
        this.classCategoria="redColor incorrect";
      }
    }
  }
};
</script>

<style>
  .required:after {
    content:"*";
    color: red;
  }

  .notValid{
    color:rgb(235, 74, 74);
  }

  .greenColor:focus{
    background-color: #eefaee;
    box-shadow: 2px 1px 4px #bdd3ae;
  }

  .redColor:focus{
    background-color:   #fff3f3  ;
    box-shadow: 2px 1px 4px #dba6a6;
  }

  .defaultColor{
    background-color: white;
    box-shadow: 1px 1px 3px #d8dcdd;
  }
  .ancho {
    max-width: 60%;
  }
  .vue-form-wizard .wizard-icon-circle{
      width: 60px;
      height: 60px;
      font-size: 24px;
  }
  .vue-form-wizard .wizard-icon-circle .wizard-icon-container{
    border-radius: 51%;
  }

  @media (max-width: 600px) {
    .ancho {
      max-width: 90%;
    }

    .vue-form-wizard .wizard-icon-circle{
      width: 40px!important;
      height: 40px!important;
      font-size: 15px!important;
    }
  }
</style>