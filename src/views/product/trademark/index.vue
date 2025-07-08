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
            <el-popconfirm
              icon="Delete"
              width="270"
              :title="`确定要删除 ${row.brandName} 品牌吗？`"
              @confirm="handleDelete($index, row)"
            >
              <template #reference>
                <el-button size="small">删除</el-button>
              </template>
            </el-popconfirm>
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
    <el-dialog
      v-model="dialogVisible"
      :title="!trademarkParams.id ? '添加品牌' : '修改品牌'"
      width="600"
    >
      <el-form style="width: 70%" :model="trademarkParams" :rules="rules" ref="formRef">
        <el-form-item label-width="90px" label="品牌名称" prop="brandName">
          <el-input placeholder="输入品牌名称" v-model="trademarkParams.brandName"></el-input>
        </el-form-item>
        <el-form-item label="品牌LOGO" label-width="90px" prop="logoUrl">
          <el-upload
            :headers="uploadHeaders"
            class="avatar-uploader"
            action="/api/file/uploadImg"
            :multiple="false"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="trademarkParams.logoUrl" :src="trademarkParams.logoUrl" class="avatar" />
            <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
          </el-upload>
        </el-form-item>
      </el-form>
      <!-- 具名插槽 -->
      <template #footer>
        <el-button type="info" @click="cancel">取消</el-button>
        <el-button type="primary" @click="confirm" :loading="loading">确定</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
  defineOptions({
    name: 'Trademark',
  })
  import {
    reqTrademarkList,
    reqTrademarkUpdate,
    reqTrademarkDelete,
  } from '@/api/product/trademark/index'
  import type { TradeMark } from '@/api/product/trademark/type'
  import useUserStore from '@/store/modules/user.ts'
  import { ElMessage, ElMessageBox, type UploadProps } from 'element-plus'
  import { ref, reactive, toRefs, onMounted, computed } from 'vue'

  let userStore = useUserStore()
  onMounted(async () => {
    getTrademarkList()
  })

  let pageNum = ref<number>(1)
  let pageSize = ref<number>(3)
  let total = ref<number>(0)
  let trademarkList = ref<any>([])
  let dialogVisible = ref<boolean>(false)
  let trademarkParams = reactive<TradeMark>({
    id: null,
    brandName: '',
    logoUrl: '',
  })
  let loading = ref<boolean>(false)
  let formRef = ref<any>()

  const validatorBrandName = (rule: any, value: any, callback: any) => {
    if (trademarkParams.brandName.trim().length >= 2) {
      callback()
    } else {
      callback(new Error('品牌名称长度必须大于等于2'))
    }
  }

  const validatorLogoUrl = (rule: any, value: any, callback: any) => {
    // value是上传的图片地址
    if (value) {
      callback()
    } else {
      callback(new Error('请上传品牌LOGO'))
    }
  }

  const rules = {
    brandName: [{ required: true, trigger: 'blur', validator: validatorBrandName }],
    logoUrl: [{ required: true, trigger: 'blur', validator: validatorLogoUrl }],
  }

  const handleAvatarSuccess = (response: any, file: File) => {
    if (response && response.code === 200 && response.success) {
      ElMessage.success('上传成功！')
      trademarkParams.logoUrl = response.data
      // 清除校验信息
      formRef.value.clearValidate('logoUrl')
      // console.log('新头像地址：', response.data)
    } else {
      ElMessage.error(response.message || '上传失败！')
    }
  }
  // 允许的图片类型和最大大小（MB）
  const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/gif', 'image/webp']
  const MAX_SIZE_MB = 15

  const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
    if (!ALLOWED_TYPES.includes(rawFile.type)) {
      ElMessage.error('只允许上传 JPG/PNG/GIF/WEBP 格式的图片！')
      return false
    }
    if (rawFile.size / 1024 / 1024 > MAX_SIZE_MB) {
      ElMessage.error(`图片大小不能超过 ${MAX_SIZE_MB}MB!`)
      return false
    }
    return true
  }

  const uploadHeaders = computed(() => {
    let token = userStore.accessToken
    if (token) {
      return {
        Authorization: 'Bearer ' + token,
      }
    }
  })

  const getTrademarkList = async (page?: number) => {
    if (page) {
      pageNum.value = page
    }
    let res = await reqTrademarkList(pageNum.value, pageSize.value)
    total.value = res.data.total
    trademarkList.value = res.data.list
  }

  const sizeChange = () => {
    pageNum.value = 1
    getTrademarkList()
  }

  /**
   * 添加trademark按钮
   */
  const insertTrademark = () => {
    dialogVisible.value = true
    trademarkParams.id = null
    trademarkParams.brandName = ''
    trademarkParams.logoUrl = ''
    formRef?.value.resetFields()
  }

  /**
   * 修改trademark
   * @param index
   * @param row
   */
  const handleEdit = (index: number, row: any) => {
    formRef?.value.resetFields()
    dialogVisible.value = true
    Object.assign(trademarkParams, row)
  }

  const cancel = () => {
    dialogVisible.value = false
  }
  const confirm = async () => {
    await formRef.value.validate()
    try {
      loading.value = true
      await reqTrademarkUpdate(trademarkParams)
      setTimeout(() => {
        getTrademarkList(!trademarkParams.id ? 1 : pageNum.value)
      }, 100)
      dialogVisible.value = false
    } catch (err: any) {
      // 失败时不关闭对话框，让用户可以修改后重试
      ElMessage.error(err.message || '更新失败，请重试')
    } finally {
      loading.value = false
    }
  }

  const handleDelete = async (index: number, row: any) => {
    await reqTrademarkDelete(row.id)
    getTrademarkList()
  }
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
