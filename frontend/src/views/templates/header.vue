<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <ul class="navbar-nav">
      <li class="nav-item">
        <span class="navbar-brand">Frontend</span>
      </li>
      <li class="nav-item">
        <router-link class="nav-link" to="/home">Home</router-link>
      </li>
      <li class="nav-item">
        <router-link class="nav-link" to="/about">About</router-link>
      </li>
      <li class="nav-item">
        <router-link class="nav-link" to="/emr">EMR</router-link>
      </li>
      <li class="nav-item">
        <router-link class="nav-link" to="/hospital">Hospital</router-link>
        <router-link class="nav-link" to="/projectstatus"
          >Project Status</router-link
        >
      </li>
      <li class="nav-item">
        <router-link class="nav-link" to="/contractorstatus"
          >Contractor Status</router-link
        >
      </li>
      <li class="nav-item">
        <router-link class="nav-link" to="/module">Module</router-link>
      </li>
      <li class="nav-item">
        <router-link class="nav-link" to="/airline">Airline</router-link>
      </li>
      <li class="nav-item">
        <router-link class="nav-link" to="/contractor">Contractor</router-link>
      </li>
    </ul>
    <ul class="navbar-nav ml-auto">
      <li class="nav-item">
        <router-link class="nav-link" to="/account">My Account</router-link>
      </li>
      <li class="nav-item">
        <span class="nav-link custom-link" @click="confirmLogout">Logout</span>
      </li>
    </ul>
  </nav>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'HeaderTemplate',
  methods: {
    ...mapActions(['logout']),
    confirmLogout() {
      swal({
        title: 'Are you sure you want to logout?',
        text: '',
        icon: 'warning',
        buttons: {
          cancel: {
            text: 'Cancel',
            visible: true,
          },
          confirm: {
            text: 'Yes',
          },
        },
        dangerMode: true,
      }).then(confirm => {
        if (confirm) {
          this.logout()
        }
      })
    },
  },
}
</script>

<style lang="stylus">
.custom-link {
  cursor: pointer;
}
</style>
