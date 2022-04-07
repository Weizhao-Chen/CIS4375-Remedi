<template>
  <div>
    <div class="jumbotron dashboard">
      <div v-if="!isNewHostpital" class="dashlabel">
        Hostpital Number: {{ this.hospitalID }}
      </div>
      <div v-else class="dashlabel">
        Adding New Hostpital
      </div>
    </div>

    <div class="editForm">
      <div class="editFormFooter-left">
        <button class="swal2-editform swal2-styled goBackButton" v-on:click="goBack">Go Back</button>
      </div>
      <div class="editFormFooter-right">
        <button v-if="!isNewHostpital" class="swal2-editform swal2-styled updateButton" :disabled="validationFormCheck === false" v-on:click="updateHostpital">Update Hostpital</button>
        <button v-if="!isNewHostpital" class="swal2-editform swal2-styled deleteButton" v-on:click="deleteHostpital">Delete Hostpital</button>
        <button v-if="isNewHostpital" class="swal2-editform swal2-styled addNewButton" :disabled="validationFormCheck === false" v-on:click="addHostpital">Submit New Hostpital</button>
      </div>
    </div>

    <br />

    <form class="swal2-form mainForm">
        <div class="editForm-left">
            <FormulateInput
                @validation="validationName = $event"
                type="text"
                name="hostpitalName"
                label="Hostpital Name"
                validation="required"
                v-model="form.model.HostpitalName"
                :validation-messages="{required: 'The Hostpital Name is required'}"
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
                validation="required"
                v-model="form.model.HospitalZipCode"
                :validation-messages="{required: 'The zip is required'}"
            />
        </div>
        <div class="editForm-left">
            <FormulateInput
                @validation="validationNumber = $event"
                type="text"
                name="hospitalContactName"
                label="phone number"
                validation="required"
                v-model="form.model.HospitalContactName"
                :validation-messages="{required: 'The phone number is required'}"
            />
        </div>
        <div class="editForm-left">
            <FormulateInput
                @validation="validationPhone = $event"
                type="text"
                name="hospitalContactPhone"
                label="phone number"
                validation="required"
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
                validation="required"
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
      validationNumber: {},
      validationPhone: {},
      validationEmail: {},
      DB_DATA: [],
      form: {
        model: {
          HospitalID: '',
          VirtualOnsite: '',
          LastName: '',
          FirstName: '',
          PreferredName: '',
          AddressLineOne: '',
          AddressLineTwo: '',
          City: 'Houston',
          State: 'Texas',
          ZipCode: '',
          PhoneNumber: '',
          Email: '',
          RemediHistory: '',
          SupportWisdom: '',
          NumberOfGoLives: '',
          NumberofEpicProjects: '',
          YearsOfSupportEpic: '',
          SupportVirtualEpic: '',
          CreditCardHotel: '',
          ContractorStatusID: '',
        },
      },
    };
  },
  components: {
    ModelSelect,
    ModelListSelect
  },
  computed:{
    validationContractorStatus: function () {
      if (this.form.model.ContractorStatusID === ''){
        return true
      } else {
        return false
      }
    },
    validationFormCheck: function () {
      if (this.validationOnsite.hasErrors === false &&
        this.validationLName.hasErrors === false &&
        this.validationFName.hasErrors === false &&
        this.validationPName.hasErrors === false &&
        this.validationStreet.hasErrors === false &&
        // this.validationCity.hasErrors === false && need to remove cause giving
        // this.validationState.hasErrors === false && error for defaults
        this.validationZip.hasErrors === false &&
        this.validationNumber.hasErrors === false &&
        this.validationEmail.hasErrors === false &&
        this.validationHistory.hasErrors === false &&
        this.validationWisdom.hasErrors === false &&
        this.validationGolives.hasErrors === false &&
        this.validationEpicProjects.hasErrors === false &&
        this.validationYearSupportEpic.hasErrors === false &&
        this.validationSupportVirtualEpic.hasErrors === false &&
        this.validationCreditCard.hasErrors === false &&
        this.validationContractorStatus === false){
        return true
      } else {
        return false
      }
    }
  },
  methods: {
    goBack(){
      this.$router.push('/contractor')
    },
    addContractor(){
      axios.post(`${config.api}/api/Contractor/create`, this.form.model)
        .then((response) => {
          Swal.fire(
            'Done!',
            'The record has been created.',
            'success'
          )
          this.goBack()
        })
        .catch(() => {
          Swal.fire('Error', 'Something went wrong (creating Contractor)', 'error')
        })
    },
    updateContractor(){
      const ContractorID = this.contractorID
        axios.put(`${config.api}/api/Contractor/update/` + ContractorID, this.form.model)
          .then((response) => {
            this.loadData()
            Swal.fire(
              'Done!',
              'The Contractor has been updated.',
              'success'
            )
            this.goBack()
          })
          .catch(() => {
            Swal.fire('Error', 'Something went wrong (updating Contractor)', 'error')
          })
    },
    deleteContractor(){
      const ContractorID = this.contractorID
        axios.delete(`${config.api}/api/Contractor/delete/` + ContractorID)
          .then((response) => {
            Swal.fire(
              'Done!',
              'The Contractor has been deleted.',
              'success'
            )
            this.goBack()
          })
          .catch(() => {
            Swal.fire('Error', 'Something went wrong (deleting Contractor)', 'error')
          })
    },
    loadData(){
      axios.get(`${config.api}/api/Contractor/find/` + this.contractorID)
        .then((response) => {
          this.DB_DATA = response.data;
          this.form.model.VirtualOnsite = response.data.virtualOnsite,
          this.form.model.LastName = response.data.lastName,
          this.form.model.FirstName = response.data.firstName,
          this.form.model.PreferredName = response.data.preferredName,
          this.form.model.AddressLineOne = response.data.addressLineOne,
          this.form.model.AddressLineTwo = response.data.addressLineTwo,
          this.form.model.City = response.data.city,
          this.form.model.State = response.data.state,
          this.form.model.ZipCode = response.data.zipCode,
          this.form.model.PhoneNumber = response.data.phoneNumber,
          this.form.model.Email = response.data.email,
          this.form.model.RemediHistory = response.data.remediHistory,
          this.form.model.SupportWisdom = response.data.supportWisdom,
          this.form.model.NumberOfGoLives = response.data.numberOfGoLives,
          this.form.model.NumberofEpicProjects = response.data.numberofEpicProjects,
          this.form.model.YearsOfSupportEpic = response.data.yearsOfSupportEpic,
          this.form.model.SupportVirtualEpic = response.data.supportVirtualEpic,
          this.form.model.CreditCardHotel = response.data.creditCardHotel,
          this.form.model.ContractorStatusID = response.data.contractorStatusID
        })
        .catch(() => {
          Swal.fire('Error', 'Something went wrong (finding Contractor)', 'error')
        })
    },
    loadFields(){
      axios.get(`${config.api}/api/Contractor_Status/find`)
        .then((response) => {
          this.Contractor_Status_DATA = response.data;
        })
        .catch(() => {
          Swal.fire('Error', 'Something went wrong (loading Contractor Status)', 'error')
        })
    }
  },
  beforeMount() {
    this.loadFields()
    if (this.contractorID !== undefined){
      this.isNewContractor = false
      this.loadData()
    }
  }
};
</script>

<style scoped>
</style>
