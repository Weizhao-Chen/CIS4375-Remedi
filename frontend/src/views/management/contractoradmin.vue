<template>
  <div>
    <h2>Contractor Manager</h2>
    <br>
    <contractorList-list />
  </div>
</template>

<script>

import contractorList from "./contractorList.vue";

//Vue.use(Router);

export default {
  components: {
    'contractorList-list' : contractorList
  }
}
</script>

<style lang='stylus'>
h2 {
  text-align: center
}
</style>