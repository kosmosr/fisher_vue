<template>
  <div id="app">
    <div class="row white-bg-margin">
      <div class="col-md-6 col-md-offset-3">
        <div class="bg-container">
          <div class="row">
            <div class="col-md-4 col-md-offset-4 text-center">
              <span class="big-title">鱼 书</span>
            </div>
          </div>
          <div class="row">
            <div class="col-md-8 col-md-offset-2 flex-vertical personal-detail">
              <div>
                <input style="width:100%" id="nickname" name="nickname"
                       type="text"
                       placeholder="昵称"
                       class="none-input" v-model="nickname">
                <input style="width:100%" id="email" name="email" type="text"
                       placeholder="邮箱"
                       class="none-input" v-model="email">
                <input id="password" style="width:100%"
                       name="password"
                       placeholder="密码"
                       class="none-input" type="password" v-model="password">
                <input style="margin-top:15px;" id="btn-submit" type="submit"
                       class="btn btn-big btn-block" value="注册" v-on:click="register">
              </div>
            </div>
          </div>
          <div style="margin-top:30px;" class="row">
            <div class="col-md-8 text-center col-md-offset-2">
              <span class="description-font">已有账号？</span>
              <router-link
                to="/login">登录
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Register',
    data () {
      return {
        nickname: '',
        email: '',
        password: ''
      }
    },

    created () {
      this.$parent.nav_show = false
    },
    methods: {
      register () {
        let url = this.GLOBAL.apiUrl + 'users'
        let nickname = this.nickname
        let email = this.email
        let password = this.password
        let data = JSON.stringify({'nickname': nickname, 'email': email, 'password': password})
        this.$http.post(url, data).then(function (response) {
          this.$router.push({path: '/login'})
        })
          .catch(function (response) {
            this.printErrorMsg(response)
          })
      }
    }
  }
</script>

<style scoped>
  @import "../../static/css/register.css";
</style>
