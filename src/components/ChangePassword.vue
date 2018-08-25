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
            <div class="col-md-8 col-md-offset-2 flex-vertical input-margin">
              <div>
                <input id="old_password" v-model="old_password" type="password"
                       placeholder="原密码"
                       class="form-control none-input"/>
                <input v-model="new_password" type="password"
                       placeholder="新密码"
                       class="form-control none-input"/>
                <input v-model="confirm_password" type="password"
                       placeholder="请确认新密码"
                       class="form-control none-input"/>
                <input style="margin-top:15px;" id="btn-submit"
                       type="submit"
                       class="btn btn-big btn-block" value="提交" v-on:click="changePassword">
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
    name: 'ChangePassword',
    data () {
      return {
        old_password: null,
        new_password: null,
        confirm_password: null
      }
    },
    methods: {
      changePassword () {
        let url = this.GLOBAL.apiUrl + 'change/password'
        let oldPassword = this.old_password
        let newPassword = this.new_password
        let confirmPassword = this.confirm_password
        let data = JSON.stringify({
          'old_password': oldPassword,
          'new_password': newPassword,
          'confirm_password': confirmPassword
        })
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
          }).catch((response) => {
            let errorMsg = response.data.message
            this.$message.error(errorMsg)
          })
      },
      created () {
        this.$parent.nav_show = false
      }
    }
  }
</script>

<style scoped>

</style>
