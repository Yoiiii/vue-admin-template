import request from '@/utils/request'

export function uploadImg(data) {
  return request({
    url: '/admin/api/upload',
    method: 'post',
    data
  })
}

export function Category(data) {
  return request({
    url: '/admin/api/getCategory',
    method: 'post',
    data
  })
}

export function pvCount(website) {
  return request({
    url: '/admin/api/pvCount',
    method: 'post',
    data: {
      website: website
    }
  })
}

export * from './user'
