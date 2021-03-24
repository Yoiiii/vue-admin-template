<template>
  <div class="app-container">
    <!-- 查询 -->
    <el-form :inline="true">
      <el-form-item label="图片名称">
        <el-input v-model="formData.name" placeholder="请输入图片名称" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="postFrom">查询</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="createDialogVisible = true">新建</el-button>
      </el-form-item>
    </el-form>
    <el-table
      v-loading="listLoading"
      :data="items"
      element-loading-text="加载中"
      style="width: 100%"
    >
      <!-- <el-table-column prop="_id" label="ID" width="230" /> -->
      <el-table-column prop="title" label="图片名称" />
      <el-table-column fixed="right" label="操作" width="180">
        <template slot-scope="scope">
          <!-- <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button> -->
          <el-button
            type="primary"
            size="small"
            @click="$router.push({ name: 'ArticleEdit', params:{id:scope.row._id}})"
          >编辑</el-button>
          <!-- @click="$router.push({ name: 'ArticleEdit', params:`{${scope.row._id}}`})" -->
          <el-button type="primary" size="small" @click="remove(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 新增dialog -->
    <el-dialog
      title="新增"
      :visible.sync="createDialogVisible"
      width="30%"
      :before-close="handleClose"
    >
      <el-form>
        <el-form-item label="图片名称">
          <el-input v-model="createFormData" placeholder="请输入图片名称" />
        </el-form-item>
        <el-form-item label="图片" />
      </el-form>
      <span>这是一段信息</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="createDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="createDialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="剪切图片" :visible.sync="cutImgDialogVisible" :before-close="handleClose" append-to-body>
      <div style="width: 100%; height: 400px">
        <vue-cropper
          ref="cropper"
          auto-crop
          :img="cutimage"
          :fixed-number="[1, 1]"
          :fixed="fixed"
          center-box
        />
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button
          icon="el-icon-refresh-right"
          circle
          @click="rotateRightImage"
        />
        <el-button @click="cutImgDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="uploadImage">
          上传
          <i class="el-icon-upload el-icon--right" />
        </el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { getArticlesList, deleteArticles } from '@/api/arknights/index.js'
import { VueCropper } from 'vue-cropper'
export default {
  components: {
    VueCropper
  },
  data() {
    return {
      formData: {
        name: ''
      },
      createFromDate: {

      },
      items: [],
      listLoading: false,
      createDialogVisible: false,
      cutImgDialogVisible: false
    }
  },
  created() {
    this.fetch()
  },
  methods: {
    async fetch() {
      this.listLoading = true
      // const res = await this.$http.get('rest/articles')
      const res = await getArticlesList()
      this.items = res.data
      this.listLoading = false
    },
    async remove(row) {
      this.$confirm(`是否要确定删除文章"${row.title}"?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async() => {
          // const res = await this.$http.delete(`rest/articles/${row._id}`)
          const res = await deleteArticles(row._id)
          if (res.data.success) {
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
            this.fetch()
          } else {
            this.$message({
              type: 'fail',
              message: '删除失败!'
            })
            this.fetch()
          }
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    jumptoedit() {

    },
    showCreate() {

    },
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => {})
    }
  }
}
</script>
