import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store'

// Views
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
          component: Posts,
          beforeEnter: mustBeAuthenticated
        }
      ]
    },
    {
      path: '/new-post',
      name: 'new-post',
      component: NewPost,
      beforeEnter: mustBeAuthenticated
    },
    {
      path: '/edit-post/:id',
      name: 'edit-post',
      component: NewPost,
      beforeEnter: mustBeAuthenticated
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
      component: NewAuthor,
      beforeEnter: mustBeAuthenticated
    },
    {
      path: '/edit-author/:id',
      name: 'edit-author',
      component: NewAuthor,
      beforeEnter: mustBeAuthenticated
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
