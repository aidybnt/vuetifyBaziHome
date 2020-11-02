import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

//防止重复点击路由出错
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/Home'),
    meta: {
      title: '首页-科学五行八字',
      keepAlive: true,
      requireAuth: false
    }
  },
  {
    path: '/pro',
    name: 'Profiles',
    component: () => import('@/views/Profiles'),
    meta: {
      title: '命盘管理系统-科学五行八字',
      keepAlive: true,
      requireAuth: true
    },
    children: [
      {
        path: '/add',
        name: 'Add',
        component: () => import('@/components/profiles/Add'),
        meta: {
          title: '添加命盘—命盘管理系统-科学五行命理',
          keepAlive: true,
          requireAuth: true
        }
      },
      {
        path: '/list',
        name: 'List',
        component: () => import('@/components/profiles/List'),
        meta: {
          title: '命盘列表—命盘管理系统—科学五行命理',
          keepAlive: true,
          requireAuth: true
        }
      },
      {
        path: '/info',
        name: 'UserInfo',
        component: () => import('@/components/profiles/UserInfo'),
        meta: {
          title: '个人信息—命盘管理系统—科学五行命理',
          keepAlive: true,
          requireAuth: true
        }
      },
    ],
  },
  {
    path: '/show',
    name: 'Show',
    component: () => import('@/views/Show'),
    meta: {
      title: '命盘展示—命盘管理系统—科学五行命理',
      keepAlive: false,
      requireAuth: true
    }
  },
  {
    //访问不存在的路由
    path: '*',
    redirect: '/'
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
