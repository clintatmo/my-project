<template>
    <div id="dashWrap">
      <el-row>
        <el-col :span="24">
          <el-menu :default-active="activeIndex2" class="el-menu-demo" router="true" theme="dark" mode="horizontal" @select="handleSelect">
          <el-menu-item index="/auth/login">iProject</el-menu-item>
          <el-menu-item index="/news-feed"><i class="fa fa-newspaper-o"></i> News feed</el-menu-item>
          <el-menu-item index="/settings"><i class="fa fa-cog"></i> Settings</el-menu-item>
          <el-submenu index="4">
            <template slot="title">Language</template>
            <el-menu-item index="4-1">English</el-menu-item>
            <el-menu-item index="4-2">Dutch</el-menu-item>
          </el-submenu>
          <el-submenu index="5">
            <template slot="title">{{user}}</template>
            <el-menu-item index="5-1" @click="logout"><i class="fa fa-power-off"></i> Logout</el-menu-item>
          </el-submenu>
        </el-menu>
        </el-col>
      </el-row>
      <el-row style="margin-top: 5px">
        <el-col :span="24">

        </el-col>
      </el-row>
      <el-row>
        <transition name="fade">
          <router-view></router-view>
        </transition>
      </el-row>
    </div>
</template>

<script>

    export default {
        name: 'dashboard',
        components: {
        },
        data: function () {
          return {
            loggedIn: this.$auth.loggedIn(),
            activeIndex: '1',
            activeIndex2: '1'
          }
        },
        computed: {
          user: function () {
            return this.$store.state.currentUser;
          }
        },
        created: function () {
          if (this.$auth.loggedIn()) {
          } else {
            this.$store.commit('clearCurrentUser');
          }
        },
        methods: {
          logout: function () {
            this.$auth.destroyToken();
            this.user = {};
            this.$router.push('/auth/login');

          },
          handleSelect(key, keyPath) {
            console.log(key, keyPath);
          }
        }
    }
</script>

<style scoped>
    #dashWrap {
        min-height: 100%;
        padding-top: 0px;
        background: #748B9E; /* fallback for old browsers */
        background: -webkit-linear-gradient(to left, #2E7A91 , #48849C); /* Chrome 10-25, Safari 5.1-6 */
        background: linear-gradient(to left, #2E7A91 , #48849C); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
    }
</style>
