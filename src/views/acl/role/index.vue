<template>
  <div>
    <h1>角色</h1>
    <div class="box"></div>
  </div>
</template>

<script setup lang="ts">
  import { ref, reactive, toRefs, onMounted } from 'vue'
</script>

<style scoped lang="scss">
  .box {
    width: 300px;
    height: 100vh;
    background-color: bisque;
  }
</style>
