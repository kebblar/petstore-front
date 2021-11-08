<template>
<!--  <div class="container">-->
<!--    <div class="row">-->
<!--      <div class="col-sm-12 text-left my-3">-->
<!--        <div class="form-group">-->
<!--          <div class="row px-3">-->
<!--            <input type="text" placeholder="example@gmail.com" class="form-control" id="text-usr" v-model="usr" />-->
<!--            <span class="fas fa-user errspan"></span>-->
<!--          </div>-->
<!--        </div>-->
<!--        <div class="form-group">-->
<!--          <div class="row px-3">-->
<!--            <input :type=pwInputValue placeholder="*****" class="form-control" id="password" v-model="psw" />-->
<!--            <span class="fas fa-lock errspan"></span>-->
<!--            <div class="ojo put-right">-->
<!--              <a href="#" @click="oculta" class="a2">-->
<!--                <div class="icon-wrapper">-->
<!--                  <i :class="[pwVisible ? 'fas fa-eye-slash' : 'fas fa-eye']"></i>-->
<!--                </div>-->
<!--              </a>-->
<!--            </div>-->
<!--          </div>-->
<!--        </div>-->
<!--      </div>-->
<!--      <div class="col-sm-12 w-100 mt-2">-->
<!--        <button @click="checkCredentials" class="btn btn-block btn-outline-success">Ingresar al sistema</button>-->
<!--        <hr/>-->
<!--      </div>-->
<!--      <div class="col-sm-12">-->
<!--        <small class="float-right text-primary vinculo" @click="openForgotPage">Olvidé mi clave</small>-->
<!--      </div>-->

