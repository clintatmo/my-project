<template>
  <div id="settings-admin">
    <div class="panel panel-default">
      <div class="panel-heading">
        <h3 class="panel-title">Modules</h3>
      </div>
      <div class="panel-body">
        <h1>MODULES</h1>
      </div>
    </div>

  </div>
</template>

<script>

  import Sidebar from 'components/dashboard/Sidebar.vue';

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

<style scoped>


</style>
