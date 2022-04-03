<template>
  <div>
    <div class="tableHeading">
      <div class="tableHeading-left">
        <span class="tableHeading-text">Hospital List</span>
        <!-- {{ DB_DATA }} -->
      </div>
      <div class="tableHeading-right">
        <button class="swal2-editform swal2-styled" v-on:click="addNewHospital">
          Add New Hospital
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
          initialSortBy: { field: 'hospitalID', type: 'asc' },
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
      myAPI: `${config.api}/api/Hospital`,
      dataFields: [
        {
          label: 'id',
          field: 'hospitalID',
          type: 'number',
        },
        {
          label: 'name',
          field: 'hospitalName',
        },
        {
          label: 'Address',
          field: 'hospitalAddressLineOne',
        },
        {
          label: 'Address 2',
          field: 'hospitalAddressLineTwo',
        },
        {
          label: 'City',
          field: 'hospitalCity',
        },
        {
          label: 'State',
          field: 'hospitalState',
        },
        {
          label: 'Zipcode',
          field: 'hospitalZipCode',
        },
        {
          label: 'Contact Name',
          field: 'hospitalContactName',
        },
        {
          label: 'Contact Phone',
          field: 'hospitalContactPhone',
        },
        {
          label: 'Contact Email',
          field: 'hospitalContactEmail',
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
          params.row.hospitalID +
          '<br>' +
          '<form>Name <input id="hospital-name" class="swal2-input" placeholder="Name" value="' +
          params.row.hospitalName +
          '">' +
          '</form>' +
          '<form>Address One: <input id="address-one" class="swal2-input" placeholder="Address" value="' +
          params.row.hospitalAddressLineOne +
          '">' +
          '<form>Address Two: <input id="address-two" class="swal2-input" placeholder="Address" value="' +
          params.row.hospitalAddressLineTwo +
          '">' +
          '<form>City: <input id="hospital-city" class="swal2-input" placeholder="Address" value="' +
          params.row.hospitalCity +
          '">' +
          '<form> State: <input id="hospital-state" class="swal2-input" placeholder="State" value="' +
          params.row.hospitalState +
          '">' +
          '<form>Zipcode: <input id="hospital-zipcode" class="swal2-input" placeholder="Zipcode" value="' +
          params.row.hospitalZipCode +
          '">' +
          '<form>Contact Name: <input id="contact-name" class="swal2-input" placeholder="Contact Name" value="' +
          params.row.hospitalContactName +
          '">' +
          '<form>Contact Phone: <input id="contact-phone" class="swal2-input" placeholder="Contact Phone" value="' +
          params.row.hospitalContactPhone +
          '">' +
          '<form>Contact Email: <input id="contact-email" class="swal2-input" placeholder="Contact Email" value="' +
          params.row.hospitalContactEmail +
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
          const hospitalName = document.getElementById('hospital-name').value
          const addressOne = document.getElementById('address-one').value
          const addressTwo = document.getElementById('address-two').value
          const city = document.getElementById('hospital-city').value
          const state = document.getElementById('hospital-state').value
          const zipcode = document.getElementById('hospital-zipcode').value
          const phone = document.getElementById('contact-phone').value
          const email = document.getElementById('contact-email').value
          const contact = document.getElementById('contact-name').value

          // const name = 'hello'
          if (!hospitalName) {
            Swal.showValidationMessage(`Name cannot be blank`)
            return
          }
          return {
            hospitalName: hospitalName,
            addressOne: addressOne,
            addressTwo: addressTwo,
            city: city,
            state: state,
            zipcode: zipcode,
            phone: phone,
            email: email,
            contact: contact,
          }
        },
      }).then(result => {
        if (result.isConfirmed) {
          const data = {
            name: result.value.hospitalName,
            addressOne: result.value.addressOne,
            addressTwo: result.value.addressTwo,
            city: result.value.city,
            state: result.value.state,
            zipcode: result.value.zipcode,
            phone: result.value.phone,
            email: result.value.email,
            contact: result.value.contact,
          }

          axios
            .put(
              `${config.api}/api/Hospital/update/${params.row.hospitalID}`,
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
          const id = params.row.hospitalID
          axios
            .delete(`${config.api}/api/Hospital/delete/` + id)
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
    addNewHospital() {
      Swal.fire({
        title: 'Add Record',
        html:
          '<form>Name <input id="hospital-name" class="swal2-input" placeholder="Name">' +
          '<form>Address One: <input id="address-one" class="swal2-input" placeholder="Address One" >' +
          '<form>Address Two: <input id="address-two" class="swal2-input" placeholder="Address Two">' +
          '<form>City: <input id="hospital-city" class="swal2-input" placeholder="city">' +
          '<form> State: <input id="hospital-state" class="swal2-input" placeholder="State" >' +
          '<form>Zipcode: <input id="hospital-zipcode" class="swal2-input" placeholder="Zipcode" >' +
          '<form>Contact Name: <input id="contact-name" class="swal2-input" placeholder="Contact Name" >' +
          '<form>Contact Phone: <input id="contact-phone" class="swal2-input" placeholder="Contact Phone" ">' +
          '<form>Contact Email: <input id="contact-email" class="swal2-input" placeholder="Contact Email" >' +
          '</form>',
        showCancelButton: true,
        focusConfirm: false,
        confirmButtonText: 'Submit',
        cancelButtonText: 'Cancel',
        preConfirm: () => {
          const hospitalName = document.getElementById('hospital-name').value
          const addressOne = document.getElementById('address-one').value
          const addressTwo = document.getElementById('address-two').value
          const city = document.getElementById('hospital-city').value
          const state = document.getElementById('hospital-state').value
          const zipcode = document.getElementById('hospital-zipcode').value
          const phone = document.getElementById('contact-phone').value
          const email = document.getElementById('contact-email').value
          const contact = document.getElementById('contact-name').value

          if (!hospitalName) {
            Swal.showValidationMessage(`Name cannot be blank`)
          }
          return {
            name: hospitalName,
            addressOne: addressOne,
            addressTwo: addressTwo,
            city: city,
            state: state,
            zipcode: zipcode,
            phone: phone,
            email: email,
            contact: contact,
          }
        },
      }).then(result => {
        if (result.isConfirmed) {
          // const data = {
          //   name: result.value.name,
          // }
          axios
            .post(`${config.api}/api/Hospital/create`, result.value)
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
        .get(`${config.api}/api/Hospital/find`)
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
