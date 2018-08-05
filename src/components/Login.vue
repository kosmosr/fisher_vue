<template>
  <div id="app">
    <div class="row white-bg-margin">
      <div class="col-md-6 col-md-offset-3">
        <div class="row">
          <div class="col-md-2">
            <a v-on:click="changeNavShow" href="#">返回</a>
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
              <form action="" method="post">
                <input style="width:100%" id="email" name="email" type="text"
                       placeholder="邮箱"
                       class="none-input"
                       value="">
                <div style="margin-top:3px;" class="password-box">
                  <input id="password"
                         name="password"
                         placeholder="密码"
                         class="none-input" type="password">
                  <a id="forget-password" class="description-font"
                     href="#">
                    忘记密码?</a>
                </div>
                <input style="margin-top:15px;" id="btn-submit" type="submit"
                       class="btn btn-big btn-block" value="登录">
              </form>
            </div>
          </div>
          <div style="margin-top:30px;" class="row">
            <div class="col-md-8 text-center col-md-offset-2">
              <span class="description-font">没有账号？</span><router-link
              to="/register">注册</router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Login',
  data () {
    return {
    }
  },
  created () {
    this.$parent.nav_show = false
  },
  methods: {
    changeNavShow () {
      this.$parent.nav_show = true
      this.$router.push({path: '/'})
    }
  }
}
</script>

<style scoped>
@import "../../static/css/login.css";
</style>
