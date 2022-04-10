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
          @validation="validationFDate = $event"
          type="text"
          name="flightDate"
          label="flight date"
          validation="bail|required|date:YYYY-MM-DD"
          v-model="form.model.FlightDate"
          :validation-messages="{ required: 'The Flight Date is required' }"
        />
      </div>
      <div class="editForm-left">
        <FormulateInput
          @validation="validationDTime = $event"
          type="text"
          name="departTime"
          label="depart time"
          validation="required"
          v-model="form.model.DepartTime"
          :validation-messages="{ required: 'The depart time is required needs validation' }"
        />
      </div>
      <div class="editForm-left">
        <FormulateInput
          @validation="validationDLocation = $event"
          type="text"
          name="departLocation"
          label="depart location"
          validation="required"
          v-model="form.model.DepartLocation"
          :validation-messages="{ required: 'The depart location is required needs validation' }"
        />
      </div>
      <div class="editForm-left">
        <FormulateInput
          @validation="validationALocation = $event"
          type="text"
          name="arrivalLocation"
          label="arrival location"
          validation="bail|required:trim|max:500,length"
          error-behavior="live"
          v-model="form.model.ArrivalLocation"
          :validation-messages="{ required: 'The arrival location is required needs validation' }"
        />
      </div>
      <div class="editForm-left">
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
      </div>
      <div class="editForm-left">
        <FormulateInput
          @validation="validationSNumber = $event"
          type="text"
          name="seatNumber"
          label="seat number"
          validation="bail|required:trim|max:500,length"
          error-behavior="live"
          v-model="form.model.SeatNumber"
          :validation-messages="{ required: 'The seat number is required needs validation' }"
        />
      </div>
      <div class="editForm-left">
        <FormulateInput
          @validation="validationflightcost = $event"
          type="text"
          name="flightCost"
          label="flight cost"
          validation="bail|required:trim|max:500,length"
          error-behavior="live"
          v-model="form.model.FlightCost"
          :validation-messages="{ required: 'The flight cost is required needs validation' }"
        />
      </div>
      <div class="editForm-left">
        <FormulateInput
          @validation="validationSID = $event"
          type="text"
          name="specialApprovalGranted"
          label="approval granted"
          validation="bail|required:trim|max:500,length"
          error-behavior="live"
          v-model="form.model.ApprovalGranted"
          :validation-messages="{ required: 'The approval id is required needs validation' }"
        />
      </div>
      <div class="editForm-left">
        <FormulateInput
          @validation="validationSName = $event"
          type="text"
          name="specialApprovalName"
          label="approval Name"
          validation="bail|required:trim|max:100,length"
          error-behavior="live"
          v-model="form.model.ApprovalName"
          :validation-messages="{ required: 'The approval name is required' }"
        />
      </div>
      <div class="editForm-left">
        <FormulateInput
          @validation="validationSDate = $event"
          type="text"
          name="specialApprovalDate"
          label="Approval Date"
          validation="bail|required|date:YYYY-MM-DD"
          error-behavior="live"
          v-model="form.model.ApprovalDate"
          :validation-messages="{ required: 'The approval date is required' }"
        />
      </div>
      
      <!-- need edits starting here -->
      <!-- <div class="editForm-right">
        <label class="form-custom-label" for="form-Hospital"
          >Hospital Status</label
        >
        <model-list-select
          :list="Hospital_DATA"
          v-model="form.model.HospitalID"
          option-value="hospitalID"
          id="form-Hospital"
          option-text="hospitalName"
          :isError="validationHospital === true"
          placeholder="select one"
        >
        </model-list-select>
      </div>
      <div class="editForm-right">
        <label class="form-custom-label" for="form-Project_Status"
          >Project Status Status</label
        >
        <model-list-select
          :list="Project_Status_DATA"
          v-model="form.model.ProjectStatusID"
          option-value="projectStatusID"
          id="form-Project_Status"
          option-text="projectStatusType"
          :isError="validationProjectStatus === true"
          placeholder="select one"
        >
        </model-list-select>
      </div> -->

      <!-- <div v-if="!isNewFlight" class="editForm-right">
        <label class="form-custom-label" for="form-Project_Status"
          >Contractors on Flight:</label
        >

        <b-card-body
          id="nav-scroller"
          ref="content"
          style="position: relative; height: 150px; overflow-y: scroll"
        >
          <b-list-group>
            <b-list-group-item
              v-for="item in Contractors"
              :key="item.contractorID"
              >{{ item.Contractor.firstName + ' ' + item.Contractor.lastName }}

              <b-button
                class="button-style"
                v-on:click="removeContractor($event, item.contractorID)"
                variant="primary"
                >Remove</b-button
              >
              <b-button
                class="button-style"
                :href="'/contractor/edit/' + item.contractorID"
                variant="primary"
                >View</b-button
              >
            </b-list-group-item>
          </b-list-group>
        </b-card-body>
      </div> -->
      <br />
      <!-- <b-button
        v-if="!isNewFlight"
        v-b-toggle="'collapse-2'"
        class="m-1"
        variant="primary"
        >Add Contractor</b-button
      > -->

      <!-- Element to collapse -->
      <!-- <b-collapse id="collapse-2">
        <b-card>
          <form class="swal2-form mainForm">
            <div class="editForm-right">
              <label class="form-custom-label" for="form-Contractor">
                Contractor</label
              >
              <model-list-select
                v-model="currentContractor"
                :list="AllContractors"
                option-value="contractorID"
                id="contractorID"
                option-text="firstName"
                :isError="validationContractor === true"
                placeholder="select one"
              >
              </model-list-select>

              <! {{ this.Modules }} -->
              <!-- <label class="form-custom-label" for="form-Contractor"
                >Assign Module:</label
              >
              <model-list-select
                v-model="currentModule"
                :list="Modules"
                option-value="Module"
                id="moduleID"
                option-text="Module"
                :isError="validationContractor === true"
                placeholder="select one"
              >
              </model-list-select>
            </div>
            <button
              class="swal2-editform swal2-styled"
              v-on:click="addContractor($event)"
            >
              Add
            </button>
          </form>
        </b-card>
      </b-collapse> --> -->
      <!-- {{ this.currentModule }} -->
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
import '../../../../assets/css/styles.css'

