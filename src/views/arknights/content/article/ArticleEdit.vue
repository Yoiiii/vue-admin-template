<template>
  <div class="about">
    <h1>{{ id ? '编辑':'新增' }}文章</h1>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-form-item label="文章分类">
        <el-select v-model="model.categories" multiple>
          <el-option
            v-for="item in categories"
            :key="item._id"
            :label="item.name"
            :value="item._id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="标题">
        <el-input v-model="model.title" />
      </el-form-item>
      <el-form-item label="内容">
        <vue-editor v-model="model.body" use-custom-image-handler @image-added="handleImageAdded" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { VueEditor } from 'vue2-editor'
import { getArticles, editArticles, addArticles, uploadImg, Category } from '@/api/arknights/index.js'

export default {
  components: {
    VueEditor
  },
  props: {
    id: { type: String, default: '' }
  },
  data() {
    return {
      model: {},
      categories: []
    }
  },
  created() {
    this.fetchCategories()
    this.id && this.fetch()
  },
  methods: {
    async save() {
      let res
      if (this.id !== '') {
        // res = await this.$http.put(`rest/articles/${this.id}`, this.model)
        res = await editArticles(this.id, this.model)
      } else {
        // res = await this.$http.post('rest/articles', this.model)
        res = await addArticles(this.model)
      }
      if (res.data) {
        this.$router.push({ name: 'ArticleList' })
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
      // const res = await this.$http.get(`rest/articles/${this.id}`)
      const res = await getArticles(this.id)
      this.model = res.data
    },
    // async fetchCategories() {
    //   const res = await this.$http.get(`rest/categories`);
    //   this.categories = res.data;

    // },
    async fetchCategories() {
      // const res = await this.$http.post('getCategory/', { name: '文章分类' })
      const res = await Category({ name: '文章分类' })
      this.categories = res.data
    },

    async handleImageAdded(file, Editor, cursorLocation, resetUploader) {
      const formData = new FormData()
      formData.append('file', file)
      const res = await uploadImg(formData)
      // const res = await this.$http.post('upload', formData)
      Editor.insertEmbed(cursorLocation, 'image', res.data.url)
      resetUploader()
    }
  }
}
</script>
