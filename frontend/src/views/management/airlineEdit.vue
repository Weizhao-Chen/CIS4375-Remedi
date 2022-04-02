<template>
  <div>
    <div class="jumbotron dashboard">
      <div v-if="!isNewAirline" class="dashlabel">
        Airline Number: {{ this.airlineID }}
      </div>
      <div v-else class="dashlabel">
        Adding New Airline
      </div>
    </div>

    <div class="editForm">
      <div class="editFormFooter-left">
        <button class="swal2-editform swal2-styled goBackButton" v-on:click="goBack">Go Back</button>
      </div>
      <div class="editFormFooter-right">
        <button v-if="!isNewAirline" class="swal2-editform swal2-styled updateButton" :disabled="validationFormCheck === false" v-on:click="updateAirline">Update Airline</button>
        <button v-if="!isNewAirline" class="swal2-editform swal2-styled deleteButton" v-on:click="deleteAirline">Delete Airline</button>
        <button v-if="isNewAirline" class="swal2-editform swal2-styled addNewButton" :disabled="validationFormCheck === false" v-on:click="addAirline">Submit New Airline</button>
      </div>
    </div>

    <br />

    <form class="swal2-form mainForm">
      <div class="editForm-left">
        <FormulateInput
          @validation="validationName = $event"
          type="text"
          name="AirlineName"
          label="Airline Name"
          validation="required"
          v-model="form.model.AirlineName"
          :validation-messages="{required: 'The Airline Name is required'}"
        />
      </div>
      <div class="editForm-right">
        <FormulateInput
        @validation="validationPhoneNumber = $event"
          type="text"
          name="AirlinePhoneNumber"
          label="Airline Phone Number"
          validation="required"
          v-model="form.model.AirlinePhoneNumber"
          :validation-messages="{required: 'The Phone Number is required'}"
        />
        <FormulateInput
          @validation="validationStreet = $event"
          type="text"
          name="AirlineAddressLineOne"
          label="Street"
          validation="required"
          v-model="form.model.AirlineAddressLineOne"
          :validation-messages="{required: 'The Street is required'}"
        />
        <FormulateInput
          type="text"
          name="AirlineAddressLineTwo"
          label="Street 2"
          v-model="form.model.AirlineAddressLineTwo"
        />
        <FormulateInput
          @validation="validationCity = $event"
          type="text"
          name="AirlineCity"
          label="City"
          validation="required"
          v-model="form.model.AirlineCity"
          :validation-messages="{required: 'The City is required'}"
        />
        <FormulateInput
          @validation="validationState = $event"
          type="text"
          name="AirlineState"
          label="State"
          validation="required"
          v-model="form.model.AirlineState"
          :validation-messages="{required: 'The State is required'}"
        />
        <FormulateInput
          @validation="validationZipCode = $event"
          type="text"
          name="AirlineZipCode"
          label="ZIP"
          validation="required"
          v-model="form.model.AirlineZipCode"
          :validation-messages="{required: 'The Zip Code is required'}"
        />
        <FormulateInput
          @validation="validationWebsite = $event"
          type="text"
          name="AirlineWebsite"
          label="Website"
          validation="required"
          v-model="form.model.AirlineWebsite"
          :validation-messages="{required: 'The Website is required'}"
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
  name: "airlineEdit",
  props: ["airlineID"],
  data() {
    return {
      validationName: {},
      validationPhoneNumber: {},
      validationStreet: {},
      validationCity: {},
      validationState: {},
      validationZipCode: {},
      validationWebsite: {},
      isNewAirline: true,
      DB_DATA: [],
      form: {
        model: {
          AirlineName: '',
          AirlinePhoneNumber: '',
          AirlineAddressLineOne: '',
          AirlineAddressLineTwo: '',
          AirlineCity: '',
          AirlineState: '',
          AirlineCountry: 'United States',
          AirlineZipCode: '',
          AirlineWebsite: '',
        },
      },
    };
  },
  components: {
    ModelSelect,
    ModelListSelect
  },
  computed:{
    validationFormCheck: function () {
      if (this.validationName.hasErrors === false &&
        this.validationPhoneNumber.hasErrors === false &&
        this.validationStreet.hasErrors === false &&
        this.validationCity.hasErrors === false &&
        this.validationState.hasErrors === false &&
        this.validationZipCode.hasErrors === false &&
        this.validationWebsite.hasErrors === false){
        return true
      } else {
        return false
      }
    }
  },
  methods: {
    goBack(){
      this.$router.push('/airline')
    },
    addAirline(){
      if(this.form.model.AirlineAddressLineTwo === ''){this.form.model.AirlineAddressLineTwo = null}

      axios.post(`${config.api}/api/Airline/create`, this.form.model)
        .then((response) => {
          Swal.fire(
            'Done!',
            'The record has been created.',
            'success'
          )
          this.goBack()
        })
        .catch(() => {
          Swal.fire('Error', 'Something went wrong (creating Airline)', 'error')
        })
    },
    updateAirline(){
      const airlineid = this.airlineID
      axios.put(`${config.api}/api/Airline/update/` + airlineid, this.form.model)
        .then((response) => {
          Swal.fire(
            'Done!',
            'The Airline has been updated.',
            'success'
          )
          this.goBack()
        })
        .catch(() => {
          Swal.fire('Error', 'Something went wrong (updating Airline)', 'error')
        })
    },
    deleteAirline(){
      const airlineid = this.airlineID
      axios.delete(`${config.api}/api/Airline/delete/` + airlineid)
        .then((response) => {
          Swal.fire(
            'Done!',
            'The record has been deleted.',
            'success'
          )
          this.goBack()
        })
        .catch(() => {
          Swal.fire('Error', 'Something went wrong (deleting Airline)', 'error')
        })
    },
    loadData(){
      axios.get(`${config.api}/api/Airline/find/` + this.airlineID)
        .then((response) => {
          this.DB_DATA = response.data;
          this.form.model.AirlineName = response.data.airlineName
          this.form.model.AirlinePhoneNumber = response.data.airlinePhoneNumber
          this.form.model.AirlineAddressLineOne = response.data.airlineAddressLineOne
          this.form.model.AirlineAddressLineTwo = response.data.airlineAddressLineTwo
          this.form.model.AirlineCity = response.data.airlineCity
          this.form.model.AirlineState = response.data.airlineState
          this.form.model.AirlineZipCode = response.data.airlineZipCode
          this.form.model.AirlineWebsite = response.data.airlineWebsite

        })
        .catch(() => {
          Swal.fire('Error', 'Something went wrong (finding Airline)', 'error')
        })
    },
  },
  beforeMount() {
    if (this.airlineID !== undefined){
      this.isNewAirline = false
      this.loadData()
    }
  }
};
</script>

<style scoped>
</style>

