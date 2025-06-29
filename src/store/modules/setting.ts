import { defineStore } from 'pinia'

let useLayoutSettingStore = defineStore('SettingStore', {
  state: () => {
    return {
      fold: false, // 控制菜单是否折叠
      refresh: false, // 控制是否点击刷新
    }
  },
  actions: {},
  getters: {},
})

export default useLayoutSettingStore
