<template>
  <div class="ancho centra">
    <div class="card">
      <div class="card-header">
        <div class="row">
          <div class="col-sm-6">
            <label>Administración de anuncios</label>
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
          @on-complete="onComplete" 
        > 
          <h2 slot="title">{{tituloProceso}}</h2>   
           <tab-content title="Datos generales" :before-change="validarDatos">
            <div class="col-sm-12 text-left">
              <div v-if="id != 0" class="form-group">
                <label for="sku">SKU</label>
                <label class="font-weight-bold m-2">{{sku}}</label>
                <input type="hidden" v-model="id"/>
              </div>
              <div class="form-group">
                <label for="titulo" class="required">Titulo </label>
                <input type="text" class="form-control" :class="classTitulo" maxlength="50" v-model="titulo"/>
                <small class="notValid">{{msgTitulo}}</small>
              </div>
              <div class="form-group">
                <label for="descripcion" class="required">Descripción</label><label class="requerido"></label>
                <textarea class="form-control" :class="classDescripcion" rows="4" v-model="descripcion" maxlength="255"/>
                <small class="notValid">{{msgDescripcion}}</small>
              </div>
              <div class="form-group">
                <div class="row">
                  <div class="col-12 col-sm-6">
                      <label for="fechaInicioVigencia">Inicio de vigencia</label>
                      <input type="date" class="form-control" v-model="fechaInicioVigencia"/>  
                  </div>
                  <div class="col-12 col-sm-6">
                      <label for="fechaFinVigencia">Fin de vigencia</label>
                      <input type="date" class="form-control" v-model="fechaFinVigencia" />
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-6">
                   <label for="precio" class="required">Precio</label>
                   <input type="text" pattern="[0-9]" required  :class="classPrecio" class="form-control" v-model="precio" maxlength="9" /> 
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
                              <option :value="o.id" v-for="o in c.options" :key="o.id"
                                :selected="(atributos[index].valor ===  o.id)?'selected':''">
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
                    <div class="col-4 text-right font-weight-bold">SKU</div>
                    <div class="text-left">
                      {{ sku }}
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
                      <p>{{ descripcion }}</p>
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
                        <div v-if="((atributo.valor)-1) > -1">
                          {{atributosByCategoria[index].options[(atributo.valor)-1].valor}}
                        </div>
                        <div v-else-if="((atributo.valor)-1) <= -1">  
                            ------------
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
                         <img :src="ruta+item.uuid" class="img-fluid" width="150px" height="150px" /><br/> 
                        {{ item.imagen }}
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
import VueToast from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-sugar.css';
import Imagen from '@/components/admin/Imagen';

import Vue from 'vue';
import axios from 'axios';

Vue.use(VueToast);

