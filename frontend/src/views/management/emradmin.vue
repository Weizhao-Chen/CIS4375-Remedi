<template>
  <div>
    <h2>EMR Manager</h2>
    <br>
    <emrList-list />
  </div>
</template>

<script>

import emrList from "./emrList.vue";

//Vue.use(Router);

export default {
  components: {
    'emrList-list' : emrList
  }
}
</script>

<style lang='stylus'>
h2 {
  text-align: center
}
</style>
