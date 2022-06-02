<template>
  <div>
    <div class="jumbotron dashboard">
      <div v-if="!isNewHotel" class="dashlabel">
        Hotel Number: {{ this.hotelID }}
      </div>
      <div v-else class="dashlabel">Adding New Hotel</div>
    </div>

    <div class="editForm">
      <div class="editFormFooter-left">
        <button
          class="swal2-editform swal2-styled goBackButton"
          v-on:click="goBack"
        >
          Go Back
        </button>
      </div>
      <div class="editFormFooter-right">
        <button
          v-if="!isNewHotel"
          class="swal2-editform swal2-styled updateButton"
          :disabled="validationFormCheck === false"
          v-on:click="updateHotel"
        >
          Update Hotel
        </button>
        <button
          v-if="!isNewHotel"
          class="swal2-editform swal2-styled deleteButton"
          v-on:click="deleteHotel"
        >
          Delete Hotel
        </button>
        <button
          v-if="isNewHotel"
          class="swal2-editform swal2-styled addNewButton"
          :disabled="validationFormCheck === false"
          v-on:click="addHotel"
        >
          Submit New Hotel
        </button>
      </div>
    </div>

    <br />

    <form class="swal2-form mainForm">
      <div class="editForm-left">
        <FormulateInput
          @validation="validationName = $event"
          type="text"
          name="hotelname"
          label="Name"
          validation="required"
          v-model="form.model.HotelName"
          :validation-messages="{
            required: 'The Hotel Name is required',
          }"
        />
      </div>
      <div>
        <label for="example-datepicker">Check In Date</label>
        <b-form-datepicker
          id=">Check-In-Date"
          v-model="form.model.HotelCheckInDate"
          class="mb-2"
        ></b-form-datepicker>
      </div>

      <div>
        <label for="example-timepicker">Check In Time</label>
        <b-form-timepicker
          id="Check-In-Time"
          v-model="form.model.HotelCheckInTime"
          class="mb-2"
        ></b-form-timepicker>
      </div>

      <div>
        <label for="example-datepicker">Check Out Date</label>
        <b-form-datepicker
          id="Check-Out-Date"
          v-model="form.model.HotelCheckOutDate"
          class="mb-2"
        ></b-form-datepicker>
      </div>

      <div>
        <label for="example-timepicker">Check Out Time</label>
        <b-form-timepicker
          id="Check-Out-Time"
          v-model="form.model.HotelCheckOutTime"
          class="mb-2"
        ></b-form-timepicker>
      </div>

      <!-- {{ this.AssignedContractors }} -->
      <div v-if="!isNewHotel" class="editForm-right">
        <label class="form-custom-label" for="form-Hotel"
          >Contractors :</label
        >
        <b-card-body
          id="nav-scroller"
          ref="content"
          style="position: relative; height: 150px; overflow-y: scroll"
        >
          <b-list-group>
            <b-list-group-item
              v-for="item in AssignedContractors"
              :key="item.contractorID"
              >{{
                item.Contractor.firstName +
                ' ' +
                item.Contractor.lastName
              }}

              <b-button
                class="button-style"
                v-on:click="removeContractor($event, item.contractorID)"
                variant="primary"
                >Remove</b-button
              >
            </b-list-group-item>
          </b-list-group>
        </b-card-body>
      </div>

      <b-button
        v-if="!isNewHotel"
        v-b-toggle="'collapse-2'"
        class="m-1"
        variant="primary"
        >Assign Contractor</b-button
      >

      <!-- Element to collapse -->
      <b-collapse id="collapse-2">
        <b-card>
          <form class="swal2-form mainForm">
            <div class="editForm-right">
              <label class="form-custom-label" for="form-Contractor">
                Contractor</label
              >
              <!-- {{ this.AssignedContractors }} -->
              <model-list-select
                v-model="currentContractor"
                :list="Contractors"
                option-value="fullName"
                id="contractorID"
                option-text="fullName"
                placeholder="select one"
              >
              </model-list-select>
              <!--                 :isError="validationContractor === true" -->
              <!-- {{ this.Modules }} -->
            </div>
            <button
              class="swal2-editform swal2-styled"
              v-on:click="addContractor($event)"
            >
              Add
            </button>
          </form>
        </b-card>
      </b-collapse>

      <!-- <input v-model="currentContractor" placeholder="edit me" /> -->
    </form>
  </div>
