// 定义store中，state类型

import type { RouteRecordRaw } from 'vue-router'

export interface UserState {
  accessToken: string | null
  refreshToken: string | null
  menuRoutes: RouteRecordRaw[]
  username: string
  avatar: string
  nickname: string
}
