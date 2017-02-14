<template>
  <div id="settings-modules">
    <div class="panel panel-default">
      <div class="panel-heading">
        <h3 class="panel-title">Modules</h3>
      </div>
      <div class="panel-body">
        <settings-modules-vuetable></settings-modules-vuetable>
      </div>
    </div>

  </div>
</template>

<script>

  import Vue from 'vue'
  import Sidebar from 'components/dashboard/Sidebar.vue';
  import SettingsModulesVuetable from 'components/settings/modules/SettingsModulesVuetable'

  Vue.component('settings-modules-vuetable', SettingsModulesVuetable)

  export default {
    name: 'settings-modules',
    components:[{
      sidebar: Sidebar
    }],
    data: function () {
      return {
        image: null
      }
    }
  }
</script>

<style>

  table.vuetable {
    text-align: left;
  }

</style>
