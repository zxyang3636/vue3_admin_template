<template>
  <el-icon style="margin-right: 13px; cursor: pointer" @click="changeIcon">
    <component :is="!layoutSettingStore.fold ? 'Fold' : 'Expand'"></component>
  </el-icon>
  <el-breadcrumb separator-icon="ArrowRight">
    <el-breadcrumb-item>权限管理</el-breadcrumb-item>
    <el-breadcrumb-item>用户管理</el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script setup lang="ts">
  import { ref, reactive, toRefs, onMounted } from 'vue'
  import useLayoutSettingStore from '@/store/modules/setting'

  let layoutSettingStore = useLayoutSettingStore()

  defineOptions({
    name: 'Breadcrumb',
  })

  const changeIcon = () => {
    layoutSettingStore.fold = !layoutSettingStore.fold
  }
</script>

<style scoped lang="scss"></style>
