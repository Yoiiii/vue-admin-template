import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/admin/api/login',
    method: 'post',
    data
  })
}

export function getInfo(data) {
  return request({
    url: '/admin/api/getUserInfo',
    method: 'post',
    data
  })
}

export function logout(data) {
  return request({
    url: '/admin/api/logout',
    method: 'post',
    data
  })
}

export function changePassword(data) {
  return request({
    url: '/admin/api/changePassword',
    method: 'post',
    data
  })
}
