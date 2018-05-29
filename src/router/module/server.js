import Layout from '@/views/layout/Layout'
const _import = require('../_import_' + process.env.NODE_ENV)

export default {
  path: '/server',
  component: Layout,
  redirect: '/server/serviceareaPrice',
  icon: 'yunyingguanli',
  name: '服务管理',
  noDropdown: true,
  children: [
  {
    path: '/server/serviceareaPrice', icon: 'QQ', name: '区域定价', component: _import('server/serviceareaPrice/index'), meta: { role: ['admin'], title: '区域定价',stitle: '区域',  noCache: true }
  },
  {
    path: '/server/serverstandardPrice', icon: 'QQ', name: '标准信息及定价', component: _import('server/serverstandardPrice/index'), meta: { role: ['admin'], title: '标准信息及定价',stitle: '标准',  noCache: true }
  },
  {          
    path: '/server/serviceExtra', icon: 'QQ', name: '附加费管理', component: _import('server/index'), meta: { role: ['admin'], title: '附加费管理', stitle:'附加', noCache: true },
      children: [{
        path: '/server/serviceExtra/serviceextraPrice', name: '额外服务管理', component: _import('server/serviceExtra/serviceextraPrice/index'), meta: { role: ['admin'], title: '额外服务管理',stitle: '额外',  noCache: true }
      },
      {
        path: '/server/serviceExtra/serviceWaitPrice', name: '等候费用定价', component: _import('server/serviceExtra/serviceWaitPrice/index'), meta: { role: ['admin'], title: '等候费用定价', stitle: '等候', noCache: true }
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
