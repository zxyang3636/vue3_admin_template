// 定义store中，state类型

import type { Category as Category } from '@/api/product/attr/type'
import type { RouteRecordRaw } from 'vue-router'

export interface UserState {
  accessToken: string | null
  refreshToken: string | null
  menuRoutes: RouteRecordRaw[]
  username: string
  avatar: string
  nickname: string
}

export interface CategoryState {
  oneLevelData: Category[]
  oneLevelId: string
  secondLevelData: Category[]
  secondLevelId: string
  thirdLevelData: Category[]
  thirdLevelId: string
}
