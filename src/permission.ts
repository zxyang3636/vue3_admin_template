// 路由鉴权
import router from '@/router'
import Nprogress from 'nprogress'
import 'nprogress/nprogress.css'
import useUserStore from '@/store/modules/user'
import pinia from './store'
import setting from './setting'
import { REMOVE_TOKEN } from './utils/token'

Nprogress.configure({ showSpinner: false }) // 进度环关闭

let userStore = useUserStore(pinia)

// 全局前置守卫
router.beforeEach(async (to, _from, next) => {
  document.title = (setting.title + '-' + to.meta.title) as string
  // to: 即将要进入的目标路由对象
  // from: 当前导航正要离开的路由
  // next: 调用该方法后，才能进入下一个钩子
  Nprogress.start()
  let username = userStore.nickname
  let token = userStore.accessToken
  if (token) {
    if (to.path === '/login') {
      next({ path: '/' })
    } else {
      if (username) {
        next()
      } else {
        try {
          await userStore.userInfo()
          next()
        } catch (error) {
          // 清除本地token，避免死循环
          REMOVE_TOKEN()
          // 不调用logout接口，直接跳转到登录页
          next({ path: '/login', query: { redirect: to.path } })
        }
      }
    }
  } else {
    if (to.path === '/login') {
      next()
    } else {
      next({ path: '/login', query: { redirect: to.path } })
    }
  }
})

// 全局后置守卫
router.afterEach((_to, _from) => {
  Nprogress.done()
})
