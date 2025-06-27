<template>
  <router-view v-slot="{ Component }">
    <transition name="fade">
      <!-- 渲染layout一级路由组件的子路由 -->
      <component :is="Component" />
    </transition>
  </router-view>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
  .fade-enter-active {
    transition: all 0.6s ease;
  }

  .fade-enter-from {
    opacity: 0;
    transform: translateY(10px) scale(0.98);
  }

  .fade-enter-to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }

  .fade-leave-from {
    opacity: 1;
    transform: translateY(0) scale(1);
  }

  .fade-leave-to {
    opacity: 0;
    transform: translateY(10px) scale(0.98);
  }
</style>
