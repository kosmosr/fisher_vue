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

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {App},
  template: '<App/>'
})
