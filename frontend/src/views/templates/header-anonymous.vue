<template>
<div>
  <b-dropdown id="dropdown-offset" offset="25" text="Hospital Management" class="m-2" variant="primary">
    <b-dropdown-item href="/emr">EHR</b-dropdown-item>
    <b-dropdown-item href="/module">Module</b-dropdown-item>
    <b-dropdown-item href="/hospital">Hospital</b-dropdown-item>
    <b-dropdown-item href="/clinicarea">Clinic Area</b-dropdown-item>
  </b-dropdown>
  <b-dropdown id="dropdown-offset" offset="25" text="Contractor and Project Management" class="m-2" variant="primary">
    <b-dropdown-item href="/contractor">Contractor</b-dropdown-item>
    <b-dropdown-item href="/project">Project</b-dropdown-item>
  </b-dropdown>
  <b-dropdown id="dropdown-offset" offset="25" text="Contractor and Project Status" class="m-2" variant="primary">
    <b-dropdown-item href="/contractorstatus">Contractor Status</b-dropdown-item>
    <b-dropdown-item href="/projectstatus">Project Status</b-dropdown-item>
  </b-dropdown>
  <b-dropdown id="dropdown-offset" offset="25" text="Flight/Car/Hotel Management" class="m-2" variant="primary">
    <b-dropdown-item href="/flight">Flight</b-dropdown-item>
    <b-dropdown-item href="/rentalcar">Rental Car</b-dropdown-item>
    <b-dropdown-item href="/hotel">Hotel</b-dropdown-item>
  </b-dropdown>
    <b-dropdown id="dropdown-offset" offset="25" text="Reports" class="m-2" variant="primary">
    <b-dropdown-item href="/cpreport">Contractor Project Report</b-dropdown-item>
    <b-dropdown-item href="/cwreport">Contractor Wisdom Report</b-dropdown-item>
    <b-dropdown-item href="/cpmreport">Contractor Preferred Module Report</b-dropdown-item>
  </b-dropdown>
  <b-dropdown id="dropdown-offset" offset="25" text="Misc" class="m-2" variant="secondary">
    <b-dropdown-item href="/assignedclinicarea">Assigned Clinic Area</b-dropdown-item>
    <b-dropdown-item href="/contractorproject">Contractor Project</b-dropdown-item>
    <b-dropdown-item href="/contractor_flight">Contractor Flight</b-dropdown-item>
    <b-dropdown-item href="/contractor_hotel">Contractor Hotel</b-dropdown-item>
    <b-dropdown-item href="/assignedrentalcar">Assigned Rental Car</b-dropdown-item>
    <b-dropdown-item href="/assignedmodule">Assigned Module</b-dropdown-item>
    <b-dropdown-item href="/perferred_modules">Perferred Modules</b-dropdown-item>
  </b-dropdown>
  <b-dropdown id="dropdown-offset" offset="25" text="Others/Help" class="m-2" variant="secondary">
    <b-dropdown-item href="/about">About</b-dropdown-item>
    <b-dropdown-item href="/manual">Manuals</b-dropdown-item>
  </b-dropdown>
  </div>
</template>

<style lang='stylus'>
</style>