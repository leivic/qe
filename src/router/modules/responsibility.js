import Layout from '@/layout'

const responsibilityRouter = {
    path: '/responsibility',
    component: Layout,
    redirect: '/responsibility/all',
    alwaysShow: true, // will always show the root menu
    name: 'Responsibility',
    meta: {
      title: '质量生态责任',
      icon: 'lock',
      roles: ['admin', 'editor'] // you can set roles in root nav
    },
    children: [
      {
        path: 'all',
        component: () => import('@/views/responsibility/all'),
        name: 'All',
        meta: {
          title: '质量生态责任总览',
          roles: ['admin'] // or you can only set roles in sub nav
        }
      },
      {
        path: 'monthlymagazine',
        component: () => import('@/views/responsibility/monthlymagazine'),
        name: 'monthlymagazine',
        meta: {
          title: '月报'
          // if do not set roles, means: this page does not require permission
        }
      },
      {
        path: 'zone',
        component: () => import('@/views/responsibility/zone'),
        name: 'zone',
        meta: {
          title: '区域',
          roles: ['admin']
        }
      },
      {
        path: 'workshop',
        component: () => import('@/views/responsibility/workshop'),
        name: 'workshop',
        meta: {
          title: '工段'
          // if do not set roles, means: this page does not require permission
        }
      },
      {
        path: 'group',
        component: () => import('@/views/responsibility/group'),
        name: 'group',
        meta: {
          title: '班组'
          // if do not set roles, means: this page does not require permission
        }
      },
      {
        path: 'station',
        component: () => import('@/views/responsibility/station'),
        name: 'station',
        meta: {
          title: '工位'
        }
      },
      {
	path: 'source',
	name: 'source',
	redirect: '@/views/responsibility/source/ppsr',
	meta: { title: '数据源' },
	children: [
	  {
	    path: 'ppsr',
	    component: () => import('@/views/responsibility/source/ppsr'),
	    name: 'ppsr',
	    meta: { title: 'PPSR系统管理问题' }
	  },
	  {
		path: 'chongfu',
		component: () => import('@/views/responsibility/source/chongfu'),
		name: 'chongfu',
		meta: { title: '重复发生的问题' }
	  }
	]
      },
    ]
      }
      
      export default responsibilityRouter