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
          <!-- <b-nav-item href="/home" @click="hide">Home</b-nav-item> -->
          <br>
          <!-- Medical related stuff -->
          <b-nav-item-dropdown
            id = "medical-dropdown"
            text="EMR related"
            toggle-class="nav-link-custom"
            left
            >
            <b-dropdown-item href="/emr" @click="hide">EMR</b-dropdown-item>
            <b-dropdown-item href="/module" @click="hide">Module</b-dropdown-item>
          </b-nav-item-dropdown>
          <br>
          <!-- Contractor and Project -->
          <b-nav-item-dropdown
            id = "contractor/project-dropdown"
            text="Contractor and Project"
            toggle-class="nav-link-custom"
            left
            >
            <b-dropdown-item href="/contractor" @click="hide">Contractor</b-dropdown-item>
            <b-dropdown-item href="/project" @click="hide">Project</b-dropdown-item>
          </b-nav-item-dropdown>
          <br>
          <!-- Contractor and Project Status -->
          <b-nav-item-dropdown
            id = "status-dropdown"
            text="Contractor and Project Status"
            toggle-class="nav-link-custom"
            left
            >
            <b-dropdown-item href="/contractorstatus" @click="hide">Contractor Status</b-dropdown-item>
            <b-dropdown-item href="/projectstatus" @click="hide">Project Status</b-dropdown-item>
          </b-nav-item-dropdown>
          <!-- <b-nav-item href="/emr" @click="hide">EMR</b-nav-item> -->
          <!-- <b-nav-item href="/projectstatus" @click="hide"
            >Project Status</b-nav-item
          >
          <b-nav-item href="/contractorstatus" @click="hide"
            >Contractor Status</b-nav-item
          > -->
          <br>
          <!-- <b-nav-item href="/module" @click="hide">Module</b-nav-item> -->
          <!-- <b-nav-item href="/contractor" @click="hide">Contractor</b-nav-item>
          <b-nav-item href="/project" @click="hide">Project</b-nav-item> -->
          <b-nav-item href="/contractorproject" @click="hide"
            >Contractor Project</b-nav-item
          >
          <br>
          <b-nav-item href="/clinicarea" @click="hide">Clinic Area</b-nav-item>
          <b-nav-item href="/assignedclinicarea" @click="hide"
            >Assigned Clinic Area</b-nav-item
          >
          <!-- <b-nav-item href="/perferred_modules" @click="hide"
            >Perferred Modules</b-nav-item
          > not sure if we still needed this since we have a /cpmreport at the bottom-->
          <b-nav-item href="/flight" @click="hide">Flight</b-nav-item>
          <br>
          <b-nav-item href="/rentalcar" @click="hide">Rental Car</b-nav-item>
          <br>
          <b-nav-item href="/hospital" @click="hide">Hospital</b-nav-item>
          <br>
          <!-- Contractor and Project -->
          <b-nav-item-dropdown
            id = "contractor/project-dropdown"
            text="Contractor and Project"
            toggle-class="nav-link-custom"
            left
            >
            <b-dropdown-item href="/contractor" @click="hide">Contractor</b-dropdown-item>
            <b-dropdown-item href="/project" @click="hide">Project</b-dropdown-item>
          </b-nav-item-dropdown>
          <b-nav-item href="/cpreport" @click="hide">Contractor Project Report</b-nav-item>
          <b-nav-item href="/cwreport" @click="hide">Contractor Wisdom Report</b-nav-item>
          <b-nav-item href="/cpmreport" @click="hide">Contractor Preferred Module Report</b-nav-item>
        </b-nav>
      </nav>
    </b-sidebar>
  </div>
</template>
