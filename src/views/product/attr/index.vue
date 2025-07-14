<template>
  <div>
    <div>
      <Category :scene="scene"></Category>
    </div>
    <el-card style="margin-top: 20px">
      <div v-show="scene == 0">
        <el-button
          @click="updateShow"
          type="primary"
          icon="Plus"
          :disabled="categoryStore.thirdLevelId == ''"
        >
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
              <el-button
                @click="updateAttr(row)"
                icon="Edit"
                size="small"
                type="primary"
              ></el-button>
              <el-popconfirm
                title="Are you sure to delete this?"
                @confirm="delOpt(row.attributeKeysId)"
              >
                <template #reference>
                  <el-button icon="Delete" size="small" type="danger"></el-button>
                </template>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div v-show="scene == 1">
        <el-form ref="form" label-width="80px" inline>
          <el-form-item label="属性名称">
            <el-input v-model="attrParams.name" placeholder="属性名称"></el-input>
          </el-form-item>
        </el-form>
        <el-button
          @click="addAttr"
          :disabled="!attrParams.name || attrParams.name.trim() === ''"
          type="primary"
          icon="Plus"
        >
          添加属性
        </el-button>
        <el-button type="info" icon="Close" @click="cancelShow">取消</el-button>
        <el-table :data="attrParams.value" border style="width: 100%; margin: 10px 0px">
          <el-table-column prop="prop" label="序号" width="80" type="index"></el-table-column>
          <el-table-column prop="prop" label="属性值名称值" width="width">
            <template #="{ row, $index }">
              <el-input
                :ref="(vc: any) => (inputList[$index] = vc)"
                v-if="attrParams.flag?.[$index]"
                v-model="attrParams.value[$index]"
                placeholder="属性值名称值"
                @blur="toPreview($index)"
                size="small"
              ></el-input>
              <div @click="toEdit($index)" v-else>{{ attrParams.value[$index] }}</div>
            </template>
          </el-table-column>
          <el-table-column prop="prop" label="操作" width="width">
            <template #="{ row, $index }">
              <el-button type="warning" icon="Delete" @click="delAttr($index)"></el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-button type="primary" icon="Plus" @click="save">保存</el-button>
        <el-button type="info" icon="Close" @click="cancelShow">取消</el-button>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
  import { watch, ref, reactive, toRefs, onMounted, nextTick, onBeforeUnmount } from 'vue'
  import useCategoryStore from '@/store/modules/category'
  import { getAttributeInfo, updateOrSaveAttribute, delAttribute } from '@/api/product/attr'
  import type { Attribute, AttributeResponse } from '@/api/product/attr/type'
  import { ElMessage } from 'element-plus'
  let categoryStore = useCategoryStore()
  onBeforeUnmount(() => {
    categoryStore.$reset()
  })

  defineOptions({
    name: 'Attr',
  })

  let attrParams = reactive<Attribute>({
    attributeKeysId: '',
    name: '',
    value: [],
    thirdLevelId: '',
    flag: [],
  })

  const delOpt = async (attributeKeysId: string) => {
    await delAttribute(attributeKeysId)
    let res: AttributeResponse = await getAttributeInfo(categoryStore.thirdLevelId)
    attributeData.value = res.data
  }

  const delAttr = (index: number) => {
    attrParams.value.splice(index, 1)
    attrParams.flag?.splice(index, 1)
  }

  const toPreview = (index: number) => {
    if (attrParams.value[index].trim() === '') {
      return
    }
    attrParams.flag![index] = false
  }
  const toEdit = (index: number) => {
    attrParams.flag![index] = true
    //  nextTick响应式数据发生变化时，获取更新的DOM（组件实例）
    nextTick(() => {
      inputList.value[index].focus()
    })
  }

  let inputList = ref<any[]>([])

  const addAttr = () => {
    attrParams.value.push('')
    attrParams.flag?.push(true)
    // 聚焦最后一项
    nextTick(() => {
      inputList.value[attrParams.value.length - 1].focus()
    })
  }

  const save = async () => {
    try {
      await updateOrSaveAttribute(attrParams)
      let res: AttributeResponse = await getAttributeInfo(categoryStore.thirdLevelId)
      attributeData.value = res.data
      scene.value = 0
    } catch (e: any) {
      return
    }
  }

  // card内部数据切换
  let scene = ref<number>(0) // scene=1展示添加
  const updateShow = () => {
    scene.value = 1
    Object.assign(attrParams, {
      attributeKeysId: '',
      name: '',
      value: [],
      thirdLevelId: categoryStore.thirdLevelId,
    })
  }

  const updateAttr = (row: Attribute) => {
    scene.value = 1
    // 深拷贝
    Object.assign(attrParams, JSON.parse(JSON.stringify(row)))
    // console.log(row);
  }
  const cancelShow = () => {
    scene.value = 0
  }

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
