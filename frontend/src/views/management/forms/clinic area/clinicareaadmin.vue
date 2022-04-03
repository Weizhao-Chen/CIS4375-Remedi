<template>
  <div>
    <h2>Clinic Area Manager</h2>
    <br>
    <clinicareaList-list />
  </div>
</template>

<script>

import clinicareaList from "./clinicareaList.vue";

//Vue.use(Router);

export default {
  components: {
    'clinicareaList-list' : clinicareaList
  }
}
</script>

<style lang='stylus'>
h2 {
  text-align: center
}
</style>