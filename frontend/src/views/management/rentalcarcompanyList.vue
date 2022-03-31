<template>
  <div>
    <div class="tableHeading">
      <div class="tableHeading-left">
        <span class="tableHeading-text">Rental Car Company List</span>
      </div>
      <div class="tableHeading-right">
        <button class="swal2-editform swal2-styled" v-on:click="addNewRentalCarCompany">Add New Rental Car Company</button>
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
          initialSortBy: {field: 'rentalCompanyID', type: 'asc'}
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
import axios from '../../utilities/axios';
import config from '../../config';
import 'vue-good-table/dist/vue-good-table.css'
import { VueGoodTable } from 'vue-good-table';
import Swal from 'sweetalert2'

export default {
  data() {
    return {
      DB_DATA: [],
      myAPI: `${config.api}/api/Rental_Car_Company`,
      dataFields: [{
        label: 'id',
        field: 'rentalCompanyID',
        type: 'number'
      },{
        label: 'name',
        field: 'rentalCompanyName'
      },{
        label: 'phone',
        field: 'rentalPhoneNumber'
      },{
        label: 'street',
        field: 'rentalAddressLineOne'
      },{
        label: 'street2',
        field: 'rentalAddressLineTwo'
      },{
        label: 'city',
        field: 'rentalCity'
      },{
        label: 'state',
        field: 'rentalState'
      },{
        label: 'zip',
        field: 'rentalZipCode'
      }]
    };
  },

  components: {
    'vue-good-table': VueGoodTable
  },
  methods: {
    onRowDoubleClick(params){
      this.$router.push({
        name: '/rentalcarcompany/edit',
        params: {
          rentalCompanyID: params.row.rentalCompanyID
        }
      })
    },
    addNewRentalCarCompany(){
      this.$router.push('/rentalcarcompany/edit')
    },
    loadData(){
      axios.get(`${config.api}/api/Rental_Car_Company/find`)
        .then((response) => {
          this.DB_DATA = response.data;
        })
        .catch(() => {
          Swal.fire('Error 2', 'Something went wrong', 'error')

        })
    }
  },
  beforeMount() {
    this.loadData();
  }
};
</script>

<style scoped>
</style>
