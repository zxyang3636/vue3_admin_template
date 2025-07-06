<template>
  <template v-for="item in menuList" :key="item.path">
    <!-- 无子路由 -->
    <template v-if="!item.children">
      <el-menu-item v-if="!item.meta?.hidden" :index="item.path" @click="goRoute">
        <el-icon>
          <component :is="item.meta?.icon"></component>
        </el-icon>
        <template #title>
          <span>{{ item.meta?.title }}</span>
        </template>
      </el-menu-item>
    </template>

    <!-- 有子路由且个数等于一个 -->
    <template v-if="item.children && item.children.length === 1">
      <el-menu-item
        v-if="!item.children[0].meta?.hidden"
        :index="item.children[0].path"
        @click="goRoute"
      >
        <el-icon>
          <component :is="item.children[0].meta?.icon"></component>
        </el-icon>
        <template #title>
          <span>{{ item.children?.[0]?.meta?.title }}</span>
        </template>
      </el-menu-item>
    </template>

    <!-- 有子路由且个数大于一个 -->
    <el-sub-menu v-if="item.children && item.children.length > 1" :index="item.path">
      <template #title>
        <el-icon>
          <component :is="item.meta?.icon"></component>
        </el-icon>
        <span>{{ item.meta?.title }}</span>
      </template>
      <Menu :menuList="item.children"></Menu>
    </el-sub-menu>
  </template>
</template>

<script setup lang="ts">
  import { ref, reactive, toRefs, onMounted } from 'vue'
  import type { RouteRecordRaw } from 'vue-router'
  import { useRouter } from 'vue-router'
  defineOptions({
    name: 'Menu',
  })
  let $router = useRouter()

  defineProps({
    menuList: {
      type: Array<RouteRecordRaw>,
      default: () => [],
    },
  })

  const goRoute = (vc: any) => {
    $router.push(vc.index)
  }
</script>

<script lang="ts">
  export default {
    name: 'Menu',
  }
</script>

<style scoped lang="scss"></style>
