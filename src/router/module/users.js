import Layout from '@/views/layout/Layout'
const _import = require('../_import_' + process.env.NODE_ENV)

export default {
  path: '/users/',
  component: Layout,
  redirect: '/users/index',
  name: '用户管理',
  icon: 'zonghe', 
  children: [
      { path: '/users/index', icon: 'QQ', hidden: false, name: '货主管理', component: _import('users/index'), meta: { title: '货主管理', stitle: '货主',noCache: true },
        // children: [{
        //   path: '/service/index/longtime', name: '延时处理', component: _import('table/index'), meta: { role: ['admin'], title: '延时处理', noCache: true }
        // }]
      },
      { path: '/users/carowner', icon: 'QQ', hidden: false, name: '车主管理', component: _import('users/carowner/index'), meta: { title: '车主管理',stitle: '车主', noCache: true }},
      { path: '/users/member', icon: 'QQ', hidden: false, name: '物流公司', component: _import('users/member/index'), meta: { title: '物流公司',stitle: '会员', noCache: true }},
      { path: '/users/partner', icon: 'QQ', hidden: true, name: '合伙人管理', component: _import('users/partner/index'), meta: { title: '合伙人管理', noCache: true }},
      { path: '/users/transportRange', icon: 'QQ', hidden: false, name: '物流专线', component: _import('users/transportRange/index'), meta: { title: '物流专线',stitle: '专线',  noCache: true }},
      { path: '/users/carInfo', icon: 'QQ', hidden: false, name: '车源信息', component: _import('users/carInfo/index'), meta: { title: '车源信息',stitle: '车源',  noCache: true }},
      { path: '/users/driverInfo', icon: 'QQ', hidden: false, name: '货源信息', component: _import('users/driverInfo/index'), meta: { title: '货源信息',stitle: '货源',  noCache: true }},
        
  ]
}


