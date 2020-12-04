<template>
  <div>
    <el-main :closable="false" title="content">
      <el-form
        ref="postForm"
        :model="postForm"
        :inline="true"
        :style="{ width: 'auto' }"
      >
        <el-form-item
          label-width="120"
          label="用户名"
          prop="style"
          class="form-item-left"
        >
          <el-input v-model="searchName" clearable />
        </el-form-item>
        <!-- <el-form-item
          label-width="120px"
          label="用户名"
          prop="style"
          class="form-item-left"
        >
          <el-select v-model="searchName" filterable placeholder="请选择">
            <el-option
              v-for="item in items"
              :key="item._id"
              :label="item.username"
              :value="item.username"
            />
          </el-select>
        </el-form-item> -->

        <!-- <el-form-item
          label-width="120px"
          :label="用户名"
          :style="{width:'380px'}"
          class="form-item-left"
        >
          <el-radio-group v-model="postForm.showStyle">
            <el-radio-button label="A">222</el-radio-button>
            <el-radio-button label="B">333</el-radio-button>
          </el-radio-group>
        </el-form-item> -->
        <el-form-item>
          <el-button
            type="primary"
            @click.native.prevent="searchData"
          >查询</el-button>
          <el-button @click="resetForm()">重置</el-button>
        </el-form-item>
      </el-form>
      <el-table
        v-loading="listLoading"
        :data="itemsShow"
        element-loading-text="加载中"
      >
        <el-table-column prop="_id" label="ID" width="230" />
        <!-- <el-table-column prop="parent.name" label="上级分类"></el-table-column> -->
        <el-table-column prop="username" label="用户名" />
        <el-table-column fixed="right" label="操作" width="240">
          <template slot-scope="scope">
            <!-- <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button> -->
            <el-button
              type="primary"
              size="small"
              @click="showEditDialog(scope.row._id)"
            >编辑</el-button>
            <el-button
              type="primary"
              size="small"
              @click="resetPsw(scope.row._id)"
            >重置密码</el-button>
            <el-button
              type="primary"
              size="small"
              @click="remove(scope.row)"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-main>

    <el-dialog
      :title="editId ? '编辑' : '新增' + '账号'"
      :visible.sync="editDialogVisible"
    >
      <el-form :model="postForm" :rules="dataRules">
        <el-form-item label="账号角色">
          <el-select v-model="postForm.roles" name="userRoles" placeholder="请选择账号角色" multiple>
            <el-option v-for="item in rolesList" :key="item.roles" :label="item.name" :value="item.roles" />
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveChange()">保 存</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getUserList, deleteUser, editUser, getUser, getRolesList, resetPassword } from '@/api/setting/index'
export default {
  data() {
    return {
      items: [],
      itemsShow: [],
      listLoading: false,
      editId: null,
      postForm: {
        roles: ''
      },
      rolesList: [],
      searchName: '',
      editDialogVisible: false,
      dataRules: {
        userRoles: [{ type: 'array', required: true, message: '请至少选择角色', trigger: 'change' }]
      }
    }
  },
  created() {
    this.fetch()
  },
  methods: {
    // 获取列表信息
    async fetch() {
      this.listLoading = true
      const res = await getUserList()
      this.items = res.data
      this.itemsShow = JSON.parse(JSON.stringify(res.data))
      this.listLoading = false
    },
    // 删除用户
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
    // 编辑用户
    async showEditDialog(id) {
      this.editId = id
      const res = await getUser(id)
      this.postForm.roles = res.data.roles
      const rolesList = await getRolesList()
      this.rolesList = rolesList.data
      // console.log(this.postForm.roles, this.rolesList)
      this.editDialogVisible = true
    },
    // 筛选列表
    searchData() {
      if (this.searchName === '') {
        this.itemsShow = this.items
      } else {
        const filterData = this.items.filter((item) => {
          // console.log(
          //   item.username,
          //   this.searchName,
          //   item.username.indexOf(this.searchName)
          // )
          if (item.username.indexOf(this.searchName) !== -1) {
            return true
          }
        })
        // console.log(filterData)
        this.itemsShow = filterData
      }
    },
    // 重置表单
    resetForm() {
      this.searchName = ''
      this.fetch()
    },
    // 保存编辑
    async saveChange() {
      const data = {
        roles: this.postForm.roles
      }
      const res = await editUser(this.editId, data)
      // console.log(res)
      if (res.statusText === 'OK') {
        this.$message({ type: 'success', message: '保存成功' })
        this.editDialogVisible = false
      }
    },
    // 重置密码
    async resetPsw(id) {
      this.$confirm('此操作将重置改用户的密码(默认密码:123456), 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async() => {
        const res = await resetPassword(id)
        if (res.data.msg === 'success') {
          this.$message({
            type: 'success',
            message: '重置成功!'
          })
        }
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    }
  }
}
</script>
