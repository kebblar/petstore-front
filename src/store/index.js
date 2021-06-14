import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        destination: '/ui/upload',
        session: {
            nombreCompleto: '',
            correo: '',
            ultimoAcceso: '',
            roles: [],
            idUser: 0,
            jwt: '', //  jwt='' => signed: false,
            carrito : []
        }
    },
    mutations: {
        setSession(state, ss) {
            state.session = ss;
        },
        setDestination(state, destination) {
            state.destination = destination;
        },
        setFirmado(state, firmado) {
            state.session.signed = firmado;
        },
        setCarrito(state, carrito) {
            state.session.carrito = carrito;
        }
    },
    plugins: [createPersistedState()]
})
export default store;

