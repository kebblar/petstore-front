<template>
  <div class="container">
    <div class="data w100">

      <div class="container text-center">
        <div class="mt-4">
          <p>Número de elementos por página
            <input v-model="pageElems" type="number" size="4" style=" font-size: 13px" oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');">
          </p>
        </div>
      </div>
      <div class="lista-usuarios my-4 mx-2">
        <table class="table table-striped table-hover table-sm table-warning">
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
            <li class="page-item"><a class="page-link" href="#">Previous</a></li>
            <li class="page-item"><a class="page-link" href="#">1</a></li>
            <li class="page-item"><a class="page-link" href="#">2</a></li>
            <li class="page-item"><a class="page-link" href="#">3</a></li>
            <li class="page-item"><a class="page-link" href="#">Next</a></li>
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
    axios.get('api/usuario-completos-paginated?pageNumber=1&pageSize=10', {}).then(response => {
      this.datosUsuario = response.data;
      }).catch(error => {
      if (error.response) {
        console.log(error.response);
      } else {
        console.log(error);
      }
    });
  },
  data () {
    return {
      datosUsuario : [],
      pageElems : 10
    }
  },
  methods: {
    obtenFecha(valor) {
      let d = new Date(valor);
      return d.toLocaleString();
    }
  }
}
</script>

<style scoped>

td {
  color: #330000;
  font-size: 12px;
}
</style>