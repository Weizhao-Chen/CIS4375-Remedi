<template>
  <div>
    <div class="tableHeading">
      <div class="tableHeading-left">
        <span class="tableHeading-text">Contractor Project Test List</span>
      </div>
      <div class="tableHeading-right">
        <button class="swal2-editform swal2-styled" v-on:click="addNewContractorProject">Add New Contractor Project List</button>
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
        @on-row-dblclick="onRowDoubleClick"
      />
    </div>
  </div>

</template>

<script>
import axios from '../../../../utilities/axios'
import config from '../../../../config'
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
        label: 'Project ID',
        field: 'Project.projectID'
      }]
    };
  },

  components: {
    'vue-good-table': VueGoodTable
  },
  methods: {
    onRowDoubleClick(params){
      this.$router.push({
        name: '/cp/edit',
        params: {
          contractorID: params.row.Contractor.contractorID
        }
      })
    },
    addNewContractorProject(){
      this.$router.push('/cp/edit')
    },
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