export default {
  props: ['flightID'],
  data() {
    return {
      isNewFlight: true,
      validationFDate: {},
      validationDTime: {},
      validationDLocation: {},
      validationALocation: {},
      validationATime: {},
      validationSNumber: {},
      validationSID: {},
      validationSName: {},
      validationSDate: {},
      validationflightcost: {},
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
        //FlightID maybe?
          FlightID: '',
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
        this.validationFDate.hasErrors === false &&
        this.validationDTime.hasErrors === false &&
        this.validationDLocation.hasErrors === false &&
        this.validationALocation.hasErrors === false &&
        this.validationATime.hasErrors === false &&
        this.validationSNumber.hasErrors === false &&
        this.validationflightcost.hasErrors === false &&
        this.validationSID.hasErrors === false &&
        this.validationSName.hasErrors === false &&
        this.validationSDate.hasErrors === false
        //  && this.validationHospital === false &&
        // this.validationProjectStatus === false
      ) {
        return true
      } else {
        return false
      }
    },
  },
  methods: {
    goBack() {
      this.$router.push('/flight')
    },
    addFlight() {
      axios
        .post(`${config.api}/api/Flight/create`, this.form.model)
        .then((response) => {
          Swal.fire('Done!', 'The record has been created.', 'success')
          this.goBack()
        })
        .catch(() => {
          Swal.fire('Error', 'Something went wrong (creating Flight)', 'error')
        })
    },
    updateFlight() {
      const FlightID = this.flightID
      axios
        .put(`${config.api}/api/Flight/update/` + FlightID, this.form.model)
        .then((response) => {
          this.loadData()
          Swal.fire('Done!', 'The Flight has been updated.', 'success')
          this.goBack()
        })
        .catch(() => {
          Swal.fire('Error', 'Something went wrong (updating Flight)', 'error')
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
    // addContractor(event) {
    //   event.preventDefault()
    //   const ProjectID = this.projectID
    //   const payLoad = {
    //     ContractorID: this.currentContractor.contractorID,
    //     ProjectID: this.projectID,
    //   }
    //   const assignedModulePayLoad = {
    //     projectID: this.projectID,
    //     moduleID: this.currentModule.moduleID,
    //     contractorID: this.currentModule.contractorID,
    //   }

    //   if (!this.currentContractor.contractorID) {
    //     Swal.fire('Error', 'Must add Contractor', 'error')
    //   } else if (!this.currentModule.contractorID) {
    //     Swal.fire('Error', 'Must add Module', 'error')
    //   } else
    //     axios
    //       .post(`${config.api}/api/Contractor_Project/create`, payLoad)
    //       .then((response) => {
    //         this.Contractors.push({
    //           contractorID: this.currentContractor.contractorID,
    //           projectID: this.projectID,
    //           Contractor: {
    //             firstName: this.currentContractor.firstName,
    //             lastName: this.currentContractor.lastName,
    //           },
    //         })
    //       })
    //       .catch(() => {
    //         Swal.fire('Error', 'Something went wrong updating Project', 'error')
    //       })

    //   axios.post(
    //     `${config.api}/api/Assigned_Module/create`,
    //     assignedModulePayLoad,
    //   )

    //   // console.log(assignedModulePayLoad)
    // },
    // removeContractorFromList(contractorID) {
    //   for (let i = 0; i < this.Contractors.length; i++) {
    //     if (this.Contractors[i].contractorID === contractorID) {
    //       this.Contractors.splice(i, 1)
    //     }
    //   }

    //   console.log('im running')
    // },
    // removeContractor(event, contractorID) {
    //   event.preventDefault()

    //   axios
    //     .delete(
    //       `${config.api}/api/Contractor_Project/delete/${contractorID}/${this.projectID}`,
    //     )
    //     .then(this.removeContractorFromList(contractorID))

    //   axios.delete(
    //     `${config.api}/api/Assigned_Module/delete/${contractorID}/${this.projectID}`,
    //   )
    // },
    loadData() {
      axios
        .get(`${config.api}/api/Flight/find/` + this.flightID)
        .then((response) => {
            this.DB_DATA = response.data;
            // this.form.model.FlightDate = response.data.flightDate
            if(response.data.flightDate){this.form.model.FlightDate = response.data.flightDate.split('T')[0]}
         // if(response.data.projectEndDate){this.form.model.ProjectEndDate = response.data.projectEndDate.split('.')[0]}
            this.form.model.DepartTime = response.data.departTime
            this.form.model.DepartLocation = response.data.departLocation
            this.form.model.ArrivalLocation = response.data.arrivalLocation
            this.form.model.ArrivalTime = response.data.arrivalTime
            this.form.model.SeatNumber = response.data.seatNumber
            this.form.model.FlightCost = response.data.flightCost
            this.form.model.ApprovalGranted = response.data.specialApprovalGranted
            this.form.model.ApprovalName = response.data.specialApprovalName
            //   this.form.model.ApprovalDate = response.data.specialApprovalDate
            if(response.data.specialApprovalDate){this.form.model.ApprovalDate = response.data.specialApprovalDate.split('T')[0]}
            
        })
        .catch(() => {
          Swal.fire('Error', 'Something went wrong (finding Flight)', 'error')
        })

    //   axios
    //     .get(
    //       `${config.api}/api/Contractor_Project/find_project/` + this.projectID,
    //     )
    //     .then((response) => (this.Contractors = response.data))

    //   axios.get(`${config.api}/api/Contractor/find`).then((response) => {
    //     this.AllContractors = response.data
    //   })
    },
    // loadFields() {
    //   axios
    //     .get(`${config.api}/api/Hospital/find`)
    //     .then((response) => {
    //       this.Hospital_DATA = response.data
    //     })
    //     .catch(() => {
    //       Swal.fire('Error', 'Something went wrong (loading Hospital)', 'error')
    //     })
    //   axios
    //     .get(`${config.api}/api/Project_Status/find`)
    //     .then((response) => {
    //       this.Project_Status_DATA = response.data
    //     })
    //     .catch(() => {
    //       Swal.fire(
    //         'Error',
    //         'Something went wrong (loading Project Status)',
    //         'error',
    //       )
    //     })
    // },
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
