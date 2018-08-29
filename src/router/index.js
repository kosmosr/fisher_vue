import Vue from 'vue'
import Router from 'vue-router'

import Base from '../components/Base'
import Login from '../components/Login'
import Index from '../components/Index'
import Register from '../components/Register'
import Search from '../components/Search'
import BookDetail from '../components/BookDetail'
import ResetPassword from '../components/ResetPassword'
import ForgetPassword from '../components/ForgetPassword'
import Personal from '../components/Personal'
import ChangePassword from '../components/ChangePassword'
import Gifts from '../components/Gifts'
import Wishes from '../components/Wishes'
import Drift from '../components/Drift'
import Pending from '../components/Pending'

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
        },
        {
          path: '/reset/password',
          component: ResetPassword
        },
        {
          path: '/forget/password/:token',
          component: ForgetPassword
        },
        {
          path: '/personal',
          component: Personal
        },
        {
          path: '/change/password',
          component: ChangePassword
        },
        {
          path: '/gifts',
          component: Gifts
        },
        {
          path: '/wishes',
          component: Wishes
        },
        {
          path: '/drift/:id',
          component: Drift
        },
        {
          path: '/pending',
          component: Pending
        }
      ]
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
