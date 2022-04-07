<template>
  <div>
    <div class="tableHeading">
      <div class="tableHeading-left">
        <span class="tableHeading-text">Contractor Project Report</span>
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
          initialSortBy: {field: 'Contractor.contractorID', type: 'asc'}
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
      Contractor_DATA: [],
      Project_DATA: [],
      myAPI: `${config.api}/api/Contractor_Project`,
      dataFields: [{
        label: 'Contractor ID',
        field: 'Contractor.contractorID'
      },{
        label: 'Contractor last name',
        field: 'Contractor.lastName'
      },{
        label: 'Contractor first name',
        field: 'Contractor.firstName'
      },{
        label: 'Project ID',
        field: 'Project.projectID'
      },{
        label: 'Project name',
        field: 'Project.projectName'
      }]
    };
  },

  components: {
    'vue-good-table': VueGoodTable
  },
  methods: {
    loadData(){
      axios.get(`${config.api}/api/Contractor_Project/find`)
        .then((response) => {
          this.DB_DATA = response.data;
        })
        .catch(() => {
          Swal.fire('Error', 'Something went wrong', 'error')
        })
    }
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
