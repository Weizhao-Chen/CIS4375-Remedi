<template>
  <div>
    <div class="tableHeading">
      <div class="tableHeading-left">
        <span class="tableHeading-text">Rental Car Company List List</span>
        <!-- {{ DB_DATA }} -->
      </div>
      <div class="tableHeading-right">
        <button
          class="swal2-editform swal2-styled"
          v-on:click="addNewRentalCompany"
        >
          Add New Rental Car Company
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
          initialSortBy: { field: 'rentalCompanyID', type: 'asc' },
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
import axios from '../../../utilities/axios'
import config from '../../../config'
import 'vue-good-table/dist/vue-good-table.css'
import { VueGoodTable } from 'vue-good-table'
import Swal from 'sweetalert2'

export default {
  data() {
    return {
      DB_DATA: [],
      myAPI: `${config.api}/api/Rental_Car_Company`,
      dataFields: [
        {
          label: 'id',
          field: 'rentalCompanyID',
          type: 'number',
        },
        {
          label: 'name',
          field: 'rentalCompanyName',
        },
        {
          label: 'Phone',
          field: 'rentalPhoneNumber',
        },
        {
          label: 'Address',
          field: 'rentalAddressLineOne',
        },
        {
          label: 'Address 2',
          field: 'rentalAddressLineTwo',
        },
        {
          label: 'City',
          field: 'rentalCity',
        },
        {
          label: 'State',
          field: 'rentalState',
        },
        {
          label: 'Zipcode',
          field: 'rentalZipCode',
        },
      ],
    }
  },

  components: {
    'vue-good-table': VueGoodTable,
  },
  methods: {
    onRowDoubleClick(params) {
      Swal.fire({
        title: 'Edit Record',
        html:
          'Item ID: ' +
          params.row.rentalCompanyID +
          '<br>' +
          '<form>Name <input id="rental-name" class="swal2-input" placeholder="Name" value="' +
          params.row.rentalCompanyName +
          '">' +
          '</form>' +
          '<form>Address One: <input id="address-one" class="swal2-input" placeholder="Address" value="' +
          params.row.rentalAddressLineOne +
          '">' +
          '<form>Address Two: <input id="address-two" class="swal2-input" placeholder="Address 2" value="' +
          params.row.rentalAddressLineTwo +
          '">' +
          '<form>City: <input id="rental-city" class="swal2-input" placeholder="City" value="' +
          params.row.rentalCity +
          '">' +
          '<form> State: <input id="rental-state" class="swal2-input" placeholder="State" value="' +
          params.row.rentalState +
          '">' +
          '<form>Zipcode: <input id="rental-zipcode" class="swal2-input" placeholder="Zipcode" value="' +
          params.row.rentalZipCode +
          '">' +
          '<form>Phone Number: <input id="rental-phone" class="swal2-input" placeholder="Phone Number" value="' +
          params.row.rentalPhoneNumber +
          '">' +
          '</form>',
        showCancelButton: true,
        showDenyButton: true,
        focusConfirm: false,
        confirmButtonText: 'Submit',
        cancelButtonText: 'Cancel',
        denyButtonText: `Delete Record`,
        customClass: {
          denyButton: 'order-1 right-gap',
          cancelButton: 'order-2',
          confirmButton: 'order-3',
        },
        preConfirm: () => {
          const rentalName = document.getElementById('rental-name').value
          const addressOne = document.getElementById('address-one').value
          const addressTwo = document.getElementById('address-two').value
          const city = document.getElementById('rental-city').value
          const state = document.getElementById('rental-state').value
          const zipcode = document.getElementById('rental-zipcode').value
          const phone = document.getElementById('rental-phone').value

          // const name = 'hello'
          if (!rentalName) {
            Swal.showValidationMessage(`Name cannot be blank`)
            return
          }
          return {
            rentalName: rentalName,
            addressOne: addressOne,
            addressTwo: addressTwo,
            city: city,
            state: state,
            zipcode: zipcode,
            phone: phone,
          }
        },
      }).then(result => {
        if (result.isConfirmed) {
          const data = {
            name: result.value.rentalName,
            addressOne: result.value.addressOne,
            addressTwo: result.value.addressTwo,
            city: result.value.city,
            state: result.value.state,
            zipcode: result.value.zipcode,
            phone: result.value.phone,
          }

          axios
            .put(
              `${config.api}/api/Rental_Car_Company/update/${
                params.row.rentalCompanyID
              }`,
              data,
            )
            .then(response => {
              this.loadData()
              Swal.fire('Done!', 'The record has been updated.', 'success')
            })
            .catch(() => {
              Swal.fire('Error', 'Something went wrong', 'error')
            })
        } else if (result.isDenied) {
          const id = params.row.rentalCompanyID
          axios
            .delete(`${config.api}/api/Rental_Car_Company/delete/` + id)
            .then(response => {
              this.loadData()
              Swal.fire('Done!', 'The record has been deleted.', 'success')
            })
            .catch(() => {
              Swal.fire('Error', 'Something went wrong', 'error')
            })

          console.log(id)
        }
      })
    },
    addNewRentalCompany() {
      Swal.fire({
        title: 'Add Record',
        html:
          '<form>Name <input id="rental-name" class="swal2-input" placeholder="Name">' +
          '<form>Address One: <input id="address-one" class="swal2-input" placeholder="Address One" >' +
          '<form>Address Two: <input id="address-two" class="swal2-input" placeholder="Address Two">' +
          '<form>City: <input id="rental-city" class="swal2-input" placeholder="city">' +
          '<form> State: <input id="rental-state" class="swal2-input" placeholder="State" >' +
          '<form>Zipcode: <input id="rental-zipcode" class="swal2-input" placeholder="Zipcode" >' +
          '<form>Phone Number: <input id="rental-phone" class="swal2-input" placeholder=" Phone Number" ">' +
          '</form>',
        showCancelButton: true,
        focusConfirm: false,
        confirmButtonText: 'Submit',
        cancelButtonText: 'Cancel',
        preConfirm: () => {
          const rentalName = document.getElementById('rental-name').value
          const addressOne = document.getElementById('address-one').value
          const addressTwo = document.getElementById('address-two').value
          const city = document.getElementById('rental-city').value
          const state = document.getElementById('rental-state').value
          const zipcode = document.getElementById('rental-zipcode').value
          const phone = document.getElementById('rental-phone').value

          if (!rentalName) {
            Swal.showValidationMessage(`Name cannot be blank`)
          }
          return {
            name: rentalName,
            addressOne: addressOne,
            addressTwo: addressTwo,
            city: city,
            state: state,
            zipcode: zipcode,
            phone: phone,
          }
        },
      }).then(result => {
        if (result.isConfirmed) {
          // const data = {
          //   name: result.value.name,
          // }
          axios
            .post(`${config.api}/api/Rental_Car_Company/create`, result.value)
            .then(response => {
              this.loadData()
              Swal.fire('Done!', 'The record has been created.', 'success')
            })
            .catch(() => {
              Swal.fire('Error', 'Something went wrong', 'error')
            })
        }
      })
    },
    loadData() {
      axios
        .get(`${config.api}/api/Rental_Car_Company/find`)
        .then(response => (this.DB_DATA = response.data))
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

<style scoped>
button {
  margin-right: 15px;
  height: 100%;
}
</style>
