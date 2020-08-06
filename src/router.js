import Vue from 'vue'
import Router from 'vue-router'
import lStorage from './local-storage'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/auth',
      name: 'auth',
      component: () =>
        import(/* webpackChunkName: "auth" */ './views/Auth.vue'),
    },
    {
      path: '/',
      name: 'home',
      component: () =>
        import(/* webpackChunkName: "home" */ './views/Home.vue'),
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/search',
      name: 'search',
      component: () =>
        import(/* webpackChunkName: "search" */ './views/Search.vue'),
      props: true,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/saved-searches',
      name: 'saved-searches',
      component: () =>
        import(/* webpackChunkName: "saved-searches" */ './views/SavedSearches.vue'),
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/profile',
      name: 'profile',
      component: () =>
        import(/* webpackChunkName: "profile" */ './views/Profile.vue'),
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/404',
      component: () =>
        import(/* webpackChunkName: "not-found" */ './views/NotFound.vue'),
    },
    {
      path: '*',
      redirect: '/404',
    },
  ]
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!lStorage.isUserSignedIn()) {
      return next({
        path: '/auth',
      })
    }
  }

  next();
})

export default router
