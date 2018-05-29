import Layout from '@/views/layout/Layout'
const _import = require('../_import_' + process.env.NODE_ENV)

export default {
  path: '/users/',
  component: Layout,
  redirect: '/users/index',
  name: '用户管理',
  icon: 'zonghe', 
  children: [
      { path: '/users/index', icon: 'information', hidden: false, name: '货主管理', component: _import('users/index'), meta: { title: '货主管理', noCache: true },
        // children: [{
        //   path: '/service/index/longtime', name: '延时处理', component: _import('table/index'), meta: { role: ['admin'], title: '延时处理', noCache: true }
        // }]
      },
      { path: '/users/carowner', icon: 'information', hidden: false, name: '车主管理', component: _import('users/carowner/index'), meta: { title: '车主管理', noCache: true }},
      { path: '/users/partner', icon: 'information', hidden: true, name: '合伙人管理', component: _import('users/partner/index'), meta: { title: '合伙人管理', noCache: true }}
  ]
}


