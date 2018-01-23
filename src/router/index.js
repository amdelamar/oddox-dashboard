import Vue from 'vue'
import Router from 'vue-router'
import Posts from '@/views/Posts'
import NewPost from '@/views/NewPost'
// import EditPost from '@/views/NewPost'
import Authors from '@/views/Authors'
import NewAuthor from '@/views/NewAuthor'
// import EditAuthor from '@/views/NewAuthor'
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
          path: ':id',
          component: Posts
        }
      ]
    },
    {
      path: '/new-post',
      name: 'new-post',
      component: NewPost
    },
    {
      path: '/edit-post/:id',
      name: 'edit-post',
      component: NewPost
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
      path: '/new-author',
      name: 'new-author',
      component: NewAuthor
    },
    {
      path: '/edit-author/:id',
      name: 'edit-author',
      component: NewAuthor
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
