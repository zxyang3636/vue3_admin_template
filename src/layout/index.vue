<template>
  <div class="layout_container">
    <!-- 左侧菜单 -->
    <div class="layout_slide">
      <Logo></Logo>
      <!-- 左侧菜单滚动条 -->
      <el-scrollbar class="scrollbar">
        <!-- 菜单组件 -->
        <el-menu mode="vertical" background-color="#f3f4f6" text-color="#000000d9" active-text-color="#3370FF">
          <Menu :menuList="userStore.menuRoutes"></Menu>
        </el-menu>
      </el-scrollbar>
    </div>
    <!-- 顶部导航 -->
    <div class="layout_tabbar">456</div>
    <!-- 内容展示区 -->
    <div class="layout_main">
      <p style="height: 10000px"></p>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref, reactive, toRefs, onMounted } from 'vue'
  import Logo from './logo/index.vue'
  import Menu from './menu/index.vue'
  import useUserStore from '@/store/modules/user'

  let userStore = useUserStore()
</script>

<style scoped lang="scss">
  .layout_container {
    width: 100%;
    height: 100vh;
    background-color: aqua;

    .layout_slide {
      width: $base-menu-width;
      height: 100vh;
      background-color: $base-menu-background-color;

      .scrollbar {
        height: calc(100vh - $base-logo-height);
        width: $base-menu-width;
        .el-menu {
          border-right: none;
        }
      }
    }

    .layout_tabbar {
      width: calc(100% - $base-menu-width);
      height: $base-tabbar-height;
      background-color: red;
      position: fixed;
      top: 0%;
      left: $base-menu-width;
    }

    .layout_main {
      position: absolute;
      top: $base-tabbar-height;
      left: $base-menu-width;
      width: calc(100% - $base-menu-width);
      height: calc(100vh - $base-tabbar-height);
      background-color: green;
      padding: 20px;
      overflow: auto; //内容区域加个滚动条，否则内容会超出整个区域滚动
    }
  }
</style>
