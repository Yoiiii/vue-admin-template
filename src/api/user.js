import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/admin/api/login',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/admin/api/getUserInfo',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/admin/api/logout',
    method: 'post'
  })
}
