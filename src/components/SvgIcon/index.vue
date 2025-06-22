<template>
  <div>
    <svg :style="{ width, height }">
      <use :xlink:href="perfix + name" :fill="color"></use>
    </svg>
  </div>
</template>

<script setup lang="ts">
defineOptions({
  name: 'SvgIcon',
})

defineProps({
  perfix: {
    type: String,
    default: '#icon-',
  },
  name: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    default: '',
  },
  width: {
    type: String,
    default: '16px',
  },
  height: {
    type: String,
    default: '16px',
  },
})
</script>

<style scoped></style>
