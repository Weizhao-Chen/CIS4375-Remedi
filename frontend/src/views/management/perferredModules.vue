<template>
  <div>
    <div class="tableHeading">
      <div class="tableHeading-left"></div>
      <!-- <div class="tableHeading-right">
        <button class="swal2-editform swal2-styled" v-on:click="addNewAirline">
          Add New Airline
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
          initialSortBy: { field: 'moduleID', type: 'asc' },
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
      myAPI: `${config.api}/api/Airline`,
      dataFields: [
        {
          label: 'ModuleID',
          field: 'moduleID',
          type: 'number',
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
          label: 'Perferred Module',
          field: 'Module.moduleName',
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
        name: '/airline/edit',
        params: {
          airlineID: params.row.airlineID,
        },
      })
    },
    addNewAirline() {
      this.$router.push('/airline/edit')
    },
    loadData() {
      axios
        .get(`${config.api}/api/Preferred_Module/find`)
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
