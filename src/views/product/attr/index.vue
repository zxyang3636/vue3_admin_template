<template>
  <div>
    <div>
      <Category></Category>
    </div>
    <el-card style="margin-top: 20px">
      <el-button type="primary" icon="Plus" :disabled="categoryStore.thirdLevelId == ''">
        添加属性
      </el-button>
      <el-table border style="width: 100%; margin-top: 10px" :data="attributeData">
        <el-table-column
          prop="prop"
          label="序号"
          type="index"
          align="center"
          width="60"
        ></el-table-column>
        <el-table-column prop="name" label="属性名称" width="120"></el-table-column>
        <el-table-column prop="value" label="属性值名称">
          <template #="{ row, $index }">
            <el-tag style="margin: 5px" type="success" v-for="itme in row.value" :key="$index">
              {{ itme }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="prop" label="操作" width="110">
          <template #="{ row, $index }">
            <el-button icon="Edit" size="small" type="primary"></el-button>
            <el-button icon="Delete" size="small" type="danger"></el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script setup lang="ts">
  import { watch, ref, reactive, toRefs, onMounted } from 'vue'
  import useCategoryStore from '@/store/modules/category'
  import { getAttributeInfo } from '@/api/product/attr'
  import type { Attribute, AttributeResponse } from '@/api/product/attr/type'
  let categoryStore = useCategoryStore()
  defineOptions({
    name: 'Attr',
  })

  let attributeData = ref<Attribute[]>([])

  watch(
    () => categoryStore.thirdLevelId,
    async () => {
      attributeData.value = []
      if (!categoryStore.thirdLevelId) return
      let res: AttributeResponse = await getAttributeInfo(categoryStore.thirdLevelId)
      attributeData.value = res.data
    },
    { deep: true },
  )
</script>

<style scoped lang="scss"></style>
