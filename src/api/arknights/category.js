import request from '@/utils/request'

export function addCategory(data) {
  return request({
    url: `/admin/api/rest/Category/`,
    method: 'post',
    data
  })
}

export function deleteCategory(id) {
  return request({
    url: `/admin/api/rest/Category/${id}`,
    method: 'delete'
  })
}

export function editCategory(id, data) {
  return request({
    url: `/admin/api/rest/Category/${id}`,
    method: 'put',
    data
  })
}

export function getCategory(id) {
  return request({
    url: `/admin/api/rest/Category/${id}`,
    method: 'get'
  })
}

export function getCategoryList() {
  return request({
    url: `/admin/api/rest/Category`,
    method: 'get'
  })
}
