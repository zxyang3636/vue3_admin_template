<template>
  <div>
    <h1>我是App</h1>
    <el-button type="success" size="default" @click="" :icon="Edit">success</el-button>

    <el-button type="primary" size="default" @click="" :icon="Plus">你好</el-button>

  </div>
</template>

<script setup lang="ts">
import { Plus, Edit, Delete } from '@element-plus/icons-vue';
const handleClick = () => {
  console.log('aaaa')
}
</script>

<style scoped></style>
