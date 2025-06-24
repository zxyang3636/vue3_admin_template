<template>
  <div class="login_container">
    <el-row>
      <el-col :span="12" :xs="0"></el-col>
      <el-col :span="12" :xs="24">
        <el-form class="login_form" :model="loginForm" :rules="loginRules" ref="loginForms">
          <h1>Hello</h1>
          <h2>欢迎来到ZZY后台管理系统</h2>
          <el-form-item prop="username">
            <el-input :prefix-icon="User" placeholder="用户名" v-model="loginForm.username"></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              show-password
              :prefix-icon="Lock"
              type="password"
              placeholder="密码"
              v-model="loginForm.password"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button :loading="isLoding" class="login_btn" type="primary" size="default" @click="login">
              登录
            </el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
  import { ref, reactive, toRefs, onMounted } from 'vue'
  import useUserStore from '@/store/modules/user' // 导入useUserStore函数
  import { User, Lock } from '@element-plus/icons-vue'
  import { ElMessage, ElNotification } from 'element-plus'
  import { useRouter } from 'vue-router'
  import { getTime } from '@/utils/times'

  let userStore = useUserStore()
  let $router = useRouter()

  let isLoding = ref(false)
  let loginForms = ref()

  const loginForm = reactive({ username: 'admin', password: '111111' })

  const login = async () => {
    await loginForms.value.validate()

    isLoding.value = true
    try {
      await userStore.userLogin(loginForm)
      $router.push('/')
      ElNotification({
        title: `Hi ${getTime()}`,
        message: '欢迎回来',
        type: 'success',
      })
      isLoding.value = false
    } catch (error) {
      ElNotification({
        title: '登录失败',
        message: (error as Error).message,
        type: 'error',
      })
      isLoding.value = false
    }
  }
  const validateUsername = (_rule: any, value: any, callback: any) => {
    // ^[a-zA-Z]    : 以字母开头
    // [a-zA-Z0-9_]{3,15} : 后续字符可以是字母、数字或下划线，总长度 4～16
    const usernameRegex = /^[a-zA-Z][a-zA-Z0-9_]{3,15}$/
    if (!usernameRegex.test(value)) {
      callback(new Error('用户名必须以字母开头，且长度为4-16位'))
    } else {
      callback()
    }
  }

  const loginRules = {
    username: [
      { required: true, validator: validateUsername, trigger: 'change' },
      //   { min: 5, max: 10, message: '用户名长度为5-10位', trigger: 'change' },
    ],
    password: [
      { required: true, message: '密码不能为空', trigger: 'change' },
      { min: 6, max: 10, message: '密码长度为6-10位', trigger: 'change' },
    ],
  }
</script>

<style scoped lang="scss">
  .login_container {
    width: 100%;
    height: 100vh;
    background: url('@/assets/images/wallhaven-3z2r23.webp') no-repeat;
    background-size: cover;
  }
  .login_form {
    position: relative;
    width: 70%;
    top: 30vh;
    background: url('@/assets/images/login_form.png');
    background-size: cover;
    padding: 40px;
    h1 {
      color: white;
      font-size: 40px;
    }
    h2 {
      font-size: 20px;
      color: white;
      margin: 20px;
    }
    .login_btn {
      width: 100%;
    }
  }
</style>
