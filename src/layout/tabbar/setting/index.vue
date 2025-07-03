<template>
  <el-button icon="Refresh" size="default" circle @click="updateRefresh"></el-button>
  <el-button icon="FullScreen" size="default" circle @click="fullScreen"></el-button>
  <el-button icon="Setting" size="default" circle></el-button>
  <img :src="userStore.avatar" style="width: 32px; height: 32px; margin: 0px 10px" alt="logo" />
  <!-- 右侧下拉 -->
  <el-dropdown style="cursor: pointer">
    <span class="el-dropdown-link">
      {{ userStore.nickname }}
      <el-icon class="el-icon--right">
        <arrow-down />
      </el-icon>
    </span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item>Profile</el-dropdown-item>
        <el-dropdown-item @click="logout">退出登录</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup lang="ts">
  import { ref, reactive, toRefs, onMounted } from 'vue'
  import useLayoutSettingStore from '@/store/modules/setting'
  import useUserStore from '@/store/modules/user'
  import { useRouter, useRoute } from 'vue-router'

  let $router = useRouter()
  let $route = useRoute()

  let userStore = useUserStore()

  defineOptions({
    name: 'Setting',
  })

  let setting = useLayoutSettingStore()
  const updateRefresh = () => {
    setting.refresh = !setting.refresh
  }

  const fullScreen = () => {
    let flag = document.fullscreenElement
    if (flag) {
      document.exitFullscreen()
    } else {
      document.documentElement.requestFullscreen()
    }
  }

  const logout = async () => {
    await userStore.userLogout()
    $router.push({ path: '/login', query: { redirect: $route.path } })
  }
</script>

<style scoped lang="scss"></style>
