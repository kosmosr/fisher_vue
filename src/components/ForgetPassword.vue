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
                <div >
                  <input style="width:100%" v-model="password1" type="password"
                         placeholder="新密码"
                         class="none-input"/>
                  <input style="width:100%" v-model="password2" type="password"
                         placeholder="请确认密码"
                         class="none-input"/>
                  <input style="width:100%;margin-top:15px;" type="button"
                         class="btn btn-big btn-block" value="找回密码" v-on:click="ForgetPassword">
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
    name: 'ForgetPassword',
    data () {
      return {
        password1: '',
        password2: ''
      }
    },
    created () {
      this.$parent.nav_show = false
    },
    methods: {
      ForgetPassword () {
        let token = this.$route.params.token
        let url = this.GLOBAL.apiUrl + 'reset/password/' + token
        let password = this.password1
        let password2 = this.password2
        let data = JSON.stringify({'password': password, 'password2': password2})
        this.$http.patch(url, data)
          .then((response) => {
            if (response.status === 204) {
              this.$message({
                type: 'success',
                message: '重置密码成功'
              })
              this.$parent.nav_show = true
              this.$router.push({path: '/'})
            }
          })
          .catch((response) => {
            let errorMsg = response.data.message
            this.$message.error(errorMsg)
          })
      }
    }
  }
</script>

<style scoped>

</style>
