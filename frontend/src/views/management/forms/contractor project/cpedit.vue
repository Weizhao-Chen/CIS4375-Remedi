<template>
  <div>
    <div class="jumbotron dashboard">
      <div v-if="!isNewContractorProject" class="dashlabel">
        Contractor Project Number: {{ this.contractorID }}
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
        <button v-if="isNewContractorProject" class="swal2-editform swal2-styled addNewButton" :disabled="validationFormCheck === false" v-on:click="addContractorProject">Submit New Contractor Project</button>
      </div>
    </div>

    <br />

    <form class="swal2-form mainForm">
        <div class="editForm-right">
            <label class="form-custom-label" for="form-contractorlist">Contractor</label>
            <model-list-select :list="Contractor_DATA"
                           v-model="form.model.ContractorID"
                           option-value="contractorID"
                           id="form-contractorlist"
                           option-text="contractorID"
                           :isError='validationContractor === true'
                           placeholder="select one">
            </model-list-select>
        </div>
        <div class="editForm-right">
            <label class="form-custom-label" for="form-projectlist">Project</label>
            <model-list-select :list="Project_DATA"
                           v-model="form.model.ProjectID"
                           option-value="projectID"
                           id="form-projectlist"
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
//    props: ["Contractor.contractorID"],
   
  data() {
    return {
      isNewContractorProject: true,
      DB_DATA: [],
      Contractor_DATA: [],
      Project_DATA: [],
      myAPI: `${config.api}/api/Contractor_Project`,
      form: {
        model: {
          ContractorID: '',
          ProjectID: '',
        },
      },
      dataFields: [{
        label: 'Contractor ID',
        field: 'Contractor.contractorID'
      },{
        label: 'Project ID',
        field: 'Project.projectID'
      }]
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
      if (
        this.validationContractor === false &&
        this.validationProject === false){
        return true
      } else {
        return false
      }
    }
  },
  methods: {
    goBack(){
      this.$router.push('/cp')
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
          Swal.fire('Error', 'Something went wrong (creating Module)', 'error')
        })
    },
    updateContractorProject(){
    //   const ModuleID = this.moduleID
        axios.put(`${config.api}/api/Contractor_Project/update` + this.form.model)
          .then((response) => {
            this.loadData()
            Swal.fire(
              'Done!',
              'The Module has been updated.',
              'success'
            )
            this.goBack()
          })
          .catch(() => {
            Swal.fire('Error', 'Something went wrong (updating Module)', 'error')
          })
    },
    deleteContractorProject(){
    //   const ModuleID = this.moduleID
        axios.delete(`${config.api}/api/Contractor_Project/delete/` + this.form.model)
          .then((response) => {
            Swal.fire(
              'Done!',
              'The Module has been deleted.',
              'success'
            )
            this.goBack()
          })
          .catch(() => {
            Swal.fire('Error', 'Something went wrong (deleting Module)', 'error')
          })
    },
    loadData(){
      axios.get(`${config.api}/api/Contractor_Project/find`)
        .then((response) => {
          this.DB_DATA = response.data;
            // this.form.model.EMRID = response.data.emrID,
            // this.form.model.ModuleName = response.data.moduleName
        })
        .catch(() => {
          Swal.fire('Error', 'Something went wrong (finding Module)', 'error')
        })
    },
    loadFields(){
      axios.get(`${config.api}/api/Contractor/find`)
        .then((response) => {
          this.Contractor_DATA = response.data;
        })
        .catch(() => {
          Swal.fire('Error', 'Something went wrong Contractor', 'error')
        })
      axios.get(`${config.api}/api/Project/find`)
        .then((response) => {
          this.Project_DATA = response.data;
        })
        .catch(() => {
          Swal.fire('Error', 'Something went wrong Project', 'error')
        })
    }
  },
  beforeMount() {
    this.loadFields()
    console.log(this.Contractor_DATA)
    if (this.contractorID !== undefined){
      this.isNewContractorProject = false
      this.loadData()
    }
  }
};
</script>

<style scoped>
</style>
