<template>
  <div id="settings-modules">
    <div class="panel panel-default">
      <div class="panel-heading">
        <h3 class="panel-title">Modules</h3>
      </div>
      <div class="panel-body">
        <v-server-table url="/api/module" :columns="columns" :options="options"></v-server-table>
      </div>
    </div>

  </div>
</template>

<script>

  import Vue from 'vue'
  import Sidebar from 'components/dashboard/Sidebar.vue';

  export default {
    name: 'settings-modules',
    components:[{
      sidebar: Sidebar
    }],
    created: function () {
        this.loadData();
    },
    data: function () {
      return {
        columns:['id','name','description', 'deleted'],
        options: {
          // see the options API
          responseAdapter: function(resp) {
              return {
              data: resp,
              count: 2
            }
          }
        }
      }
    },
    methods:{
        loadData: function () {
          this.$http.get("/api/module")
            .then(function (res) {
              this.tableData = res.data.content;
            })
        }
    }
  }
</script>

<style>

  table.vuetable {
    text-align: left;
  }

</style>
