<template>
  <div id="app">
    <div class="row white-bg-margin">
      <div class="col-md-6 col-md-offset-3">
        <div class="row">
          <div class="col-md-2">
            <a href="/">返回</a>
          </div>
        </div>
        <div class="bg-container">
          <div class="row">
            <div class="col-md-4 col-md-offset-4 text-center">
              <span class="big-title">鱼 书</span>
            </div>
          </div>
          <div class="row">
            <div class="col-md-8 col-md-offset-2 flex-vertical personal-detail">
              <div>
                <input style="width:100%" id="email" name="email" type="text"
                       placeholder="邮箱"
                       class="none-input"
                       value="" v-model="email">
                <div style="margin-top:3px;" class="password-box">
                  <input id="password"
                         name="password"
                         placeholder="密码"
                         class="none-input" type="password" v-model="password">
                  <router-link id="forget-password" class="description-font" to="/reset/password">
                    忘记密码?</router-link>
                </div>
                <input style="margin-top:15px;" id="btn-submit" type="submit"
                       class="btn btn-big btn-block" value="登录" v-on:click="Login">
              </div>
            </div>
          </div>
          <div style="margin-top:30px;" class="row">
            <div class="col-md-8 text-center col-md-offset-2">
              <span class="description-font">没有账号？</span>
              <router-link
                to="/register">注册
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  let Base64 = require('js-base64').Base64
  export default {
    name: 'Login',
    data () {
      return {
        email: '',
        password: ''
      }
    },
    created () {
      this.$parent.nav_show = false
    },
    methods: {
      Login () {
        let url = this.GLOBAL.apiUrl + 'auth'
        let email = this.email
        let password = this.password
        let data = JSON.stringify({'email': email, 'password': password})
        this.$http.post(url, data)
          .then(function (response) {
            if (response.status === 200) {
              let nickname = Base64.encode(response.data.nickname)
              localStorage.setItem('token', response.data.token)
              this.$parent.nav_show = true
              this.$parent.not_login = false
              this.$parent.nickname = Base64.decode(nickname)
              localStorage.setItem('nickname', nickname)
              this.$router.push({path: '/'})
            }
          })
          .catch(function (response) {
            let errorMsg = response.data.message
            this.$message.error(errorMsg)
          })
      }
    }
  }
</script>

<style scoped>
  @import "../../static/css/login.css";
</style>
