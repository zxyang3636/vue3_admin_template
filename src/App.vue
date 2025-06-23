<template>
  <div></div>
</template>

<script setup lang="ts">
  import { ref, reactive, toRefs, onMounted } from 'vue'
  import { reqLogin } from './api/user'
  onMounted(() => {
    reqLogin({ username: 'admin', password: '111111' }).then((res) => {
      console.log(res)
    })
  })
</script>

<style scoped lang="scss"></style>
