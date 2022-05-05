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

    <!-- {{ this.DB_DATA }} -->
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
          label: 'flight name',
          field: 'flightName',
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
        name: '/flight/edit',
        params: {
          flightID: params.row.flightID,
        },
      })
    },
    addNewFlight() {
      this.$router.push('/flight/create')
    },

    formatDate(data) {
      for (let i = 0; i < data.length; i++) {
        // let d = new Date(data[i].departTime)
        // let d2 = new Date(data[i].arrivalTime)
        this.DB_DATA.push({
          flightID: data[i].flightID,
          flightName: data[i].flightName,
          flightDate: data[i].flightDate.split('T')[0],
          departLocation: data[i].departLocation,
          departTime: data[i].departTime.split('T')[1],
          arrivalLocation: data[i].arrivalLocation,
          arrivalTime: data[i].arrivalTime.split('T')[1],
          seatNumber: data[i].seatNumber,
          flightCost: data[i].flightCost,
          specialApprovalGranted: data[i].specialApprovalGranted,
          specialApprovalName: data[i].specialApprovalName,
          specialApprovalDate: data[i].specialApprovalDate.split('T')[0],
        })

        // console.log(data[i])
      }
    },
    loadData() {
      axios
        .get(`${config.api}/api/Flight/find`)
        .then((response) => {
          this.formatDate(response.data)
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
