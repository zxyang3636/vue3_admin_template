import { defineStore } from 'pinia'
import { reqLogin, reqUserInfo } from '@/api/user'
import type { loginForm, loginResponse } from '@/api/user/type'
import type { UserState } from './types/types'
import { REMOVE_TOKEN, GET_ACCESS_TOKEN, GET_REFRESH_TOKEN, SET_ACCESS_TOKEN, SET_REFRESH_TOKEN } from '@/utils/token'
import { constantRoute } from '@/router/routes'

let useUserStore = defineStore('User', {
  state: (): UserState => {
    return {
      accessToken: GET_ACCESS_TOKEN(),
      refreshToken: GET_REFRESH_TOKEN(),
      menuRoutes: constantRoute,
      username: '',
      avatar: '',
      nickname: '',
    }
  },
  actions: {
    async userLogin(val: loginForm) {
      try {
        let response: loginResponse = await reqLogin(val)
        this.accessToken = response.accessToken as string
        this.refreshToken = response.refreshToken as string
        SET_ACCESS_TOKEN(response.accessToken as string)
        SET_REFRESH_TOKEN(response.refreshToken as string)
        return 'ok'
      } catch (err: any) {
        return Promise.reject(new Error(err.message))
      }
    },
    async userInfo() {
      try {
        let result = await reqUserInfo()
        this.username = result.username
        this.avatar = result.avatar
      } catch (err: any) {
        return Promise.reject(new Error(err.message))
      }
      // console.log(result)
      // if (result.code === 200) {
      //   this.username = result.data.checkUser.username
      //   this.avatar = result.data.checkUser.avatar
      //   return 'ok'
      // } else {
      //   return Promise.reject(new Error('获取用户信息失败'))
      // }
    },
    userLogout() {
      this.accessToken = ''
      this.username = ''
      this.avatar = ''
      this.nickname = ''
      REMOVE_TOKEN()
    },
  },
  getters: {},
})

export default useUserStore
