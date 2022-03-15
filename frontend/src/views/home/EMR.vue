<template>
  <div>
    <div class="tableHeading">
      <div class="tableHeading-left">
        <span class="tableHeading-text">Asset Status List</span>
      </div>
      <div class="tableHeading-right">
        <button class="swal2-editform swal2-styled" v-on:click="add">Add new emr</button>
      </div>
    </div>

    <!-- <div>
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
          initialSortBy: {field: 'assetStatus_id', type: 'asc'}
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
    </div> -->

    <ModalWithDelete
      v-show="isModalVisible"
      @close="modalClose"
      @submit="modalSubmit"
      @delete="deleteItem"
    >
      <template v-slot:header>
        <span v-if="form.model.emrID">Edit EMR</span>
        <span v-if="!form.model.emrID">Add EMR</span>
      </template>
    </ModalWithDelete>

  </div>

</template>

<script>
import { VueGoodTable } from 'vue-good-table';
import axios from '../../utilities/axios';
import config from '../../../config';
import 'vue-good-table/dist/vue-good-table.css'

// eslint-disable-next-line import/order
import Swal from 'sweetalert2'
// eslint-disable-next-line import/no-unresolved
// import ModalWithDelete from "../templates/ModalWithDelete.vue";
// eslint-disable-next-line import/order
// eslint-disable-next-line import/no-unresolved
// eslint-disable-next-line import/order
// eslint-disable-next-line import/no-unresolved
// import {ModelListSelect, ModelSelect} from "vue-search-select";

export default {
  components: {
    // ModalWithDelete,
    // ModelSelect,
    // ModelListSelect,
    'vue-good-table': VueGoodTable
  },
  data() {
    return {
      isModalVisible: false,
      validation1: {},
      DB_DATA: [],
      myAPI: `${config.api}/api/assetStatus`,
      form: {
        model: {
          assetStatusId: '',
          assetStatusName: '',
        }
      },
      dataFields: [{
        label: 'id',
        field: 'EMR',
        type: 'number'
      },{
        label: 'name',
        field: 'emrName'
      }]
    };
  },
  beforeMount() {
    this.loadData();
  },
  methods: {
    onRowDoubleClick(params){
      this.form.model.emrID = params.row.emrID
      this.form.model.emrName = params.row.emrName
      this.modalShow()
    },
    add(){
      this.form.model.emrID = null
      this.form.model.emrName = ''
      this.modalShow()
    },
    loadData(){
      axios.get(`${config.api}/api/EMR/find`)
        .then((response) => {
          this.DB_DATA = response.data;
        })
        .catch(() => {
          Swal.fire('Error', 'Something went wrong', 'error')
        })
    },
    deleteItem(){
      axios.delete(`${config.api}/api/EMR/delete/${  this.form.model.emrID}`)
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
        Swal.fire('Error', 'Something went wrong', 'error')
      } else if(!this.form.model.emrID) {
          axios.post(`${config.api}/api/EMR/create`, this.form.model)
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
          axios.put(`${config.api}/api/EMR/update`, this.form.model)
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
    },
    modalShow(){
      this.isModalVisible = true;
    },
    modalClose(){
      this.isModalVisible = false;
    },
  },
};
</script>

<style scoped>
</style>