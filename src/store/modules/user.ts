import { defineStore } from 'pinia'
import { reqLogin } from '@/api/user'
import type { loginForm, loginResponse } from '@/api/user/type'
import type { UserState } from './types/types'
import { SET_TOKEN, GET_TOKEN } from '@/utils/token'
import { constantRoute } from '@/router/routes'

let useUserStore = defineStore('User', {
  state: (): UserState => {
    return {
      token: GET_TOKEN(),
      menuRoutes: constantRoute,
    }
  },
  actions: {
    async userLogin(val: loginForm) {
      let response: loginResponse = await reqLogin(val)
      if (response.code === 200) {
        this.token = response.data.token as string
        SET_TOKEN(response.data.token as string)
        return 'ok'
      } else {
        return Promise.reject(new Error(response.data.message))
      }
    },
  },
  getters: {},
})

export default useUserStore
