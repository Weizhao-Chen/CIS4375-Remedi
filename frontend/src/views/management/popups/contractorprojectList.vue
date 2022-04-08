<template>
  <div>
    <div class="tableHeading">
      <div class="tableHeading-left">
        <span class="tableHeading-text">Contractor Project List</span>
      </div>
      <div class="tableHeading-right">
        <button class="swal2-editform swal2-styled" v-on:click="addNewContractorProject">Add New Contractor Project</button>
      </div>
    </div>
        <!-- :sort-options="{
          enabled: true,
          initialSortBy: {field: form.model.ContractorID, type: 'asc'}
        }" -->
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
      @create="modalCreate"
      @updateleft="modalUpdateLeft"
      @updateright="modalUpdateRight"
      @delete="deleteItem"
    >
      <template v-slot:header>
        <span v-if="form.model.ContractorID">Edit ContractorID </span>
        <span v-if="!form.model.ContractorID">Add ContractorID </span>
      </template>

      <template v-slot:body>
        <label class="form-custom-label" for="form-contractorlist">Contractor</label>
        <model-list-select :list="Contractor_DATA"
                           v-model="form.model.ContractorID"
                           id="form-contractorlist"
                           option-value="contractorID"
                           option-text="contractorID"
                           :isError='validationContractor === true'
                           placeholder="select one">
        </model-list-select>
        <br>
        <label class="form-custom-label" for="form-projectlist">Project</label>
        <model-list-select :list="Project_DATA"
                           v-model="form.model.ProjectID"
                           id="form-projectlist"
                           option-value="projectID"
                           option-text="projectID"
                           :isError='validationProject === true'
                           placeholder="select one">
        </model-list-select>
        <br>
        <br>
      </template>

      <template v-slot:footer>
      </template>
    </ModalWithDelete>

  </div>

</template>

<script>
import axios from '../../../utilities/axios';
import config from '../../../config';
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
      Project_DATA: [],
      myAPI: `${config.api}/api/Contractor_Project`,
      form: {
        model: {
          ContractorID: '',
          ProjectID: '',
        }
      },
      dataFields: [{
        label: 'Contractor ID',
        field: 'Contractor.contractorID'
      },
      // ,{
      //   label: 'Contractor last name',
      //   field: 'Contractor.lastName'
      // },{
      //   label: 'Contractor first name',
      //   field: 'Contractor.firstName'
      // },
      {
        label: 'Project ID',
        field: 'Project.projectID'
      }
      // ,{
      //   label: 'Project name',
      //   field: 'Project.projectName'
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
      if (this.form.model.ContractorID === null){
        return true
      } else {
        return false
      }
    },
    validationProject: function () {
      if (this.form.model.ProjectID === null){
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
    onRowDoubleClick(params){
      // this.form.model.incidentTypeId = params.row.incidentType_id
      // this.form.model.incidentTypeName = params.row.incidentType_name
      this.form.model.ContractorID = params.row.Contractor.contractorID
      this.form.model.ProjectID = params.row.Project.projectID
      this.loadFields()
      this.modalShow()
    },
    addNewContractorProject(){
      // this.form.model.incidentTypeId = null
      // this.form.model.incidentTypeName = ''
      this.form.model.ContractorID = null
      this.form.model.ProjectID = null
      this.loadFields()
      this.modalShow()
    },
    loadData(){
      axios.get(`${config.api}/api/Contractor_Project/find`)
        .then((response) => {
          this.DB_DATA = response.data;
        })
        .catch(() => {
          Swal.fire('Error', 'Something went with Contractor Project', 'error')
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
    },
    deleteItem(){
      axios.delete(`${config.api}/api/Contractor_Project/delete/` + this.form.model.ContractorID, this.form.model.ProjectID)
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
        })
    },
    modalCreate(){
      if(!this.validationFormCheck) {
        Swal.fire('Error', 'Please fix the errors. If the input text box are red then there is no input', 'error')
      } else {
        if(this.form.model.ContractorID != '' && this.form.model.ProjectID != '') {
          console.log(1)
          axios.post(`${config.api}/api/Contractor_Project/create`, this.form.model)
            .then((response) => {
              this.loadData()
              Swal.fire(
                'Done!',
                'The record has been created. (If duplicate inputs are sent, no new data wouold be added)',
                'success'
              )
              this.loadData();
              this.modalClose()
            })
            .catch(() => {
              Swal.fire('Error', 'Something went wrong (create)', 'error')
            })
        }
      }
    },
    modalUpdateLeft(){
      if(!this.validationContractor) {
        Swal.fire('Error', 'Please fix the errors. If the input text box are red then there is no input', 'error')
      } else {
        if(this.form.model.ProjectID != '')
        {
          console.log(2)
          axios.put(`${config.api}/api/Contractor_Project/updatecontractor/` + this.form.model.ContractorID, this.form.model)
            .then((response) => {
              this.loadData()
              Swal.fire(
                'Done!',
                'The record has been updated. (If duplicate inputs are sent, no new data wouold be added)',
                'success',
                
              )
              this.loadData();
              this.modalClose()
            })
            .catch(() => {
              Swal.fire('Error', 'Something went wrong (update contractor)', 'error')
            })
        }
      }
    },
    modalUpdateRight(){
      if(this.validationProject) {
        console.log(this.validationProject)
        Swal.fire('Error', 'Please fix the errors. If the input text box are red then there is no input', 'error')
      } else {
        if(this.form.model.ProjectID != '')
        {
          console.log(3)
          axios.put(`${config.api}/api/Contractor_Project/updateproject/` + this.form.model.ProjectID, this.form.model)
            .then((response) => {
              Swal.fire(
                'Done!',
                'The record has been updated. (If duplicate inputs are sent, no new data wouold be added)',
                'success',
                
              )
              this.loadData();
              this.modalClose()
            })
            .catch(() => {
              Swal.fire('Error', 'Something went wrong (update project)', 'error')
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
    this.loadFields();
  }
};
</script>

<style scoped>
button {
  margin-right: 15px;
  height: 100%;
}
</style>
