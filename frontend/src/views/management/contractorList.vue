<template>
  <div>
    <div class="tableHeading">
      <div class="tableHeading-left">
        <span class="tableHeading-text">Contractor List</span>
      </div>
      <div class="tableHeading-right">
        <button class="swal2-editform swal2-styled" v-on:click="addNewContractor">Add New Contractor List</button>
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
          initialSortBy: {field: 'contractorID', type: 'asc'}
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
      Contractor_Status_DATA: [],
      myAPI: `${config.api}/api/Contractor`,
      dataFields: [{
        label: 'id',
        field: 'contractorID',
        type: 'number'
      },{
        label: 'onsite',
        field: 'virtualOnsite'
      },{
        label: 'last-name',
        field: 'lastName'
      },{
        label: 'first-name',
        field: 'firstName'
      },{
        label: 'preferred-name',
        field: 'preferredName'
      },{
        label: 'address-one',
        field: 'addressLineOne'
      },{
        label: 'address-two',
        field: 'addressLineTwo'
      },{
        label: 'city',
        field: 'city'
      },{
        label: 'state',
        field: 'state'
      },{
        label: 'zip',
        field: 'zipCode'
      },{
        label: 'phone-number',
        field: 'phoneNumber'
      },{
        label: 'email',
        field: 'email'
      },{
        label: 'history',
        field: 'remediHistory'
      },{
        label: 'wisdom',
        field: 'supportWisdom'
      },{
        label: 'GoLives',
        field: 'numberofGoLives'
      },{
        label: 'Epic-Project',
        field: 'numberofEpicProjects'
      },{
        label: 'Support-Epic',
        field: 'yearsOfSupportEpic'
      },{
        label: 'Virtual-Epic',
        field: 'supportVirtualEpic'
      },{
        label: 'credit-card',
        field: 'creditCardHotel'
      },{
        label: 'type',
        field: 'Contractor_Status.contractorStatusType'
      }]
    };
  },

  components: {
    'vue-good-table': VueGoodTable
  },
  methods: {
    onRowDoubleClick(params){
      this.$router.push({
        name: '/contractor/edit',
        params: {
          contractorID: params.row.contractorID
        }
      })
    },
    addNewContractor(){
      this.$router.push('/contractor/edit')
    },
    loadData(){
      axios.get(`${config.api}/api/Contractor/find`)
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
