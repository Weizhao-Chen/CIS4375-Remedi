<template>
  <div>
    <div class="jumbotron dashboard">
      <div v-if="!isNewProject" class="dashlabel">
        Project Number: {{ this.projectID }}
      </div>
      <div v-else class="dashlabel">
        Adding New Project
      </div>
    </div>

    <div class="editForm">
      <div class="editFormFooter-left">
        <button class="swal2-editform swal2-styled goBackButton" v-on:click="goBack">Go Back</button>
      </div>
      <div class="editFormFooter-right">
        <button v-if="!isNewProject" class="swal2-editform swal2-styled updateButton" :disabled="validationFormCheck === false" v-on:click="updateProject">Update Project</button>
        <button v-if="!isNewProject" class="swal2-editform swal2-styled deleteButton" v-on:click="deleteProject">Delete Project</button>
        <button v-if="isNewProject" class="swal2-editform swal2-styled addNewButton" :disabled="validationFormCheck === false" v-on:click="addProject">Submit New Project</button>
      </div>
    </div>

    <br />

    <form class="swal2-form mainForm">
        <div class="editForm-left">
            <FormulateInput
                @validation="validationName = $event"
                type="text"
                name="projectName"
                label="project Name"
                validation="required"
                v-model="form.model.ProjectName"
                :validation-messages="{required: 'The project Name is required'}"
            />
        </div>
        <div class="editForm-left">
            <FormulateInput
                @validation="validationStartDate = $event"
                type="text"
                name="projectStartDate"
                label="Start Date"
                validation="required"
                v-model="form.model.ProjectStartDate"
                :validation-messages="{required: 'The Start Date is required'}"
            />
        </div>
        <div class="editForm-left">
            <FormulateInput
                @validation="validationEndDate = $event"
                type="text"
                name="projectEndDate"
                label="End Date"
                validation="required"
                v-model="form.model.ProjectEndDate"
                :validation-messages="{required: 'The End Date is required'}"
            />
        </div>
        <div class="editForm-left">
            <FormulateInput
                @validation="validationNotes = $event"
                type="text"
                name="projectNotes"
                label="project Notes"
                validation="required"
                v-model="form.model.ProjectNotes"
                :validation-messages="{required: 'The project Notes is required'}"
            />
        </div>
        <div class="editForm-right">
            <label class="form-custom-label" for="form-Hospital">Hospital Status</label>
            <model-list-select :list="Hospital_DATA"
                           v-model="form.model.HospitalID" 
                           option-value="hospitalID"
                           id="form-Hospital"
                           option-text="hospitalName"
                           :isError='validationHospital === true'
                           placeholder="select one">
            </model-list-select>
        </div>
        <div class="editForm-right">
            <label class="form-custom-label" for="form-Project_Status">Project Status Status</label>
            <model-list-select :list="Project_Status_DATA"
                           v-model="form.model.ProjectStatusID" 
                           option-value="projectStatusID"
                           id="form-Project_Status"
                           option-text="projectStatusType"
                           :isError='validationProjectStatus === true'
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
  props: ["projectID"],
  data() {
    return {
      isNewProject: true,
      validationName: {},
      validationStartDate: {},
      validationEndDate: {},
      validationNotes: {},
      DB_DATA: [],
      Hospital_DATA: [],
      Project_Status_DATA: [],
      form: {
        model: {
          ProjectID: '',
          ProjectName: '',
          ProjectStartDate: '',
          ProjectEndDate: '',
          ProjectNotes: '',
          HospitalID: '',
          ProjectStatusID: '',
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
    validationProjectStatus: function () {
      if (this.form.model.ProjectStatusID === ''){
        return true
      } else {
        return false
      }
    },
    validationFormCheck: function () {
      if (this.validationName.hasErrors === false &&
        this.validationStartDate.hasErrors === false &&
        this.validationEndDate.hasErrors === false &&
        this.validationNotes.hasErrors === false &&
        this.validationHospital === false &&
        this.validationProjectStatus === false){
        return true
      } else {
        return false
      }
    }
  },
  methods: {
    goBack(){
      this.$router.push('/project')
    },
    addProject(){
      axios.post(`${config.api}/api/Project/create`, this.form.model)
        .then((response) => {
          Swal.fire(
            'Done!',
            'The record has been created.',
            'success'
          )
          this.goBack()
        })
        .catch(() => {
          Swal.fire('Error', 'Something went wrong (creating Project)', 'error')
        })
    },
    updateProject(){
      const ProjectID = this.projectID
        axios.put(`${config.api}/api/Project/update/` + ProjectID, this.form.model)
          .then((response) => {
            this.loadData()
            Swal.fire(
              'Done!',
              'The Project has been updated.',
              'success'
            )
            this.goBack()
          })
          .catch(() => {
            Swal.fire('Error', 'Something went wrong (updating Project)', 'error')
          })
    },
    deleteProject(){
      const ProjectID = this.projectID
        axios.delete(`${config.api}/api/Project/delete/` + ProjectID)
          .then((response) => {
            Swal.fire(
              'Done!',
              'The Project has been deleted.',
              'success'
            )
            this.goBack()
          })
          .catch(() => {
            Swal.fire('Error', 'Something went wrong (deleting Project)', 'error')
          })
    },
    loadData(){
      axios.get(`${config.api}/api/Project/find/` + this.projectID)
        .then((response) => {
          this.DB_DATA = response.data;
          this.form.model.ProjectName = response.data.projectName,
          this.form.model.ProjectStartDate = response.data.projectStartDate,
          this.form.model.ProjectEndDate = response.data.projectEndDate,
          this.form.model.ProjectNotes = response.data.projectNotes
          this.form.model.HospitalID = response.data.HospitalID
          this.form.model.ProjectStatusID = response.data.projectStatusID
        })
        .catch(() => {
          Swal.fire('Error', 'Something went wrong (finding Project)', 'error')
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
        axios.get(`${config.api}/api/Project_Status/find`)
        .then((response) => {
          this.Project_Status_DATA = response.data;
        })
        .catch(() => {
          Swal.fire('Error', 'Something went wrong (loading Project Status)', 'error')
        })
    }
  },
  beforeMount() {
    this.loadFields()
    if (this.projectID !== undefined){
      this.isNewProject = false
      this.loadData()
    }
  }
};
</script>

<style scoped>
</style>
