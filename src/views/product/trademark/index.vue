<template>
  <div>
    <el-card class="top-card" shadow="hover">
      <!-- 顶部添加 -->
      <el-button icon="Plus" type="primary" @click="insertTrademark">添加品牌</el-button>
    </el-card>
    <!-- 数据展示部分 -->
    <el-card class="info-card">
      <el-table :data="trademarkList" style="width: 100%" border>
        <el-table-column type="index" prop="id" label="序号" width="80px"></el-table-column>
        <el-table-column label="品牌名称" width="width" align="left">
          <template #="{ row, $index }">
            <pre style="color: #000000e0; font: 14px">{{ row.brandName }}</pre>
          </template>
        </el-table-column>
        <el-table-column prop="logoUrl" label="品牌LOGO">
          <template #="{ row, $index }">
            <img :src="row.logoUrl" alt="未有图片" style="width: 70px; height: 70px" />
          </template>
        </el-table-column>
        <el-table-column label="品牌操作">
          <template #="{ row, $index }">
            <el-button size="small" @click="handleEdit($index, row)">编辑</el-button>
            <el-button size="small" @click="handleDelete($index, row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页器 -->
      <el-pagination
        style="margin-top: 20px"
        v-model:current-page="pageNum"
        v-model:page-size="pageSize"
        :page-sizes="[3, 5, 7, 10, 30, 50]"
        :background="true"
        layout="prev, pager, next, jumper,->,total, sizes"
        :total="total"
        @size-change="sizeChange"
        @current-change="getTrademarkList()"
      />
    </el-card>

    <!-- 对话框组件 -->
    <el-dialog v-model="dialogVisible" title="添加品牌" width="600">
      <el-form style="width: 70%">
        <el-form-item label-width="80px" label="品牌名称">
          <el-input placeholder="输入品牌名称"></el-input>
        </el-form-item>
        <el-form-item label="品牌LOGO" label-width="80px">
          <!-- <el-upload
            class="avatar-uploader"
            action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
            <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
          </el-upload> -->
        </el-form-item>
      </el-form>
      <!-- 具名插槽 -->
      <template #footer>
        <el-button type="info" @click="cancel">取消</el-button>
        <el-button type="primary" @click="confirm">确定</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
  defineOptions({
    name: 'Trademark',
  })
  import { reqTrademarkList } from '@/api/product/trademark/index'
  import { fa } from 'element-plus/es/locales.mjs'
  import { ref, reactive, toRefs, onMounted } from 'vue'
  onMounted(async () => {
    getTrademarkList()
  })

  let pageNum = ref<number>(1)
  let pageSize = ref<number>(3)
  let total = ref<number>(0)
  let trademarkList = ref<any>([])
  let dialogVisible = ref<boolean>(false)

  const getTrademarkList = async () => {
    let res = await reqTrademarkList(pageNum.value, pageSize.value)
    total.value = res.data.total
    trademarkList.value = res.data.list
    // console.log(res)
  }

  const sizeChange = () => {
    pageNum.value = 1
    getTrademarkList()
  }

  /**
   * 添加trademark
   */
  const insertTrademark = () => {
    dialogVisible.value = true
  }

  /**
   * 修改trademark
   * @param index
   * @param row
   */
  const handleEdit = (index: number, row: any) => {
    dialogVisible.value = true
    console.log('edit', index, row)
  }

  const cancel = () => {
    dialogVisible.value = false
  }
  const confirm = () => {
    dialogVisible.value = false
  }

  const handleDelete = (index: number, row: any) => {}
</script>

<style scoped lang="scss">
  .top-card {
    margin-bottom: 20px;
    border-radius: 10px;
  }
  .info-card {
    border-radius: 10px;
  }
  .avatar-uploader .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>

<style lang="scss">
  .avatar-uploader .el-upload {
    border: 1px dashed var(--el-border-color);
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition: var(--el-transition-duration-fast);
  }

  .avatar-uploader .el-upload:hover {
    border-color: var(--el-color-primary);
  }

  .el-icon.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    text-align: center;
  }
</style>
