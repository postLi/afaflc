import Layout from '@/views/layout/Layout'
const _import = require('../_import_' + process.env.NODE_ENV)

export default {
  path: '/dispatch',
  component: Layout,
  redirect: '/dispatch/OpenseaRecommend',
  icon: 'chengyunshang',
  name: '调度管理',
  noDropdown: true, 
  children: [
  {
    path: '/dispatch/OpenseaRecommend', icon: 'QQ', name: '公海推单', component: _import('dispatch/OpenseaRecommend/index'), meta: { role: ['admin'], title: '公海推单',stitle: '公海',  noCache: true }
  },
//   {
//     path: '/sm/standardPrice', icon: 'QQ', name: '标准信息及定价', component: _import('sm/standardPrice/index'), meta: { role: ['admin'], title: '标准信息及定价',stitle: '标准',  noCache: true }
//   },
//   {          
//     path: '/sm/Extra', icon: 'QQ', name: '附加费管理',hidden: false, component: _import('sm/index'), meta: { role: ['admin'], title: '附加费管理', stitle:'附加', noCache: true },
//       children: [{
//         path: '/sm/Extra/extraPrice', name: '额外服务管理', component: _import('sm/Extra/extraPrice/index'), meta: { role: ['admin'], title: '额外服务管理',stitle: '额外',  noCache: true }
//       },
//       {
//         path: '/sm/Extra/waitPrice', name: '等候费用定价', component: _import('sm/Extra/waitPrice/index'), meta: { role: ['admin'], title: '等候费用定价', stitle: '等候', noCache: true }
//       }
//     ]
//   }, 

]
}
