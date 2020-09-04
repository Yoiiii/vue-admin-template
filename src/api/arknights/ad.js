import request from '@/utils/request'

export function addAds(data) {
  return request({
    url: `/admin/api/rest/Ads/`,
    method: 'post',
    data
  })
}

export function deleteAds(id) {
  return request({
    url: `/admin/api/rest/Ads/${id}`,
    method: 'delete'
  })
}

export function editAds(id, data) {
  return request({
    url: `/admin/api/rest/Ads/${id}`,
    method: 'put',
    data
  })
}

export function getAds(id) {
  return request({
    url: `/admin/api/rest/Ads/${id}`,
    method: 'get'
  })
}

export function getAdsList() {
  return request({
    url: `/admin/api/rest/Ads`,
    method: 'get'
  })
}
