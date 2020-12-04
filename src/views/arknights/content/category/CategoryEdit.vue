<template>
  <div class="about">
    <h1>{{ id ? '编辑':'新增' }}分类</h1>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-form-item label="上级分类">
        <el-select v-model="model.parent">
          <el-option v-for="item in parents" :key="item._id" :label="item.name" :value="item._id" />
        </el-select>
      </el-form-item>
      <el-form-item label="名称">
        <el-input v-model="model.name" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { addCategory, editCategory, getCategory, getCategoryList } from '@/api/arknights/index'
export default {
  props: {
    id: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      model: {},
      parents: []
    }
  },
  created() {
    this.fetchParents()
    this.id && this.fetch()
  },
  methods: {
    async save() {
      let res
      if (this.id) {
        // res = await this.$http.put(`rest/categories/${this.id}`, this.model)
        res = await editCategory(this.id, this.model)
      } else {
        // res = await this.$http.post('rest/categories', this.model)
        res = await addCategory(this.model)
      }
      if (res.data) {
        this.$router.push({ name: 'CategoryList' })
        this.$message({
          type: 'success',
          message: '保存成功'
        })
      } else {
        this.$message({
          type: 'faill',
          message: '保存失败'
        })
      }
    },
    async fetch() {
      // const res = await this.$http.get(`rest/categories/${this.id}`)
      const res = await getCategory(this.id)
      this.model = res.data
    },
    async fetchParents() {
      // const res = await this.$http.get(`rest/categories`)
      const res = await getCategoryList()

      this.parents = res.data
    }
  }
}
</script>
