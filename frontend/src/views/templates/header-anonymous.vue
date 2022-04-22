<template>
<div>
  <b-dropdown id="dropdown-offset" offset="25" text="Hospital Management" class="m-2" variant="primary">
    <b-dropdown-item href="/emr">EMR Manager</b-dropdown-item>
    <b-dropdown-item href="/module">Module Manager</b-dropdown-item>
    <b-dropdown-item href="/hospital">Hospital Manager</b-dropdown-item>
    <b-dropdown-item href="/clinicarea">Clinic Area Manager</b-dropdown-item>
  </b-dropdown>
  <b-dropdown id="dropdown-offset" offset="25" text="Contractor and Project Management" class="m-2" variant="primary">
    <b-dropdown-item href="/contractor">Contractor Manager</b-dropdown-item>
    <b-dropdown-item href="/project">Project Manager</b-dropdown-item>
  </b-dropdown>
  <b-dropdown id="dropdown-offset" offset="25" text="Contractor and Project Status" class="m-2" variant="primary">
    <b-dropdown-item href="/contractorstatus">Contractor Status Manager</b-dropdown-item>
    <b-dropdown-item href="/projectstatus">Project Status Manager</b-dropdown-item>
  </b-dropdown>
  <b-dropdown id="dropdown-offset" offset="25" text="Flight and Car Management" class="m-2" variant="primary">
    <b-dropdown-item href="/flight">Flight Manager</b-dropdown-item>
    <b-dropdown-item href="/rentalcar">Rental Car Manager</b-dropdown-item>
  </b-dropdown>
    <b-dropdown id="dropdown-offset" offset="25" text="Reports" class="m-2" variant="primary">
    <b-dropdown-item href="/cpreport">Contractor Project Report</b-dropdown-item>
    <b-dropdown-item href="/cwreport">Contractor Wisdom Report</b-dropdown-item>
    <b-dropdown-item href="/cpmreport">Contractor Preferred Module Report</b-dropdown-item>
  </b-dropdown>
  <b-dropdown id="dropdown-offset" offset="25" text="Misc" class="m-2" variant="secondary">
    <b-dropdown-item href="/assignedmodule">Assigned Module</b-dropdown-item>
    <b-dropdown-item href="/perferred_modules">Perferred Modules</b-dropdown-item>
  </b-dropdown>
  </div>
</template>

<style lang='stylus'>
</style>