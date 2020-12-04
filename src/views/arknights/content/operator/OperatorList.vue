<template>
  <div>
    <!-- <h1>干员列表</h1> -->
    <el-form
      ref="postForm"
      :inline="true"
      :style="{ width: 'auto' }"
    >
      <el-form-item
        label-width="120"
        label="名称"
        prop="style"
        class="form-item-left"
      >
        <el-input v-model="searchName" clearable />
      </el-form-item>
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
      <el-table-column prop="name" label="名称" />
      <el-table-column prop="title" label="代号" />
      <el-table-column prop="icon" label="头像">
        <template slot-scope="scope">
          <img :src="scope.row.avatar" alt style="height:3rem">
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="180">
        <template slot-scope="scope">
          <!-- <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button> -->
          <el-button
            type="primary"
            size="small"
            @click="$router.push({ name: 'OperatorEdit', params:{id:scope.row._id}})"
          >编辑</el-button>
          <el-button type="primary" size="small" @click="remove(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import { deleteOperator, getOperatorList } from '@/api/arknights/index'
export default {
  data() {
    return {
      items: [],
      itemsShow: [],
      listLoading: false,
      searchName: ''
    }
  },
  created() {
    this.fetch()
  },
  methods: {
    async fetch() {
      this.listLoading = true
      const res = await getOperatorList()
      this.items = res.data
      this.itemsShow = JSON.parse(JSON.stringify(res.data))
      this.listLoading = false
    },
    async remove(row) {
      this.$confirm(`是否要确定删除干员"${row.name}"?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async() => {
          const res = await deleteOperator(row._id)
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
    searchData() {
      if (this.searchName === '') {
        this.itemsShow = this.items
      } else {
        const filterData = this.items.filter((item) => {
          if (item.name.indexOf(this.searchName) !== -1) {
            return true
          }
        })
        // console.log(filterData)
        this.itemsShow = filterData
      }
    }
  }
}
</script>
