<template>
  <div>
    <h2>Rental Car Manager</h2>
    <br>
    <rentalcarList-list />
  </div>
</template>

<script>

import rentalcarList from "./rentalcarList.vue";

//Vue.use(Router);

export default {
  components: {
    'rentalcarList-list' : rentalcarList
  }
}
</script>

<style lang='stylus'>
h2 {
  text-align: center
}
</style>