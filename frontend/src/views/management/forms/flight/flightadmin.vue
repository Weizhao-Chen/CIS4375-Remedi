<template>
  <div>
    <h2>Flight Manager</h2>
    <br>
    <projectList-list />
  </div>
</template>

<script>

import flightList from "./flightList.vue";

//Vue.use(Router);

export default {
  components: {
    'flightList-list' : flightList
  }
}
</script>

<style lang='stylus'>
h2 {
  text-align: center
}
</style>