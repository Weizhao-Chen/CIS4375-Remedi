<template>
  <div>
    <h2>Assigned Contractor Project Manager</h2>
    <br>
    <contractorprojectList-list />
  </div>
</template>

<script>

import contractorprojectList from "./contractorprojectList.vue";

//Vue.use(Router);

export default {
  components: {
    'contractorprojectList-list' : contractorprojectList
  }
}
</script>

<style lang='stylus'>
h2 {
  text-align: center
}
</style>
