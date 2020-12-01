import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true,
    index: 0
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true,
    index: 0
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '首页', icon: 'dashboard' }
    }],
    index: 1
  }

  // {
  //   path: '/example',
  //   component: Layout,
  //   redirect: '/example/table',
  //   name: 'Example',
  //   meta: { title: 'Example', icon: 'el-icon-s-help' },
  //   children: [
  //     {
  //       path: 'table',
  //       name: 'Table',
  //       component: () => import('@/views/table/index'),
  //       meta: { title: 'Table', icon: 'table' }
  //     },
  //     {
  //       path: 'tree',
  //       name: 'Tree',
  //       component: () => import('@/views/tree/index'),
  //       meta: { title: 'Tree', icon: 'tree' }
  //     }
  //   ],
  //   index: 3
  // },

  // {
  //   path: '/form',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'index',
  //       name: 'Form',
  //       component: () => import('@/views/form/index'),
  //       meta: { title: 'Form', icon: 'form' }
  //     }
  //   ],
  //   index: 4
  // },
  // {
  //   path: '/nested',
  //   component: Layout,
  //   redirect: '/nested/menu1',
  //   name: 'Nested',
  //   meta: {
  //     title: 'Nested',
  //     icon: 'nested'
  //   },
  //   index: 5,
  //   children: [
  //     {
  //       path: 'menu1',
  //       component: () => import('@/views/nested/menu1/index'), // Parent router-view
  //       name: 'Menu1',
  //       meta: { title: 'Menu1' },
  //       children: [
  //         {
  //           path: 'menu1-1',
  //           component: () => import('@/views/nested/menu1/menu1-1'),
  //           name: 'Menu1-1',
  //           meta: { title: 'Menu1-1' }
  //         },
  //         {
  //           path: 'menu1-2',
  //           component: () => import('@/views/nested/menu1/menu1-2'),
  //           name: 'Menu1-2',
  //           meta: { title: 'Menu1-2' },
  //           children: [
  //             {
  //               path: 'menu1-2-1',
  //               component: () => import('@/views/nested/menu1/menu1-2/menu1-2-1'),
  //               name: 'Menu1-2-1',
  //               meta: { title: 'Menu1-2-1' }
  //             },
  //             {
  //               path: 'menu1-2-2',
  //               component: () => import('@/views/nested/menu1/menu1-2/menu1-2-2'),
  //               name: 'Menu1-2-2',
  //               meta: { title: 'Menu1-2-2' }
  //             }
  //           ]
  //         },
  //         {
  //           path: 'menu1-3',
  //           component: () => import('@/views/nested/menu1/menu1-3'),
  //           name: 'Menu1-3',
  //           meta: { title: 'Menu1-3' }
  //         }
  //       ]
  //     },
  //     {
  //       path: 'menu2',
  //       component: () => import('@/views/nested/menu2/index'),
  //       name: 'Menu2',
  //       meta: { title: 'menu2' }
  //     }
  //   ]
  // },
  // {
  //   path: 'external-link',
  //   component: Layout,
  //   index: 6,
  //   children: [
  //     {
  //       path: 'https://panjiachen.github.io/vue-element-admin-site/#/',
  //       meta: { title: 'External Link', icon: 'link' }
  //     }
  //   ]
  // }

]

