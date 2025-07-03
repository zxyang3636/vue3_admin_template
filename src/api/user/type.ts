// 登录接口的参数ts类型
export interface loginForm {
  username: string
  password: string
}

export interface loginResponse {
  accessToken: string
  refreshToken: string
  // code: number
  // data: dataType
  // timestamp: number
  // success: boolean
  // fail: boolean
  // message: string
}

interface dataType {
  token?: string
}

interface userInfo {
  userId: number
  avatar: string
  username: string
  password: string
  desc: string
  roles: string[]
  buttons: string[]
  routes: string[]
  token: string
}

interface user {
  checkUser: userInfo
}

export interface userResponseData {
  avatar: string
  username: string
  nickname: string
  // code: number
  // data: user
}

export interface RefreshRequest {
  refreshToken: string
}
