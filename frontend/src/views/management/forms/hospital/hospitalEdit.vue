<template>
  <div>
    <div class="jumbotron dashboard">
      <div v-if="!isNewHospital" class="dashlabel">
        Hospital Number: {{ this.hospitalID }}
      </div>
      <div v-else class="dashlabel">
        Adding New Hospital
      </div>
    </div>

    <div class="editForm">
      <div class="editFormFooter-left">
        <button class="swal2-editform swal2-styled goBackButton" v-on:click="goBack">Go Back</button>
      </div>
      <div class="editFormFooter-right">
        <button v-if="!isNewHospital" class="swal2-editform swal2-styled updateButton" :disabled="validationFormCheck === false" v-on:click="updateHospital">Update Hospital</button>
        <button v-if="!isNewHospital" class="swal2-editform swal2-styled deleteButton" v-on:click="deleteHospital">Delete Hospital</button>
        <button v-if="isNewHospital" class="swal2-editform swal2-styled addNewButton" :disabled="validationFormCheck === false" v-on:click="addHospital">Submit New Hospital</button>
      </div>
    </div>

    <br />

    <form class="swal2-form mainForm">
        <div class="editForm-left">
            <FormulateInput
                @validation="validationName = $event"
                type="text"
                name="hospitalName"
                label="Hospital Name"
                validation="required"
                v-model="form.model.HospitalName"
                :validation-messages="{required: 'The Hospital Name is required'}"
            />
        </div>
        <div class="editForm-left">
            <FormulateInput
                @validation="validationStreet = $event"
                type="text"
                name="hospitalAddressLineOne"
                label="Street"
                validation="required"
                v-model="form.model.HospitalAddressLineOne"
                :validation-messages="{required: 'The Street is required'}"
            />
        </div>
        <div class="editForm-left">
            <FormulateInput
                type="text"
                name="hospitalAddressLineTwo"
                label="Street 2"
                v-model="form.model.HospitalAddressLineTwo"
            />
        </div>
        <div class="editForm-left">
            <FormulateInput
                @validation="validationCity = $event"
                type="text"
                name="hospitalCity"
                label="city"
                validation="required"
                v-model="form.model.HospitalCity"
                :validation-messages="{required: 'The city is required'}"
            />
        </div>
        <div class="editForm-left">
            <FormulateInput
                @validation="validationState = $event"
                type="text"
                name="hospitalState"
                label="state"
                validation="required"
                v-model="form.model.HospitalState"
                :validation-messages="{required: 'The state is required'}"
            />
        </div>
        <div class="editForm-left">
            <FormulateInput
                @validation="validationZip = $event"
                type="text"
                name="hospitalZipCode"
                label="zip"
                validation="required|min:5,length"
                v-model="form.model.HospitalZipCode"
                :validation-messages="{required: 'The zip is required'}"
            />
        </div>
        <div class="editForm-left">
            <FormulateInput
                @validation="validationHName = $event"
                type="text"
                name="hospitalContactName"
                label="contact name"
                validation="required"
                v-model="form.model.HospitalContactName"
                :validation-messages="{required: 'The contact name is required'}"
            />
        </div>
        <div class="editForm-left">
            <FormulateInput
                @validation="validationPhone = $event"
                type="text"
                name="hospitalContactPhone"
                label="phone number"
                validation="required|number|min:10,length"
                v-model="form.model.HospitalContactPhone"
                :validation-messages="{required: 'The phone number is required'}"
            />
        </div>
        <div class="editForm-left">
            <FormulateInput
                @validation="validationEmail = $event"
                type="text"
                name="hospitalContactEmail"
                label="email"
                validation="email"
                v-model="form.model.HospitalContactEmail"
                :validation-messages="{required: 'The email is required'}"
            />
        </div>
    </form>
  </div>
</template>

