<template>
  <div>
    <h1>我是App</h1>
    <button @click="handleClick"></button>
  </div>
</template>

<script setup lang="ts">

const handleClick = () => {
  console.log("aaaa")
}
</script>

<style scoped></style>
