<template>
  <div>
    <h1>分类列表</h1>
    <el-select
      v-model="value"
      clearable
      placeholder="请选择上级分类"
      @change="handleChange"
      @clear="fetch"
    >
      <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
    </el-select>
    <el-table
      v-loading="listLoading"
      :data="items"
      element-loading-text="加载中"
    >
      <el-table-column prop="_id" label="ID" width="230" />
      <el-table-column prop="parent.name" label="上级分类" />
      <el-table-column prop="name" label="分类名称" />
      <el-table-column fixed="right" label="操作" width="180">
        <template slot-scope="scope">
          <!-- <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button> -->
          <el-button
            type="primary"
            size="small"
            @click="$router.push({ name: 'CategoryEdit', params:{id:scope.row._id}})"
          >编辑</el-button>
          <el-button type="primary" size="small" @click="remove(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import { deleteCategory, getCategoryList } from '@/api/arknights/index'
export default {
  data() {
    return {
      items: [],
      options: [],
      value: '',
      listLoading: false
    }
  },
  created() {
    this.fetch()
  },
  methods: {
    async fetch() {
      this.listLoading = true
      // 获取所有分类列表
      // const res = await this.$http.get('rest/categories')
      const res = await getCategoryList()

      await this.catFetch(res.data)
      if (this.value) {
        this.handleChange(this.value)
      } else {
        this.items = res.data
      }
      this.listLoading = false
    },
    async catFetch(data) {
      const cats = []
      // 第一层分类
      for (const item of data) {
        if (!item.parent) {
          const cat = {
            value: item.name,
            text: item.name
          }
          cats.push(cat)
        }
      }
      // 第二层分类
      // for (let two of cats) {
      //   //console.log('two',two);
      //   for (let item of this.items) {
      //     if (item.parent) {
      //       if (item.parent.name == two.label) {
      //         let c = {
      //           value: item._id,
      //           label: item.name
      //         };
      //         two.children.push(c);
      //       }
      //     }
      //   }
      // }
      this.options = cats
    },
    async handleChange(value) {
      // 选择分类事件
      // const res = await this.$http.get('rest/categories')
      const res = await getCategoryList()
      const newItems = res.data.filter((item) => {
        // console.log(item)
        if (item.parent) {
          return item.parent.name === value
        }
      })
      this.items = newItems
    },
    async remove(row) {
      this.$confirm(`是否要确定删除分类"${row.name}"?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async() => {
          // const res = await this.$http.delete(`rest/categories/${row._id}`)
          const res = await deleteCategory(row._id)

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
    }
  }
}
</script>
