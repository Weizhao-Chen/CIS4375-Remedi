<template>
  <div>
    <h2>Hotel Manager</h2>
    <br>
    <hotelList-list />
  </div>
</template>

<script>

import hotelList from "./hotelList.vue";

//Vue.use(Router);

export default {
  components: {
    'hotelList-list' : hotelList
  }
}
</script>

<style lang='stylus'>
h2 {
  text-align: center
}
</style>