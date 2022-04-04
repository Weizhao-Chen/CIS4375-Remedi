<template>
  <div>
    <h2>Assigned Module Manager</h2>
    <br>
    <assignedmoduleList-list />
  </div>
</template>

<script>

import assignedmoduleList from "./assignedmoduleList.vue";

//Vue.use(Router);

export default {
  components: {
    'assignedmoduleList-list' : assignedmoduleList
  }
}
</script>

<style lang='stylus'>
h2 {
  text-align: center
}
</style>
