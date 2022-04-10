<template>
  <div>
    <div class="tableHeading">
      <div class="tableHeading-left">
        <span class="tableHeading-text">Rental Car List</span>
      </div>
      <div class="tableHeading-right">
        <button
          class="swal2-editform swal2-styled" v-on:click="addNewRentalCar"
        >
          Add New Rental Car List
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
          initialSortBy: { field: 'rentalCarID', type: 'asc' },
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
      myAPI: `${config.api}/api/Rental_Car`,
      dataFields: [
        {
          label: 'id',
          field: 'rentalCarID',
          type: 'number',
        },
        {
          label: 'Model',
          field: 'rentalCarModel',
        },
        {
          label: 'Make',
          field: 'rentalCarMake',
        },
        {
          label: 'License Plate',
          field: 'rentalLicense',
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
        name: '/rentalcar/edit',
        params: {
          rentalCarID: params.row.rentalCarID,
        },
      })
    },
    addNewRentalCar() {
      this.$router.push('/rentalcar/create')
    },
    loadData() {
      axios
        .get(`${config.api}/api/Rental_Car/find`)
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
