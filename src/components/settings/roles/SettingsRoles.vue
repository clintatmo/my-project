<template>
  <div id="settings-roles">
    <div class="panel panel-default">
      <div class="panel-heading">
        <h3 class="panel-title">Roles</h3>
      </div>
      <div class="panel-body">
        <h1>ROLES</h1>
      </div>
    </div>

  </div>
</template>

<script>

  import Sidebar from 'components/dashboard/Sidebar.vue';

  export default {
    name: 'settings-roles',
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
