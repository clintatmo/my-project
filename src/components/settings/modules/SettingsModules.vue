<template xmlns:>
  <div id="settings-modules">
    <div class="panel panel-default">
      <div class="panel-heading">
        <h3 class="panel-title">Modules</h3>
      </div>
      <div class="panel-body">
        <div id="vue-tables-options">
          <!--<v-client-table :data="tableData" :columns="columns" :options="options"></v-client-table>-->
          <el-table
            :data="tableData"
            border
            stripe
            filter
            style="width: 100%">
            <el-table-column
              prop="id"
              label="Id">
            </el-table-column>
            <el-table-column
              prop="name"
              label="Name">
            </el-table-column>
            <el-table-column
              prop="description"
              label="Description">
            </el-table-column>
            <el-table-column
              label="Operations">
              <template scope="scope">
                <el-button @click="loadFormWithData(scope.row)" type="text" size="small">Edit</el-button>
                <el-button @click="deleteModule(scope.row)" type="text" size="small">Delete</el-button>
              </template>
            </el-table-column>
          </el-table>
          <div class="well">
            <form class="form-horizontal">
              <fieldset>

                <!-- Form Name -->
                <legend><strong>{{formTitle}}</strong></legend>

                <!-- Text input-->
                <div class="form-group">
                  <div class="col-md-5">
                    <input  type="hidden" class="form-control input-md" v-model="module.id">
                  </div>
                </div>

                <!-- Text input-->
                <div class="form-group">
                  <label for="name" class="col-md-2 control-label">Name</label>
                  <div class="col-md-5">
                    <input id="name"  type="text" placeholder="Name" class="form-control input-md" v-model="module.name" required>
                  </div>
                </div>

                <!-- Text input-->
                <div class="form-group">
                  <label for="description" class="col-md-2 control-label">Description</label>
                  <div class="col-md-5">
                    <input id="description"  type="text" placeholder="Description" class="form-control input-md" v-model="module.description" required>
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

  Vue.component('modal', {
    template: '#modal-template'
  })

  Vue.component('deleteModule', {
    props:['data'],
    template:`<button @click='erase' class="btn btn-primary btn-sm"><i class="glyphicon glyphicon-trash"></i></button>`,
    methods:{
      erase() {
        this.$parent.$options.parent.deleteModule(this.data.id);
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
    created: function () {
        this.loadData();
    },
    data: function () {
      return {
        tableData:[],
        formTitle:'Module details',
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
          this.formTitle = 'Edit module';
          this.module = obj;
        },
        clearForm: function () {
          this.module= {
            id:null,
            name:"",
            description:"",
            deleted:false
          };

          this.formTitle = 'New module';
        },
        updateModule: function () {

          if(this.module.id){
            this.$http.put("/api/module/"+ this.module.id, this.module)
              .then(function (res) {
                //console.log(res);
                this.loadData();
                alertify.success('Updated!');
              })
          }else{
              this.createModule();
          }


        },
        createModule: function () {
          this.$http.post("/api/module", this.module)
            .then(function (res) {
              //console.log(res);
              this.loadData();
              this.module = {};
              alertify.success('Saved!');
            })
        },
        deleteModule: function (obj) {
          this.$http.delete("/api/module/"+ obj.id)
            .then(function (res) {
              //console.log(res);
              this.loadData();
              alertify.success('Deleted!');
            })
        }
    }
  }
</script>

<style>


</style>
