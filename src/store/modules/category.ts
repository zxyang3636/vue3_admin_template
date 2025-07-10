// 商品分类
import { reqOnelevel, reqSecondlevel, reqThirdlevel, getAttributeInfo } from '@/api/product/attr'
import { defineStore } from 'pinia'
import type { CategoryState } from '@/store/modules/types/types'

let useCategoryStore = defineStore('Category', {
  state: (): CategoryState => {
    return {
      oneLevelData: [],
      oneLevelId: '',
      secondLevelData: [],
      secondLevelId: '',
      thirdLevelData: [],
      thirdLevelId: '',
    }
  },
  actions: {
    async getOneLevel() {
      try {
        let res = await reqOnelevel()
        this.oneLevelData = res.data
        return 'ok'
      } catch (e: any) {
        return Promise.reject(new Error(e.message))
      }
    },
    async getSecondlevel() {
      let res = await reqSecondlevel(this.oneLevelId)
      this.secondLevelData = res.data
    },
    async getThirdLevel() {
      let res = await reqThirdlevel(this.secondLevelId)
      this.thirdLevelData = res.data
    },
  },
  getters: {},
})

export default useCategoryStore
