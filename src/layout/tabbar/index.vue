<template>
  <div class="tabbar">
    <div class="tabbar_left">
      <Breadcrumb></Breadcrumb>
    </div>
    <div class="tabbar_right">
      <Setting></Setting>
    </div>
  </div>
</template>

<script setup lang="ts">
  import Breadcrumb from './breadcrumb/index.vue'
  import Setting from './setting/index.vue'
  defineOptions({
    name: 'Tabbar',
  })
</script>

<style scoped lang="scss">
  .tabbar {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .tabbar_left {
      display: flex;
      margin-left: 20px;
    }

    .tabbar_right {
      display: flex;
      align-items: center;
      margin-right: 10px;
    }
  }
</style>
