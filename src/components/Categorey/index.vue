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
          :disabled="scene == 1"
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
          :disabled="scene == 1"
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
          :disabled="scene == 1"
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
  defineOptions({ name: 'Category' })
  import { ref, reactive, toRefs, onMounted } from 'vue'
  import useCategoryStore from '@/store/modules/category'
  let categoryStore = useCategoryStore()
  onMounted(() => {
    getOneLevel()
  })
  defineProps({
    scene: {
      type: Number,
      default: 0,
    },
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
