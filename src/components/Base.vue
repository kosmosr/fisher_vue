<template>
  <div id="app">
    <div v-if="nav_show">
      <div class="nav-self">
        <div style="padding-top: inherit" class="container">
          <div class="form-inline">
            <div class="flex-vertical-center-height">
              <div class="col-md-2 col-xs-3 logo">
                <img src="/static/images/logo-yushu.png"/>
              </div>
              <div style="margin-left:20px;" class="col-md-7 col-xs-6 input-group">
                <input name="keyword" type="text" placeholder="ISBN、图书名称"
                       class="form-control input-sm" v-model="keyword">
                <span class="input-group-btn">
                            <router-link class="btn btn-search" type="button"
                                         :to="{ name: 'book', params: { key: keyword}}">搜索</router-link>
                        </span>
              </div>
              <div class="col-md-3 col-xs-3" style="padding-right: 0">
                <div class="container-height flex-vertical-center login-box" v-if="not_login">
                  <div style="height: 100%; width: 100%;display: flex; justify-content: flex-end; align-items: center">
                    <router-link to="/login">登录</router-link>
                    <router-link class="btn-end" to="/register">注册</router-link>
                  </div>
                </div>
                <div v-else class="container-height flex-vertical-center login-box">
                  <router-link to="/personal">{{nickname}}的鱼书</router-link>
                  <a class="btn-end" href="#" v-on:click="logout">注销</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="sub-nav flex-vertical-center">
        <div class="container" style="width: 100%">
          <div class="row">
            <div class="col-md-2 col-xs-3 col-md-offset-2">
              <router-link id="recent" to="/" class="flex-vertical-hor-center">
                <img src="/static/images/upload.png"/>
                <span>最近上传</span>
              </router-link>
            </div>
            <div class="col-md-2 col-xs-3 ">
              <router-link id="gifts" to="/gifts"
                 class="flex-vertical-hor-center">
                <img src="/static/images/gift.png"/>
                <span>赠送清单</span>
              </router-link>
            </div>
            <div class="col-md-2 col-xs-3">
              <router-link id="wishes" to="/wishes"
                 class="flex-vertical-hor-center">
                <img src="/static/images/wish.png"/>
                <span>心愿清单</span>
              </router-link>
            </div>
            <div class="col-md-2 col-xs-3">
              <router-link id="pending" to="/pending"
                 class="flex-vertical-hor-center">
                <img src="/static/images/fish.png"/>
                <span>鱼漂</span>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class='container'>
      <div class="row">
      </div>
      <router-view></router-view>
    </div>
    <div id="footer" class="flex-hor-center">
      <span>© 2017-2020 example.yushu.im created by kosmosr</span>
    </div>
  </div>
</template>

<script>
  let Base64 = require('js-base64').Base64
  export default {
    name: 'Base',
    data () {
      return {
        nav_show: true,
        not_login: true,
        nickname: null,
        keyword: ''
      }
    },
    methods: {
      logout () {
        let url = this.GLOBAL.apiUrl + 'users'
        this.$http.delete(url).then(function (response) {
          if (response.status === 204) {
            localStorage.removeItem('token')
            localStorage.removeItem('nickname')
            this.$router.go(0)
          }
        })
          .catch(function (response) {
            this.$message.error(response.data.message)
            this.not_login = true
            localStorage.removeItem('token')
            localStorage.removeItem('nickname')
          })
      },
      getNickname () {
        let nickname = localStorage.getItem('nickname')
        if (nickname) {
          this.nickname = Base64.decode(nickname)
          this.not_login = false
        }
      },
      search () {
        const key = this.keyword
        this.$router.push({name: 'book', params: {key: key}})
      }
    },
    created () {
      this.nav_show = true
      this.getNickname()
    }
  }
</script>

<style scoped>

</style>
