<template>
  <div>
    <div class="tableHeading">
      <div class="tableHeading-left">
        <span class="tableHeading-text">Hotel List</span>
      </div>
      <div class="tableHeading-right">
        <button
          class="swal2-editform swal2-styled" v-on:click="addNewHotel"
        >
          Add New Hotel List
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
          initialSortBy: { field: 'hotelID', type: 'asc' },
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
    //   Contractor_DATA: [],
      myAPI: `${config.api}/api/Hotel`,
      dataFields: [
        {
          label: 'id',
          field: 'hotelID',
          type: 'number',
        },
        {
          label: 'Hotel Name',
          field: 'hotelname',
        },
        {
          label: 'Hotel Check In Date',
          field: 'hotelcheckindate',
        },
        {
          label: 'Hotel Check In Time',
          field: 'hotelcheckintime',
        },
        {
          label: 'Hotel Check Out Date',
          field: 'hotelcheckoutdate',
        },
        {
          label: 'Hotel Check Out Time',
          field: 'hotelcheckouttime',
        }
        // ,
        // {
        //   label: 'Contractor Last Name',
        //   field: 'Contractor.lastName',
        // },
        // {
        //   label: 'Contractor First Name',
        //   field: 'Contractor.firstName',
        // }
      ],
    }
  },

  components: {
    'vue-good-table': VueGoodTable,
  },
  methods: {
    onRowDoubleClick(params) {
      this.$router.push({
        name: '/hotel/edit',
        params: {
          hotelID: params.row.hotelID,
        },
      })
    },
    addNewHotel() {
      this.$router.push('/hotel/create')
    },
    formatDate(data) {
      for (let i = 0; i < data.length; i++) {
        // let d = new Date(data[i].departTime)
        // let d2 = new Date(data[i].arrivalTime)
        this.DB_DATA.push({
          hotelID: data[i].hotelID,
          hotelname: data[i].hotelname,
          hotelcheckindate: data[i].hotelcheckindate.split('T')[0],
          hotelcheckintime: data[i].hotelcheckintime.split('T')[1],
          hotelcheckoutdate: data[i].hotelcheckoutdate.split('T')[0],
          hotelcheckouttime: data[i].hotelcheckouttime.split('T')[1],
        })

        // console.log(data[i])
      }
    },
    loadData() {
      axios
        .get(`${config.api}/api/Hotel/find`)
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
