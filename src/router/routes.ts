// 对外暴露配置路由（常量路由）
export const constantRoute = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/index.vue'),
    meta: {
      title: '登录',
      hidden: true, // 是否显示在左侧菜单中 true隐藏 false显示
      icon: 'User', // 菜单图标,支持element-plus的所有图标组件
    },
  },
  {
    path: '/',
    name: 'layout',
    component: () => import('@/layout/index.vue'),
    meta: { title: 'Layout', hidden: false, icon: 'Position' },
    children: [
      {
        path: '/home', // 默认子路由
        name: 'home',
        component: () => import('@/views/home/index.vue'),
        meta: { title: '首页', hidden: false, icon: 'HomeFilled' },
      },
    ],
  },
  {
    path: '/404',
    name: '404',
    component: () => import('@/views/404/index.vue'),
    meta: { title: '404', hidden: true, icon: 'Warning' },
  },
  {
    // 任意路由
    path: '/:pathMatch(.*)*',
    name: 'Any',
    redirect: '/404',
    meta: { title: '任意', hidden: true, icon: 'Warning' },
  },
]
