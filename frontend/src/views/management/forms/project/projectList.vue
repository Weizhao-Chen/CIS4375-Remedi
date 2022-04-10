<template>
  <div>
    <div class="tableHeading">
      <div class="tableHeading-left">
        <span class="tableHeading-text">Project List</span>
      </div>
      <div class="tableHeading-right">
        <button class="swal2-editform swal2-styled" v-on:click="addNewProject">
          Add New Project List
        </button>
      </div>
    </div>

    <!-- {{ this.DB_DATA }} -->

    <div>
      <div slot="table-actions"></div>
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
          initialSortBy: { field: 'projectID', type: 'asc' },
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
import axios from '../../../../utilities/axios'
import config from '../../../../config'
import 'vue-good-table/dist/vue-good-table.css'
import { VueGoodTable } from 'vue-good-table'
import Swal from 'sweetalert2'

export default {
  data() {
    return {
      DB_DATA: [],
      Project_Status_DATA: [],
      Hospital_DATA: [],
      myAPI: `${config.api}/api/Project`,
      Dates: [],
      dataFields: [
        {
          label: 'id',
          field: 'projectID',
          type: 'number',
        },
        {
          label: 'Name',
          field: 'projectName',
        },
        {
          label: 'Start Date',
          field: 'projectStartDate',
        },
        {
          label: 'End Date',
          field: 'projectEndDate',
        },
        {
          label: 'Notes',
          field: 'projectNotes',
        },
        {
          label: 'hospital name',
          field: 'hospitalName',
        },
        {
          label: 'Project Status',
          field: 'projectStatus',
        },
      ],
    }
  },

  components: {
    'vue-good-table': VueGoodTable,
  },
  methods: {
    onRowDoubleClick(params) {
      this.$router.push({
        name: '/project/edit',
        params: {
          projectID: params.row.projectID,
        },
      })
    },
    addNewProject() {
      this.$router.push('/project/create')
    },

    formatDate(data) {
      for (let i = 0; i < data.length; i++) {
        this.DB_DATA.push({
          projectID: data[i].projectID,
          projectName: data[i].projectName,
          projectStartDate: data[i].projectStartDate.split('T')[0],
          projectEndDate: data[i].projectEndDate.split('T')[0],
          projectNotes: data[i].projectNotes,
          hospitalName: data[i].Hospital.hospitalName,
          projectStatus: data[i].Project_Status.projectStatusType,
        })
      }
    },
    loadData() {
      axios
        .get(`${config.api}/api/Project/find`)
        .then((response) => {
          this.formatDate(response.data)
        })
        .then(this.formatDate(this.DB_DATA))
        .catch(() => {
          Swal.fire('Error', 'Something went wrong', 'error')
        })
    },
  },
  beforeMount() {
    this.loadData()
  },
}
</script>

<style scoped>
button {
  margin-right: 15px;
  height: 100%;
}
</style>
