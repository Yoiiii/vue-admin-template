// 封装axios
import axios from 'axios'
import { Message } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'

// 创建axios实例
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // 设置Base Url  实际url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000 // 设置超时
})

// 拦截网络请求
service.interceptors.request.use(
  config => {
    // 再发送请求前需要做的事，例如添加token响应头
    if (store.getters.token) {
      config.headers.Authorization = 'Bearer ' + getToken()
    }
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  response => {
    const res = response.data
    return res
  },
  error => {
    if (error.response.data.message) {
      console.log('err' + error) // for debug
      Message({
        message: error.response.data.message,
        type: 'error',
        duration: 5 * 1000
      })
      if (error.response.status === 401) {
        store.dispatch('user/resetToken').then(() => {
          this.$router.push('/login')
        })
      }
      return Promise.reject(error)
    }
  }
)

export default service
