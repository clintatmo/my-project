<template>
    <div id="sidebar" class="text-center">
      <div class="list-group">
        <router-link to="/news-feed/new" class="list-group-item"><span class="badge">14</span>New</router-link>
        <router-link to="/news-feed/history" class="list-group-item"><span class="badge">0</span>History</router-link>
        <router-link to="/settings/modules" class="list-group-item"><span class="badge">0</span>Modules</router-link>
        <router-link to="/settings/privileges" class="list-group-item"><span class="badge">0</span>Privileges</router-link>
        <router-link to="/settings/roles" class="list-group-item"><span class="badge">0</span>Roles</router-link>
        <router-link to="/settings/users" class="list-group-item"><span class="badge">0</span>Users</router-link>
      </div>
      <div class="panel panel-default">
        <div class="panel-heading">
          <h4 class="panel-title">
            <a data-toggle="collapse" data-parent="#accordion" href="#collapseFour"><span class="glyphicon glyphicon-file">
                            </span>Reports</a>
          </h4>
        </div>
        <div id="collapseFour" class="panel-collapse collapse">
          <div class="panel-body">

          </div>
        </div>
      </div>
    </div>
</template>

<script>
    export default {
        name: 'sidebar',
        methods: {
            logout: function () {
                this.$auth.destroyToken();
                this.user = {};
                this.$router.push('/auth/login');
            }
        }
    }
</script>

<style scoped>
    #sidebar {

    }


</style>
