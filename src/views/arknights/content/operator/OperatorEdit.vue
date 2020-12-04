<template>
  <div class="about">
    <h1>{{ id ? '编辑':'新增' }}干员</h1>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-tabs value="basic">
        <el-tab-pane label="基础信息" name="basic">
          <el-form-item label="名称">
            <el-input v-model="model.name" />
          </el-form-item>
          <el-form-item label="代号">
            <el-input v-model="model.title" />
          </el-form-item>
          <el-form-item label="头像">
            <el-upload
              class="avatar-uploader"
              action=""
              :auto-upload="false"
              :show-file-list="false"
              :on-change="cutImage"
            >
              <!-- <el-upload
                class="avatar-uploader"
                action="mixinUploadUrl"
                :show-file-list="false"
                :headers="mixinGetAuthHeaders()"
                :http-request="cutImage"
              > -->
              <!-- <img v-if="item.image" :src="item.image">
              <i v-else class="el-icon-plus avatar-uploader-icon" />
            </el-upload> -->
              <!-- <el-upload
              class="avatar-uploader"
              :action="mixinUploadUrl"
              :show-file-list="false"
              :on-success="res=>$set(model,'avatar',res.url)"
              :headers="mixinGetAuthHeaders()"
            > -->
              <img v-if="model.avatar" :src="model.avatar" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon" />
            </el-upload>
          </el-form-item>
          <el-form-item label="原画">
            <el-upload
              class="avatar-uploader"
              :action="mixinUploadUrl"
              :show-file-list="false"
              :on-success="res=>$set(model,'banner',res.url)"
              :headers="mixinGetAuthHeaders()"
            >
              <img v-if="model.banner" :src="model.banner" class="banner">
              <i v-else class="el-icon-plus avatar-uploader-icon" />
            </el-upload>
          </el-form-item>
          <el-form-item label="职位">
            <el-select v-model="model.categories">
              <el-option
                v-for="item in categories"
                :key="item._id"
                :label="item.name"
                :value="item._id"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="标签">
            <el-select v-model="model.Tags" multiple>
              <el-option v-for="item in tags" :key="item._id" :label="item.name" :value="item._id" />
            </el-select>
          </el-form-item>
          <el-form-item label="星级">
            <el-rate v-model="model.star" style="margin-top:0.6rem" :max="6" show-score />
          </el-form-item>

          <el-form-item label="特性">
            <el-input v-model="model.characteristic" type="textarea" />
          </el-form-item>
          <el-form-item label="天赋">
            <el-input v-model="model.talent" type="textarea" />
          </el-form-item>
          <el-form-item label="整图">
            <el-upload
              class="avatar-uploader"
              :action="mixinUploadUrl"
              :show-file-list="false"
              :on-success="res=>$set(model,'fullGraph',res.url)"
              :headers="mixinGetAuthHeaders()"
            >
              <img v-if="model.fullGraph" :src="model.fullGraph" class="banner">
              <i v-else class="el-icon-plus avatar-uploader-icon" />
            </el-upload>
          </el-form-item>
        </el-tab-pane>
        <el-tab-pane label="技能" name="skills">
          <el-button size="small" @click="model.skills.push({})">
            <i class="el-icon-plus">添加技能</i>
          </el-button>
          <el-row type="flex" style="flex-wrap: wrap">
            <el-col v-for="(item,i) in model.skills" :key="i" :md="12">
              <el-form-item label="图标">
                <el-upload
                  class="avatar-uploader"
                  :action="mixinUploadUrl"
                  :show-file-list="false"
                  :on-success="res => $set(item,'icon',res.url)"
                  :headers="mixinGetAuthHeaders()"
                >
                  <img v-if="item.icon" :src="item.icon" class="avatar">
                  <i v-else class="el-icon-plus avatar-uploader-icon" />
                </el-upload>
              </el-form-item>
              <el-form-item label="描述">
                <el-input v-model="item.description" type="textarea" />
              </el-form-item>
              <el-form-item>
                <el-button size="small" type="danger" @click="model.skills.splice(i,1)">删除</el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-tab-pane>
      </el-tabs>
      <el-form-item style="margin-top:1rem;">
        <el-button type="primary" native-type="submit">保存</el-button>
      </el-form-item>
    </el-form>
    <el-dialog title="剪切图片" :visible.sync="dialogVisible" :before-close="handleClose">
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
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="uploadImage">
          上传
          <i class="el-icon-upload el-icon--right" />
        </el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
