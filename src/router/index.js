import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import Base from '../components/Base'
import Login from '../components/Login'
import Index from '../components/Index'
import Register from '../components/Register'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: Base,
      children: [
        {
          path: '/register',
          component: Register
        },
        {
          path: '/login',
          component: Login
        },
        {
          path: '/',
          component: Index
        }
      ]
    }
  ]
})
