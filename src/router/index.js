import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/home/Home.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      title: 'PhotoSharingWeb'
    }
  },
  {
    path: '/identity',
    name: 'Identity',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('../views/identity/Identity.vue'),
    meta: {
      title: '登录/注册'
    }
  },
  {
    path: '/user',
    name: 'User',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('../views/user/User.vue'),
    meta: {
      title: '个人中心'
    }
  },{
    path: '/test',
    name: 'Test',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('../views/home/test.vue')
  },{
    path: '/uploadtag',
    name: 'UploadTag',
    component: () => import('../views/admin/UploadTag.vue')
  },{
    path: '/search',
    name: 'Search',
    component: () => import('../views/search/Search.vue'),
    meta: {
      title: '搜索'
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  // base: '/',
  routes
})

export default router