<script>
//https://grokonez.com/frontend/vue-js/vue-js-nodejs-express-restapis-sequelize-orm-mysql-crud-example
import axios from '../../../../utilities/axios'
import config from '../../../../config'
import Swal from 'sweetalert2';
import {mapActions} from "vuex";
import { ModelListSelect } from 'vue-search-select';
import { ModelSelect } from 'vue-search-select'

export default {
  props: ["hospitalID"],
  data() {
    return {
      isNewHospital: true,
      validationName: {},
      validationStreet: {},
      validationCity: {},
      validationState: {},
      validationZip: {},
      validationHName: {},
      validationPhone: {},
      validationEmail: {},
      DB_DATA: [],
      form: {
        model: {
          HospitalID: '',
          HospitalName: '',
          HospitalAddressLineOne: '',
          HospitalAddressLineTwo: '',
          HospitalCity: 'Houston',
          HospitalState: 'Texas',
          HospitalZipCode: '',
          HospitalContactName: '',
          HospitalContactPhone: '',
          HospitalContactEmail: ''
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
        this.validationStreet.hasErrors === false &&
        // this.validationCity.hasErrors === false &&
        // this.validationState.hasErrors === false &&
        this.form.model.HospitalCity !== '' &&
        this.form.model.HospitalState !== '' &&
        this.validationZip.hasErrors === false &&
        this.validationHName.hasErrors === false &&
        this.validationPhone.hasErrors === false &&
        this.validationEmail.hasErrors === false){
        return true
      } else {
        return false
      }
    }
  },
  methods: {
    goBack(){
      this.$router.push('/hospital')
    },
    addHospital(){
      axios.post(`${config.api}/api/Hospital/create`, this.form.model)
        .then((response) => {
          Swal.fire(
            'Done!',
            'The record has been created.',
            'success'
          )
          this.goBack()
        })
        .catch(() => {
          Swal.fire('Error', 'Something went wrong (creating Hospital)', 'error')
        })
    },
    updateHospital(){
      const HospitalID = this.hospitalID
        axios.put(`${config.api}/api/Hospital/update/` + HospitalID, this.form.model)
          .then((response) => {
            this.loadData()
            Swal.fire(
              'Done!',
              'The Hospital has been updated.',
              'success'
            )
            this.goBack()
          })
          .catch(() => {
            Swal.fire('Error', 'Something went wrong (updating Hospital)', 'error')
          })
    },
    deleteHospital(){
      const HospitalID = this.hospitalID
        axios.delete(`${config.api}/api/Hospital/delete/` + HospitalID)
          .then((response) => {
            Swal.fire(
              'Done!',
              'The Hospital has been deleted.',
              'success'
            )
            this.goBack()
          })
          .catch(() => {
            Swal.fire('Error', 'Something went wrong (deleting Hospital)', 'error')
          })
    },
    loadData(){
      axios.get(`${config.api}/api/Hospital/find/` + this.hospitalID)
        .then((response) => {
          this.DB_DATA = response.data;
          this.form.model.HospitalName = response.data.hospitalName,
          this.form.model.HospitalAddressLineOne = response.data.hospitalAddressLineOne,
          this.form.model.HospitalAddressLineTwo = response.data.hospitalAddressLineTwo,
          this.form.model.HospitalCity = response.data.hospitalCity,
          this.form.model.HospitalState = response.data.hospitalState,
          this.form.model.HospitalZipCode = response.data.hospitalZipCode,
          this.form.model.HospitalContactName = response.data.hospitalContactName,
          this.form.model.HospitalContactPhone = response.data.hospitalContactPhone,
          this.form.model.HospitalContactEmail = response.data.hospitalContactEmail
        })
        .catch(() => {
          Swal.fire('Error', 'Something went wrong (finding Hospital)', 'error')
        })
    }
  },
  beforeMount() {
    if (this.hospitalID !== undefined){
      this.isNewHospital = false
      this.loadData()
    }
  }
};
</script>

<style scoped>
</style>
