import Vue from 'vue'
import Router from 'vue-router'

import Base from '../components/Base'
import Login from '../components/Login'
import Index from '../components/Index'
import Register from '../components/Register'
import Search from '../components/Search'
import BookDetail from '../components/BookDetail'

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
        },
        {
          path: '/books/:key',
          name: 'book',
          component: Search
        },
        {
          path: '/book/:isbn',
          name: 'book_detail',
          component: BookDetail
        }
      ]
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
