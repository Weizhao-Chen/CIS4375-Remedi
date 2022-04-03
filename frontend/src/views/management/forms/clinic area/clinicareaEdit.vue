<template>
  <div>
    <div class="jumbotron dashboard">
      <div v-if="!isNewClinicArea" class="dashlabel">
        Clinic Area Number: {{ this.clinicID }}
      </div>
      <div v-else class="dashlabel">
        Adding New Clinic Area
      </div>
    </div>

    <div class="editForm">
      <div class="editFormFooter-left">
        <button class="swal2-editform swal2-styled goBackButton" v-on:click="goBack">Go Back</button>
      </div>
      <div class="editFormFooter-right">
        <button v-if="!isNewClinicArea" class="swal2-editform swal2-styled updateButton" :disabled="validationFormCheck === false" v-on:click="updateClinicArea">Update Clinic Area</button>
        <button v-if="!isNewClinicArea" class="swal2-editform swal2-styled deleteButton" v-on:click="deleteClinicArea">Delete Clinic Area</button>
        <button v-if="isNewClinicArea" class="swal2-editform swal2-styled addNewButton" :disabled="validationFormCheck === false" v-on:click="addClinicArea">Submit New Clinic Area</button>
      </div>
    </div>

    <br />

    <form class="swal2-form mainForm">
        <div class="editForm-left">
            <FormulateInput
                @validation="validationName = $event"
                type="text"
                name="clinicAreaName"
                label="name"
                validation="required"
                v-model="form.model.ClinicAreaName"
                :validation-messages="{required: 'The Clinic Area Name is required'}"
            />
        </div>
        <div class="editForm-left">
            <FormulateInput
                @validation="validationLName = $event"
                type="text"
                name="clinicAreaLead"
                label="Name"
                validation="required"
                v-model="form.model.ClinicAreaLead"
                :validation-messages="{required: 'The Name is required'}"
            />
        </div>
        <div class="editForm-left">
            <FormulateInput
                @validation="validationPhone = $event"
                type="text"
                name="clinicAreaLeadPhone"
                label="phone number"
                validation="required"
                v-model="form.model.ClinicAreaLeadPhone"
                :validation-messages="{required: 'The Phone Number is required'}"
            />
        </div>
        <div class="editForm-left">
            <FormulateInput
                @validation="validationEmail = $event"
                type="text"
                name="clinicAreaLeadEmail"
                label="email"
                validation="required"
                v-model="form.model.ClinicAreaLeadEmail"
                :validation-messages="{required: 'The Email is required'}"
            />
        </div>
        <div class="editForm-right">
            <label class="form-custom-label" for="form-Hospital">Hospital</label>
            <model-list-select :list="Hospital_DATA"
                           v-model="form.model.HospitalID" 
                           option-value="hospitalID"
                           id="form-Hospital"
                           option-text="hospitalName"
                           :isError='validationHospital === true'
                           placeholder="select one">
            </model-list-select>
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
  props: ["clinicID"],
  data() {
    return {
      isNewClinicArea: true,
      validationName: {},
      validationLName: {},
      validationPhone: {},
      validationEmail: {},
      DB_DATA: [],
      Hospital_DATA: [],
      form: {
        model: {
            ClinicID: '',
            ClinicAreaName: '',
            ClinicAreaLead: '',
            ClinicAreaLeadPhone: '',
            ClinicAreaLeadEmail: '',
            HospitalID: '',

        },
      },
    };
  },
  components: {
    ModelSelect,
    ModelListSelect
  },
  computed:{
    validationHospital: function () {
      if (this.form.model.HospitalID === ''){
        return true
      } else {
        return false
      }
    },
    validationFormCheck: function () {
      if (
        this.validationName.hasErrors === false &&
        this.validationLName.hasErrors === false &&
        this.validationPhone.hasErrors === false &&
        this.validationEmail.hasErrors === false &&
        this.validationHospital === false){
        return true
      } else {
        return false
      }
    }
  },
  methods: {
    goBack(){
      this.$router.push('/clinicarea')
    },
    addClinicArea(){
      axios.post(`${config.api}/api/Clinic_Area/create`, this.form.model)
        .then((response) => {
          Swal.fire(
            'Done!',
            'The record has been created.',
            'success'
          )
          this.goBack()
        })
        .catch(() => {
          Swal.fire('Error', 'Something went wrong (creating Clinic Area)', 'error')
        })
    },
    updateClinicArea(){
      const ClinicID = this.clinicID
        axios.put(`${config.api}/api/Clinic_Area/update/` + ClinicID, this.form.model)
          .then((response) => {
            this.loadData()
            Swal.fire(
              'Done!',
              'The Clinic Area has been updated.',
              'success'
            )
            this.goBack()
          })
          .catch(() => {
            Swal.fire('Error', 'Something went wrong (updating Clinic Area)', 'error')
          })
    },
    deleteClinicArea(){
      const ClinicID = this.clinicID
        axios.delete(`${config.api}/api/Clinic_Area/delete/` + ClinicID)
          .then((response) => {
            Swal.fire(
              'Done!',
              'The Clinic Area has been deleted.',
              'success'
            )
            this.goBack()
          })
          .catch(() => {
            Swal.fire('Error', 'Something went wrong (deleting Clinic Area)', 'error')
          })
    },
    loadData(){
      axios.get(`${config.api}/api/Clinic_Area/find/` + this.clinicID)
        .then((response) => {
          this.DB_DATA = response.data;
          this.form.model.ClinicAreaName = response.data.clinicAreaName,
          this.form.model.ClinicAreaLead = response.data.clinicAreaLead,
          this.form.model.ClinicAreaLeadPhone = response.data.clinicAreaLeadPhone,
          this.form.model.ClinicAreaLeadEmail = response.data.clinicAreaLeadEmail
          this.form.model.HospitalID = response.data.hospitalID
        })
        .catch(() => {
          Swal.fire('Error', 'Something went wrong (finding Clinic Area)', 'error')
        })
    },
    loadFields(){
      axios.get(`${config.api}/api/Hospital/find`)
        .then((response) => {
          this.Hospital_DATA = response.data;
        })
        .catch(() => {
          Swal.fire('Error', 'Something went wrong (loading Hospital)', 'error')
        })
    }
  },
  beforeMount() {
    this.loadFields()
    if (this.clinicID !== undefined){
      this.isNewClinicArea = false
      this.loadData()
    }
  }
};
</script>

<style scoped>
</style>
