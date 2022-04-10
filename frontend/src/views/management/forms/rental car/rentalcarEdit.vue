<template>
  <div>
    <div class="jumbotron dashboard">
      <div v-if="!isNewRentalCar" class="dashlabel">
        Rental Car Number: {{ this.rentalCarID }}
      </div>
      <div v-else class="dashlabel">Adding New Rental Car</div>
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
          v-if="!isNewRentalCar"
          class="swal2-editform swal2-styled updateButton"
          :disabled="validationFormCheck === false"
          v-on:click="updateRentalCar"
        >
          Update Rental Car
        </button>
        <button
          v-if="!isNewRentalCar"
          class="swal2-editform swal2-styled deleteButton"
          v-on:click="deleteRentalCar"
        >
          Delete Rental Car
        </button>
        <button
          v-if="isNewRentalCar"
          class="swal2-editform swal2-styled addNewButton"
          :disabled="validationFormCheck === false"
          v-on:click="addRentalCar"
        >
          Submit New Rental Car
        </button>
      </div>
    </div>

    <br />

    <form class="swal2-form mainForm">
      <div class="editForm-left">
        <FormulateInput
          @validation="validationModel = $event"
          type="text"
          name="rentalCarModel"
          label="Model"
          validation="required"
          v-model="form.model.RentalCarModel"
          :validation-messages="{
            required: 'The Rental Car Model is required',
          }"
        />
      </div>
      <div class="editForm-left">
        <FormulateInput
          @validation="validationMake = $event"
          type="text"
          name="rentalCarMake"
          label="Make"
          validation="required"
          v-model="form.model.RentalCarMake"
          :validation-messages="{ required: 'The Rental Car Make is required' }"
        />
      </div>
      <div class="editForm-left">
        <FormulateInput
          @validation="validationPlate = $event"
          type="text"
          name="rentalLicense"
          label="License Plate"
          validation="required"
          v-model="form.model.RentalLicense"
          :validation-messages="{ required: 'The Rental License is required' }"
        />
      </div>
      <!-- {{ this.AssignedContractors }} -->
      <div v-if="!isNewRentalCar" class="editForm-right">
        <label class="form-custom-label" for="form-Project_Status"
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
                item.Contractor.lastName +
                ' (' +
                item.driverPassenger +
                ')'
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
        v-if="!isNewRentalCar"
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

              <model-list-select
                v-model="currentMode"
                :list="DriverOrPassanger"
                option-value="mode"
                id="driverpassID"
                option-text="mode"
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
  props: ['rentalCarID'],
  data() {
    return {
      isNewRentalCar: true,
      validationModel: {},
      validationMake: {},
      validationPlate: {},
      DB_DATA: [],
      currentContractor: {},
      currentMode: {},
      Contractors: [],
      AssignedContractors: [],
      DriverOrPassanger: [{ mode: 'Driver' }, { mode: 'Passenger' }],
      //   Contractor_Status_DATA: [],
      //   ContractorProjects: [],
      //   AssignedModules: [],
      //   PreferredModules: [],
      //   AllModules: [],
      //   currentModule: {},
      form: {
        model: {
          RentalCarID: '',
          RentalCarModel: '',
          RentalCarMake: '',
          RentalLicense: '',
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
        this.validationModel.hasErrors === false &&
        this.validationMake.hasErrors === false &&
        this.validationPlate.hasErrors === false
      ) {
        return true
      } else {
        return false
      }
    },
  },
  methods: {
    goBack() {
      this.$router.push('/rentalcar')
    },
    addRentalCar() {
      axios
        .post(`${config.api}/api/Rental_Car/create`, this.form.model)
        .then((response) => {
          Swal.fire('Done!', 'The record has been created.', 'success')
          this.goBack()
        })
        .catch(() => {
          Swal.fire(
            'Error',
            'Something went wrong (creating Rental Car)',
            'error',
          )
        })

      // console.log(this.form.model)
    },
    updateRentalCar() {
      const RentalCarID = this.rentalCarID
      axios
        .put(
          `${config.api}/api/Rental_Car/update/` + RentalCarID,
          this.form.model,
        )
        .then((response) => {
          this.loadData()
          Swal.fire('Done!', 'The Rental Car has been updated.', 'success')
          this.goBack()
        })
        .catch(() => {
          Swal.fire(
            'Error',
            'Something went wrong (updating Rental Car)',
            'error',
          )
        })
    },
    deleteRentalCar() {
      const RentalCarID = this.rentalCarID
      axios
        .delete(`${config.api}/api/Rental_Car/delete/` + RentalCarID)
        .then((response) => {
          Swal.fire('Done!', 'The Rental Car has been deleted.', 'success')
          this.goBack()
        })
        .catch(() => {
          Swal.fire(
            'Error',
            'Something went wrong (deleting Rental Car)',
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
        .get(`${config.api}/api/Rental_Car/find/` + this.rentalCarID)
        .then((response) => {
          this.DB_DATA = response.data
          this.form.model.RentalCarModel = response.data.rentalCarModel
          this.form.model.RentalCarMake = response.data.rentalCarMake
          this.form.model.RentalLicense = response.data.rentalLicense
        })
        .catch(() => {
          Swal.fire(
            'Error',
            'Something went wrong (finding Rental Car)',
            'error',
          )
        })

      axios.get(`${config.api}/api/Contractor/find/`).then((response) => {
        this.formatContractorData(response.data)
      })

      axios
        .get(`${config.api}/api/Assigned_Rental_Car/find/${this.rentalCarID}`)
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
    addContractor(event) {
      event.preventDefault()
      const addContractorPayload = {
        rentalCarID: this.rentalCarID,
        contractorID: this.currentContractor.contractorID,
        driverPassenger: this.currentMode.mode,
      }

      axios
        .post(
          `${config.api}/api/Assigned_Rental_Car/create`,
          addContractorPayload,
        )
        .then((response) => console.log(response))

      this.AssignedContractors.push({
        driverPassenger: this.currentMode.mode,
        Contractor: {
          lastName: this.currentContractor.lastName,
          firstName: this.currentContractor.firstName,
        },
      })
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
        'rentalID:' + this.rentalCarID + 'contractorID:' + contractorID,
      )
      axios
        .delete(
          `${config.api}/api/Assigned_Rental_Car/delete/${this.rentalCarID}/${contractorID}`,
        )
        .then(this.removeContractorFromList(contractorID))
        .then((response) => console.log(response))
    },
  },
  beforeMount() {
    if (this.rentalCarID !== undefined) {
      this.isNewRentalCar = false
      this.loadData()
    }
  },
}
</script>

<style scoped></style>
