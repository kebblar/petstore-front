<template>
  <b-container>
    <b-row>
      <b-col class="bg-light rounded text-left pt-2">
        <h2 class="d-flex">Actualizar Oficios
          <b-button v-b-toggle.collapse-letters class="stretched-link ml-auto" variant="transparent">
            <b-icon-plus/>
          </b-button>
        </h2>
      </b-col>
    </b-row>
    <b-collapse id="collapse-letters" visible>
      <b-row>
        <b-col>
          <div id="listgroup-oficios" ref="content">
            <div v-for="(value,_,i) in professions" :id="'list-item-' + i" :key="i" class="single-item">
              <div v-for="profession in value" :key="profession.id" class="text-left">
                <h5>
                {{profession.descripcion}}<b-button-group >
                    <b-button class="border-right-0"
                              variant="outline-primary"
                              @click="showUpdateModal(profession)">
                      <b-icon-pencil/>
                      <span class="d-none d-sm-inline"> Editar</span>
                    </b-button>
                    <b-button variant="outline-danger"
                              @click="confirmDeleteModal(profession)">
                      <b-icon-trash/>
                      <span class="d-none d-sm-inline"> Borrar</span>
                    </b-button>
                  </b-button-group>
                </h5>
              </div>
            </div>
           <h5 class="single-item text-left">Otro</h5>
          </div>
        </b-col>
      </b-row>
    </b-collapse>
    <b-row>
      <b-col class="text-right mt-4 mb-5">
        <b-button v-b-modal.editoffice variant="success" @click="showAddModal">
          <b-icon-plus/>
          Agregar
        </b-button>
      </b-col>
    </b-row>
    <b-row>
      <b-modal ref="modal"
               :title="currentMethod"
               header-bg-variant="light"
               @hidden="resetModal"
               @ok="handleOk">
        <form ref="form" @submit.prevent="handleSubmit">
          <b-form-group
              :invalid-feedback="invalidFeedbackMessage"
              label=""
              label-for="name-input">
            <b-form-input
                id="name-input"
                ref="inputDescription"
                v-model.trim="descripcion"
                :state="oficioState"
                pattern="[a-zA-Zá-úÁ-Ú]{3,}"
                required
            ></b-form-input>
          </b-form-group>
        </form>
      </b-modal>
    </b-row>
    <b-modal ref="token-error" header-bg-variant="light" ok-only title="¡Ups!, tu sesión ha expirado">
      Intenta lo siguiente:
      <ol>
        <li>Recarga la página.</li>
        <li>Cierra sesión.</li>
        <li>Inicia sesión de nuevo.</li>
      </ol>
    </b-modal>

    <b-modal ref="server-error" header-bg-variant="light" ok-only title="¡Ups!, problemas con el servidor">
      {{ msg }}
    </b-modal>

  </b-container>

</template>

<script>
import store from '../store'
import axios from "axios";

axios.defaults.headers.get['Access-Control-Allow-Origin'] = '*';
axios.defaults.headers['X-CSRFToken'] = store.state.estado.jwt;

const HTTP_STATUS = {
  FORBIDDEN: 403,
  CONFLICT: 409
}

const OTHER_OPTION = 'otro'