// 动态路由
export const asyncRoutes = [
  {
    path: '/arknights',
    component: Layout,
    redirect: '/arknights/content/operators/list',
    name: 'arknights',
    meta: {
      title: '明日方舟资料站',
      icon: 'nested',
      roles: ['admin', 'arknights']
    },
    index: 2,
    children: [
      {
        path: '/arknights/content',
        component: () => import('@/views/arknights/content/index'), // Parent router-view
        name: 'content',
        meta: { title: '内容管理' },
        children: [
          {
            path: '/arknights/content/operators',
            component: () => import('@/views/arknights/content/index'),
            name: 'Operator',
            meta: { title: '干员' },
            children: [
              {
                path: '/arknights/content/operators/list',
                component: () => import('@/views/arknights/content/operator/OperatorList'),
                name: 'OperatorList',
                meta: { title: '干员列表' }
              },
              {
                path: '/arknights/content/operators/create',
                component: () => import('@/views/arknights/content/operator/OperatorEdit'),
                name: 'OperatorCreate',
                meta: { title: '新增干员' }
              },
              {
                path: '/arknights/content/operators/edit:id',
                component: () => import('@/views/arknights/content/operator/OperatorEdit'),
                name: 'OperatorEdit',
                meta: { title: '编辑干员' },
                props: true,
                hidden: true
              }
            ]
          },
          {
            path: '/arknights/content/articles',
            component: () => import('@/views/arknights/content/index'),
            name: 'Article',
            meta: { title: '文章' },
            children: [
              {
                path: '/arknights/content/articles/create',
                component: () => import('@/views/arknights/content/article/ArticleEdit'),
                name: 'ArticleCreate',
                meta: { title: '新增文章' }
              },
              {
                path: '/arknights/content/articles/edit:id',
                component: () => import('@/views/arknights/content/article/ArticleEdit'),
                name: 'ArticleEdit',
                meta: { title: '编辑文章' },
                props: true,
                hidden: true
              },
              {
                path: '/arknights/content/articles/list',
                component: () => import('@/views/arknights/content/article/ArticleList'),
                name: 'ArticleList',
                meta: { title: '文章列表' }
              }
            ]
          },
          {
            path: '/arknights/content/categories',
            component: () => import('@/views/arknights/content/index'),
            name: 'Category',
            meta: { title: '分类' },
            children: [
              {
                path: '/arknights/content/categories/create',
                component: () => import('@/views/arknights/content/category/CategoryEdit'),
                name: 'CategoryCreate',
                meta: { title: '新增文章' }
              },
              {
                path: '/arknights/content/categories/edit:id',
                component: () => import('@/views/arknights/content/category/CategoryEdit'),
                name: 'CategoryEdit',
                meta: { title: '编辑文章' },
                props: true,
                hidden: true
              },
              {
                path: '/arknights/content/categories/list',
                component: () => import('@/views/arknights/content/category/CategoryList'),
                name: 'CategoryList',
                meta: { title: '分类列表' }
              }
            ]
          }
        ]
      },
      {
        path: '/arknights/operation',
        component: () => import('@/views/arknights/operation/index'), // Parent router-view
        name: 'Operation',
        meta: { title: '运营管理' },
        children: [
          {
            path: '/arknights/operation/ads',
            component: () => import('@/views/arknights/operation/index'),
            name: 'Ads',
            meta: { title: '广告' },
            children: [
              {
                path: '/arknights/operation/ads/create',
                component: () => import('@/views/arknights/operation/ad/AdEdit'),
                name: 'AdCreate',
                meta: { title: '新增广告' }
              },
              {
                path: '/arknights/operation/ads/edit:id',
                component: () => import('@/views/arknights/operation/ad/AdEdit'),
                name: 'AdEdit',
                meta: { title: '编辑广告' },
                props: true,
                hidden: true
              },
              {
                path: '/arknights/operation/ads/list',
                component: () => import('@/views/arknights/operation/ad/AdList'),
                name: 'AdList',
                meta: { title: '广告列表' }
              }
            ]
          }
        ]
      }
    ]
  },
  {
    path: '/setting',
    name: 'Setting',
    component: Layout,
    meta: { title: '设置', icon: 'el-icon-s-tools' },
    index: 999,
    children: [
      {
        path: '/setting/user',
        component: () => import('@/views/setting/UserSetting'), // Parent router-view
        name: 'UserSetting',
        meta: { title: '用户管理', roles: ['admin'] }
      },
      // {
      //   path: '/setting/roles',
      //   component: () => import('@/views/setting/RolesSetting'), // Parent router-view
      //   name: 'RolesSetting',
      //   meta: { title: '权限管理', roles: ['admin'] }
      // },
      {
        path: '/setting/password',
        component: () => import('@/views/setting/PasswordSetting'), // Parent router-view
        name: 'PasswordSetting',
        meta: { title: '修改密码' }
      }
    ]
  },
  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', index: 0, hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