</template>

<script>
//https://grokonez.com/frontend/vue-js/vue-js-nodejs-express-restapis-sequelize-orm-mysql-crud-example
import axios from '../../../../utilities/axios'
import config from '../../../../config'
import Swal from 'sweetalert2'
import { mapActions } from 'vuex'
import { ModelListSelect } from 'vue-search-select'
import { ModelSelect } from 'vue-search-select'

export default {
  props: ['hotelID'],
  data() {
    return {
      isNewHotel: true,
      validationName: {},
      DB_DATA: [],
      currentContractor: {},
      Contractors: [],
      AssignedContractors: [],
      form: {
        model: {
          HotelID: '',
          HotelName: '',
          HotelCheckInDate: '',
          HotelCheckInTime: '',
          HotelCheckOutDate: '',
          HotelCheckOutTime: '',
        },
      },
    }
  },
  components: {
    ModelSelect,
    ModelListSelect,
  },
  computed: {
    validationFormCheck: function () {
      if (
        this.validationName.hasErrors === false
      ) {
        return true
      } else {
        return false
      }
    },
  },
  methods: {
    goBack() {
      this.$router.push('/hotel')
    },
    addHotel() {
      axios
        .post(`${config.api}/api/Hotel/create`, this.form.model)
        .then((response) => {
          Swal.fire('Done!', 'The record has been created.', 'success')
          this.goBack()
        })
        .catch(() => {
          Swal.fire(
            'Error',
            'Something went wrong (creating Hotel)',
            'error',
          )
        })

      // console.log(this.form.model)
    },
    updateHotel() {
      const HotelID = this.hotelID
      axios
        .put(
          `${config.api}/api/Hotel/update/` + HotelID,
          this.form.model,
        )
        .then((response) => {
          this.loadData()
          Swal.fire('Done!', 'The Hotel has been updated.', 'success')
          this.goBack()
        })
        .catch(() => {
          Swal.fire(
            'Error',
            'Something went wrong (updating Hotel)',
            'error',
          )
        })
    },
    deleteHotel() {
      const HotelID = this.hotelID
      axios
        .delete(`${config.api}/api/Hotel/delete/` + HotelID)
        .then((response) => {
          Swal.fire('Done!', 'The Hotel has been deleted.', 'success')
          this.goBack()
        })
        .catch(() => {
          Swal.fire(
            'Error',
            'Something went wrong (deleting Hotel)',
            'error',
          )
        })
    },
    // addModule(event) {
    //   event.preventDefault()

    //   const modulePayLoad = {
    //     contractorID: this.contractorID,
    //     moduleID: this.currentModule.moduleID,
    //   }
    //   axios
    //     .post(`${config.api}/api/Preferred_Module/create`, modulePayLoad)
    //     .then((response) => console.log(response))
    //     .then(
    //       this.PreferredModules.push({
    //         moduleID: this.currentModule.moduleID,
    //         Module: {
    //           moduleName: this.currentModule.moduleName,
    //         },
    //       }),
    //     )
    // },
    // removePreferredModuleFromList(moduleID) {
    //   for (let i = 0; i < this.PreferredModules.length; i++) {
    //     if (this.PreferredModules[i].moduleID === moduleID) {
    //       this.PreferredModules.splice(i, 1)
    //     }
    //   }
    // },

    // removePreferredModule(event, moduleID) {
    //   event.preventDefault()

    //   axios
    //     .delete(
    //       `${config.api}/api/Preferred_Module/delete/${moduleID}/${this.contractorID}`,
    //     )
    //     .then(this.removePreferredModuleFromList(moduleID))
    // },
    loadData() {
      axios
        .get(`${config.api}/api/Hotel/find/` + this.hotelID)
        .then((response) => {
          this.DB_DATA = response.data
          this.form.model.HotelName = response.data.hotelname

          // this.form.model.HotelCheckInDate = response.data.hotelcheckindate
          if (response.data.hotelcheckindate) {
            this.form.model.HotelCheckInDate = response.data.hotelcheckindate.split('T')[0]
          }
          
          // this.form.model.HotelCheckInTime = response.data.hotelcheckintime
          if (response.data.hotelcheckintime) {
            this.form.model.HotelCheckInTime = response.data.hotelcheckintime.split('T')[1]
          }
          // this.form.model.HotelCheckOutDate = response.data.hotelcheckoutdate
          if (response.data.hotelcheckoutdate) {
            this.form.model.HotelCheckOutDate = response.data.hotelcheckoutdate.split('T')[0]
          }
          // this.form.model.HotelCheckOutTime = response.data.hotelcheckouttime
          if (response.data.hotelcheckouttime) {
            this.form.model.HotelCheckOutTime = response.data.hotelcheckouttime.split('T')[1]
          }
        })
        .catch(() => {
          Swal.fire(
            'Error',
            'Something went wrong (finding Hotel)',
            'error',
          )
        })

      axios.get(`${config.api}/api/Contractor/find/`).then((response) => {
        this.formatContractorData(response.data)
      })

      axios
        .get(`${config.api}/api/Contractor_Hotel/find/${this.hotelID}`)
        .then((response) => {
          this.AssignedContractors = response.data
        })
    },
    formatContractorData(data) {
      for (let i = 0; i < data.length; i++) {
        // console.log(data[i].firstName)
        this.Contractors.push({
          contractorID: data[i].contractorID,
          fullName: data[i].firstName + ' ' + data[i].lastName,
          firstName: data[i].firstName,
          lastName: data[i].lastName,
        })
      }
    },
    checkForExistingContractor(contractorID) {
      for (let i = 0; i < this.AssignedContractors.length; i++) {
        if (this.AssignedContractors[i].contractorID === contractorID) {
          return true
        }
      }
      return false
    },
    addContractor(event) {
      event.preventDefault()
      const addContractorPayload = {
        hotelID: this.hotelID,
        contractorID: this.currentContractor.contractorID,
      }

      if (!this.currentContractor.contractorID) {
        Swal.fire('error', 'Must add Contractor!', 'error')
      }else if (
        this.checkForExistingContractor(this.currentContractor.contractorID)
      ) {
        Swal.fire('error', 'Contractor Already Assigned!', 'error')
      } else {
        axios
          .post(
            `${config.api}/api/Contractor_Hotel/create`,
            addContractorPayload,
          )
          .then((response) => console.log(response))

        this.AssignedContractors.push({
          Contractor: {
            lastName: this.currentContractor.lastName,
            firstName: this.currentContractor.firstName,
          },
        })
      }
    },
    removeContractorFromList(contractorID) {
      for (let i = 0; i < this.AssignedContractors.length; i++) {
        if (this.AssignedContractors[i].contractorID === contractorID) {
          this.AssignedContractors.splice(i, 1)
        }
      }
    },
    removeContractor(event, contractorID) {
      event.preventDefault()
      console.log(
        'hotelID:' + this.hotelID + 'contractorID:' + contractorID,
      )
      axios
        .delete(
          `${config.api}/api/Contractor_Hotel/delete/${this.hotelID}/${contractorID}`,
        )
        .then(this.removeContractorFromList(contractorID))
        .then((response) => console.log(response))
    },
  },
  beforeMount() {
    if (this.hotelID !== undefined) {
      this.isNewHotel = false
      this.loadData()
    }
  },
}
</script>

<style scoped></style>
