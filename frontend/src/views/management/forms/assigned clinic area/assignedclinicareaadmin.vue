<template>
  <div>
    <h2>Assigned Clinic Area Manager</h2>
    <br>
    <assignedclinicareaList-list />
  </div>
</template>

<script>

import assignedclinicareaList from "./assignedclinicareaList.vue";

//Vue.use(Router);

export default {
  components: {
    'assignedclinicareaList-list' : assignedclinicareaList
  }
}
</script>

<style lang='stylus'>
h2 {
  text-align: center
}
</style>
