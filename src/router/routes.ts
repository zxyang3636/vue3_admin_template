// 对外暴露配置路由（常量路由）
export const constantRoute = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/index.vue'),
  },
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/home/index.vue'),
  },
  {
    path: '/404',
    name: '404',
    component: () => import('@/views/404/index.vue'),
  },
  {
    // 任意路由
    path: '/:pathMatch(.*)*',
    name: 'Any',
    redirect: '/404',
  },
]
