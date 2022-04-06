import Vue from 'vue'

import 'bootswatch/dist/lux/bootstrap.min.css'
import 'vue-search-select/dist/VueSearchSelect.css'
import './assets/css/animations.styl'
import './assets/css/pace.styl'
import './assets/css/index.styl'
import './utilities/pace-config'
import './assets/js/pace.min'
import './utilities'

import VueFormulate from '@braid/vue-formulate'
//import VeeValidate from 'vee-validate'
import App from './App.vue'
import store from './store'
import router from './router'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'

// Import Bootstrap an BootstrapVue CSS files (order is important)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)

//Vue.use(VeeValidate)
Vue.use(VueFormulate)
// eslint-disable-next-line
new Vue({
  el: '#app',
  store,
  router,
  components: {
    App,
    VueFormulate,
  },
  template: '<App/>',
})
