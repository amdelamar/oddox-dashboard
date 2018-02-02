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
import Unauthorized from '@/views/error/401'

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

// Error for users trying to access a server admin feature.
const mustBeServerAdmin = (to, from, next) => {
  if (!store.getters.isAuthenticated) {
    console.log('User is not logged in. Redirecting to login page.')
    next('/login')
  } else if (store.getters.getAuthToken.serverAdmin) {
    next()
  } else {
    console.log('Unauthorized. You are not a server administrator.')
    next('/unauthorized')
  }
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
      path: '/featured',
      name: 'featured',
      component: Posts,
      beforeEnter: mustBeAuthenticated,
      children: [
        {
          path: ':id',
          name: 'view-featured',
          component: Posts
        }
      ]
    },
    {
      path: '/trash',
      name: 'trash',
      component: Posts,
      beforeEnter: mustBeAuthenticated,
      children: [
        {
          path: ':id',
          name: 'view-trash',
          component: Posts
        }
      ]
    },
    {
      path: '/all',
      name: 'all-posts',
      component: Posts,
      beforeEnter: mustBeAuthenticated,
      children: [
        {
          path: ':id',
          name: 'view-all-posts',
          component: Posts
        }
      ]
    },
    {
      path: '/category',
      name: 'category',
      component: NotFound
    },
    {
      path: '/tag',
      name: 'tags',
      component: NotFound
    },
    {
      path: '/year',
      name: 'years',
      component: NotFound
    },
    {
      path: '/author',
      name: 'authors',
      component: Authors,
      beforeEnter: mustBeAuthenticated,
      children: [
        {
          path: ':id',
          name: 'view-author',
          component: Authors,
          beforeEnter: mustBeAuthenticated
        }
      ]
    },
    {
      path: '/new-author',
      name: 'new-author',
      component: EditAuthor,
      beforeEnter: mustBeServerAdmin
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
      path: '/unauthorized',
      name: '401',
      component: Unauthorized
    },
    {
      path: '*',
      name: '404',
      component: NotFound
    }
  ]
})
