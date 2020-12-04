<template>
  <div class="about">
    <el-main>
      <h1>修改密码</h1>
      <el-form
        ref="dataForm"
        label-width="120px"
        :model="postForm"
        :rules="rules"
        @submit.native.prevent="submitForm()"
      >
        <el-form-item label="旧密码" prop="oldPassword">
          <el-input v-model="postForm.oldPassword" type="password" />
        </el-form-item>
        <el-form-item label="新密码" prop="newPassword">
          <el-input v-model="postForm.newPassword" type="password" />
        </el-form-item>
        <el-form-item label="确认新密码" prop="cheackPassword">
          <el-input v-model="postForm.cheackPassword" type="password" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" native-type="submit">保存</el-button>
        </el-form-item>
      </el-form>
    </el-main>
  </div>
</template>
<script>
import { changePassword } from '@/api/user'
export default {
  data() {
    const validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } if (value.length < 6) {
        callback(new Error('密码不可小于6位'))
      } else {
        callback()
      }
    }
    const validatePass2 = (rule, value, callback) => {
      // console.log(value)
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.postForm.newPassword) {
        console.log(value, this.postForm.newPassword)
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      postForm: {
        oldPassword: '',
        newPassword: '',
        cheackPassword: '',
        token: ''
      },
      cheackPassword: '',
      rules: {
        oldPassword: [
          { validator: validatePass, trigger: 'blur' }
        ],
        newPassword: [
          { validator: validatePass, trigger: 'blur' }
        ],
        cheackPassword: [
          { validator: validatePass2, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submitForm() {
      this.postForm.token = this.$store.getters.token
      this.$refs['dataForm'].validate(async(valid) => {
        if (valid) {
          const res = await changePassword(this.postForm)
          if (res.data) {
            // this.$router.push('/admin_users/list')
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
        } else {
          return false
        }
      })
    }
  }
}
</script>
