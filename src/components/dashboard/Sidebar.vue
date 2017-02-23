<template>
    <div id="sidebar" class="text-center">

        <el-menu default-active="1" class="el-menu-vertical-demo" :router="setRouter" theme="dark" @open="handleOpen" @close="handleClose">

          <el-menu-item index="/news-feed/new">New</el-menu-item>
          <el-menu-item index="/news-feed/history"> History </el-menu-item>
          <el-submenu index="/settings">
            <template slot="title"> Settings</template>
              <el-menu-item index="/settings/modules">  Modules </el-menu-item>
              <el-menu-item index="/settings/privileges"> Privileges </el-menu-item>
              <el-menu-item index="/settings/roles"> Roles </el-menu-item>
              <el-menu-item index="/settings/users"> Users </el-menu-item>
          </el-submenu>
        </el-menu>

    </div>
</template>

<script>
    export default {
      name: 'sidebar',
      data: function () {
        return {
          setRouter: true
        }
      },
      methods: {
        logout: function () {
            this.$auth.destroyToken();
            this.user = {};
            this.$router.push('/auth/login');
        },
        handleOpen(key, keyPath) {
          //console.log(key, keyPath);
        },
        handleClose(key, keyPath) {
          //console.log(key, keyPath);
        }
      }
    }
</script>

<style scoped>
    #sidebar {

    }


</style>
