import { defineStore } from 'pinia'

let useLayoutSettingStore = defineStore('SettingStore', {
  state: () => {
    return {
      fold: false, // 控制菜单是否折叠
    }
  },
  actions: {},
  getters: {},
})

export default useLayoutSettingStore
