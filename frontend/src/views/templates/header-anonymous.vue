<template>
  <div>
    <b-button v-b-toggle.sidebar-variant>Menu</b-button>
    <b-sidebar
      id="sidebar-variant"
      title="Menu"
      bg-variant="dark"
      text-variant="light"
      shadow
    >
      <nav class="mb-3">
        <b-nav vertical>
          <!-- <b-nav-item active @click="hide">Active</b-nav-item> -->
          <b-nav-item href="/home" @click="hide">Home</b-nav-item>
          <b-nav-item href="/hospital" @click="hide">Hospital</b-nav-item>
          <b-nav-item href="/rental-car-co" @click="hide"
            >Rental Car Company</b-nav-item
          >
          <br>
          <b-nav-item href="/emr" @click="hide">EMR</b-nav-item>
          <b-nav-item href="/projectstatus" @click="hide"
            >Project Status</b-nav-item
          >
          <b-nav-item href="/contractorstatus" @click="hide"
            >Contractor Status</b-nav-item
          >
          <br>
          <b-nav-item href="/module" @click="hide">Module</b-nav-item>
          <b-nav-item href="/airline" @click="hide">Airline</b-nav-item>
          <b-nav-item href="/contractor" @click="hide">Contractor</b-nav-item>
          <b-nav-item href="/project" @click="hide">Project</b-nav-item>
          <b-nav-item href="/contractorproject" @click="hide"
            >Contractor Project</b-nav-item
          >
          <br>
          <b-nav-item href="/clinicarea" @click="hide">Clinic Area</b-nav-item>
          <b-nav-item href="/assignedclinicarea" @click="hide"
            >Assigned Clinic Area</b-nav-item
          >
          <b-nav-item href="/perferred_modules" @click="hide"
            >Perferred Modules</b-nav-item
          >
          <b-nav-item href="/flight" @click="hide">Flight</b-nav-item>
          <br>
          <b-nav-item href="/rentalcar" @click="hide">Rental Car</b-nav-item>
          <br>
          <b-nav-item href="/hospital" @click="hide">Hospital</b-nav-item>
          <br>
          <b-nav-item href="/cpreport" @click="hide">Contractor Project Report</b-nav-item>
          <b-nav-item href="/cwreport" @click="hide">Contractor Wisdom Report</b-nav-item>
        </b-nav>
      </nav>
    </b-sidebar>
  </div>
</template>
