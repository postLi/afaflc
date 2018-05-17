import Layout from '@/views/layout/Layout'
const _import = require('../_import_' + process.env.NODE_ENV)

export default {
  path: '/server',
  component: Layout,
  redirect: '/server/index',
  icon: 'yunyingguanli',
  name: '服务管理',
  noDropdown: true,
  children: [{
    path: '/server/index', icon: 'quanxian', name: '运营管理', component: _import('server/index'), meta: { role: ['admin'], title: '运营管理', noCache: true }
  }, 
  // {
  //   path: '/server/order', icon: 'QQ', name: '订单管理1', component: _import('server/order/index'), meta: { role: ['admin'], title: '订单管理1', noCache: true }
  // },
  // {
  //   path: '/server/order/manage', icon: 'QQ', name: '订单管理', component: _import('server/order/manage/index'), meta: { role: ['admin'], title: '订单管理', noCache: true }
  // },
  // {
  //   path: '/server/order/createOrder', icon: 'QQ', name: '创建运单', component: _import('server/order/createOrder/index'), meta: { role: ['admin'], title: '创建运单', noCache: true }
  // },
  // {
  //   path: '/server/order/pickClip', icon: 'QQ', name: '挑单夹', component: _import('server/order/pickClip/index'), meta: { role: ['admin'], title: '挑单夹', noCache: true }
  // }
]
}
