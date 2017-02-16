<template>
  <div id="settings-modules">
    <div class="panel panel-default">
      <div class="panel-heading">
        <h3 class="panel-title">Modules</h3>
      </div>
      <div class="panel-body">
        <div id="vue-tables-options">
          <v-client-table :data="tableData" :columns="columns" :options="options"></v-client-table>
        </div>
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
        tableData:[],
        options: {
          // see the options API
          perPage: 2,
          texts:{
            count:'Showing {from} to {to} of {count} records|{count} records|One record',
            filter:'',
            filterPlaceholder:'Search..',
            limit:'Records:',
            noResults:'No matching records',
            page:'Page:', // for dropdown pagination
            filterBy: 'Filter by {column}', // Placeholder for search fields when filtering by column
            loading:'Loading...', // First request to server
            defaultOption:'Select {column}' // default option for list filters
          }

        }
      }
    },
    methods:{
        loadData: function () {
          this.$http.get("/api/module")
            .then(function (res) {
                //console.log(res);
              this.tableData = res.data;
            })
        }
    }
  }
</script>

<style>

  #vue-tables-options {
    text-align: center;
  }

  table {
    text-align: left;
  }

  h2 {
    margin-bottom: 10px;
  }

  thead tr:nth-child(2) th {
    font-weight: normal;
  }

  .VueTables__sortable {
    cursor: pointer;
  }

</style>
