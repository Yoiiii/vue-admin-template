import { asyncRoutes, constantRoutes } from '@/router'

const state = {
  routes: [],
  addRoutes: []
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes
    state.routes = routeSort(constantRoutes.concat(routes))
  }
}

const actions = {
  generateRoutes({ commit }, roles) {
    return new Promise(resolve => {
      let accessedRoutes
      // 如果含有admin权限，返回所有路由
      if (roles.includes('admin')) {
        accessedRoutes = asyncRoutes || []
      } else {
        accessedRoutes = filterAsyncRoutes(asyncRoutes, roles)
      }
      commit('SET_ROUTES', accessedRoutes)
      resolve(accessedRoutes)
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

// 过滤出有访问权限的路由
export function filterAsyncRoutes(routes, roles) {
  const res = []
  routes.forEach(route => {
    const tmp = { ...route }
    if (hasPermission(roles, tmp)) {
      // 如果有子路由，递归
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, roles)
      }
      res.push(tmp)
    }
  })
  return res
}

// 判断路由是否有访问权限
function hasPermission(roles, route) {
  // 路由是否含有roles字段
  if (route.meta && route.meta.roles) {
    // 用户的权限中路由中是否有对应，有则返回true
    return roles.some(role => route.meta.roles.includes(role))
  } else {
    return true
  }
}
// 侧边栏菜单排序
function routeSort(route) {
  route.sort(compare('index'))
  return route
}
// 数组排序
function compare(key) {
  return function(value1, value2) {
    var val1 = value1[key]
    var val2 = value2[key]
    return val1 - val2
  }
}
