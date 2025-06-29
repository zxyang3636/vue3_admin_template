<!-- 左上角 折叠图标、面包屑 -->
<template>
  <el-icon style="margin-right: 13px; cursor: pointer" @click="changeIcon">
    <component :is="!layoutSettingStore.fold ? Fold : Expand"></component>
  </el-icon>
  <el-breadcrumb separator-icon="ArrowRight">
    <el-breadcrumb-item v-for="item in $route.matched" :key="item.path" v-show="item.meta.title" :to="item.path">
      <el-icon v-if="item.meta.icon" :style="{ verticalAlign: '-15%' }">
        <component :is="item.meta.icon"></component>
      </el-icon>
      <span style="margin: 0 4px">
        {{ item.meta.title }}
      </span>
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script setup lang="ts">
  import { ref, reactive, toRefs, onMounted } from 'vue'
  import useLayoutSettingStore from '@/store/modules/setting'
  import { useRoute } from 'vue-router'
  import { Fold, Expand } from '@element-plus/icons-vue'
  let $route = useRoute()

  let layoutSettingStore = useLayoutSettingStore()

  defineOptions({
    name: 'Breadcrumb',
  })

  const changeIcon = () => {
    layoutSettingStore.fold = !layoutSettingStore.fold
  }
</script>

<style scoped lang="scss"></style>
