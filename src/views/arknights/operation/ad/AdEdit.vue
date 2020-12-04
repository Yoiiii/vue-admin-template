<template>
  <div class="about">
    <h1>{{ id ? "编辑" : "新增" }}广告位</h1>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-form-item label="名称">
        <el-input v-model="model.name" />
      </el-form-item>
      <el-form-item label="广告">
        <el-button size="small" @click="model.items.push({})">
          <i class="el-icon-plus">添加广告</i>
        </el-button>
        <el-row type="flex" style="flex-wrap: wrap">
          <el-col v-for="(item, i) in model.items" :key="i" :md="24">
            <el-form-item label="跳转链接(URL)">
              <el-input v-model="item.url" />
            </el-form-item>
            <el-form-item label="图片" style="margin-top: 0.5rem">
              <el-upload
                class="avatar-uploader"
                action=""
                :auto-upload="false"
                :show-file-list="false"
                :on-change="cutImage"
                :before-upload="uploadItem(i)"
              >
                <!-- <el-upload
                class="avatar-uploader"
                action="mixinUploadUrl"
                :show-file-list="false"
                :headers="mixinGetAuthHeaders()"
                :http-request="cutImage"
              > -->
                <img v-if="item.image" :src="item.image">
                <i v-else class="el-icon-plus avatar-uploader-icon" />
              </el-upload>
            </el-form-item>
            <el-form-item>
              <el-button
                size="small"
                type="danger"
                @click="model.items.splice(i, 1)"
              >删除</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit">保存</el-button>
      </el-form-item>
    </el-form>
    <el-dialog title="剪切图片" :visible.sync="dialogVisible" :before-close="handleClose">
      <div style="width: 100%; height: 400px">
        <vue-cropper
          ref="cropper"
          auto-crop
          :img="cutimage"
          :fixed-number="[16, 9]"
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
import { VueCropper } from 'vue-cropper'
import { addAds, editAds, getAds, uploadImg } from '@/api/arknights/index'
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
        items: []
      },
      fixedNumber: [4, 3],
      dialogVisible: false,
      cutimage: '',
      aftercut: '',
      uploaditem: 0,
      fixed: true
    }
  },
  created() {
    this.id && this.fetch()
  },
  methods: {
    async save() {
      let res
      if (this.id) {
        res = await editAds(this.id, this.model)
      } else {
        res = await addAds(this.model)
      }
      if (res.data) {
        this.$router.push({ name: 'AdList' })
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
    uploadItem(i) {
      this.uploaditem = i
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => {})
    },
    async cutImage(file, fileList) {
      this.cutimage = await this.getBase64(file.raw)
      this.dialogVisible = true
    },
    rotateRightImage() {
      this.$refs.cropper.rotateRight()
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
        const i = this.uploaditem
        this.model.items[i].image = res.data.url
      })
    },
    async fetch() {
      const res = await getAds(this.id)
      this.model = Object.assign({}, this.model, res.data)
      // console.log(this.model)
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
    base64ToFile(urlData, fileName) {
      const arr = urlData.split(',')
      const mime = arr[0].match(/:(.*?);/)[1]
      const bytes = atob(arr[1]) // 解码base64
      let n = bytes.length
      const ia = new Uint8Array(n)
      while (n--) {
        ia[n] = bytes.charCodeAt(n)
      }
      return new File([ia], fileName, { type: mime })
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
  }
}
</script>
<style >
   .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
