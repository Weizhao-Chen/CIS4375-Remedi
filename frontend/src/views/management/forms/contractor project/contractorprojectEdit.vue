<template>
  <div>
    <div class="jumbotron dashboard">
      <div v-if="!isNewContractorProject" class="dashlabel">
        Assigned Contractor Project Number: {{ this.contractorProjectID }}
      </div>
      <div v-else class="dashlabel">
        Adding New Contractor Project
      </div>
    </div>

    <div class="editForm">
      <div class="editFormFooter-left">
        <button class="swal2-editform swal2-styled goBackButton" v-on:click="goBack">Go Back</button>
      </div>
      <div class="editFormFooter-right">
        <button v-if="!isNewContractorProject" class="swal2-editform swal2-styled updateButton" :disabled="validationFormCheck === false" v-on:click="updateContractorProject">Update Contractor Project</button>
        <button v-if="!isNewContractorProject" class="swal2-editform swal2-styled deleteButton" v-on:click="deleteContractorProject">Delete Contractor Project</button>
        <button v-if="isNewContractorProject" class="swal2-editform swal2-styled addNewButton" :disabled="validationFormCheck === false" v-on:click="addContractorProject">Submit Contractor Project</button>
      </div>
    </div>

    <br />

    <form class="swal2-form mainForm">
        <div class="editForm-right">
            <label class="form-custom-label" for="form-Contractor">Contractor</label>
            <model-list-select :list="Contractor_DATA"
                           v-model="form.model.ContractorID"
                           option-value="contractorID"
                           id="form-Contractor"
                           option-text="contractorID"
                           :isError='validationContractor === true'
                           placeholder="select one">
            </model-list-select>
        </div>
        <div class="editForm-right">
            <label class="form-custom-label" for="form-Project">Project</label>
            <model-list-select :list="Project_DATA"
                           v-model="form.model.ProjectID"
                           option-value="projectID"
                           id="form-Project"
                           option-text="projectID"
                           :isError='validationProject === true'
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
  props: ["contractorProjectID"],
  data() {
    return {
      isNewContractorProject: true,
      DB_DATA: [],
      Contractor_DATA: [],
      Project_DATA: [],
      form: {
        model: {
          ContractorID: '',
          ProjectID: '',
        },
      },
    };
  },
  components: {
    ModelSelect,
    ModelListSelect
  },
  computed:{
    validationContractor: function () {
      if (this.form.model.ContractorID === ''){
        return true
      } else {
        return false
      }
    },
    validationProject: function () {
      if (this.form.model.ProjectID === ''){
        return true
      } else {
        return false
      }
    },
    validationFormCheck: function () {
      if (this.validationContractor === false &&
        this.validationProject === false){
        return true
      } else {
        return false
      }
    }
  },
  methods: {
    goBack(){
      this.$router.push('/contractorproject')
    },
    addContractorProject(){
      axios.post(`${config.api}/api/Contractor_Project/create`, this.form.model)
        .then((response) => {
          Swal.fire(
            'Done!',
            'The record has been created.',
            'success'
          )
          this.goBack()
        })
        .catch(() => {
          Swal.fire('Error', 'Something went wrong (creating Contractor Project)', 'error')
        })
    },
    updateContractorProject(){
      const ContractorProjectID = this.contractorProjectID
        axios.put(`${config.api}/api/Contractor_Project/update/` + ContractorProjectID, this.form.model)
          .then((response) => {
            this.loadData()
            Swal.fire(
              'Done!',
              'The Contractor Project has been updated.',
              'success'
            )
            this.goBack()
          })
          .catch(() => {
            Swal.fire('Error', 'Something went wrong (updating Contractor Project) or there is repeating data', 'error')
          })
    },
    deleteContractorProject(){
      // const ContractorProjectID = this.contractorProjectID
        axios.delete(`${config.api}/api/Contractor_Project/delete/` + `ContractorProjectID`)
          .then((response) => {
            Swal.fire(
              'Done!',
              'The Contractor Project has been deleted.',
              'success'
            )
            this.goBack()
          })
          .catch(() => {
            Swal.fire('Error', 'Something went wrong (deleting Contractor Project)', 'error')
          })
    },
    loadData(){
      axios.get(`${config.api}/api/Contractor_Project/find/` + this.contractorProjectID)
        .then((response) => {
          this.DB_DATA = response.data;
            this.form.model.ContractorID = response.data.contractorID,
            this.form.model.ProjectID = response.data.projectID
        })
        .catch(() => {
          Swal.fire('Error', 'Something went wrong (finding Contractor Project)', 'error')
        })
    },
    loadFields(){
      axios.get(`${config.api}/api/Contractor/find`)
        .then((response) => {
          this.Contractor_DATA = response.data;
        })
        .catch(() => {
          Swal.fire('Error', 'Something went wrong (loading Contractor)', 'error')
        })
      axios.get(`${config.api}/api/Project/find`)
        .then((response) => {
          this.Project_DATA = response.data;
        })
        .catch(() => {
          Swal.fire('Error', 'Something went wrong (loading Project)', 'error')
        })
    }
  },
  beforeMount() {
    this.loadFields()
    if (this.contractorProjectID !== undefined){
      this.isNewContractorProject = false
      this.loadData()
    }
  }
};
</script>

<style scoped>
</style>
