<template>
    <div>
      <div class="panel panel-primary">
      <div class="panel-heading">
        <h3 class="panel-title">Login</h3>
      </div>
      <div class="panel-body">

        <el-form label-position="left" :model="user" :rules="rules2" ref="ruleForm2" label-width="120px" class="demo-ruleForm">
          <el-form-item label="Username" prop="username">
            <el-input v-model="user.username"></el-input>
          </el-form-item>
          <el-form-item label="Password" prop="password">
            <el-input type="password" v-model="user.password" auto-complete="off"></el-input>
          </el-form-item>
          <hr>
          <el-form-item>
            <el-button type="primary" @click="login">Submit</el-button>
            <!--<p class="">-->
              <!--Don't have an account? <router-link to="/auth/register">Sign up!</router-link>-->
            <!--</p>-->
          </el-form-item>
        </el-form>
      </div>
      </div>
    </div>
</template>

<script>
    export default {
        name: "login",
        data: function() {
            return {
                user: {
                    username: "",
                    password: ""
                }
            }
        },
        methods: {
            login: function () {
              this.$http.post("/oauth/token?grant_type=password&username="+ this.user.username +"&password="+this.user.password,{})
                .then(function (res) {
                    //console.log(res);
                  this.$auth.setToken(res.data.access_token, Date.now() + res.data.expires_in, res.data.username, res.data.roles); // + 4 hours
                  this.$router.push('/news-feed');
                })
            }
        }
    }
</script>

<style>

</style>
