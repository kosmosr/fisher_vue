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
                       placeholder="你的邮箱账号"
                       class="none-input" v-model="email">
                <input style="margin-top:15px;" id="btn-submit" type="submit"
                       class="btn btn-big btn-block" value="提交" v-on:click="ResetPassword">
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
    name: 'ResetPassword',
    data () {
      return {
        email: ''
      }
    },
    methods: {
      ResetPassword () {
        let url = this.GLOBAL.apiUrl + 'reset/email'
        let email = this.email
        let data = JSON.stringify({'email': email})
        this.$http.post(url, data)
          .then((response) => {
            if (response.status === 202) {
              data = response.data
              this.$message({
                type: 'success',
                message: '一封邮件已发送到邮件' + email + ', 请及时查收'
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
