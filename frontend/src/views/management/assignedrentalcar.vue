<template>
  <div>
    <div class="tableHeading">
      <div class="tableHeading-left"></div>
      <!-- <div class="tableHeading-right">
        <button class="swal2-editform swal2-styled" v-on:click="addNewAirline">
          Add New Perferred Modules
        </button>
      </div> -->
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
          initialSortBy: { field: 'Contractor.contractorID', type: 'asc' },
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
      />
    </div>
  </div>
</template>

<script>
import axios from '../../utilities/axios'
import config from '../../config'
import 'vue-good-table/dist/vue-good-table.css'
import { VueGoodTable } from 'vue-good-table'
import Swal from 'sweetalert2'

export default {
  data() {
    return {
      DB_DATA: [],
      Rental_Car_DATA: [],
      Contractor_DATA: [],
      myAPI: `${config.api}/api/Assigned_Rental_Car`,
      dataFields: [
        {
          label: 'Rental Car ID',
          field: 'Rental_Car.rentalCarID',
        },
        {
          label: 'Contractor ID',
          field: 'Contractor.contractorID',
          hidden: true,
        },
        {
          label: 'First Name',
          field: 'Contractor.firstName',
        },
        {
          label: 'Last Name',
          field: 'Contractor.lastName',
        },
        {
          label: 'driver or passenger',
          field: 'driverPassenger',
        },
      ],
    }
  },

  components: {
    'vue-good-table': VueGoodTable,
  },
  methods: {
    loadData() {
      axios
        .get(`${config.api}/api/Assigned_Rental_Car/find`)
        .then((response) => {
          this.DB_DATA = response.data
        })
        .catch(() => {
          Swal.fire('Error 2', 'Something went wrong', 'error')
        })
    },
  },
  beforeMount() {
    this.loadData()
  },
}
</script>

<style scoped></style>
