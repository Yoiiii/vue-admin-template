<template>
  <div>
    <!-- <h1>文章列表</h1> -->
    <el-table
      v-loading="listLoading"
      :data="items"
      element-loading-text="加载中"
    >
      <el-table-column prop="_id" label="ID" width="230" />
      <el-table-column prop="title" label="标题" />
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
  </div>
</template>
<script>
import { getArticlesList, deleteArticles } from '@/api/arknights/index.js'
export default {
  data() {
    return {
      items: [],
      listLoading: false
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

    }
  }
}
</script>
