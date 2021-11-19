<template>
  <div class="container">
    <div class="data w100">

      <div class="container text-center mt-4">
        <h3>Interfaz de gestión de usuarios</h3>
      </div>

      <div class="container text-center">
        <div class="mt-3">
          <p>Número de elementos por página
            <input v-model="pageElems" type="number" size="4" style=" font-size: 13px" oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');">
          </p>
        </div>
      </div>
      <div class="lista-usuarios my-4 mx-2">
        <table class="table table-striped table-hover table-sm table-dark">
          <thead class="text-justify">
          <tr>
            <th class="pl-3" scope="col">Id</th>
            <th scope="col">Nombre</th>
            <th scope="col">Correo</th>
            <th scope="col">Telefono</th>
            <th scope="col">Ultimo acceso</th>
            <th scope="col">Creado</th>
            <th class="pr-2" scope="col">Activo</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="user in datosUsuario" :key="user.id">
            <th class="px-3" scope="row">{{ user.id }}</th>
            <td>{{user.nombre}} {{user.apellidoPaterno}} {{user.apellidoMaterno}}</td>
            <td>{{user.correo}}</td>
            <td>{{user.telefonoCelular}}</td>
            <td>{{obtenFecha(user.instanteUltimoAcceso)}}</td>
            <td>{{obtenFecha(user.creado)}}</td>
            <td>{{user.activo}}</td>
          </tr>
          </tbody>
        </table>
      </div>

      <div class="paginacion">
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

export default {
  name: "AdministracionUsuarios.vue",

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
    }
  }
}
</script>

<style scoped>

td {
  color: #c79b9b;
  font-size: 12px;
}
</style>