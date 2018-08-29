<template>
  <div id="app">
    <div style="margin-top:100px;" class="row" v-if="EnoughBeans">
      <div class="col-md-8 col-md-offset-2">
        <div class="row">
          <div class="col-md-2">
            <a id='nav_url' href=""  v-on:click="back" >去首页</a>
          </div>
        </div>
        <div class="bg-container">
          <div class="row">
            <div class="col-md-12 text-center bg-head">
                        <span class="drift-title">向<span
                          class="space">{{ nickname }}</span>请求这本书</span>
            </div>
          </div>
          <div style="margin-top:15px;" class="row">
            <div class="col-md-10 col-md-offset-1 flex-vertical gifter-container">
              <span class="sub-title-color">以下是书籍拥有者信息，诚信度供你参考:</span>
              <span style="margin-top:10px; margin-bottom:10px;">{{ nickname }}</span>
              <div><span
                class="description-font">鱼豆：</span><span>{{ beans }}</span>
              </div>
              <div><span
                class="description-font">接受/送出书籍：</span><span>{{ send_receive }}</span>
              </div>
            </div>
          </div>
          <div style="margin-top:10px;" class="row">
            <div class="col-md-10 col-md-offset-1">
              <span class="main-color">本次交易将消耗你1个鱼豆，你当前还有{{ user_beans }}个鱼豆</span>
            </div>
          </div>
          <form action="" method="post">
            <div style="margin-top:20px;" class="row">
              <div class="col-md-10 col-md-offset-1 flex-vertical input-margin">
                <label class="sub-title-color" for="recipient_name">收件人姓名</label>
                <div class="row">
                  <div class="col-md-5">
                    <input placeholder="请填写收件人姓名" id="recipient_name"
                           name="recipient_name"
                           class="normal-input btn-block form-control"
                           v-model="recipient_name">
                  </div>
                </div>
                <label class="sub-title-color" for="mobile">联系电话</label>
                <div class="row">
                  <div class="col-md-5">
                    <input placeholder="如13818181818" id="mobile"
                           v-model="mobile"
                           class="normal-input btn-block form-control">
                  </div>
                </div>
                <label class="sub-title-color" for="address">书籍收件地址</label>
                <textarea class="form-control" rows="3" id="address" v-model="address"
                          placeholder="如，张三 北京市清华大学666室。请务必确保该地址能够收到书籍"></textarea>
                <label class="sub-title-color" for="message">对他 / 她
                  说的话</label>
                <textarea class="form-control" id="message" v-model="message"
                          rows="4"
                          placeholder="如有一些特别的要求，可以在这里填写"></textarea>
              </div>
            </div>
            <div class="row">
              <div style="position: relative;left:-20px;"
                   class="col-md-5 col-md-offset-4 flex-vertical text-center">
                <input style="margin-top:12px;" type="button"
                       class="btn btn-big btn-block" value="提交" v-on:click="saveDrift">
                <span style="margin-top:15px;"
                      class="main-color">提交信息，等待{{ nickname }}将书籍邮寄给你</span>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
    <not-enough-beans :beans="user_beans" v-else></not-enough-beans>
  </div>
</template>

<script>
  import NotEnoughBeans from './NotEnoughBeans'

  export default {
    name: 'Drift',
    components: {NotEnoughBeans},
    data () {
      return {
        nickname: '',
        beans: 0,
        send_receive: '0/0',
        user_beans: 0,
        mobile: '',
        address: '',
        message: '',
        recipient_name: '',
        EnoughBeans: true
      }
    },
    methods: {
      getDriftInfo () {
        let url = this.GLOBAL.apiUrl + 'drift/' + this.$route.params.id
        this.$http.get(url)
          .then((response) => {
            let data = response.data
            if (response.status === 200) {
              this.nickname = data.nickname
              this.beans = data.beans
              this.send_receive = data.send_receive
              this.user_beans = data.user_beans
            }
          })
          .catch((response) => {
            let errorMsg = response.data.message
            let errorCode = response.data.error_code
            if (errorCode === '40301') {
              this.$parent.nav_show = true
              this.$message.error(errorMsg)
              this.EnoughBeans = false
            } else {
              this.$parent.nav_show = true
              this.$router.push({path: '/'})
              this.$message.error(errorMsg)
            }
          })
      },
      saveDrift () {
        if (this.checkToken(this)) {
          let url = this.GLOBAL.apiUrl + 'drifts'
          let data = JSON.stringify({
            'mobile': this.mobile,
            'address': this.address,
            'message': this.message,
            'recipient_name': this.recipient_name,
            'gift_id': this.$route.params.id
          })
          this.$http.post(url, data)
            .then(function (response) {
              data = response.data
              this.$message.success('提交成功')
              this.$parent.nav_show = true
              this.$router.push({path: '/'})
            }).catch(function (response) {
              this.printErrorMsg(response)
            })
        }
      },
      back () {
        this.$parent.nav_show = true
        this.$router.push({path: '/'})
      }
    },
    created () {
      this.$parent.nav_show = false
      this.getDriftInfo()
    }
  }
</script>

<style scoped>
  @import "../../static/css/drift.css";
</style>
