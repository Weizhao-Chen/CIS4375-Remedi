<template>
  <div>
    <h2>Project Manager</h2>
    <br>
    <projectList-list />
  </div>
</template>

<script>

import projectList from "./projectList.vue";

//Vue.use(Router);

export default {
  components: {
    'projectList-list' : projectList
  }
}
</script>

<style lang='stylus'>
h2 {
  text-align: center
}
</style>