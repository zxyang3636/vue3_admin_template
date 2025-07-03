// 添加通用响应类型
export interface ApiResponse<T = any> {
  code: number
  message: string
  data: T
  timestamp: number
}

// 登录接口的参数ts类型
export interface loginForm {
  username: string
  password: string
}

export type LoginResponse = ApiResponse<LoginResponseData>

export interface LoginResponseData {
  accessToken: string
  refreshToken: string
  // code: number
  // data: dataType
  // timestamp: number
  // success: boolean
  // fail: boolean
  // message: string
}

export interface UserResponseData {
  avatar: string
  username: string
  nickname: string
  // code: number
  // data: user
}

export type UserInfoResponse = ApiResponse<UserResponseData>

export interface RefreshRequest {
  refreshToken: string
}
