<template>
  <div>
    <h2>Contractor Project Test Manager</h2>
    <br>
    <cplist-list />
  </div>
</template>

<script>

import cplist from "./cplist.vue";

//Vue.use(Router);

export default {
  components: {
    'cplist-list' : cplist
  }
}
</script>

<style lang='stylus'>
h2 {
  text-align: center
}
</style>