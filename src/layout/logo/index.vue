<template>
  <div class="logo" v-if="setting.logoHidden">
    <img :src="setting.logo" alt="" />
    <p v-show="!settingStore.fold">{{ setting.title }}</p>
  </div>
</template>

<script setup lang="ts">
  import setting from '@/setting'
  import useLayoutSettingStore from '@/store/modules/setting'
  let settingStore = useLayoutSettingStore()
  defineOptions({
    name: 'Logo',
  })
</script>

<style scoped lang="scss">
  .logo {
    height: $base-logo-height;
    width: 100%;
    display: flex;
    align-items: center;
    padding: 0 10px;
    p {
      font-size: $base-logo-font-size;
      margin-left: 10px;
      color: #000000d9;
    }
    img {
      width: 40px;
      height: 40px;
      // border-radius: 20px;
    }
  }
</style>