<!--    </div>-->
<!--    <Aviso-->
<!--        ref='avisoComponente'-->
<!--        ancho='320'-->
<!--        target=''-->
<!--        :avisoMsg=msgErr-->
<!--        avisoTitulo='Error de ingreso al sistema' />-->
<!--  </div>-->
  <div class="container">
    <!-- Nick -->
    <div class ="form-group">
      <div class="row px-3">
        <input type="text" required class="form-control text-usr" placeholder="Mi apodo" v-model="name">
        <span class="fas fa-user-tag errspan"></span>
        <small class="notValid">{{msgName}}</small>
      </div>
    </div>

    <!-- clave -->
    <div class="form-group">
      <div class="row px-3" :class="estiloClave2">
        <input :type=pwInputValue required :class="classPasswd" class="form-control password" id="clave" placeholder="******" v-model="password">
        <span class="fas fa-lock errspan"></span>
        <div class="ojo put-right">
          <a href="#" @click="oculta" class="a2">
            <div class="icon-wrapper">
              <i :class="[pwVisible ? 'fas fa-eye-slash' : 'fas fa-eye']"></i>
            </div>
          </a>
        </div>
        <small class="form-text text-muted" :class="isVisible">
            <b v-if="msgPasswd!==''">Falta que la clave contenga:</b>
            <ul>
              <li :class="styleCarac2">8 carateres como mínimo</li>
              <li :class="styleUpper2">Una mayúscula</li>
              <li :class="styleNum2">Un número</li>
              <li :style="styleSpecial2">Un caracter especial (_, -, #, etc.)</li>
            </ul>
          </small>
        </div>
      </div>

    <!-- fecha de nacimiento -->
    <div class ="form-row">
      <div class="col-4 col-sm-4">
        <label>Dia</label>
        <select class="form-control combo" v-model="day">
          <option v-for="i in diasDelMes" :key="i">{{ i }}</option>
        </select>
      </div>

      <div class="col-8 col-sm-8">
        <label>Mes</label>
        <select class="form-control combo" v-model="month">
          <option value="1">Enero</option>
          <option value="2">Febrero</option>
          <option value="3">Marzo</option>
          <option value="4">Abril</option>
          <option value="5">Mayo</option>
          <option value="6">Junio</option>
          <option value="7">Julio</option>
          <option value="8">Agosto</option>
          <option value="9">Septiembre</option>
          <option value="10">Octubre</option>
          <option value="11">Noviembre</option>
          <option value="12">Diciembre</option>
        </select>
      </div>
      <div class="col-12 col-sm-12">
        <label>Año</label>
        <select id="dia" class="form-control combo" v-model="year">
          <option v-for="i in 70" :key="i">{{ 2002 - i }}</option>
        </select>
      </div>
      <small class="info">(debes ser mayor de 21 años para registrarte)</small>

    </div>

    <!-- button -->
    <div class="form-group row">
      <div class="col-4"></div>
      <div class="col">
        <div class="row">
          <div class="col-4" >
            <button
                :disabled="habilitaBoton"
                class="btn btn-success"
                data-toggle="modal"
                data-target="#termsModal">Registrarme</button>

            <!--          Modal-->
            <div class="modal fade" id="termsModal" tabindex="-1" role="dialog">
              <div class="modal-dialog modal-md modal-dialog-centered" role="document">
                <div class="modal-content">
                  <div class="modal-header mb-2 bg-light">
                    <h5 class="modal-title ml-3" >
                      <b>Términos y condiciones</b>
                    </h5>
                    <button type="button" class="close mr-2" data-dismiss="modal" aria-label="Close">
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>

                  <div class="modal-body mx-2">
                    <div class="row " style="text-align: left">
                      <div class="col">
                        <p class=" h6">
                          He leido y estoy de acuerdo con:<br><br>
                        </p>
                        <small class="px-4">
                          <input type="checkbox"  required  id="agree1" v-model="servicio"/>
                          <a href="#"> Los términos de servicio</a><br>
                        </small >
                        <small class="px-4">
                          <input type="checkbox"  required  id="agree2" v-model="avisoP"/>
                          <a href="#"> El aviso de privacidad de datos personales</a><br>
                        </small>
                        <small class="px-4">
                          <input type="checkbox"  required  id="agree3" v-model="mayor"/>
                          <a href="#"> Que soy mayor de edad y publico por mi propia voluntad</a><br>
                        </small>

                        <div class="row pt-3" style="padding-left: 40px">
                          <div class="g-recaptcha mx-auto">
                            <vue-recaptcha
                                id="solvecaptcha"
                                ref="recaptcha"
                                sitekey="6LffEdkaAAAAAOJllar3d53MdUh3qOZLhdQ8GuQs"
                                @expired="onCaptchaExpired"
                                @verify="onCaptchaVerified"/>
                          </div>
                        </div>
                      </div>


                    </div>
                  </div>
                  <div v-if="!vacio" class="modal-footer border-top-0 d-flex justify-content-around px-0 mb-3">
                    <button type="button" class="btn btn-outline-info" @click="openLoginPage" data-dismiss="modal">Volver al login</button>
                    <button type="button" :disabled="verifyCheck" class="btn btn-outline-info" data-dismiss="modal" @click="submition">Continuar con el registro</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <Aviso
        ref='aviso'
        ancho='320'
        :target=target
        :avisoMsg=msgErr
        :avisoTitulo=texto />

  </div>
</template>
<script>

</script>
<style>
.a2 {
  color:#000;
}
.a2:hover {
  color:#00f;
}
.errspan{
  left: 29px;
  margin-top: 11px;
  position: absolute;
  z-index: 2;
  color: #000;
}
.text-usr{
  padding-left: 33px;
  padding-top: 11px;
}
.password{
  padding-left: 33px;
  padding-top: 10px;
  padding-right: 37px;
}
.put-right{
  position: absolute;
  right: 28px;
  margin-top: 9px;
  z-index: 2;
}
.notValid {
  color:rgb(235, 74, 74);
}
.greenColor:focus {
  background-color: #eefaee;
  box-shadow: 2px 1px 4px #bdd3ae;
}

input {
  padding-right: 15%;
}
.correct {
  border-color:rgb(96, 161, 99);
  border-width: 1px;
  box-shadow: 1px 1px 3px #d8dcdd;
  background: url(../assets/check.png) no-repeat scroll;
  background-position:right ;
  background-size: 17px;
  background-position-x: 96%;
}
.redColor:focus {
  background-color:   #fff3f3  ;
  box-shadow: 2px 1px 4px #dba6a6;
}
.incorrect {
  border-color:rgb(235, 74, 74);
  border-width: 1px;
  box-shadow: 1px 1px 3px #d8dcdd;
  background: url(../assets/danger.jpg) no-repeat scroll;
  background-position:right ;
  background-size: 20px;
  background-position-x: 96%;
}
.defaultColor {
  background-color: white;
  box-shadow: 1px 1px 3px #d8dcdd;
}
.hidden {
  display: none;
}
.show {
  display: block;
}
.combo {
  margin-bottom: 5px;
}
.info {
  font-size: 10px;
}
.g-recaptcha {
  transform:scale(0.9);
  transform-origin: 0 0;
}
#footer {
  position: fixed;
  padding: 10px 10px 0px 10px;
  bottom: 0;
  width: 100%;
  /* Height of the footer*/
  height: 40px;
  background: #444;
  color: #fff;
  text-align: right;
}

</style>