export default {
  data() {
    return {
      salta: store.state.estado.roles,

      id: -1,
      descripcion: '',
      oficioState: null,
      invalidFeedbackMessage: '',
      professions: {},
      apiMethods: {
        ADD: 'Nombre del  nuevo  oficio',
        UPDATE: 'Editar oficio'
      },
      currentMethod: null,
      msg: ''
    }
  },
  mounted() {
    this.getAllOficios()
  },
  methods: {
    makeToast(msg, oficio) {
      this.$root.$bvToast.toast(
          `¡Se ha ${msg} el oficio (${oficio}) con éxito!`,
          {
            title: `Oficio ${msg}`,
            variant: "success",
            solid: true,
            toaster: "b-toaster-top-right",
          }
      );
    },
    getAllOficios() {
      this.professions = {}
      axios.get('/api/all-oficios')
          .then(({data}) => {
            for (const oficio of data) {
              const fisrtChat = oficio.descripcion.charAt(0).toUpperCase()
              if (this.professions[fisrtChat] === undefined) {
                this.professions[fisrtChat] = [oficio]
              } else {
                this.professions[fisrtChat].push(oficio)
              }
            }
            const otherOption = this.professions.O?.find(({descripcion}) => descripcion.toLowerCase() === OTHER_OPTION)
            if (otherOption) {
              const profressionsO = this.professions.O.filter(({descripcion}) => descripcion.toLowerCase() !== OTHER_OPTION)
              if (profressionsO) {
                this.professions.O = profressionsO
              } else {
                delete this.professions.O
              }
             
            }
          })
          .catch(this.handleError)
          .finally(() => this.$forceUpdate())
    },
    updateOficios(id, descripcion) {
      axios.put('/api/update-oficio/', {
        descripcion: descripcion,
        id: id,
        activo: 1
      }).then(() => {
        this.getAllOficios()
        this.makeToast('actualizado', descripcion)
      }).catch(this.handleError)
    },
    deleteOficio(oficio) {
      axios.delete(`/api/delete-oficio/${oficio.id}`)
          .then(() => {
            this.getAllOficios()
            this.makeToast('borrado', oficio.descripcion)
          })
          .catch(this.handleError)
    },
    crearOficio(descripcion) {
      axios.post('/api/insert-oficio', {descripcion: descripcion, active: true})
          .then(() => {
            this.getAllOficios()
            this.makeToast('agregado', descripcion)
          })
          .catch(this.handleError)
    },
    resetModal() {
      this.descripcion = ''
      this.oficioState = null
      this.id = -1
    },
    confirmDeleteModal(office) {
      this.$bvModal.msgBoxConfirm(`¿Seguro que quieres eliminar "${office.descripcion}"?`, {
        size: 'sm',
        buttonSize: 'sm',
        okVariant: 'danger',
        okTitle: 'YES',
        cancelTitle: 'NO',
        footerClass: 'p-2',
        hideHeader: true,
        centered: true
      }).then(value => {
        if (!value) return;
        this.deleteOficio(office)
      })
    },
    handleOk(bvModalEvt) {
      bvModalEvt.preventDefault()
      this.handleSubmit()
    },
    handleSubmit() {
      if (!this.valid(this.$refs.inputDescription.value))
        return;

      if (this.currentMethod === this.apiMethods.UPDATE) {
        this.updateOficios(this.id, this.descripcion)
      } else if (this.currentMethod === this.apiMethods.ADD) {
        this.crearOficio(this.descripcion)
      }

      this.$nextTick(() => this.$refs.modal.hide())
    },
    handleError(err) {
      switch (err.response?.status) {
        case HTTP_STATUS.FORBIDDEN:
          this.$refs['token-error'].show()
          break
        case HTTP_STATUS.CONFLICT:
          this.$refs['server-error'].show();
          this.msg = 'Si quieres recuperar este oficio, tienes que usar el botón agregar'
          break
        default:
          this.$refs['server-error'].show()
          this.msg = 'Parece que tenemos problemas para conectarnos con nuestro servidor, intentalo más tarde.'
      }
      console.error(err)
    },
    valid(value) {
      this.oficioState = this.$refs.form?.checkValidity()
      let validLength = value.length >= 3
      this.invalidFeedbackMessage =  validLength ? 'Solo se permiten letras sin espacios.' : 'EL oficio debe tener al menos 3 letras'

      if (this.oficioState && !this.unique(value)) {
        this.oficioState = false
        this.invalidFeedbackMessage = 'Ese oficio ya está registrado'
      }

      return this.oficioState
    },
    showUpdateModal({id, descripcion}) {
      this.id = id
      this.descripcion = descripcion
      this.currentMethod = this.apiMethods.UPDATE
      this.$refs.modal.show()
    },
    showAddModal() {
      this.resetModal()
      this.currentMethod = this.apiMethods.ADD
      this.$refs.modal.show()
    },
    unique(oficio) {
      const firstChar = oficio.charAt(0).toUpperCase()
      const professions = this.professions[firstChar]
      const distinct = ({descripcion}) => descripcion.toLowerCase() !== oficio.toLowerCase()
      if (!firstChar || !professions) return true;
      return professions.every(distinct) && ( oficio.toLowerCase() !== 'otro' )
    }
  },
  watch: {
    descripcion(newVal) {
      this.valid(newVal)
    }
  }
}
</script>

<style scoped>

@keyframes open {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(45deg);
  }
}

@keyframes close {
  from {
    transform: rotate(45deg);
  }
  to {
    transform: rotate(0deg);
  }
}

button.collapsed .bi {
  animation: close 500ms;
  transform: rotate(0deg);
}

button.not-collapsed .bi {
  animation: open 500ms;
  transform: rotate(45deg);
}

.single-item {
  padding-top: 10px;
  padding-bottom: 8px;
  position: relative;
}

.single-item:nth-child(odd) {
  background-color: var(--light);
}

.single-item:last-child {
  background-color: #dcefed;
}

.btn-group {
  margin-left: auto;
  margin-right: 20px;
}

#listgroup-oficios {
  overflow-x: hidden;
  overflow-y: auto;
  height: 300px;
}

#listgroup-oficios h5 {
  display: flex;
  align-items: center;
  padding: 3px 10px;
}
</style>
