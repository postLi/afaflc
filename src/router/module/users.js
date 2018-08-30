import Layout from '@/views/layout/Layout'
const _import = require('../_import_' + process.env.NODE_ENV)

export default {
  path: '/users/',
  component: Layout,
  redirect: '/users/index',
  name: '用户管理',
  icon: 'zonghe', 
  children: [
      { path: '/users/index', icon: 'hzyx', hidden: false, name: '货主管理', component: _import('users/index'), meta: { title: '货主管理', stitle: '货主',noCache: false },
      },
      { path: '/users/carowner', icon: 'chezgl', hidden: false, name: '车主管理', component: _import('users/carowner/index'), meta: { title: '车主管理',stitle: '车主', noCache: true }},
      { path: '/users/member', icon: 'wlgs', hidden: false, name: '物流公司', component: _import('users/member/index'), meta: { title: '物流公司',stitle: '会员', noCache: true }},
      { 
        path: '/users/partner', 
        icon: 'hhrgl', 
        hidden: false, 
        name: '合伙人管理', 
        component: _import('users/partner/index'), 
        meta: { title: '合伙人管理', stitle: '合伙人',noCache: true }
    },
    { 
        path: '/users/shipperData', 
        icon: 'hzsjgl', 
        hidden: false, 
        name: '货主数据管理', 
        component: _import('users/shipperData/index'), 
        meta: { title: '货主数据管理', stitle: '货主',noCache: true }
    },
    { 
        path: '/users/carData', 
        icon: 'czsjgl', 
        hidden: false, 
        name: '车主数据管理', 
        component: _import('users/carData/index'), 
        meta: { title: '车主数据管理', stitle: '车主',noCache: true }
    },
    { 
        path: '/users/dataDetails', 
        icon: 'QQ', 
        hidden: true, 
        name: '货主详情', 
        component: _import('users/dataDetails/index'), 
        meta: { title: '货主详情', stitle: '详情',noCache: true }
    },
    { 
        path: '/users/dataDetailsCar', 
        icon: 'QQ', 
        hidden: true, 
        name: '车主详情', 
        component: _import('users/dataDetailsCar/index'), 
        meta: { title: '车主详情', stitle: '详情',noCache: true }
    },
  ]
}


