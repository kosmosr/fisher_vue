// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueResource from 'vue-resource'
import gloabl_ from './components/Global'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.config.productionTip = false
Vue.use(VueResource)
Vue.use(ElementUI)
Vue.prototype.GLOBAL = gloabl_

Vue.http.interceptors.push((request, next) => {
  let token = localStorage.getItem('token')
  if (token) {
    request.headers.set('token', token)
  }
  next((response) => {
    return response
  })
})

Vue.prototype.checkLogin = function checkLogin () {
  let url = this.GLOBAL.apiUrl + 'user'
  let token = localStorage.getItem('token')
  if (token) {
    this.$http.get(url)
      .catch((response) => {
        this.printErrorMsg(response)
        localStorage.removeItem('token')
        localStorage.removeItem('nickname')
        this.$router.go(0)
      })
  }
}

Vue.prototype.checkToken = function checkToken (global) {
  let url = this.GLOBAL.apiUrl + 'user'
  let token = localStorage.getItem('token')
  if (token) {
    this.$http.get(url)
      .catch((response) => {
        this.printErrorMsg(response)
        localStorage.removeItem('token')
        localStorage.removeItem('nickname')
        this.$router.push({path: '/'})
        global.$parent.nav_show = true
        global.$parent.not_login = true
        return false
      })
    return true
  } else {
    this.$message.error('请登录后操作')
    this.$router.push({path: '/'})
    global.$parent.nav_show = true
    global.$parent.not_login = true
    return false
  }
}

Vue.prototype.printErrorMsg = function printErrorMsg (response) {
  const gettype = Object.prototype.toString
  let errorMsg = response.data.message
  let type = gettype.call(errorMsg)
  if (type === '[object Array]') {
    for (let i = 0; i < errorMsg.length; i++) {
      this.$notify.error({
        title: '错误',
        message: errorMsg[i]
      })
    }
  } else {
    this.$message.error(errorMsg)
  }
}

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {App},
  template: '<App/>'
})
