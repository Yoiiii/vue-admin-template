import request from '@/utils/request'

export function addUser(data) {
  return request({
    url: `/admin/api/rest/admin_users/`,
    method: 'post',
    data
  })
}

export function deleteUser(id) {
  return request({
    url: `/admin/api/rest/admin_users/${id}`,
    method: 'delete'
  })
}

export function editUser(id, data) {
  return request({
    url: `/admin/api/rest/admin_users/${id}`,
    method: 'put',
    data
  })
}

export function getUser(id) {
  return request({
    url: `/admin/api/rest/admin_users/${id}`,
    method: 'get'
  })
}

export function getUserList() {
  return request({
    url: `/admin/api/rest/admin_users`,
    method: 'get'
  })
}

