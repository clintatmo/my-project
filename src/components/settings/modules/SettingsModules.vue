<template xmlns:>
  <div id="settings-modules">
    <div class="panel panel-default">
      <div class="panel-heading">
        <h3 class="panel-title">Modules</h3>
      </div>
      <div class="panel-body">
        <div id="vue-tables-options">
          <v-client-table :data="tableData" :columns="columns" :options="options"></v-client-table>
          <div class="well">
            <form class="form-horizontal">
              <fieldset>

                <!-- Form Name -->
                <legend>Module details</legend>

                <!-- Text input-->
                <div class="form-group">
                  <div class="col-md-5">
                    <input  type="hidden" class="form-control input-md" v-model="module.id">
                  </div>
                </div>

                <!-- Text input-->
                <div class="form-group">
                  <div class="col-xs-5 col-md-5">
                    <label for="name" class="control-label">Name</label>
                    <input id="name"  type="text" placeholder="Name" class="form-control input-md" v-model="module.name">
                  </div>
                </div>

                <!-- Text input-->
                <div class="form-group">
                  <div class="col-xs-5 col-md-5">
                    <label for="description" class="control-label">Description</label>
                    <input id="description"  type="text" placeholder="Description" class="form-control input-md" v-model="module.description">
                  </div>
                </div>

                <legend></legend>

                <!-- Button -->
                <div class="form-group">
                  <div class="btn-group pull-right">
                    <a id="btnClearModuleForm" @click='clearForm' class="btn btn-primary">New</a>
                    <a id="btnSaveModule" @click='updateModule' class="btn btn-primary">Save</a>
                  </div>
                </div>


              </fieldset>
            </form>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>

  import Vue from 'vue'
  import Sidebar from 'components/dashboard/Sidebar.vue';

  Vue.component('deleteModule', {
    props:['data'],
    template:`<button @click='erase' class="btn btn-primary btn-sm"><i class="glyphicon glyphicon-trash"></i></button>`,
    methods:{
      erase() {
        let id = this.data.id;
        // delete the item
        console.log(id);
      }
    }
  });

  Vue.component('editModule', {
    props:['data'],
    template:`<button @click='edit' class="btn btn-primary btn-sm"><i class="glyphicon glyphicon-edit"></i></button>`,
    methods:{
      edit() {
        this.$parent.$options.parent.loadFormWithData(this.data);
      }
    }
  });

  export default {
    name: 'settings-modules',
    components:[{
      sidebar: Sidebar
    }],
    ready: function() {
      this.$on('vue-tables.row-click', function(row) {
        console.log(row);
      });
    },
    created: function () {
        this.loadData();
    },
    data: function () {
      return {
        columns:['id','name','description', 'edit', 'erase'],
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
          },
          compileTemplates: true,
          filterByColumn: false,
          datepickerOptions: {
            showDropdowns: true
          },
          headings: {
            id: 'Id',
            name: 'Name',
            description: 'Description',
            deleted: 'Deleted',
            edit: 'Edit',
            erase: 'Delete'
          },
          templates: {
            edit: 'editModule',
            erase: 'deleteModule'
          }

        },
        module: {
          id:null,
          name:"",
          description:"",
          deleted:false
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
        },
        loadFormWithData: function (obj) {
          this.module = obj;
        },
        clearForm: function () {
          this.module= {
            id:0,
            name:"",
            description:"",
            deleted:false
          };
        },
        updateModule: function () {
          this.$http.put("/api/module/"+ this.module.id, this.module)
            .then(function (res) {
              //console.log(res);
              this.loadData();
              alertify.success('Saved!');
            })
        },
        createModule: function () {
          this.$http.post("/api/module", this.module)
            .then(function (res) {
              //console.log(res);
              this.loadData();
              this.module = {};
              alertify.success('Saved!');
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
