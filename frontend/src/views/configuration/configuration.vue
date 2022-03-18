<template>
  <div>
    <h2>Helpdesk Configuration</h2>
    <br>
    <vue-tabs active-tab-color="#2778c4"
              active-text-color="white"
              type="pills"
              :start-index="1"
              direction="vertical"
    >
      <v-tab title="EMR List">
        <EMR-list />
      </v-tab>
    </vue-tabs>
  </div>
</template>

<script>
import emrList from "./management/emrList.vue";
import {VueTabs, VTab} from 'vue-nav-tabs'
import 'vue-nav-tabs/themes/vue-tabs.css'

export default {
  components: {
    'EMR-list' : emrList,
    VueTabs,
    VTab
  }
}
</script>


<style lang='stylus'>
h2 {
  text-align: center
}
</style>
