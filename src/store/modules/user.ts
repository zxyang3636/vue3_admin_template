import { defineStore } from 'pinia'
import { reqLogin, reqUserInfo } from '@/api/user'
import type { loginForm, loginResponse } from '@/api/user/type'
import type { UserState } from './types/types'
import { SET_TOKEN, GET_TOKEN, REMOVE_TOKEN } from '@/utils/token'
import { constantRoute } from '@/router/routes'

let useUserStore = defineStore('User', {
  state: (): UserState => {
    return {
      token: GET_TOKEN(),
      menuRoutes: constantRoute,
      username: '',
      avatar: '',
    }
  },
  actions: {
    async userLogin(val: loginForm) {
      try {
        let response: loginResponse = await reqLogin(val)
        this.token = response.token as string
        SET_TOKEN(response.token as string)
        return 'ok'
      } catch (err: any) {
        return Promise.reject(new Error(err.message))
      }
      // console.log(response);

      // if (response.code === 200) {
      //   this.token = response.data.token as string
      //   SET_TOKEN(response.data.token as string)
      //   return 'ok'
      // } else {
      //   return Promise.reject(new Error(response.data.message))
      // }
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
      this.token = ''
      this.username = ''
      this.avatar = ''
      REMOVE_TOKEN()
    },
  },
  getters: {},
})

export default useUserStore
