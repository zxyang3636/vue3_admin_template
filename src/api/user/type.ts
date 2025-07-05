// 添加通用响应类型
import type { ApiResponse } from '../type'

// 登录接口的参数ts类型
export interface loginForm {
  username: string
  password: string
  decodeIv: string
  aesKey: string
  encryptedPassword?: string
}

export type LoginResponse = ApiResponse<LoginResponseData>

export interface LoginResponseData {
  accessToken: string
  refreshToken: string
}

export interface UserResponseData {
  avatar: string
  username: string
  nickname: string
  routes: string[]
  buttons: string
  roles: string[]
}

export type UserInfoResponse = ApiResponse<UserResponseData>

export interface RefreshRequest {
  refreshToken: string
}
