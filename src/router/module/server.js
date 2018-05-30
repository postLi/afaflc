import Layout from '@/views/layout/Layout'
const _import = require('../_import_' + process.env.NODE_ENV)

export default {
  path: '/sm',
  component: Layout,
  redirect: '/sm/areaPrice',
  icon: 'yunyingguanli',
  name: '服务管理',
  noDropdown: true,
  children: [
  {
    path: '/sm/areaPrice', icon: 'QQ', name: '区域定价', component: _import('sm/areaPrice/index'), meta: { role: ['admin'], title: '区域定价',stitle: '区域',  noCache: true }
  },
  {
    path: '/sm/standardPrice', icon: 'QQ', name: '标准信息及定价', component: _import('sm/standardPrice/index'), meta: { role: ['admin'], title: '标准信息及定价',stitle: '标准',  noCache: true }
  },
  {          
    path: '/sm/Extra', icon: 'QQ', name: '附加费管理', component: _import('sm/index'), meta: { role: ['admin'], title: '附加费管理', stitle:'附加', noCache: true },
      children: [{
        path: '/sm/Extra/extraPrice', name: '额外服务管理', component: _import('sm/Extra/extraPrice/index'), meta: { role: ['admin'], title: '额外服务管理',stitle: '额外',  noCache: true }
      },
      {
        path: '/sm/Extra/waitPrice', name: '等候费用定价', component: _import('sm/Extra/waitPrice/index'), meta: { role: ['admin'], title: '等候费用定价', stitle: '等候', noCache: true }
      }
    ]
  }, 
  // {
  //   path: '/server/standardPrice/createOrder', icon: 'QQ', name: '创建运单', component: _import('server/order/createOrder/index'), meta: { role: ['admin'], title: '创建运单', noCache: true }
  // },
  // {
  //   path: '/server/order/pickClip', icon: 'QQ', name: '挑单夹', component: _import('server/order/pickClip/index'), meta: { role: ['admin'], title: '挑单夹', noCache: true }
  // }
]
}
