<template>
  <div>
    <div class="tableHeading">
      <div class="tableHeading-left">
        <span class="tableHeading-text">Assigned Clinic Area List</span>
      </div>
      <div class="tableHeading-right">
        <button class="swal2-editform swal2-styled" v-on:click="addNewAssignedClinicArea">Add New Assigned Clinic Area</button>
      </div>
    </div>

    <div>
      <div slot="table-actions">
      </div>
      <vue-good-table
        :columns="dataFields"
        :rows="DB_DATA"
        :row-style-class="'rowStyle'"
        :search-options="{
          enabled: true,
          skipDiacritics: true,
          placeholder: 'Search this table',
        }"
        :sort-options="{
          enabled: true,
          initialSortBy: { field: 'Contractor.contractorID', type: 'asc' },
        }"
        :pagination-options="{
          enabled: true,
          mode: 'records',
          perPage: 10,
          position: 'top',
          perPageDropdown: [10, 25, 50, 100],
          dropdownAllowAll: false,
          nextLabel: 'next',
          prevLabel: 'prev',
          rowsPerPageLabel: 'Rows per page',
          ofLabel: 'of',
        }"
        compactMode
        @on-row-dblclick="onRowDoubleClick"
      />
    </div>

    <ModalWithDelete
      v-show="isModalVisible"
      @close="modalClose"
      @submit="modalSubmit"
      @delete="deleteItem"
    >
      <template v-slot:header>
        <span v-if="form.model.ContractorID">Edit Assigned Clinic Area</span>
        <span v-if="!form.model.ContractorID">Add Assigned Clinic Area</span>
      </template>

      <template v-slot:body>
        <label class="form-custom-label" for="form-Contractor">Contractor</label>
        <model-list-select :list="Contractor_DATA"
                           v-model="form.model.ContractorID"
                           id="form-Contractor"
                           option-value="contractorID"
                           option-text="contractorID"
                           :isError='validationContractor === true'
                           placeholder="select one">
        </model-list-select>
        <label class="form-custom-label" for="form-Clinic">Clinic</label>
        <model-list-select :list="Clinic_Area_DATA"
                           v-model="form.model.ClinicID"
                           id="form-Clinic"
                           option-value="clinicID"
                           option-text="clinicID"
                           :isError='validationClinic === true'
                           placeholder="select one">
        </model-list-select>
      </template>

      <template v-slot:footer>
      </template>
    </ModalWithDelete>

  </div>

</template>

<script>
import axios from '../../../utilities/axios'
import config from '../../../config'
import 'vue-good-table/dist/vue-good-table.css'
import { VueGoodTable } from 'vue-good-table';
import Swal from 'sweetalert2'
import ModalWithDelete from "../../templates/ModalWithDelete.vue";
import {ModelListSelect, ModelSelect} from "vue-search-select";

export default {
  data() {
    return {
      isModalVisible: false,
      DB_DATA: [],
      Contractor_DATA: [],
      Clinic_Area_DATA: [],
      myAPI: `${config.api}/api/Assigned_Clinic_Area`,
      form: {
        model: {
          ContractorID: '',
          // ContractorLName: '',
          // ContractorFName: '',
          ClinicID: '',
          // ClinicAreaName: '',
        }
      },
      dataFields: [{
        label: 'Contractor ID',
        field: 'Contractor.contractorID',
        type: 'number'
      },{
      //   label: 'Contractor LName',
      //   field: 'Contractor.lastName'
      // },{
      //   label: 'Contractor FName',
      //   field: 'Contractor.firstName'
      // },{
        label: 'Clinic ID',
        field: 'Clinic_Area.clinicID',
        type: 'number'
      }
      // {
      //   label: 'Clinic Area Name',
      //   field: 'Clinic_Area.clinicAreaName'
      // }
      ]
    };
  },
  components: {
    ModalWithDelete,
    ModelSelect,
    ModelListSelect,
    'vue-good-table': VueGoodTable
  },
  computed:{
    validationContractor: function () {
      if (this.form.model.contractorID === null){
        return true
      } else {
        return false
      }
    },
    validationClinic: function () {
      if (this.form.model.clinicID === null){
        return true
      } else {
        return false
      }
    },
    validationFormCheck: function () {
      if (this.validationClinic === false && this.validationContractor === false){
        return true
      } else {
        return false
      }
    }
  },
  methods: {
    onRowDoubleClick(params){
      this.form.model.ContractorID = params.row.Contractor.contractorID
      // this.form.model.ContractorLName = params.row.Contractor.lastName
      // this.form.model.ContractorFName = params.row.Contractor.firstName
      this.form.model.ClinicID = params.row.Clinic_Area.clinicID
      // this.form.model.ClinicAreaName = params.row.Clinic_Area.clinicAreaName
      this.loadFields()
      this.modalShow()
    },
    addNewAssignedClinicArea(){
      this.form.model.ContractorID = ''
      this.form.model.ClinicID = ''
      this.loadFields()
      this.modalShow()
    },
    loadData(){
      axios.get(`${config.api}/api/Assigned_Clinic_Area/find`)
        .then((response) => {
          this.DB_DATA = response.data;
        })
        .catch(() => {
          Swal.fire('Error', 'Something went with Assigned Clinic Area', 'error')
        })
    },
    loadFields(){
      axios.get(`${config.api}/api/Contractor/find`)
        .then((response) => {
          this.Contractor_DATA = response.data;
        })
        .catch(() => {
          Swal.fire('Error', 'Something went wrong', 'error')
        })
        axios.get(`${config.api}/api/Clinic_Area/find`)
        .then((response) => {
          this.Clinic_Area_DATA = response.data;
        })
        .catch(() => {
          Swal.fire('Error', 'Something went wrong', 'error')
        })
    },
    deleteItem(){
      axios.delete(`${config.api}/api/Assigned_Clinic_Area/delete/` + this.form.model.ContractorID)
        .then((response) => {
          this.loadData()
          Swal.fire(
            'Done!',
            'The record has been deleted.',
            'success'
          )
          this.loadData();
          this.modalClose()
        })
        .catch(() => {
          Swal.fire('Error', 'Something went wrong', 'error')
        })},
    modalSubmit(){
      if(!this.validationFormCheck) {
        Swal.fire('Error', 'Please fix the errors', 'error')
      } else {
        if(!this.form.model.ContractorID) {
          axios.post(`${config.api}/api/Assigned_Clinic_Area/create`, this.form.model)
            .then((response) => {
              this.loadData()
              Swal.fire(
                'Done!',
                'The record has been created.',
                'success'
              )
              this.loadData();
              this.modalClose()
            })
            .catch(() => {
              Swal.fire('Error', 'Something went wrong (create)', 'error')
            })
        } else {
          axios.put(`${config.api}/api/Assigned_Clinic_Area/update`, this.form.model)
            .then((response) => {
              Swal.fire(
                'Done!',
                'The record has been updated.',
                'success'
              )
              this.loadData();
              this.modalClose()
            })
            .catch(() => {
              Swal.fire('Error', 'Something went wrong (update)', 'error')
            })
        }
      }
    },
    modalShow(){
      this.isModalVisible = true;
    },
    modalClose(){
      this.isModalVisible = false;
    },
  },
  beforeMount() {
    this.loadData();
  }
};
</script>

<style scoped>
</style>
