/// <reference types="vite/client" />
/// <reference types="vite-plugin-svg-icons/client" />

declare module 'virtual:svg-icons-register' {
  const component: any
  export default component
}

declare module 'nprogress'

import 'axios'

declare module 'axios' {
  export interface AxiosRequestConfig {
    showSuccessMessage?: boolean // 是否显示成功提示
    showErrorMessage?: boolean // 是否显示错误提示
    successMessage?: string // 自定义成功提示文案
    errorMessage?: string // 自定义错误提示文案
  }
}
