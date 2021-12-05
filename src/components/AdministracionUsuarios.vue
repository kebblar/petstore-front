<template>
  <div class="container-flex">
    <div>

      <div class="container text-center mt-4">
        <h3>Interfaz de gestión de usuarios</h3>
      </div>

      <div class="container text-center">
        <div>
          <p>Número de elementos por página
            <input v-model="pageElems" type="number" size="4" style=" font-size: 13px" oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');">
          </p>
        </div>
      </div>

      <div>
        <table class="anchoTable table table-striped table-hover table-sm table-dark">
          <thead class="text-justify">
            <tr>
              <th scope="col">Nombre
                <div @click="sortP(1, 'asc')" class="up">
                  <i class="fas fa-sort-up"></i>
                </div>
                <div @click="sortP(1, 'desc')" class="down">
                  <i class="fas fa-sort-down"></i>
                </div>
              </th>

              <th scope="col">Correo
                <div @click="sortP(2, 'asc')" class="up">
                  <i class="fas fa-sort-up" ></i>
                </div>
                <div @click="sortP(2, 'desc')" class="down">
                  <i class="fas fa-sort-down"></i>
                </div>
              </th>
              <th scope="col">Telefono
                <div @click="sortP(3, 'asc')" class="up">
                  <i class="fas fa-sort-up" ></i>
                </div>
                <div  @click="sortP(3, 'desc')" class="down">
                  <i class="fas fa-sort-down"></i>
                </div>
              </th>
              <th scope="col">
                <div class="ml-3" style="position: relative; top: -8px">Editar</div>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="user in datosUsuario" :key="user.id">
              <td>{{user.nombre}} {{user.apellidoPaterno}} {{user.apellidoMaterno}}</td>
              <td>{{user.correo}}</td>
              <td>{{user.telefonoCelular}}</td>
              <td><input class="ml-3" type="button" value="Editar" /></td>
            </tr>
          </tbody>
        </table>
      </div>

      <div>
        <nav>
          <ul class="pagination">
            <li v-if="pageNum!==1" class="page-item"><a class="page-link" href="#" @click.prevent @click="goToPage(pageNum-1)">Anterior</a></li>
            <li v-for="i in numerosPaginas" :key="i" class="page-item"><a @click.prevent class="page-link" @click="goToPage(i)" href="#">{{i}}</a></li>
            <li v-if="pageNum!==numerosPaginas" class="page-item"><a class="page-link" @click.prevent href="#" @click="goToPage(pageNum+1)">Siguiente</a></li>
          </ul>
        </nav>
      </div>

    </div>
  </div>
</template>

<script>
import axios from "axios"; 
import store from "../store";

export default {
  name: "AdministracionUsuarios.vue",
  mounted() {
    store.commit('setToggleHeader', false);
    store.commit('setToggleFooter', false);
    //store.commit('setToggleSidebar', false);
  },
  created() {
    this.getList(10,1);
    axios.get('api/count-users', {}).then(response => {
      this.total = response.data;
      this.calculaPaginas(this.total, 10);
    }).catch(error => {
      if (error.response) {
        console.log(error.response);
      } else {
        console.log(error);
      }
    });
  },
  watch: {
    pageElems(value) {
      this.getList(value, this.pageNum);
      this.calculaPaginas(this.total, value);
    },
    datosUsuario () {

    }
  },
  data () {
    return {
      datosUsuario : [],
      pageElems : 10,
      pageNum : 1,
      total : 0,
      numerosPaginas : 0
    }
  },
  methods: {
    obtenFecha(valor) {
      let d = new Date(valor);
      return d.toLocaleString();
    },
    sortP(val, order){
      axios.get('api/usuario-order?element='+val+'&order='+order+'&pageNumber='+this.pageNum+'&pageSize='+this.pageElems, {}).then(response => {
        const sorted = response.data.sort(function (a,b) {
          return a.num < b.num ? -1 : 1;
        });
        console.log(sorted)
        this.datosUsuario = sorted;
      }).catch(error => {
        if (error.response) {
          console.log(error.response);
        } else {
          console.log(error);
        }
      });
    },
    getList(items, pag) {
      axios.get('api/usuario-completos-paginated?pageNumber='+pag+'&pageSize='+items, {}).then(response => {
        this.datosUsuario = response.data;
      }).catch(error => {
        if (error.response) {
          console.log(error.response);
        } else {
          console.log(error);
        }
      });
    },
    goToPage(page) {
      this.pageNum=page;
      this.getList(this.pageElems, page);
    },
    calculaPaginas(tot,elems) {
      this.numerosPaginas = Math.ceil(tot/elems);
      console.log(this.numerosPaginas)
    },
  }
}
</script>

<style scoped>
td {
  color: #c79b9b;
  font-size: 12px;
}
.up {
  position: relative;
  left: 80px;
  top: -28px;
  cursor: pointer;
  height: 0;
}
.down {
  position: relative;
  left: 80px;
  top: -18px;
  cursor: pointer;
  height: 10px;
}
.anchoTable {
  width: 600px;
}
</style>
