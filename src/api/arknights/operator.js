import request from '@/utils/request'

export function addOperator(data) {
  return request({
    url: `/admin/api/rest/Operator/`,
    method: 'post',
    data
  })
}

export function deleteOperator(id) {
  return request({
    url: `/admin/api/rest/Operator/${id}`,
    method: 'delete'
  })
}

export function editOperator(id, data) {
  return request({
    url: `/admin/api/rest/Operator/${id}`,
    method: 'put',
    data
  })
}

export function getOperator(id) {
  return request({
    url: `/admin/api/rest/Operator/${id}`,
    method: 'get'
  })
}

export function getOperatorList() {
  return request({
    url: `/admin/api/rest/Operator`,
    method: 'get'
  })
}
