<template>
  <el-button icon="Refresh" size="default" circle></el-button>
  <el-button icon="FullScreen" size="default" circle></el-button>
  <el-button icon="Setting" size="default" circle></el-button>
  <img src="../../../../public/logo.png" style="width: 32px; height: 32px; margin: 0px 10px" alt="logo" />
  <!-- 右侧下拉 -->
  <el-dropdown style="cursor: pointer;">
    <span class="el-dropdown-link">
      admin
      <el-icon class="el-icon--right">
        <arrow-down />
      </el-icon>
    </span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item>Profile</el-dropdown-item>
        <el-dropdown-item>退出登录</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup lang="ts">
  import { ref, reactive, toRefs, onMounted } from 'vue'
  defineOptions({
    name: 'Setting',
  })
</script>

<style scoped lang="scss"></style>
