import request from '@/utils/request'

export function addArticles(data) {
  return request({
    url: `/admin/api/rest/articles/`,
    method: 'post',
    data
  })
}

export function deleteArticles(id) {
  return request({
    url: `/admin/api/rest/articles/${id}`,
    method: 'delete'
  })
}

export function editArticles(id, data) {
  return request({
    url: `/admin/api/rest/articles/${id}`,
    method: 'put',
    data
  })
}

export function getArticles(id) {
  return request({
    url: `/admin/api/rest/articles/${id}`,
    method: 'get'
  })
}

export function getArticlesList() {
  return request({
    url: `/admin/api/rest/articles`,
    method: 'get'
  })
}