/*
    name:{type:String},//姓名
    title:{type:String},//代号
    avatar:{type:String},//头像
    banner:{type:String},//原画
    categories:{type:mongoose.SchemaTypes.ObjectId, ref:'Category'},//职位
    tag:[{type:mongoose.SchemaTypes.ObjectId, ref:'Category'}],//标签
    star:{type:Number},//星级
    skills:[{
        icon:{type:String},//技能图标
        description:{type:String},//技能描述
    }],
    characteristic:{type:String},//特性
    talent:{type:String},//天赋
    action:[{type:String}],//动作
    fullGraph:{type:String},//整图
*/

import {
  addOperator,
  editOperator,
  getOperator,
  Category,
  uploadImg
} from '@/api/arknights/index'
import { VueCropper } from 'vue-cropper'
export default {
  components: {
    VueCropper
  },
  props: {
    id: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      model: {
        name: '',
        avatar: '',
        scores: {}
      },
      categories: {},
      heroes: [],
      tags: [],
      skills: [],
      partners: [],
      cutimage: '',
      dialogVisible: false,
      fixed: true
    }
  },
  created() {
    // this.fetchParents();
    this.id && this.fetch()
    this.fetchCategories()
    // this.fetchTags();
    // this.fetchOperators();
  },
  methods: {
    async save() {
      let res
      if (this.id) {
        res = await editOperator(this.id, this.model)
        // console.log(res)
      } else {
        res = await addOperator(this.model)
      }
      if (res.data) {
        this.$router.push({ name: 'OperatorList' })
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
    rotateRightImage() {
      this.$refs.cropper.rotateRight()
    },
    async cutImage(file, fileList) {
      this.cutimage = await this.getBase64(file.raw)
      this.dialogVisible = true
    },
    async fetch() {
      const res = await getOperator(this.id)
      this.model = Object.assign({}, this.model, res.data) // 防止数据undefined
    },
    async fetchCategories() {
      const res = await Category({ name: '干员分类' })
      this.categories = res.data
    },
    async uploadImage() {
      this.dialogVisible = false
      this.$refs.cropper.getCropData(async(data) => {
        const file = this.dataURLtoFile(data)
        const formData = new FormData() // 声明一个FormData对象
        formData.append('file', file)
        const res = await uploadImg(formData)
        // console.log(res.data)
        // console.log(this.model)
        this.model.avatar = res.data.url
      })
    },
    getBase64(file) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader()
        let fileResult = ''
        reader.readAsDataURL(file) // 开始转
        reader.onload = function() {
          fileResult = reader.result
        } // 转 失败
        reader.onerror = function(error) {
          reject(error)
        } // 转 结束  咱就 resolve 出去
        reader.onloadend = function() {
          resolve(fileResult)
        }
      })
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => {})
    },
    dataURLtoFile(dataurl, filename = 'file') {
      const arr = dataurl.split(',')
      const mime = arr[0].match(/:(.*?);/)[1]
      const suffix = mime.split('/')[1]
      const bstr = atob(arr[1])
      let n = bstr.length
      const u8arr = new Uint8Array(n)
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n)
      }
      return new File([u8arr], `${filename}.${suffix}`, {
        type: mime
      })
    }
    // async fetchOperators() {
    //   const res = await this.$http.get(`rest/operators`);
    //   this.operators = res.data;
    // },
    //     async fetchTags() {
    //   const res = await this.$http.get(`rest/tags`);
    //   this.Tags = res.data;
    // }
    // async fetchParents() {
    //   const res = await this.$http.get(`rest/items`);
    //   this.parents = res.data;
    // }
  }
}
</script>
