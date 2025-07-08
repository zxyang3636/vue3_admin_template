<template>
  <div>
    <div>
      <Category></Category>
    </div>
    <el-card style="margin-top: 20px">
      <el-button type="primary" icon="Plus">添加属性</el-button>
      <el-table border style="width: 100%; margin-top: 10px">
        <el-table-column
          prop="prop"
          label="序号"
          type="index"
          align="center"
          width="60"
        ></el-table-column>
        <el-table-column prop="prop" label="属性名称" width="120"></el-table-column>
        <el-table-column prop="prop" label="属性值名称"></el-table-column>
        <el-table-column prop="prop" label="操作" width="100"></el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script setup lang="ts">
  import { ref, reactive, toRefs, onMounted } from 'vue'
  defineOptions({
    name: 'Attr',
  })
</script>

<style scoped lang="scss"></style>
