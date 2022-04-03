<template>
  <div>
    <h2>Module Manager</h2>
    <br>
    <moduleList-list />
  </div>
</template>

<script>

import moduleList from "./moduleList.vue";

//Vue.use(Router);

export default {
  components: {
    'moduleList-list' : moduleList
  }
}
</script>

<style lang='stylus'>
h2 {
  text-align: center
}
</style>