export default {
  components: { 
     FormWizard,
     TabContent,
     Imagen
  }, 
  data: function () {
    return {
      activeTabIndex:0,
      tituloProceso:null,
      atributosByCategoria:[],
      tipoCategorias: [],
      atributosByCategoriaDefault:[],
      sku: null,
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
    };
  },
  created() {
     this.tipoCategorias = [
        {id:1, valor:"Caninos"},
        {id:2, valor:"Felinos"},
        {id:3, valor:"Aracnidos"},
        {id:4, valor:"Reptiles"},
        {id:5, valor:"Peces"},
        {id:6, valor:"Aves"},
        {id:7, valor:"Roedores"}
      ];
     this.optionsGeneral= [
          {id:0,nombre:"Default", options:[{id:0,valor:"Seleccione"}]},
          {
            id: 1, //Peso
            nombre: "Peso",
            options: [
              { id: 1, valor: "MENOS DE 1 KG" },
              { id: 2, valor: "ENTRE 1 Y 2 KG" },
              { id: 3, valor: "ENTRE 2 Y 5 KG" },
              { id: 4, valor: "ENTRE 5 Y 10 KG" },
              { id: 5, valor: "ENTRE 10 Y 20 KG" },
              { id: 6, valor: "MAS DE 20 KG" },
            ]
          },
          {
            id: 2, //Raza
            nombre: "Raza",
            options: [
              { id: 1, valor: "TERRANOVA" },
              { id: 2, valor: "MALTES" },
              { id: 3, valor: "GOLDEN RETRIEVERS" },
              { id: 4, valor: "HUSKIE SIBERIANO" },
              { id: 5, valor: "POODLES" },
              { id: 6, valor: "BEAGLES" },
              { id: 7, valor: "PASTOR ALEMÁN" },
              { id: 8, valor: "CORGIS" },
              { id: 9, valor: "LABRADOR" },
              { id: 10, valor: "CHIHUAHUA" },
              { id: 11, valor: "MESTIZO" },
              { id: 12, valor: "PUG" },
              { id: 13, valor: "BULLDOG" },
            ]
          },
          {
            id: 3, //Color
            nombre: "Color",
            options: [
              { id: 1, valor: "BLANCO" },
              { id: 2, valor: "NEGRO" },
              { id: 3, valor: "CAFE" },
              { id: 4, valor: "AZUL" },
              { id: 5, valor: "AMARILLO" },
              { id: 6, valor: "VERDE" },
              { id: 7, valor: "DORADO" },
              { id: 8, valor: "PLATEADO" },
              { id: 9, valor: "GRIS" },
              { id: 10, valor: "ROSA" },
              { id: 11, valor: "MIXTO" },
            ]
          },
          {
            id: 4, //Tamaño
            nombre: "Tamaño",
            options: [
              { id: 1, valor: "CHICO" },
              { id: 2, valor: "MEDIANO" },
              { id: 3, valor: "GRANDE" },
              { id: 4, valor: "ENORME" },
            ]
          },
          {
            id: 5, //Edad
            nombre: "Edad",
            options: [
              { id: 1, valor: "MENOS DE 1 MES" },
              { id: 2, valor: "DE 1 A 6 MESES" },
              { id: 3, valor: "DE 6 A 12 MESES" },
              { id: 4, valor: "DE 1 A 2 AÑOS" },
              { id: 5, valor: "DE 2 A 3 AÑOS" },
              { id: 6, valor: "DE 3 A 4 AÑOS" },
              { id: 7, valor: "DE 5 A 6 AÑOS" },
              { id: 8, valor: "DE 6 A 7 AÑOS" },
              { id: 9, valor: "DE 7 A 8 AÑOS" },
              { id: 10, valor: "DE 8 A 9 AÑOS" },
              { id: 11, valor: "DE 9 A 10 AÑOS" },
              { id: 12, valor: "MAS DE 10 AÑOS" },
            ]
          },
          {
            id: 6, //Longevidad
            nombre: "Longevidad",
            options: [
              { id: 1, valor: "MENOS DE 1 AÑO" },
              { id: 2, valor: "DE 1 A 2 AÑOS" },
              { id: 3, valor: "DE 2 A 5 AÑOS" },
              { id: 4, valor: "DE 5 A 10 AÑOS" },
              { id: 5, valor: "DE 10 A 15 AÑOS" },
              { id: 6, valor: "DE 15 A 20 AÑOS" },
              { id: 7, valor: "DE 20 A 30 AÑOS" },
              { id: 8, valor: "MAS DE 30 AÑOS" },
            ]
          },
          {
            id: 7, //TipoAgua
            nombre: "Tipo de agua",
            options: [
              { id: 1, valor: "AGUA DULCE" },
              { id: 2, valor: "AGUA SALADA" },
              { id: 3, valor: "DULCE Y SALADA" },
            ]
          },
      ];
      this.atributosByCategoriaDefault = [
        {
          id:1, //Caninos
          atributos:[1,2,3,4,5,6]
        },
        {
          id:2, //Felinos
          atributos:[1,3,4,5,6]
        },
        {
          id:3, //Aracnidos
          atributos:[1,4,5,6]
        },
        {
          id:4, //Reptiles
          atributos:[1,4,5,6]
        },
        {
          id:5, //Peces
          atributos:[1,3,4,5,6,7]
        },
        {
          id:6, //Aves
          atributos:[1,3,4,5,6]
        },
         {
          id:7, //Roedores
          atributos:[1,3,4,5,6]
        }
        
      ];
      
  },
   mounted () {
    this.ruta = process.env.VUE_APP_URL + "upload/";
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
          this.sku = anuncio.sku;
          this.titulo = anuncio.titulo;
          this.descripcion = anuncio.descripcion;
          this.fechaInicioVigencia = anuncio.fechaInicioVigencia;
          this.fechaFinVigencia = anuncio.fechaFinVigencia;
          this.idCategoria = anuncio.idCategoria;
          this.precio = anuncio.precio;
          this.atributos = anuncio.atributos;
          this.imagenes = anuncio.imagenes;
          this.atributos.forEach((value, key) => {
            this.getOptiones(key,value.id);
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
    guardar(resolve){
      console.log("--> Guardando datos --- ");
      if(this.id == 0){ //Registro
        axios.post('api/anuncios.json',  { 
          titulo: this.titulo,
          descripcion: this.descripcion,
          fechaInicioVigencia: this.fechaInicioVigencia,
          fechaFinVigencia: this.fechaFinVigencia,
          idCategoria: this.idCategoria,
          precio: this.precio,
          atributos: this.atributos
        }).then(response => {
          console.log(response.data);
          if(this.id == 0){
            this.id = response.data.id;
            this.sku = response.data.sku;  
            let msgOK = '<center>Anuncio registrado correctamente <br/> SKU <strong> '+this.sku +' </strong></center>';
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
          atributos: this.atributos
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
      let msgOK = '<center>Se confirma el anuncio de manera correcta para su publicación <br/> SKU <strong> '+this.sku +' </strong></center>';
      axios.put('api/anuncios/confirmar/'+this.id+'.json').then(response => {
          console.log(response.data); 
          Vue.$toast.open({
            message: msgOK,
            type: 'info',
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
              Vue.set(this.atributos, key, { id: value, valor:0});
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
      Vue.set(this.atributos, parseInt(event.target.id), { id: parseInt(event.target.name), valor:event.target.selectedIndex});
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
          && this.msgDescripcion == '' && this.descripcion != null && this.descripcion.trim().length>9
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
      if (this.descripcion.trim().length<10){
        this.msgDescripcion="La descripción debe ser mínimo 10 caracteres";
        this.classDescripcion="redColor incorrect";
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
  .ancho {
    max-width: 60%;
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