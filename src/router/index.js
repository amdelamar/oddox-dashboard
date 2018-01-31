import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store'

// Views
import Posts from '@/views/Posts'
import EditPost from '@/views/EditPost'
import Authors from '@/views/Authors'
import EditAuthor from '@/views/EditAuthor'
import MyProfile from '@/views/MyProfile'
import Settings from '@/views/Settings'
import Login from '@/views/Login'
import Logout from '@/views/Logout'
import NotFound from '@/views/error/404'

Vue.use(Router)

// Redirect for authentication.
const mustBeAuthenticated = (to, from, next) => {
  if (store.getters.isAuthenticated) {
    next()
    return
  }
  console.log('User is not logged in. Redirecting to login page.')
  next('/login')
}

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Posts,
      beforeEnter: mustBeAuthenticated
    },
    {
      path: '/post',
      name: 'posts',
      component: Posts,
      beforeEnter: mustBeAuthenticated,
      children: [
        {
          path: ':id',
          name: 'view-post',
          component: Posts
        }
      ]
    },
    {
      path: '/new-post',
      name: 'new-post',
      component: EditPost,
      beforeEnter: mustBeAuthenticated
    },
    {
      path: '/edit-post',
      component: EditPost,
      beforeEnter: mustBeAuthenticated,
      children: [
        {
          path: ':id',
          name: 'edit-post',
          component: EditPost
        }
      ]
    },
    {
      path: '/draft',
      name: 'drafts',
      component: Posts,
      beforeEnter: mustBeAuthenticated,
      children: [
        {
          path: ':id',
          name: 'view-draft',
          component: Posts
        }
      ]
    },
    {
      path: '/author',
      name: 'authors',
      component: Authors,
      beforeEnter: mustBeAuthenticated,
      children: [
        {
          path: ':id',
          component: Authors,
          beforeEnter: mustBeAuthenticated
        }
      ]
    },
    {
      path: '/new-author',
      name: 'new-author',
      component: EditAuthor,
      beforeEnter: mustBeAuthenticated
    },
    {
      path: '/edit-author',
      component: EditAuthor,
      beforeEnter: mustBeAuthenticated,
      children: [
        {
          path: ':id',
          name: 'edit-author',
          component: EditAuthor
        }
      ]
    },
    {
      path: '/settings',
      name: 'settings',
      component: Settings,
      beforeEnter: mustBeAuthenticated
    },
    {
      path: '/my-profile',
      name: 'my-profile',
      component: MyProfile,
      beforeEnter: mustBeAuthenticated
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
