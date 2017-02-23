<template xmlns:>
  <div id="settings-modules">
    <div class="panel panel-default">
      <div class="panel-heading">
        <h3 class="panel-title">Modules</h3>
      </div>
      <div class="panel-body">
        <div id="vue-tables-options">
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
                <el-button @click="loadFormWithData(scope.row), dialogFormVisible = true" type="text" size="small">Edit</el-button>
                <el-button @click="dialogFormVisible = true, clearForm" type="text" size="small">New</el-button>
                <el-button @click="deleteModule(scope.row)" type="text" size="small">Delete</el-button>
              </template>
            </el-table-column>
          </el-table>

          <el-dialog :title="formTitle" v-model="dialogFormVisible">
            <hr>
            <el-form ref="form" label-position="left" :model="module" label-width="120px">
              <el-form-item label="Name">
                <el-input v-model="module.name"></el-input>
              </el-form-item>
              <el-form-item label="Description">
                <el-input type="textarea" v-model="module.description"></el-input>
              </el-form-item>
            </el-form>
            <hr>
            <span slot="footer" class="dialog-footer">
              <el-button-group>
                <el-button type="success" @click="clearForm">New</el-button>
                <el-button type="primary" @click="updateModule">Save</el-button>
                <el-button type="default" @click="dialogFormVisible = false">Cancel</el-button>
              </el-button-group>
            </span>
          </el-dialog>

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
        disableForm:true,
        dialogFormVisible: false,
        form: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        },
        formLabelWidth: '120px',
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
          this.disableForm = false;
        },
        clearForm: function () {
          this.module= {
            id:null,
            name:"",
            description:"",
            deleted:false
          };

          this.formTitle = 'New module';
          this.disableForm = false;

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
