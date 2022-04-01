<template>
  <div>
    <h2>Airline Manager</h2>
    <br>
    <airlineList-list />
  </div>
</template>

<script>

import airlineList from "./airlineList.vue";

//Vue.use(Router);

export default {
  components: {
    'airlineList-list' : airlineList
  }
}
</script>

<style lang='stylus'>
h2 {
  text-align: center
}
</style>
