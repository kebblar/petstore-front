
import axios from 'axios';

var ruta = process.env.VUE_APP_URL_MEDIA; // si lo carga :)

var test = {
    foo (msg) { 
        console.log('foo: ' + msg) 
    },
    pba() {
        return axios.get('https://api.bitso.com/v3/order_book?book=btc_mxn').then(response => {
            if (response.data !== null) {
                console.log(ruta) // si lo muestra :)
                //console.log(response.data.payload.asks[0].price)
                return JSON.parse(response.data.payload.asks);
            } else {
                return "Error. response.data was null or response.data.foto was null"
            }
        }).catch(error => {
            console.log(error);
            return "No podemos cargar tu configuración en este momento"
        })
    },

    getPicture(idUser, jwt) {
        axios.get('/api/get-foto-perfil/'+idUser, {"jwt":jwt}).then(response => {
            if (response.data !== null && response.data.foto !== null) {
                console.log(ruta)
                console.log(response.data.foto)
                return ""
            } else {
                return "Error. response.data was null or response.data.foto was null"
            }
        }).catch(error => {
            console.log(error);
            return "No podemos cargar tu configuración en este momento"
        })
    },
    sendPicture(idUser, jwt) {
        const headers = {
          "Content-Type": "multipart/form-data",
          "Access-Control-Allow-Origin": "*",
          "jwt": jwt,
          "idUser": idUser
        };
        axios.post("/api/foto-perfil", this.fd, {
          headers
        }).then(response =>{
          console.log(response.data);
          return ""
        }).catch(error => {
              console.log(error.response);
              if (error.response.data['invalid-token']===null) {
                return 'Tu sesión ha expirado, por favor recarga la página'
              }
              if( error.response.data.exceptionTypeNumber===1020) {
                return error.response.data.exceptionLongDescription
              } else {
               return 'Ha ocurrido un error con tu archivo, inténtalo más tarde'
              }
        });
      },
}
  
export default test