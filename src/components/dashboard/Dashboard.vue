<template>
    <div id="dashWrap">
        <div class="container">
          <div class="row">
            <nav class="navbar navbar-default">
              <div class="container-fluid">
                <!-- Brand and toggle get grouped for better mobile display -->
                <div class="navbar-header">
                  <a class="navbar-brand" href="#">iProject</a>
                </div>

                <!-- Collect the nav links, forms, and other content for toggling -->
                <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                  <ul class="nav navbar-nav navbar-right">
                    <router-link tag="li" to="/news-feed"><a><i class="fa fa-newspaper-o"></i> News feed</a></router-link>
                    <router-link tag="li" to="/settings"><a><i class="fa fa-cog"></i> Settings</a></router-link>
                    <li class="dropdown">
                      <a class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">{{ $t('global.language', {'type': 'nice'}) }}<span class="caret"></span></a>
                      <ul class="dropdown-menu">
                        <li><a href="#" @click.prevent="$i18n.set('en')"><i class="fa fa-flag-o"></i> English</a></li>
                        <li><a href="#" @click.prevent="$i18n.set('nl')"><i class="fa fa-flag-o"></i> Dutch</a></li>
                      </ul>
                    </li>
                    <li class="dropdown">
                      <a class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">user <span class="caret"></span></a>
                      <ul class="dropdown-menu">
                        <li><a href="#" @click.prevent="logout"><i class="fa fa-power-off"></i> Logout</a></li>
                      </ul>
                    </li>
                  </ul>
                </div><!-- /.navbar-collapse -->
              </div><!-- /.container-fluid -->
            </nav>
          </div>
          <div class="row">
            <transition name="fade">
              <router-view></router-view>
            </transition>
          </div>
        </div>
    </div>
</template>

<script>

    export default {
        name: 'dashboard',
        components: {
        },
        data: function () {
          return {
          }
        },
        computed: {
          user: function () {
            return null;
          }
        },
        methods: {
          logout: function () {
            this.user = {};
            alertify.success("You have been logged out!");
            this.$router.push('/auth/login');
          }
        }
    }
</script>

<style scoped>
    #dashWrap {
        min-height: 100%;
        padding-top: 5px;
        background: #748B9E; /* fallback for old browsers */
        background: -webkit-linear-gradient(to left, #2E7A91 , #48849C); /* Chrome 10-25, Safari 5.1-6 */
        background: linear-gradient(to left, #2E7A91 , #48849C); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
    }
</style>
