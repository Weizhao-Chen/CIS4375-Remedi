<template>
  <div>
    <h2>Hospital Manager</h2>
    <br>
    <hospitalList-list />
  </div>
</template>

<script>

import hospitalList from "./hospitalList.vue";

//Vue.use(Router);

export default {
  components: {
    'hospitalList-list' : hospitalList
  }
}
</script>

<style lang='stylus'>
h2 {
  text-align: center
}
</style>