import Vue from 'vue'
import Router from 'vue-router'
import Posts from '@/views/Posts'
import Authors from '@/views/Authors'
import Login from '@/views/Login'
import Logout from '@/views/Logout'
import MyProfile from '@/views/MyProfile'
import Settings from '@/views/Settings'
import NotFound from '@/views/error/404'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Posts
    },
    {
      path: '/post',
      name: 'posts',
      component: Posts,
      children: [
        {
          path: 'new',
          component: Posts
        },
        {
          path: ':id',
          component: Posts
        }
      ]
    },
    {
      path: '/author',
      name: 'authors',
      component: Authors,
      children: [
        {
          path: 'new',
          component: Authors
        },
        {
          path: ':id',
          component: Authors
        }
      ]
    },
    {
      path: '/settings',
      name: 'settings',
      component: Settings
    },
    {
      path: '/my-profile',
      name: 'my-profile',
      component: MyProfile
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/logout',
      name: 'logout',
      component: Logout
    },
    {
      path: '*',
      name: 'error',
      component: NotFound
    }
  ]
})
