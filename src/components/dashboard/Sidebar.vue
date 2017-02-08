<template>
    <div id="sidebar" class="text-center">
      <div class="list-group">
        <router-link to="/news-feed/new" class="list-group-item"><span class="badge">14</span>New</router-link>
        <router-link to="/news-feed/history" class="list-group-item"><span class="badge">0</span>History</router-link>
        <router-link to="/settings/admin" class="list-group-item"><span class="badge">0</span>Admin</router-link>
        <router-link to="/settings/user" class="list-group-item"><span class="badge">2</span>User</router-link>
      </div>
    </div>
</template>

<script>
    export default {
        name: 'sidebar',
        created: function () {

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
            beep: function () {
                this.$http.post('/beeps', {text: this.newBeep})
                        .then(function (res) {
                            this.$root.$emit('newBeep', res.data);
                            this.newBeep = "";
                            alertify.success("Beep published!");
                        })
            },
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
