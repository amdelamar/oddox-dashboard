import Vue from 'vue'
import Router from 'vue-router'
import Posts from '@/views/Posts'
import Authors from '@/views/Authors'
import Login from '@/views/Login'
import Logout from '@/views/Logout'
import Profile from '@/views/Profile'
import Settings from '@/views/Settings'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'posts',
      component: Posts,
      children: [
        {
          path: 'post/:id',
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
      path: '/profile',
      name: 'profile',
      component: Profile
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
    }
  ]
})
