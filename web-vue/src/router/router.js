import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home.vue'
import Login from '@/views/Login'
import TwitterUsers from '@/views/TwitterUsers'
import TwitterUser from '@/views/TwitterUser'
import NProgress from 'nprogress'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
  },
  {
    path: '/users',
    name: 'users',
    component: TwitterUsers,
    meta: { requiresAuth: true },
  },
  {
    path: '/user/:screenName',
    name: 'user',
    component: TwitterUser,
    props: true,
    meta: { requiresAuth: true },
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

router.beforeEach((routeTo, routeFrom, next) => {
  const loggedIn = localStorage.getItem('user')
  if (routeTo.matched.some(record => record.meta.requiresAuth) && !loggedIn) {
    next('/')
  } else {
    NProgress.start()
    next()
  }
})

router.afterEach(() => {
  NProgress.done()
})

export default router
