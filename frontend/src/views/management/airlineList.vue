<template>
  <div>
    <div class="tableHeading">
      <div class="tableHeading-left">
        <span class="tableHeading-text">Airline List</span>
      </div>
      <div class="tableHeading-right">
        <button class="swal2-editform swal2-styled" v-on:click="addNewAirline">Add New Airline</button>
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
          initialSortBy: {field: 'airlineID', type: 'asc'}
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
      myAPI: `${config.api}/api/Airline`,
      dataFields: [{
        label: 'id',
        field: 'airlineID',
        type: 'number'
      },{
        label: 'name',
        field: 'airlineName'
      },{
        label: 'phone',
        field: 'airlinePhoneNumber'
      },{
        label: 'street',
        field: 'airlineAddressLineOne'
      },{
        label: 'street2',
        field: 'airlineAddressLineTwo'
      },{
        label: 'city',
        field: 'airlineCity'
      },{
        label: 'state',
        field: 'airlineState'
      },{
        label: 'country',
        field: 'airlineCountry'
      },{
        label: 'zip',
        field: 'airlineZipCode'
      },{
        label: 'website',
        field: 'airlineWebsite'
      }]
    };
  },

  components: {
    'vue-good-table': VueGoodTable
  },
  methods: {
    onRowDoubleClick(params){
      this.$router.push({
        name: '/airline/edit',
        params: {
          airlineID: params.row.airlineID
        }
      })
    },
    addNewAirline(){
      this.$router.push('/airline/edit')
    },
    loadData(){
      axios.get(`${config.api}/api/Airline/find`)
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
