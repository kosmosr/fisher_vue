<template>
  <div id="app" v-loading="fullscreenLoading">
    <div class="row">
      <div style="margin-top:150px;" class="col-md-6 col-md-offset-3">
        <div class="row">
          <div class="col-md-2">
            <a href="#" v-on:click="back">返回</a>
          </div>
        </div>
        <div class="bg-container">
          <div class="row">
            <div class="col-md-4 col-md-offset-4 text-center">
              <span class="big-title">{{ nickname }}</span>
            </div>
          </div>
          <div class="row">
            <div class="col-md-8 col-md-offset-2 flex-vertical personal-detail">
              <div><span>送出/收到：</span><span>{{ send_receive }}</span></div>
              <div><span>当前鱼豆：</span><span>{{ beans }}</span></div>
              <div><span>登录邮箱：</span><span>{{ email }}</span></div>
              <div><span>登录密码：********* </span><router-link
                to="/change/password">修改</router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Personal',
    data () {
      return {
        nickname: '',
        send_receive: '0/0',
        beans: 0,
        email: '',
        fullscreenLoading: true
      }
    },
    methods: {
      getPersonal () {
        if (this.checkToken(this)) {
          let url = this.GLOBAL.apiUrl + 'user'
          this.$http.get(url)
            .then((response) => {
              if (response.status === 200) {
                let data = response.data
                this.nickname = data.nickname
                this.send_receive = data.send_receive
                this.beans = data.beans
                this.email = data.email
                this.fullscreenLoading = false
              }
            })
            .catch(function (response) {
              let errorMsg = response.data.message
              this.$message.error(errorMsg)
            })
        }
      },
      back () {
        this.$parent.nav_show = true
        this.$router.push('/')
      }
    },
    created () {
      this.$parent.nav_show = false
      this.getPersonal()
    }
  }
</script>

<style scoped>
  @import "../../static/css/personal.css";
</style>
