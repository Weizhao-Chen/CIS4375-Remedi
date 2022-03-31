<template>
  <div>
    <h2>Rental Car Company Manager</h2>
    <br>
    <locationList-list />
  </div>
</template>

<script>

import rentalcarcompanyList from "./rentalcarcompanyList.vue";

//Vue.use(Router);

export default {
  components: {
    'rentalcarcompanyList-list' : rentalcarcompanyList
  }
}
</script>

<style lang='stylus'>
h2 {
  text-align: center
}
</style>
