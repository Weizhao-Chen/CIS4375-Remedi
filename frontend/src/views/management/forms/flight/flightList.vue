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
          field: 'Hospital.hospitalName',
        },
        {
          label: 'projectStatusType',
          field: 'Project_Status.projectStatusType',
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
    loadData() {
      axios
        .get(`${config.api}/api/Project/find`)
        .then((response) => {
          this.DB_DATA = response.data
        })
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
