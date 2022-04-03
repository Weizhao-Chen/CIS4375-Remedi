<template>
  <div>
    <div class="jumbotron dashboard">
      <div v-if="!isNewContractor" class="dashlabel">
        Contractor Number: {{ this.contractorID }}
      </div>
      <div v-else class="dashlabel">
        Adding New Contractor
      </div>
    </div>

    <div class="editForm">
      <div class="editFormFooter-left">
        <button class="swal2-editform swal2-styled goBackButton" v-on:click="goBack">Go Back</button>
      </div>
      <div class="editFormFooter-right">
        <button v-if="!isNewContractor" class="swal2-editform swal2-styled updateButton" :disabled="validationFormCheck === false" v-on:click="updateContractor">Update Contractor</button>
        <button v-if="!isNewContractor" class="swal2-editform swal2-styled deleteButton" v-on:click="deleteContractor">Delete Contractor</button>
        <button v-if="isNewContractor" class="swal2-editform swal2-styled addNewButton" :disabled="validationFormCheck === false" v-on:click="addContractor">Submit New Contractor</button>
      </div>
    </div>

    <br />

    <form class="swal2-form mainForm">
        <div class="editForm-left">
            <FormulateInput
                @validation="validationOnsite = $event"
                type="text"
                name="virtualOnsite"
                label="Onsite"
                validation="required"
                v-model="form.model.VirtualOnsite"
                :validation-messages="{required: 'The onsite is required'}"
            />
        </div>
        <div class="editForm-left">
            <FormulateInput
                @validation="validationLName = $event"
                type="text"
                name="lastName"
                label="Last Name"
                validation="required"
                v-model="form.model.LastName"
                :validation-messages="{required: 'The Last name is required'}"
            />
        </div>
        <div class="editForm-left">
            <FormulateInput
                @validation="validationFName = $event"
                type="text"
                name="firstName"
                label="First Name"
                validation="required"
                v-model="form.model.FirstName"
                :validation-messages="{required: 'The First Name is required'}"
            />
        </div>
        <div class="editForm-left">
            <FormulateInput
                @validation="validationPName = $event"
                type="text"
                name="preferredName"
                label="Preferred Name"
                validation="required"
                v-model="form.model.PreferredName"
                :validation-messages="{required: 'The Preferred Name is required'}"
            />
        </div>
        <div class="editForm-left">
            <FormulateInput
                @validation="validationStreet = $event"
                type="text"
                name="addressLineOne"
                label="Street"
                validation="required"
                v-model="form.model.AddressLineOne"
                :validation-messages="{required: 'The Street is required'}"
            />
        </div>
        <div class="editForm-left">
            <FormulateInput
                type="text"
                name="addressLineTwo"
                label="Street 2"
                v-model="form.model.AddressLineTwo"
            />
        </div>
        <div class="editForm-left">
            <FormulateInput
                @validation="validationCity = $event"
                type="text"
                name="city"
                label="city"
                validation="required"
                v-model="form.model.City"
                :validation-messages="{required: 'The city is required'}"
            />
        </div>
        <div class="editForm-left">
            <FormulateInput
                @validation="validationState = $event"
                type="text"
                name="state"
                label="state"
                validation="required"
                v-model="form.model.State"
                :validation-messages="{required: 'The state is required'}"
            />
        </div>
        <div class="editForm-left">
            <FormulateInput
                @validation="validationZip = $event"
                type="text"
                name="zipCode"
                label="zip"
                validation="required"
                v-model="form.model.ZipCode"
                :validation-messages="{required: 'The zip is required'}"
            />
        </div>
        <div class="editForm-left">
            <FormulateInput
                @validation="validationNumber = $event"
                type="text"
                name="phoneNumber"
                label="phone number"
                validation="required"
                v-model="form.model.PhoneNumber"
                :validation-messages="{required: 'The phone number is required'}"
            />
        </div>
        <div class="editForm-left">
            <FormulateInput
                @validation="validationEmail = $event"
                type="text"
                name="email"
                label="email"
                validation="required"
                v-model="form.model.Email"
                :validation-messages="{required: 'The email is required'}"
            />
        </div>
        <div class="editForm-left">
            <FormulateInput
                @validation="validationHistory = $event"
                type="text"
                name="remediHistory"
                label="history"
                validation="required"
                v-model="form.model.RemediHistory"
                :validation-messages="{required: 'The history is required'}"
            />
        </div>
        <div class="editForm-left">
            <FormulateInput
                @validation="validationWisdom = $event"
                type="text"
                name="supportWisdom"
                label="wisdom"
                validation="required"
                v-model="form.model.SupportWisdom"
                :validation-messages="{required: 'The wisdom is required'}"
            />
        </div>
        <div class="editForm-left">
            <FormulateInput
                @validation="validationGolives = $event"
                type="text"
                name="numberofGoLives"
                label="GoLives"
                validation="required"
                v-model="form.model.NumberOfGoLives"
                :validation-messages="{required: 'The GoLives is required'}"
            />
        </div>
        <div class="editForm-left">
            <FormulateInput
                @validation="validationEpicProjects = $event"
                type="text"
                name="numberofEpicProjects"
                label="Epic Project"
                validation="required"
                v-model="form.model.NumberofEpicProjects"
                :validation-messages="{required: 'The Epic Project is required'}"
            />
        </div>
        <div class="editForm-left">
            <FormulateInput
                @validation="validationYearSupportEpic = $event"
                type="text"
                name="yearsOfSupportEpic"
                label="Support Epic"
                validation="required"
                v-model="form.model.YearsOfSupportEpic"
                :validation-messages="{required: 'The Support Epic is required'}"
            />
        </div>
        <div class="editForm-left">
            <FormulateInput
                @validation="validationSupportVirtualEpic = $event"
                type="text"
                name="supportVirtualEpic"
                label="Virtual Epic"
                validation="required"
                v-model="form.model.SupportVirtualEpic"
                :validation-messages="{required: 'The Virtual Epic is required'}"
            />
        </div>
        <div class="editForm-left">
            <FormulateInput
                @validation="validationCreditCard = $event"
                type="text"
                name="creditCardHotel"
                label="credit card"
                validation="required"
                v-model="form.model.CreditCardHotel"
                :validation-messages="{required: 'The credit card is required'}"
            />
        </div>
        <div class="editForm-right">
            <label class="form-custom-label" for="form-Contractor_Status">Contractor Status</label>
            <model-list-select :list="Contractor_Status_DATA"
                           v-model="form.model.ContractorStatusID" 
                           option-value="contractorStatusID"
                           id="form-Contractor_Status"
                           option-text="contractorStatusType"
                           :isError='validationContractorStatus === true'
                           placeholder="select one">
            </model-list-select>
        </div>
    </form>
  </div>
</template>

<script>
//https://grokonez.com/frontend/vue-js/vue-js-nodejs-express-restapis-sequelize-orm-mysql-crud-example
import axios from '../../utilities/axios';
import config from '../../config';
import Swal from 'sweetalert2';
import {mapActions} from "vuex";
import { ModelListSelect } from 'vue-search-select';
import { ModelSelect } from 'vue-search-select'

export default {
  props: ["contractorID"],
  data() {
    return {
      isNewContractor: true,
      validationOnsite: {},
      validationLName: {},
      validationFName: {},
      validationPName: {},
      validationStreet: {},
      validationCity: {},
      validationState: {},
      validationZip: {},
      validationNumber: {},
      validationEmail: {},
      validationHistory: {},
      validationWisdom: {},
      validationGolives: {},
      validationEpicProjects: {},
      validationYearSupportEpic: {},
      validationSupportVirtualEpic: {},
      validationCreditCard: {},
      DB_DATA: [],
      Contractor_Status_DATA: [],
      form: {
        model: {
          ContractorID: '',
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
