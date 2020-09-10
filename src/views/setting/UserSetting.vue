<template>
  <div>
    <el-main :closable="false" title="content">
      <el-form ref="postForm" :model="postForm" :inline="true" :style="{width:'auto'}">
        <!-- 顯示款號 Show Style: -->
        <el-form-item label-width="120px" :label="1111" prop="style" class="form-item-left">
          <el-input v-model="postForm.style" />
        </el-form-item>
        <el-form-item
          label-width="120px"
          :label="222"
          :style="{width:'380px'}"
          class="form-item-left"
        >
          <el-radio-group v-model="postForm.showStyle">
            <el-radio-button label="A">222</el-radio-button>
            <el-radio-button label="B">333</el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" :loading="loading" @click.native.prevent="searchData">查询</el-button>
          <el-button @click="resetForm()">重置</el-button>
        </el-form-item>
      </el-form>
      <el-table v-loading="listLoading" :data="items" element-loading-text="加载中">
        <el-table-column prop="_id" label="ID" width="230" />
        <!-- <el-table-column prop="parent.name" label="上级分类"></el-table-column> -->
        <el-table-column prop="username" label="用户名" />
        <el-table-column fixed="right" label="操作" width="180">
          <template slot-scope="scope">
            <!-- <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button> -->
            <el-button type="primary" size="small" @click="showEditDialog(scope.row._id)">编辑</el-button>
            <el-button type="primary" size="small" @click="remove(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-main>

    <el-dialog :title="editId ? '编辑':'新增' + '账号'" :visible.sync="editDialogVisible">
      <el-form :model="postForm">
        <el-form-item label="活动名称" :label-width="100">
          <el-input v-model="postForm.name" autocomplete="off" />
        </el-form-item>
        <el-form-item label="活动区域" :label-width="100">
          <el-select v-model="postForm.region" placeholder="请选择活动区域">
            <el-option label="区域一" value="shanghai" />
            <el-option label="区域二" value="beijing" />
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editDialogVisible = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getUserList, deleteUser } from '@/api/setting/index'
export default {
  data() {
    return {
      items: [],
      listLoading: false,
      editId: null,
      postForm: {
        style: '',
        showStyle: ''
      },
      editDialogVisible: false
    }
  },
  created() {
    this.fetch()
  },
  methods: {
    async fetch() {
      this.listLoading = true
      const res = await getUserList()
      this.items = res.data
      this.listLoading = false
    },
    async remove(row) {
      this.$confirm(`是否要确定删除该用户"${row.name}"?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async() => {
          const res = await deleteUser(row._id)
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
    showEditDialog(id) {
      this.editDialogVisible = true
    }
  }
}
</script>
