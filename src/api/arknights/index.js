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

export * from './article'
export * from './category'
export * from './operator'

export * from './ad'
