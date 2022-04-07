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
      </li>
      <li class="nav-item">
        <router-link class="nav-link" to="/rental-car-co"
          >Rental Car Company</router-link
        >
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
        <router-link class="nav-link" to="/contractor">Contractor</router-link>
      </li>
      <li class="nav-item">
        <router-link class="nav-link" to="/project">Project</router-link>
      </li>
      <li class="nav-item">
        <router-link class="nav-link" to="/clinicarea">Clinic Area</router-link>
      </li>
    </ul>
    <ul class="navbar-nav ml-auto">
      <li class="nav-item">
        <router-link class="nav-link" to="/auth/login">Login</router-link>
      </li>
      <li class="nav-item">
        <router-link class="nav-link" to="/auth/register">Register</router-link>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: 'HeaderTemplateAnonymous',
}
</script>

<style lang="stylus"></style>
