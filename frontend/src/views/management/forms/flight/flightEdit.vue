<template>
  <div>
    <div class="jumbotron dashboard">
      <div v-if="!isNewFlight" class="dashlabel">
        Flight Number: {{ this.flightID }}
      </div>
      <div v-else class="dashlabel">Adding New Flight</div>
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
          v-if="!isNewFlight"
          class="swal2-editform swal2-styled updateButton"
          :disabled="validationFormCheck === false"
          v-on:click="updateFlight"
        >
          Update Flight
        </button>
        <button
          v-if="!isNewFlight"
          class="swal2-editform swal2-styled deleteButton"
          v-on:click="deleteFlight"
        >
          Delete Flight
        </button>
        <button
          v-if="isNewFlight"
          class="swal2-editform swal2-styled addNewButton"
          :disabled="validationFormCheck === false"
          v-on:click="addFlight"
        >
          Submit New Flight
        </button>
      </div>
    </div>

    <br />

    <form class="swal2-form mainForm">
      <div class="editForm-left">
        <FormulateInput
          type="text"
          name="flightName"
          label="Airport Name"
          validation="required"
          v-model="form.model.FlightName"
          :validation-messages="{
            required: 'The depart location is required needs validation',
          }"
        />
      </div>
      
      <div>
        <label for="example-datepicker">Flight Date</label>
        <b-form-datepicker
          id="Flight-Time"
          v-model="form.model.FlightDate"
          class="mb-2"
        ></b-form-datepicker>
      </div>
      <!-- <div class="editForm-left">
        <FormulateInput
          @validation="validationDTime = $event"
          type="text"
          name="departTime"
          label="depart time"
          validation="required"
          v-model="form.model.DepartTime"
          :validation-messages="{ required: 'The depart time is required needs validation' }"
        />
      </div> -->
      <div>
        <label for="example-timepicker">Depart Time</label>
        <b-form-timepicker
          id="Depart-Time"
          v-model="form.model.DepartTime"
          class="mb-2"
        ></b-form-timepicker>
      </div>
      <div class="editForm-left">
        <FormulateInput
          @validation="validationDLocation = $event"
          type="text"
          name="departLocation"
          label="depart location"
          validation="required"
          v-model="form.model.DepartLocation"
          :validation-messages="{
            required: 'The depart location is required needs validation',
          }"
        />
      </div>
      <div class="editForm-left">
        <FormulateInput
          @validation="validationALocation = $event"
          type="text"
          name="arrivalLocation"
          label="arrival location"
          validation="bail|required:trim|max:500,length"
          v-model="form.model.ArrivalLocation"
          :validation-messages="{
            required: 'The arrival location is required needs validation',
          }"
        />
      </div>
      <!-- <div class="editForm-left">
        <FormulateInput
          @validation="validationATime = $event"
          type="text"
          name="arrivalTime"
          label="arrival time"
          validation="bail|required:trim|max:500,length"
          error-behavior="live"
          v-model="form.model.ArrivalTime"
          :validation-messages="{ required: 'The arrival time is required needs validation' }"
        />
      </div> -->
      <div>
        <label for="example-timepicker">Arrival Time</label>
        <b-form-timepicker
          id="Arrival-Time"
          v-model="form.model.ArrivalTime"
          class="mb-2"
        ></b-form-timepicker>
      </div>
      <div class="editForm-left">
        <FormulateInput
          @validation="validationSNumber = $event"
          type="text"
          name="seatNumber"
          label="Seat Number"
          validation="bail|required:trim|max:500,length"
          v-model="form.model.SeatNumber"
          :validation-messages="{
            required: 'The seat number is required needs validation',
          }"
        />
      </div>
      <div class="editForm-left">
        <FormulateInput
          @validation="validationflightcost = $event"
          type="text"
          name="flightCost"
          label="Flight Cost"
          validation="bail|required:trim|max:500,length"
          v-model="form.model.FlightCost"
          :validation-messages="{
            required: 'The flight cost is required needs validation',
          }"
        />
      </div>
          <b-form-group label="Is It Approved" v-slot="{ ariaDescribedby }">
          <b-form-radio
            v-model="form.model.ApprovalGranted"
            :aria-describedby="ariaDescribedby"
            name="specialApprovalGranted"
            :value="true"
            >Yes</b-form-radio
          >
          <b-form-radio
            v-model="form.model.ApprovalGranted"
            :aria-describedby="ariaDescribedby"
            name="specialApprovalGranted"
            :value="false"
            >No</b-form-radio
          >
        </b-form-group>
      <div class="editForm-left" v-if="!isApproved">
        <FormulateInput
          @validation="validationSName = $event"
          type="text"
          name="specialApprovalName"
          label="Approval Name"
          validation="bail|required:trim|max:100,length"
          v-model="form.model.ApprovalName"
        />
      </div>

      <div>
        <label for="example-datepicker">Approval Date</label>
        <b-form-datepicker
          id="Approval-Time"
          v-model="form.model.ApprovalDate"
          class="mb-2"
        ></b-form-datepicker>
      </div>

      <div v-if="this.isAssigned" class="editForm-right">
        <label class="form-custom-label" for="form-Project_Status"
          >Contractor Assigned:</label
        >

        <b-card-body
          id="nav-scroller"
          ref="content"
          style="position: relative; height: 150px; overflow-y: scroll"
        >
          <b-list-group>
            <b-list-group-item
              v-model="currentContractor"
              v-for="item in AssignedContractor"
              :key="item.contractorID"
              >{{ item.Contractor.firstName + ' ' + item.Contractor.lastName }}

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

      <div v-else>
        <b-button
          v-if="!isNewFlight"
          v-b-toggle="'collapse-2'"
          class="m-1"
          variant="primary"
          >Add Contractor</b-button
        >

        <!-- Element to collapse -->
        <b-collapse id="collapse-2">
          <b-card>
            <form class="swal2-form mainForm">
              <div class="editForm-right">
                <label class="form-custom-label" for="form-Contractor">
                  Contractor</label
                >
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
                <!-- {{ this.currentModule }} -->
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
      </div>
    </form>
    <!-- {{ this.form.model }} -->
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
import '../../../../assets/css/styles.css'

