<template>
  <el-card>
    <el-form ref="form" :inline="true" label-width="80px">
      <el-form-item label="一级分类">
        <el-select
          v-model="categoryStore.oneLevelId"
          clearable
          placeholder="Select"
          style="width: 240px"
          @change="getSecondLevel"
        >
          <el-option
            v-for="item in categoryStore.oneLevelData"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="二级分类">
        <el-select
          v-model="categoryStore.secondLevelId"
          clearable
          placeholder="Select"
          style="width: 240px"
          @change="getThirdLevel"
        >
          <el-option
            v-for="item in categoryStore.secondLevelData"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="三级分类">
        <el-select
          v-model="categoryStore.thirdLevelId"
          clearable
          placeholder="Select"
          style="width: 240px"
        >
          <el-option
            v-for="item in categoryStore.thirdLevelData"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script setup lang="ts">
  import { ref, reactive, toRefs, onMounted } from 'vue'
  import useCategoryStore from '@/store/modules/category'
  let categoryStore = useCategoryStore()
  onMounted(() => {
    getOneLevel()
  })

  const getThirdLevel = () => {
    categoryStore.thirdLevelId = ''
    categoryStore.thirdLevelData = []
    categoryStore.getThirdLevel()
  }

  const getSecondLevel = () => {
    categoryStore.secondLevelId = ''
    categoryStore.secondLevelData = []
    categoryStore.thirdLevelId = ''
    categoryStore.thirdLevelData = []
    categoryStore.getSecondlevel()
  }

  const getOneLevel = async () => {
    categoryStore.getOneLevel()
  }
</script>

<style scoped lang="scss"></style>
