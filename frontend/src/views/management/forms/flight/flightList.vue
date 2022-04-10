<template>
  <div>
    <div class="tableHeading">
      <div class="tableHeading-left">
        <span class="tableHeading-text">Flight List</span>
      </div>
      <div class="tableHeading-right">
        <button class="swal2-editform swal2-styled" v-on:click="addNewFlight">
          Add New Flight List
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
          initialSortBy: { field: 'flightID', type: 'asc' },
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
    //   Project_Status_DATA: [],
    //   Hospital_DATA: [],
      myAPI: `${config.api}/api/Flight`,
      dataFields: [
        {
          label: 'id',
          field: 'flightID',
          type: 'number',
        },
        {
          label: 'date',
          field: 'flightDate',
        },
        {
          label: 'depart Time',
          field: 'departTime',
        },
        {
          label: 'depart Location',
          field: 'departLocation',
        },
        {
          label: 'arrival location',
          field: 'arrivalLocation',
        },
        {
          label: 'arrival Time',
          field: 'arrivalTime',
        },
        {
          label: 'seat number',
          field: 'seatNumber',
        },
        {
          label: 'flight cost',
          field: 'flightCost',
        },
        {
          label: 'approval check',
          field: 'specialApprovalGranted',
        },
        {
          label: 'approval name',
          field: 'specialApprovalName',
        },
        {
          label: 'approval date',
          field: 'specialApprovalDate',
        }
      ],
    }
  },

  components: {
    'vue-good-table': VueGoodTable,
  },
  methods: {
    onRowDoubleClick(params) {
      this.$router.push({
        name: '/flight/edit',
        params: {
          flightID: params.row.flightID,
        },
      })
    },
    addNewFlight() {
      this.$router.push('/flight/create')
    },
    loadData() {
      axios
        .get(`${config.api}/api/Flight/find`)
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
