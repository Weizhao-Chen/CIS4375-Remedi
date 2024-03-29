<template>
  <div>
    <div class="jumbotron dashboard">
      <div v-if="!isNewAssignedModule" class="dashlabel">
        Assigned Module Number: {{ this.assignedModuleID }}
      </div>
      <div v-else class="dashlabel">
        Adding New Module
      </div>
    </div>

    <div class="editForm">
      <div class="editFormFooter-left">
        <button class="swal2-editform swal2-styled goBackButton" v-on:click="goBack">Go Back</button>
      </div>
      <div class="editFormFooter-right">
        <button v-if="!isNewAssignedModule" class="swal2-editform swal2-styled updateButton" :disabled="validationFormCheck === false" v-on:click="updateAssignedModule">Update Assigned Module</button>
        <button v-if="!isNewAssignedModule" class="swal2-editform swal2-styled deleteButton" v-on:click="deleteAssignedModule">Delete Assigned Module</button>
        <button v-if="isNewAssignedModule" class="swal2-editform swal2-styled addNewButton" :disabled="validationFormCheck === false" v-on:click="addAssignedModule">Submit Assigned Module</button>
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
            <label class="form-custom-label" for="form-Module">Module</label>
            <model-list-select :list="Module_DATA"
                           v-model="form.model.ModuleID"
                           option-value="moduleID"
                           id="form-Module"
                           option-text="moduleID"
                           :isError='validationModule === true'
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
  props: ["assignedModuleID"],
  data() {
    return {
      isNewAssignedModule: true,
      DB_DATA: [],
      Contractor_DATA: [],
      Module_DATA: [],
      Project_DATA: [],
      form: {
        model: {
          ContractorID: '',
          ModuleID: '',
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
    validationModule: function () {
      if (this.form.model.ModuleID === ''){
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
        this.validationModule === false &&
        this.validationProject === false){
        return true
      } else {
        return false
      }
    }
  },
  methods: {
    goBack(){
      this.$router.push('/assignedmodule')
    },
    addAssignedClinicArea(){
      axios.post(`${config.api}/api/Assigned_Module/create`, this.form.model)
        .then((response) => {
          Swal.fire(
            'Done!',
            'The record has been created.',
            'success'
          )
          this.goBack()
        })
        .catch(() => {
          Swal.fire('Error', 'Something went wrong (creating Assigned Clinic Area)', 'error')
        })
    },
    updateAssignedClinicArea(){
      const AssignedClinicAreaID = this.assignedClinicAreaID
        axios.put(`${config.api}/api/Assigned_Clinic_Area/update/` + AssignedClinicAreaID, this.form.model)
          .then((response) => {
            this.loadData()
            Swal.fire(
              'Done!',
              'The Assigned Clinic Area has been updated.',
              'success'
            )
            this.goBack()
          })
          .catch(() => {
            Swal.fire('Error', 'Something went wrong (updating Assigned Clinic Area) or there is repeating data', 'error')
          })
    },
    deleteAssignedClinicArea(){
      const AssignedClinicAreaID = this.assignedClinicAreaID
        axios.delete(`${config.api}/api/Assigned_Clinic_Area/delete/` + AssignedClinicAreaID)
          .then((response) => {
            Swal.fire(
              'Done!',
              'The Assigned Clinic Area has been deleted.',
              'success'
            )
            this.goBack()
          })
          .catch(() => {
            Swal.fire('Error', 'Something went wrong (deleting Assigned Clinic Area)', 'error')
          })
    },
    loadData(){
      axios.get(`${config.api}/api/Assigned_Clinic_Area/find/` + this.assignedClinicAreaID)
        .then((response) => {
          this.DB_DATA = response.data;
            this.form.model.ContractorID = response.data.contractorID,
            this.form.model.ClinicID = response.data.clinicID
        })
        .catch(() => {
          Swal.fire('Error', 'Something went wrong (finding Assigned Clinic Area)', 'error')
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
      axios.get(`${config.api}/api/Clinic_Area/find`)
        .then((response) => {
          this.Clinic_Area_DATA = response.data;
        })
        .catch(() => {
          Swal.fire('Error', 'Something went wrong (loading Clinic Area)', 'error')
        })
    }
  },
  beforeMount() {
    this.loadFields()
    if (this.assignedClinicAreaID !== undefined){
      this.isNewAssignedClinicArea = false
      this.loadData()
    }
  }
};
</script>

<style scoped>
</style>
