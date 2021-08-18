import request from '@/utils/request' // request是request.js里面导出的service service应当是一个对象，而这里的request是很明显的函数 那么我只能猜测request里面的service就是一个函数对象

export function fetchList(query) { // 返回一个函数的调用 要清楚函数的调用和函数是不一样的 request被封装，import导入本地
  return request({
    url: '/vue-element-admin/article/list',
    method: 'get',
    params: query
  })
}

export function fetchArticle(id) {
  return request({
    url: '/vue-element-admin/article/detail',
    method: 'get',
    params: { id }
  })
}

export function fetchPv(pv) {
  return request({
    url: '/vue-element-admin/article/pv',
    method: 'get',
    params: { pv }
  })
}

export function createArticle(data) {
  return request({
    url: '/vue-element-admin/article/create',
    method: 'post',
    data
  })
}

export function updateArticle(data) {
  return request({
    url: '/vue-element-admin/article/update',
    method: 'post',
    data
  })
}
