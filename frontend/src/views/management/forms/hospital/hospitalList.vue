<template>
  <div>
    <div class="tableHeading">
      <div class="tableHeading-left">
        <span class="tableHeading-text">Hospital List</span>
      </div>
      <div class="tableHeading-right">
        <button class="swal2-editform swal2-styled" v-on:click="addNewHospital">Add New Hospital List</button>
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
          initialSortBy: {field: 'hospitalID', type: 'asc'}
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
      myAPI: `${config.api}/api/Hospital`,
      dataFields: [{
        label: 'id',
        field: 'hospitalID',
        type: 'number'
      },{
        label: 'name',
        field: 'hospitalName'
      },{
        label: 'Street',
        field: 'hospitalAddressLineOne'
      },{
        label: 'Street 2',
        field: 'hospitalAddressLineTwo'
      },{
        label: 'city',
        field: 'hospitalCity'
      },{
        label: 'state',
        field: 'hospitalState'
      },{
        label: 'zip',
        field: 'hospitalZipCode'
      },{
        label: 'contact name',
        field: 'hospitalContactName'
      },{
        label: 'phone number',
        field: 'hospitalContactPhone'
      },{
        label: 'email',
        field: 'hospitalContactEmail'
      }]
    };
  },

  components: {
    'vue-good-table': VueGoodTable
  },
  methods: {
    onRowDoubleClick(params){
      this.$router.push({
        name: '/hospital/edit',
        params: {
          hospitalID: params.row.hospitalID
        }
      })
    },
    addNewHospital(){
      this.$router.push('/hospital/edit')
    },
    loadData(){
      axios.get(`${config.api}/api/Hospital/find`)
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
