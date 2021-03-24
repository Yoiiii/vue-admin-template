<template>
  <div>
    <el-upload
      class="avatar-uploader"
      action=""
      :auto-upload="false"
      :show-file-list="false"
      :on-change="cutImage"
    >
      <img v-if="item.image" :src="item.image">
      <i v-else class="el-icon-plus avatar-uploader-icon" />
    </el-upload>
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
export default {
  data() {
    return {
      imageUrl: ''
    }
  },
  methods: {
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw)
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    }
  }
}
</script>

<style>
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

