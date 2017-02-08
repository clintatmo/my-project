<template>
    <div id="newsfeed">
      <div class="col-md-3">
        <sidebar></sidebar>
      </div>

      <div class="col-md-9 mainView">
        <transition name="fade">
          <router-view></router-view>
        </transition>
      </div>
    </div>
</template>

<script>
  import Sidebar from 'components/dashboard/Sidebar.vue';

  export default {
        name: 'news-feed',
        components:{
              sidebar: Sidebar
        }
    }
</script>

<style scoped>
  .mainView {
  }
</style>