export default {
  props: ['flightID'],
  data() {
    return {
      isApproved: false,
      isAssigned: false,
      isSignOff: false,
      isNewFlight: true,
      validationFDate: {},
      validationDTime: {},
      validationDLocation: {},
      validationALocation: {},
      // validationATime: {},
      validationSNumber: {},
      // validationflightcost: {},
      validationSID: {},
      validationSName: {},
      // validationSDate: {},
      AssignedContractor: {},
      Contractors: [],
      currentContractor: {},

      DB_DATA: [],
      //   Hospital_DATA: [],
      //   Project_Status_DATA: [],
      //   Contractors: [],
      //   AllContractors: [],
      //   currentContractor: {},
      //   Modules: [],
      //   currentModule: {},
      form: {
        model: {
          FlightID: '',
          FlightName: '',
          FlightDate: '',
          DepartTime: '',
          DepartLocation: '',
          ArrivalLocation: '',
          ArrivalTime: '',
          SeatNumber: '',
          ApprovalGranted: '',
          ApprovalName: '',
          ApprovalDate: '',
          FlightCost: '',
        },
      },
    }
  },
  components: {
    ModelSelect,
    ModelListSelect,
  },
  //   watch: {
  //     currentContractor() {
  //       if (this.currentContractor) {
  //         console.log('running')
  //         axios
  //           .get(
  //             `${config.api}/api/Preferred_Module/find/${this.currentContractor.contractorID}`,
  //           )
  //           .then((response) => {
  //             this.Modules = response.data
  //           })
  //       }
  //     },
  //   }
  //   ,
  computed: {
    // validationHospital: function () {
    //   if (this.form.model.HospitalID === '') {
    //     return true
    //   } else {
    //     return false
    //   }
    // },
    // validationProjectStatus: function () {
    //   if (this.form.model.ProjectStatusID === '') {
    //     return true
    //   } else {
    //     return false
    //   }
    // }
    // ,
    validationFormCheck: function () {
      if (
        this.isApproved == true &&
        //flight date

        //depart location
        this.validationDLocation.hasErrors === false &&
        //arival location
        this.validationALocation.hasErrors === false &&
        //seat number
        this.validationSNumber.hasErrors === false
        //approval name
        // this.validationSName.hasErrors === false
      ) {
        return true
      } else if (
        // this.validationFDate.hasErrors === false &&
        // this.validationDTime.hasErrors === false &&
        this.validationDLocation.hasErrors === false &&
        this.validationALocation.hasErrors === false &&
        // this.validationATime.hasErrors === false &&
        this.validationSNumber.hasErrors === false 
        // &&
        // // this.validationflightcost.hasErrors === false &&
        // this.validationSID.hasErrors === false 
         &&
        this.validationSName.hasErrors === false
        // this.validationSDate.hasErrors === false
        //  && this.validationHospital === false &&
        // this.validationProjectStatus === false
        // this.isApproved == true
      ) {
        this.isSignOff = 1
        return true
      } else return false
    },
  },
  methods: {
    goBack() {
      this.$router.push('/flight')
    },
    addFlight() {
      //hmmm debating on removing these

      if (!this.form.model.FlightDate) {
        Swal.fire('Error', 'Must add Flight Date', 'error')
      } else if (!this.form.model.DepartTime >= new Date().toLocaleString()) {
        Swal.fire('Error', 'Must add Depart Time', 'error')
      } else if (!this.form.model.FlightName) {
        Swal.fire('Error', 'Must add Flight Name', 'error')
      } else if (!this.form.model.ArrivalTime) {
        Swal.fire('Error', 'Must add Arrival Time', 'error')
        //not sure if below is needed.
      } else if (this.form.model.ArrivalTime < this.form.model.DepartTime) {
        Swal.fire('Error', 'Arrival Time Cant Be Before Depart Time', 'error')
      } else if (!this.form.model.ApprovalDate) {
        Swal.fire('Error', 'Must add Approval Date', 'error')
      } else {
        axios
          .post(`${config.api}/api/Flight/create`, this.form.model)
          .then((response) => {
            Swal.fire('Done!', 'The record has been created.', 'success')
            this.goBack()
          })
          .catch(() => {
            Swal.fire(
              'Error',
              'Something went wrong (creating Flight)',
              'error',
            )
          })
      }
    },
    updateFlight() {
      const FlightID = this.flightID
      if (!this.form.model.DepartTime) {
        Swal.fire('Error', 'Must add Depart Time', 'error')
      } else if (!this.form.model.ArrivalTime) {
        Swal.fire('Error', 'Must add Arrival Time', 'error')
      } else if (this.form.model.ArrivalTime < this.form.model.DepartTime) {
        Swal.fire('Error', 'Arrival Time Cant Be Before Depart Time', 'error')
      } else
        axios
          .put(`${config.api}/api/Flight/update/` + FlightID, this.form.model)
          .then((response) => {
            this.loadData()
            Swal.fire('Done!', 'The Flight has been updated.', 'success')
            this.goBack()
          })
          .catch(() => {
            Swal.fire(
              'Error',
              'Something went wrong (updating Flight)',
              'error',
            )
          })
    },
    deleteFlight() {
      const FlightID = this.flightID
      axios
        .delete(`${config.api}/api/Flight/delete/` + FlightID)
        .then((response) => {
          Swal.fire('Done!', 'The Flight has been deleted.', 'success')
          this.goBack()
        })
        .catch(() => {
          Swal.fire('Error', 'Something went wrong (deleting Flight)', 'error')
        })
    },

    checkIfAssigned() {
      if (this.AssignedContractor[0]) {
        this.isAssigned = true
      } else {
        axios.get(`${config.api}/api/Contractor/find`).then((response) => {
          for (let i = 0; i < response.data.length; i++) {
            this.Contractors.push({
              contractorID: response.data[i].contractorID,
              fullName:
                response.data[i].firstName + ' ' + response.data[i].lastName,
              firstName: response.data[i].firstName,
              lastName: response.data[i].lastName,
            })
          }
        })
      }
    },
    checkFlightPrice(price) {},
    addContractor() {
      event.preventDefault()
      const addContractorPayload = {
        contractorID: this.currentContractor.contractorID,
        flightID: this.flightID,
      }

      console.log(addContractorPayload)

      axios
        .post(
          `${config.api}/api/Contractor_Flight/create`,
          addContractorPayload,
        )
        .then((response) => {
          this.AssignedContractor.push({
            contractorID: this.currentContractor.contractorID,
            Contractor: {
              firstName: this.currentContractor.firstName,
              lastName: this.currentContractor.lastName,
            },
          })
        })
        .then((this.isAssigned = true))
    },
    removeContractorFromList(contractorID) {
      for (let i = 0; i < this.AssignedContractor.length; i++) {
        if (this.AssignedContractor[i].contractorID === contractorID) {
          this.AssignedContractor.splice(i, 1)
        }
      }

      console.log('im running')
    },
    removeContractor(event, contractorID) {
      event.preventDefault()
      axios
        .delete(
          `${config.api}/api/Contractor_Flight/delete/${this.flightID}/${contractorID}`,
        )
        .then(this.removeContractorFromList(contractorID))
        .then((this.isAssigned = false))
    },

    loadData() {
      axios
        .get(`${config.api}/api/Flight/find/` + this.flightID)
        .then((response) => {
          this.DB_DATA = response.data
          // this.form.model.FlightDate = response.data.flightDate
          if (response.data.flightDate) {
            this.form.model.FlightDate = response.data.flightDate.split('T')[0]
          }
          // if(response.data.projectEndDate){this.form.model.ProjectEndDate = response.data.projectEndDate.split('.')[0]}
          this.form.model.FlightName = response.data.flightName
          if (response.data.departTime) {
            this.form.model.DepartTime = response.data.departTime.split('T')[1]
          }
          console.log(response.data.departTime)
          // this.form.model.DepartTime = response.data.departTime.split('T')[1]
          this.form.model.DepartLocation = response.data.departLocation
          this.form.model.ArrivalLocation = response.data.arrivalLocation
          this.form.model.ArrivalTime = response.data.arrivalTime
          this.form.model.SeatNumber = response.data.seatNumber
          this.form.model.FlightCost = response.data.flightCost
          this.form.model.ApprovalGranted = response.data.specialApprovalGranted
          this.form.model.ApprovalName = response.data.specialApprovalName
          //   this.form.model.ApprovalDate = response.data.specialApprovalDate
          if (response.data.specialApprovalDate) {
            this.form.model.ApprovalDate =
              response.data.specialApprovalDate.split('T')[0]
          }
        })
        .catch(() => {
          Swal.fire('Error', 'Something went wrong (finding Flight)', 'error')
        })

      axios
        .get(`${config.api}/api/Contractor_Flight/find/${this.flightID}`)
        .then((response) => {
          this.AssignedContractor = response.data
          this.checkIfAssigned()
        })
    },
  },
  watch: {
    isAssigned() {
      axios.get(`${config.api}/api/Contractor/find`).then((response) => {
        for (let i = 0; i < response.data.length; i++) {
          this.Contractors.push({
            contractorID: response.data[i].contractorID,
            fullName:
              response.data[i].firstName + ' ' + response.data[i].lastName,
            firstName: response.data[i].firstName,
            lastName: response.data[i].lastName,
          })
        }
      })
    },
    'form.model.FlightCost'() {
      if (this.form.model.FlightCost < 500) {
        this.isApproved = true
      } else {
        this.isApproved = false
      }
    },
    isSignOff() {
      this.form.model.ApprovalGranted = this.isSignOff ? true : false
    },
  },
  beforeMount() {
    // this.loadFields()
    if (this.flightID !== undefined) {
      this.isNewFlight = false
      this.loadData()
    }
  },
}
</script>

<style scoped></style>
