<template>
  <div id="app">
    <div v-if="nav_show">
      <div class="nav-self">
        <div style="padding-top: inherit" class="container">
          <form class="form-inline" action="#" method="get">
            <div class="flex-vertical-center-height">
              <div class="col-md-2">
                <img src="../../static/images/logo-yushu.png"/>
              </div>
              <div style="margin-left:20px;" class="col-md-7 col-xs-6 input-group">
                <input name="keyword" type="text" placeholder="ISBN、图书名称"
                       class="form-control input-sm">
                <span class="input-group-btn">
                            <input class="btn btn-search" type="submit" value="搜索"/>
                        </span>
              </div>
            </div>
          </form>
        </div>
      </div>
      <div class="sub-nav flex-vertical-center">
        <div class="container" style="width: 100%">
          <div class="row">
            <div class="col-md-2 col-xs-4 col-md-offset-2">
              <router-link id="recent" to="/"
                           class="flex-vertical-hor-center">
                <img src="../../static/images/upload.png"/>
                <span>最近上传</span>
              </router-link>
            </div>
            <div class="col-md-2 col-xs-4 ">
              <a id="gifts" href="#"
                 class="flex-vertical-hor-center">
                <img src="../../static/images/gift.png"/>
                <span>赠送清单</span>
              </a>
            </div>
            <div class="col-md-2 col-xs-4">
              <a id="wishes" href="#"
                 class="flex-vertical-hor-center">
                <img src="../../static/images/wish.png"/>
                <span>心愿清单</span>
              </a>
            </div>
            <div class="col-md-2 ">
              <a id="pending" href="#"
                 class="flex-vertical-hor-center">
                <img src="../../static/images/fish.png"/>
                <span>鱼漂</span>
              </a>
            </div>
          </div>
        </div>
      </div>
      <div class="container-height flex-vertical-center float-menu">
        <div style="float:right" v-if="not_login">
          <router-link to="/login">登录</router-link>
          <router-link style="margin-left: 40px;" to="/register">注册</router-link>
        </div>
        <div v-else style="float:right">
          <a href="#">{{nickname}}的鱼书</a>
          <a style="margin-left: 40px;" href="#" v-on:click="logout">注销</a>
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
export default {
  name: 'Base',
  data () {
    return {
      nav_show: true,
      not_login: true,
      nickname: null
    }
  },
  methods: {
    logout () {
      let url = this.GLOBAL.apiUrl + 'users'
      this.$http.delete(url).then(function (response) {
        if (response.status === 204) {
          localStorage.removeItem('token')
          this.$router.go(0)
        }
      })
    }
  },
  created () {
    this.nav_show = true
  }
}
</script>

<style scoped>

</style>
