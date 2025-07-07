<template>
  <div>
    <h1>首页</h1>
    <button @click="testAA1">测试</button>
  </div>
</template>

<script setup lang="ts">
  defineOptions({
    name: 'Home',
  })
  import { ref, reactive, toRefs, onMounted } from 'vue'
  import { testAA } from '@/api/user'

  const testAA1 = async () => {
    const res = await testAA()
    console.log('测试', res)
  }
</script>

<style scoped lang="scss"></style>
