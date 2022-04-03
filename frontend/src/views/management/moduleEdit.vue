<template>
  <div>
    <div class="jumbotron dashboard">
      <div v-if="!isNewModule" class="dashlabel">
        Module Number: {{ this.moduleID }}
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
        <button v-if="!isNewModule" class="swal2-editform swal2-styled updateButton" :disabled="validationFormCheck === false" v-on:click="updateModule">Update Module</button>
        <button v-if="!isNewModule" class="swal2-editform swal2-styled deleteButton" v-on:click="deleteModule">Delete Module</button>
        <button v-if="isNewModule" class="swal2-editform swal2-styled addNewButton" :disabled="validationFormCheck === false" v-on:click="addModule">Submit New Module</button>
      </div>
    </div>

    <br />

    <form class="swal2-form mainForm">
        <div class="editForm-right">
            <label class="form-custom-label" for="form-EMR">EMR</label>
            <model-list-select :list="EMR_DATA"
                           v-model="form.model.EMRID"
                           option-value="emrID"
                           id="form-EMR"
                           option-text="emrName"
                           :isError='validationEMR === true'
                           placeholder="select one">
            </model-list-select>
        </div>
        <div class="editForm-left">
            <FormulateInput
                @validation="validationName = $event"
                type="text"
                name="name"
                label="Name"
                validation="required"
                v-model="form.model.ModuleName"
                :validation-messages="{required: 'The name is required'}"
            />
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
  props: ["moduleID"],
  data() {
    return {
      isNewModule: true,
      validationName: {},
      DB_DATA: [],
      EMR_DATA: [],
      form: {
        model: {
          EMRID: '',
          ModuleName: '',
        },
      },
    };
  },
  components: {
    ModelSelect,
    ModelListSelect
  },
  computed:{
    validationEMR: function () {
      if (this.form.model.EMRID === ''){
        return true
      } else {
        return false
      }
    },
    validationFormCheck: function () {
      if (this.validationName.hasErrors === false &&
        this.validationEMR === false){
        return true
      } else {
        return false
      }
    }
  },
  methods: {
    goBack(){
      this.$router.push('/module')
    },
    addModule(){
      axios.post(`${config.api}/api/Module/create`, this.form.model)
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
    updateModule(){
      const ModuleID = this.moduleID
        axios.put(`${config.api}/api/Module/update/` + ModuleID, this.form.model)
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
    deleteModule(){
      const ModuleID = this.moduleID
        axios.delete(`${config.api}/api/Module/delete/` + ModuleID)
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
      axios.get(`${config.api}/api/Module/find/` + this.moduleID)
        .then((response) => {
          this.DB_DATA = response.data;
            this.form.model.EMRID = response.data.emrID,
            this.form.model.ModuleName = response.data.moduleName
        })
        .catch(() => {
          Swal.fire('Error', 'Something went wrong (finding Module)', 'error')
        })
    },
    loadFields(){
      axios.get(`${config.api}/api/EMR/find`)
        .then((response) => {
          this.EMR_DATA = response.data;
        })
        .catch(() => {
          Swal.fire('Error', 'Something went wrong (loading EMR)', 'error')
        })
    }
  },
  beforeMount() {
    this.loadFields()
    if (this.moduleID !== undefined){
      this.isNewModule = false
      this.loadData()
    }
  }
};
</script>

<style scoped>
</style>
