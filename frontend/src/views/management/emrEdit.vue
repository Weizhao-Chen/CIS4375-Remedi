<template>
  <div>
    <div class="jumbotron dashboard">
      <div v-if="!isNewEMR" class="dashlabel">
        EMR Number: {{ this.emrID }}
      </div>
      <div v-else class="dashlabel">
        Adding New EMR
      </div>
    </div>

    <div class="editForm">
      <div class="editFormFooter-left">
        <button class="swal2-editform swal2-styled goBackButton" v-on:click="goBack">Go Back</button>
      </div>
      <div class="editFormFooter-right">
        <button v-if="!isNewEMR" class="swal2-editform swal2-styled updateButton" :disabled="validationFormCheck === false" v-on:click="updateEMR">Update EMR</button>
        <button v-if="!isNewEMR" class="swal2-editform swal2-styled deleteButton" v-on:click="deleteEMR">Delete EMR</button>
        <button v-if="isNewEMR" class="swal2-editform swal2-styled addNewButton" :disabled="validationFormCheck === false" v-on:click="addEMR">Submit New EMR</button>
      </div>
    </div>

    <br />

    <form class="swal2-form mainForm">
      <div class="editForm-left">
        <FormulateInput
          @validation="validationName = $event"
          type="text"
          name="emrName"
          label="name"
          validation="required"
          v-model="form.model.emrName"
          :validation-messages="{required: 'The name is required'}"
        />
        <!-- <FormulateInput
          type="text"
          name="emrName"
          label="name"
          v-model="form.model.emrName"
        /> -->
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
 name: "emrEdit",
 props: ["emrID"],
  data() {
    return {
      isNewEMR: true,
      validationName: {},
      DB_DATA: [],
      form: {
        model: {
          emrName: '',
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
      if (this.validationName.hasErrors === false){
        return true
      } else {
        return false
      }
    }
  },
  methods: {
    goBack(){
      this.$router.push('/emr')
    },
    addEMR(){
      axios.post(`${config.api}/api/EMR/create`, this.form.model)
        .then((response) => {
          Swal.fire(
            'Done!',
            'The record has been created.',
            'success'
          )
          this.goBack()
        })
        .catch(() => {
          Swal.fire('Error', 'Something went wrong (creating EMR)', 'error')
        })
    },
    updateEMR(){
      const emrid = this.emrID
        axios.put(`${config.api}/api/EMR/update/` + emrid, this.form.model)
          .then((response) => {
            this.loadData()
            Swal.fire(
              'Done!',
              'The FAQ has been updated.',
              'success'
            )
            this.goBack()
          })
          .catch(() => {
            Swal.fire('Error', 'Something went wrong (updating FAQ)', 'error')
          })
    },
    deleteEMR(){
      const emrid = this.emrID
        axios.delete(`${config.api}/api/EMR/delete/` + emrid)
          .then((response) => {
            Swal.fire(
              'Done!',
              'The EMR has been deleted.',
              'success'
            )
            this.goBack()
          })
          .catch(() => {
            Swal.fire('Error', 'Something went wrong (deleting EMR)', 'error')
          })
    },
    loadData(){
      axios.get(`${config.api}/api/EMR/find/` + this.emrID)
        .then((response) => {
          this.DB_DATA = response.data;
            this.form.model.emrName = response.data.emrName
        })
        .catch(() => {
          Swal.fire('Error', 'Something went wrong (finding EMR)', 'error')
        })
    }
  },
  beforeMount() {
    if (this.emrID !== undefined){
      this.isNewEMR = false
      this.loadData()
    }
  }
};
</script>

<style scoped>
</style>
