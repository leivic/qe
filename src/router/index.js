import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router) // Vue.use()安装Router

/* Layout */
import Layout from '@/layout'

/* Router Modules */
import chartsRouter from './modules/charts'
import tableRouter from './modules/table'
import responsibilityRouter from './modules/responsibility'
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
    noCache: true                if set true, the page will no be cached(default is false)
    affix: true                  if set true, the tag will affix in the tags-view
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
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/auth-redirect',
    component: () => import('@/views/login/auth-redirect'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/error-page/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/error-page/401'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    hidden: true,
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/index'),
        name: 'Dashboard',
        meta: { title: 'Dashboard', icon: 'dashboard', affix: true }
      }
    ]
  }

]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */

export const asyncRoutes = [
/*
质量生态环境路由
*/
  {
    path: '/environment',
    component: Layout, //这个layout相当关键
    redirect: '/environment/self-process',
    alwaysShow: true, // will always show the root menu
    name: 'Environment',
    meta: {
      title: '质量生态环境',
      icon: 'lock',
      roles: ['admin', 'editor'] // you can set roles in root nav
    },
    children: [
      {
        path: 'self-process',
        component: () => import('@/views/environment/self-process'),
        name: 'self-process',
        meta: {
          title: '自评过程',
          roles: ['admin'] // or you can only set roles in sub nav
        }
      },
      {
        path: 'random-process',
        component: () => import('@/views/environment/random-process'),
        name: 'random-process',
        meta: {
          title: '抽查过程',
          roles: ['admin'] // or you can only set roles in sub nav
        }
      },
      {
        path: 'self-station',
        component: () => import('@/views/environment/self-station'),
        name: 'self-station',
        meta: {
          title: '自评工位',
          roles: ['admin'] // or you can only set roles in sub nav
        }
      },
      {
        path: 'random-station',
        component: () => import('@/views/environment/random-station'),
        name: 'random-station',
        meta: {
          title: '工位抽查',
          roles: ['admin'] // or you can only set roles in sub nav
        }
      },
      {
        path: 'document-change',
        component: () => import('@/views/environment/document-change'),
        name: 'document-change',
        meta: { //元数据
          title: '文件修订',
          roles: ['admin'] // or you can only set roles in sub nav
        }
      },
      {
        path: 'source',
        name: 'source',
        redirect: '@/views/environment/source/process',
        meta: { title: '数据源' },
        component:  () => import('@/views/environment/source'),  
        children: [
          {
            path: 'process',
            component: () => import('@/views/environment/source/process'),//组件是一个个单独的 在同一个spa里面,这里是点击后，source组件和process组件都在
            name: 'process',
            meta: { title: '过程信息',
                    roles: ['admin']    
            }
          },
          {
            path: 'station',
            component: () => import('@/views/environment/source/station'),
            name: 'station',
            meta: { title: '工位信息' }
          },
        ]
      }
    ]
  },

  /* 质量生态意识路由*/
  {
    path: '/conscious',
    component: Layout,
    redirect: '/conscious/chart',
    alwaysShow: true, // will always show the root menu
    name: 'Conscious',
    meta: {
      title: '质量生态意识',
      icon: 'lock',
      roles: ['admin', 'editor'] // you can set roles in root nav
    },
    children: [
      {
        path: 'stationcover',
        component: () => import('@/views/conscious/stationcover'),
        name: 'Stationcover',
        meta: {
          title: '工位覆盖率',
          roles: ['admin'] // or you can only set roles in sub nav
        }
      },
      {
        path: 'stationconscious',
        component: () => import('@/views/conscious/stationconscious'),
        name: 'Stationconscious',
        meta: {
          title: '工位质量生态意识状态'
          // if do not set roles, means: this page does not require permission
        }
      },
      {
        path: 'variationpoint',
        component: () => import('@/views/conscious/variationpoint'),
        name: 'Variationpoint',
        meta: {
          title: '变化点',
          roles: ['admin']
        }
      },
      {
        path: 'source',
        name: 'source',
        redirect: '@/views/conscious/source/process',
        meta: { title: '数据源' },
        component:  () => import('@/views/conscious/source'),  
        children: [
          {
            path: 'stationcover',
            component: () => import('@/views/conscious/source/stationcover'),//组件是一个个单独的 在同一个spa里面,这里是点击后，source组件和process组件都在
            name: 'stationcover',
            meta: { title: '工位覆盖率',
                    roles: ['admin']    
            }
          },
          {
            path: 'variationpoint',
            component: () => import('@/views/conscious/source/variationpoint'),//组件是一个个单独的 在同一个spa里面,这里是点击后，source组件和process组件都在
            name: 'variationpoint',
            meta: { title: '变化点',
                    roles: ['admin']    
            }
          }
        ]
      }
    ]
  },
  /*
  质量生态持续路由
  */
  {
    path: '/continue',
    component: Layout,
    redirect: '/continue/chart',
    alwaysShow: true, // will always show the root menu
    name: 'Continue',
    meta: {
      title: '质量生态持续',
      icon: 'chart',
      roles: ['admin', 'editor'] // you can set roles in root nav
    },
    children: [
      {
        path: 'chart',
        component: () => import('@/views/continue/chart'),
        name: 'ChartContinue',
        meta: {
          title: '分析报表',
          roles: ['admin'] // or you can only set roles in sub nav
        }
      },
      {
        path: 'source',
        component: () => import('@/views/continue/source'),
        name: 'SourceContinue',
        meta: {
          title: '数据源'
          // if do not set roles, means: this page does not require permission
        }
      },
      {
        path: '/experience',
        component: () => import('@/views/continue/experience'),
        name: 'ExperienceContinue',
        meta: {
          title: '经验库',
          roles: ['admin']
        }
      }
    ]
  },
  {
    path: '/permission',
    component: Layout,
    redirect: '/permission/page',
    alwaysShow: true, // will always show the root menu
    name: 'Permission',
    meta: {
      title: 'Permission',
      icon: 'lock',
      roles: ['admin', 'editor'] // you can set roles in root nav
    },
    hidden: false,
    children: [
      {
        path: 'page',
        component: () => import('@/views/permission/page'),
        name: 'PagePermission',
        meta: {
          title: 'Page Permission',
          roles: ['admin'] // or you can only set roles in sub nav
        }
      },
      {
        path: 'directive',
        component: () => import('@/views/permission/directive'),
        name: 'DirectivePermission',
        meta: {
          title: 'Directive Permission'
          // if do not set roles, means: this page does not require permission
        }
      },
      {
        path: 'role',
        component: () => import('@/views/permission/role'),
        name: 'RolePermission',
        meta: {
          title: 'Role Permission',
          roles: ['admin']
        }
      }
    ]
  },
  /* 质量生态责任路由*/
  responsibilityRouter,

  /** when your routing map is too long, you can split it into small modules **/
  chartsRouter,
  tableRouter,

  
  {
    path: '/error',
    component: Layout,
    redirect: 'noRedirect',
    name: 'ErrorPages',
    meta: {
      title: 'Error Pages',
      icon: '404'
    },
    hidden: true,
    children: [
      {
        path: '401',
        component: () => import('@/views/error-page/401'),
        name: 'Page401',
        meta: { title: '401', noCache: true }
      },
      {
        path: '404',
        component: () => import('@/views/error-page/404'),
        name: 'Page404',
        meta: { title: '404', noCache: true }
      }
    ]
  },

  {
    path: '/error-log',
    component: Layout,
    hidden: true,
    children: [
      {
        path: 'log',
        component: () => import('@/views/error-log/index'),
        name: 'ErrorLog',
        meta: { title: 'Error Log', icon: 'bug' }
      }
    ]
  },

  {
    path: '/theme',
    component: Layout,
    hidden: true,
    children: [
      {
        path: 'index',
        component: () => import('@/views/theme/index'),
        name: 'Theme',
        meta: { title: 'Theme', icon: 'bug' }
      }
    ]
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
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
