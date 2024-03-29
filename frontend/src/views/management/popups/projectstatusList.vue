<template>
  <div>
    <div class="tableHeading">
      <div class="tableHeading-left">
        <span class="tableHeading-text">Project Status List</span>
      </div>
      <div class="tableHeading-right">
        <button class="swal2-editform swal2-styled" v-on:click="addNewProject_Status">Add New Project Status</button>
      </div>
    </div>

    <div>
      <div slot="table-actions">
      </div>
      <vue-good-table
        :columns="dataFields"
        :rows="DB_DATA"
        :row-style-class="'rowStyle'"
        :search-options="{
          enabled: true,
          skipDiacritics: true,
          placeholder: 'Search this table',
        }"
        :sort-options="{
          enabled: true,
          initialSortBy: {field: 'projectStatusID', type: 'asc'}
        }"
        :pagination-options="{
          enabled: true,
          mode: 'records',
          perPage: 10,
          position: 'top',
          perPageDropdown: [10, 25, 50, 100],
          dropdownAllowAll: false,
          nextLabel: 'next',
          prevLabel: 'prev',
          rowsPerPageLabel: 'Rows per page',
          ofLabel: 'of',
        }"
        compactMode
        @on-row-dblclick="onRowDoubleClick"
      />
    </div>
  </div>

</template>

<script>
import axios from '../../../utilities/axios';
import config from '../../../config';
import 'vue-good-table/dist/vue-good-table.css'
import { VueGoodTable } from 'vue-good-table';
import Swal from 'sweetalert2'

export default {
  data() {
    return {
      DB_DATA: [],
      myAPI: `${config.api}/api/Project_Status`,
      dataFields: [{
        label: 'id',
        field: 'projectStatusID',
        type: 'number'
      },{
        label: 'name',
        field: 'projectStatusType'
      }]
    };
  },

  components: {
    'vue-good-table': VueGoodTable
  },
  methods: {
    onRowDoubleClick(params){
      Swal.fire({
        title: 'Edit Record',
        html:
          'Item ID: ' + params.row.projectStatusID +
          '<br>' +
          '<form>Name <input id="form-name" class="swal2-input" placeholder="Name" value="' + params.row.projectStatusType + '">' +
          '</form>'
        ,
        showCancelButton: true,
        showDenyButton: true,
        focusConfirm: false,
        confirmButtonText: 'Submit',
        cancelButtonText: 'Cancel',
        denyButtonText: `Delete Record`,
        customClass: {
          denyButton: 'order-1 right-gap',
          cancelButton: 'order-2',
          confirmButton: 'order-3',
        },
        preConfirm: () => {
          const name = document.getElementById('form-name').value
          if (!name) {
            Swal.showValidationMessage(`Name cannot be blank`)
          }
          return {name: name}
        },
      }).then((result) => {
        if (result.isConfirmed) {
          const data = {
            id: params.row.projectStatusID,
            name: result.value.name
          }
          axios.put(`${config.api}/api/Project_Status/update`, data)
            .then((response) => {
              this.loadData()
              Swal.fire(
                'Done!',
                'The record has been updated.',
                'success'
              )
            })
            .catch(() => {
              Swal.fire('Error', 'Something went wrong', 'error')
            })
        } else if (result.isDenied){
          const projectstatusid = params.row.projectStatusID
          axios.delete(`${config.api}/api/Project_Status/delete/` + projectstatusid)
            .then((response) => {
              this.loadData()
              Swal.fire(
                'Done!',
                'The record has been deleted.',
                'success'
              )
            })
            .catch(() => {
              Swal.fire('Error', 'Something went wrong', 'error')
            })
        }
      })
    },
    addNewProject_Status(){
      Swal.fire({
        title: 'Add Record',
        html:
          '<form>Name <input id="form-name" class="swal2-input" placeholder="Name">' +
          '</form>'
        ,
        showCancelButton: true,
        focusConfirm: false,
        confirmButtonText: 'Submit',
        cancelButtonText: 'Cancel',
        preConfirm: () => {
          const name = document.getElementById('form-name').value
          if (!name) {
            Swal.showValidationMessage(`Name cannot be blank`)
          }
          return {name: name}
        },
      }).then((result) => {
        if (result.isConfirmed) {
          const data = {
            name: result.value.name
          }
          axios.post(`${config.api}/api/Project_Status/create`, data)
            .then((response) => {
              this.loadData()
              Swal.fire(
                'Done!',
                'The record has been created.',
                'success'
              )
            })
            .catch(() => {
              Swal.fire('Error', 'Something went wrong', 'error')
            })
        }
      })
    },
    loadData(){
      axios.get(`${config.api}/api/Project_Status/find`)
        .then((response) => {
          this.DB_DATA = response.data;
        })
        .catch(() => {
          Swal.fire('Error 2', 'Something went wrong', 'error')
        })
    },
  },
  beforeMount() {
    this.loadData();
  }
};
</script>

<style scoped>
button {
  margin-right: 15px;
  height: 100%;
}
</style>
