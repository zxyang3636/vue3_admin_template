import { createApp } from 'vue'
import App from '@/App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
//@ts-expect-error 忽略当前文件ts类型的检测否则有红色提示(打包会失败)
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
// 注册整个项目全局组件
import globalComponent from '@/components'
// svg插件
import 'virtual:svg-icons-register'
import router from '@/router'
import '@/styles/index.scss'
import pinia from './store'

const app = createApp(App)
app.use(ElementPlus, {
  locale: zhCn,
})
app.use(globalComponent)
app.use(router)
app.use(pinia)
app.mount('#app')
