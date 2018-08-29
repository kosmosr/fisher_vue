<template>
    <div id="app">
      <div class="row module-title">
        <div style="margin-top:30px;" class="col-md-2">
          <span class='sub-title'>交易记录</span>
        </div>
      </div>
      <div style="margin-top:20px;" class="row drift-container" v-for="drift in drifts" :key="drift.drift_id">
        <div class="col-md-12">
          <div class="row">
            <div class="col-md-2">
              <img class="book-img-small shadow" :src="drift.book_img">
            </div>
            <div style="margin-left:-30px;"
                 class="col-md-8 flex-vertical description">
              <div><span>书籍名：</span><span>{{ drift.book_title }}</span></div>
              <div><span>作者：</span><span>{{ drift.book_author }}</span></div>
              <div><span>发起日期：</span><span>{{ drift.date }}</span></div>
              <div>
                <span v-if="drift.you_are === 'requester'">向他请求：</span>
                <span v-else>请求者：</span>
                <span>{{ drift.operator }}</span>
              </div>
              <div><span>状态：</span><span
                class="status-color">{{ drift.status_str }}</span></div>
              <div><span>邮寄地址：</span><span
                class="space">{{ drift.recipient_name }}</span><span>{{ drift.address }}</span>
              </div>
              <div><span>联系电话：</span><span>{{ drift.mobile }}</span></div>
            </div>
            <div class="col-md-2 flex-vertical">
              <div v-if="drift.status === 1">
                <div v-if="drift.you_are === 'gifter'">
                  <a href="#" v-on:click="updatePending(drift.drift_id, 2)">
                    <span class="btn-normal">已邮寄</span>
                  </a>
                  <a style="margin-top:20px;" href="#" v-on:click="updatePending(drift.drift_id, 3)">
                    <span class="btn-shadow">拒&nbsp;&nbsp;&nbsp;绝</span>
                  </a>
                </div>
                <div v-else-if="drift.you_are === 'requester'">
                  <a href="#" v-on:click="updatePending(drift.drift_id, 4)">
                    <span class="btn-normal">撤 销</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div style="margin-top:20px;" class="row message-container">
            <div class="col-md-12">
              <p>
                <span class="message-flag" v-if="drift.you_are === 'requester'">你的留言：</span>
                <span class="message-flag" v-else>他的留言：</span>
                <span>{{ drift.message }}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
  export default {
    name: 'Pending',
    data () {
      return {
        drifts: []
      }
    },
    methods: {
      getPending () {
        if (this.checkToken(this)) {
          let url = this.GLOBAL.apiUrl + 'pending'
          this.$http.get(url)
            .then((response) => {
              this.drifts = response.data
            })
            .catch((response) => {
              let errorMsg = response.data.message
              this.$message.error(errorMsg)
            })
        }
      },
      updatePending (did, status) {
        if (this.checkToken(this)) {
          let url = this.GLOBAL.apiUrl + 'drift/' + did
          let data = JSON.stringify({
            'status': status
          })
          this.$http.patch(url, data)
            .then((response) => {
              this.$message.success('操作成功')
              this.$router.go(0)
            })
            .catch((response) => {
              this.$router.go(0)
              let errorMsg = response.data.message
              this.$message.error(errorMsg)
            })
        }
      }
    },
    created () {
      this.getPending()
    }
  }
</script>

<style scoped>
  @import "../../static/css/pending.css";
</style>
