<template>
  <div>
    <div class="jumbotron dashboard">
      <div v-if="!isNewRentalCarCompany" class="dashlabel">
        Location Number: {{ this.location_id }}
      </div>
      <div v-else class="dashlabel">
        Adding New Location
      </div>
    </div>

    <div class="editForm">
      <div class="editFormFooter-left">
        <button class="swal2-editform swal2-styled goBackButton" v-on:click="goBack">Go Back</button>
      </div>
      <div class="editFormFooter-right">
        <button v-if="!isNewRentalCarCompany" class="swal2-editform swal2-styled updateButton" :disabled="validationFormCheck === false" v-on:click="updateRentalCarCompany">Update Rental Car Company</button>
        <button v-if="!isNewRentalCarCompany" class="swal2-editform swal2-styled deleteButton" v-on:click="deleteRentalCarCompany">Delete Rental Car Company</button>
        <button v-if="isNewRentalCarCompany" class="swal2-editform swal2-styled addNewButton" :disabled="validationFormCheck === false" v-on:click="addRentalCarCompany">Submit New Rental Car Company</button>
      </div>
    </div>

    <br />

    <form class="swal2-form mainForm">
      <div class="editForm-left">
        <FormulateInput
          @validation="validationName = $event"
          type="text"
          name="RentalCarCompanyName"
          label="Rental Car Company Name"
          validation="required"
          v-model="form.model.RentalCarCompanyName"
          :validation-messages="{required: 'The Rental Car Company Name is required'}"
        />
        <label class="form-custom-label" for="form-locationType">Location Type</label>
        <model-list-select :list="TYPE_DATA"
                           v-model="form.model.locationTypeId"
                           id="form-locationType"
                           option-value="locationType_id"
                           option-text="locationType_description"
                           :isError='validationType === true'
                           placeholder="select one">
        </model-list-select>
      </div>
      <div class="editForm-right">
        <FormulateInput
          @validation="validationStreet = $event"
          type="text"
          name="RentalCarCompanyAddressOne"
          label="Street"
          validation="required"
          v-model="form.model.RentalCarCompanyAddressOne"
          :validation-messages="{required: 'The Street is required'}"
        />
        <FormulateInput
          type="text"
          name="RentalCarCompanyAddressTwo"
          label="Street 2"
          v-model="form.model.RentalCarCompanyAddressTwo"
        />
        <FormulateInput
          @validation="validationCity = $event"
          type="text"
          name="RentalCarCompanyCity"
          label="City"
          validation="required"
          v-model="form.model.RentalCarCompanyCity"
          :validation-messages="{required: 'The City is required'}"
        />
        <FormulateInput
          @validation="validationState = $event"
          type="text"
          name="RentalCarCompanyState"
          label="State"
          validation="required"
          v-model="form.model.RentalCarCompanyState"
          :validation-messages="{required: 'The State is required'}"
        />
        <FormulateInput
          @validation="validationZip = $event"
          type="text"
          name="RentalCarCompanyZip"
          label="ZIP"
          validation="required"
          v-model="form.model.RentalCarCompanyZip"
          :validation-messages="{required: 'The ZIP is required'}"
        />
      </div>
    </form>
  </div>
</template>

<script>
import axios from "../../utilities/axios";
import config from "../../config";
import Swal from "sweetalert2";
import { ModelListSelect } from 'vue-search-select';
import { ModelSelect } from 'vue-search-select';

export default {
  name: "locationEdit",
  props: ["location_id"],
  data() {
    return {
      validationName: {},
      validationStreet: {},
      validationCity: {},
      validationState: {},
      validationZip: {},
      isNewLocation: true,
      DB_DATA: [],
      form: {
        model: {
          RentalCarCompanyName: '',
          RentalCarCompanyNumber: '',
          RentalCarCompanyAddressOne: '',
          RentalCarCompanyAddressTwo: '',
          RentalCarCompanyCity: '',
          RentalCarCompanyState: '',
          RentalCarCompanyZip: ''
        },
      },
    };
  },
  components: {
    ModelSelect,
    ModelListSelect
  },
  computed:{
    validationType: function () {
      if (this.form.model.locationTypeId === ''){
        return true
      } else {
        return false
      }
    },
    validationFormCheck: function () {
      if (this.validationName.hasErrors === false &&
        this.validationStreet.hasErrors === false &&
        this.validationCity.hasErrors === false &&
        this.validationState.hasErrors === false &&
        this.validationZip.hasErrors === false &&
        this.validationType === false){
        return true
      } else {
        return false
      }
    }
  },
  methods: {
    goBack(){
      this.$router.push('/rentalcarcompany')
    },
    addRentalCarCompany(){
      if(this.form.model.rentalAddressLineTwo === ''){this.form.model.rentalAddressLineTwo = null}

      axios.post(`${config.api}/api/RentalCarCompany/create`, this.form.model)
        .then((response) => {
          Swal.fire(
            'Done!',
            'The record has been created.',
            'success'
          )
          this.goBack()
        })
        .catch(() => {
          Swal.fire('Error', 'Something went wrong (creating Rental Car Company)', 'error')
        })
    },
    updateRentalCarCompany(){
      const rentalcompanyid = this.rentalCompanyID
      axios.put(`${config.api}/api/RentalCarCompany/update/` + rentalcompanyid, this.form.model)
        .then((response) => {
          Swal.fire(
            'Done!',
            'The Rental Car Company has been updated.',
            'success'
          )
          this.goBack()
        })
        .catch(() => {
          Swal.fire('Error', 'Something went wrong (updating Rental Car Company)', 'error')
        })
    },
    deleteRentalCarCompany(){
      const rentalcompanyid = this.rentalCompanyID
      axios.delete(`${config.api}/api/RentalCarCompany/delete/` + rentalcompanyid)
        .then((response) => {
          Swal.fire(
            'Done!',
            'The record has been deleted.',
            'success'
          )
          this.goBack()
        })
        .catch(() => {
          Swal.fire('Error', 'Something went wrong', 'error')
        })
    },
    loadData(){
      axios.get(`${config.api}/api/RentalCarCompany/find/` + this.rentalCompanyID)
        .then((response) => {
          this.form.model.RentalCarCompanyName = response.data.rentalCompanyName
          this.form.model.RentalCarCompanyNumber = response.data.rentalPhoneNumber
          this.form.model.RentalCarCompanyAddressOne = response.data.rentalAddressLineOne
          this.form.model.RentalCarCompanyAddressTwo = response.data.rentalAddressLineTwo
          this.form.model.RentalCarCompanyCity = response.data.rentalCity
          this.form.model.RentalCarCompanyState = response.data.rentalState
          this.form.model.RentalCarCompanyZip = response.data.rentalZipCode

        })
        .catch(() => {
          Swal.fire('Error', 'Something went wrong (finding RentalCarCompany)', 'error')
        })
    },
    loadFields(){
      axios.get(`${config.api}/api/RentalCarCompany/find`)
        .then((response) => {
          this.TYPE_DATA = response.data;
        })
        .catch(() => {
          Swal.fire('Error', 'Something went wrong (loading RentalCarCompany)', 'error')
        })
    }
  },
  beforeMount() {
    this.loadFields()
    if (this.location_id !== undefined){
      this.isNewLocation = false
      this.loadData()
    }
  }
};
</script>

<style scoped>
</style>

