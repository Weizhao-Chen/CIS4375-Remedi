<template>
  <div>
    <div class="tableHeading">
      <div class="tableHeading-left">
        <span class="tableHeading-text">Clinic Area List</span>
      </div>
      <div class="tableHeading-right">
        <button class="swal2-editform swal2-styled" v-on:click="addNewClinicArea">Add New Clinic Area List</button>
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
          initialSortBy: {field: 'clinicID', type: 'asc'}
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
      Hopistal_DATA: [],
      myAPI: `${config.api}/api/Clinic_Area`,
      dataFields: [{
        label: 'id',
        field: 'clinicID',
        type: 'number'
      },{
        label: 'clinic name',
        field: 'clinicAreaName'
      },{
        label: 'area lead name',
        field: 'clinicAreaLead'
      },{
        label: 'area lead phone',
        field: 'clinicAreaLeadPhone'
      },{
        label: 'area lead email',
        field: 'clinicAreaLeadEmail'
      },{
        label: 'hospital name',
        field: 'Hospital.hospitalName'
      }]
    };
  },

  components: {
    'vue-good-table': VueGoodTable
  },
  methods: {
    onRowDoubleClick(params){
      this.$router.push({
        name: '/clinicarea/edit',
        params: {
          clinicID: params.row.clinicID
        }
      })
    },
    addNewClinicArea(){
      this.$router.push('/clinicarea/edit')
    },
    loadData(){
      axios.get(`${config.api}/api/Clinic_Area/find`)
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
