import Layout from '@/views/layout/Layout'
const _import = require('../_import_' + process.env.NODE_ENV)

export default {
  path: '/order',
  component: Layout,
  redirect: '/order/OrderTrack',
  icon: 'chengyunshang',
  name: '订单管理',
  noDropdown: true, 
  children: [
    {
      path: '/order/OrderTrack', icon: 'QQ', name: '订单管理', component: _import('order/OrderTrack/index'), meta: { role: ['admin'], title: '订单管理',stitle: '订单',  noCache: true }
    },
//   {
//     path: '/dispatch/OpenseaRecommend', icon: 'QQ', name: '公海推单', component: _import('dispatch/OpenseaRecommend/index'), meta: { role: ['admin'], title: '公海推单',stitle: '公海',  noCache: true }
//   },
//   {
//     path: '/sm/standardPrice', icon: 'QQ', name: '标准信息及定价', component: _import('sm/standardPrice/index'), meta: { role: ['admin'], title: '标准信息及定价',stitle: '标准',  noCache: true }
//   },
//   {          
//     path: '/dispatch/Directional', icon: 'QQ', name: '定向推单设置',hidden: false, component: _import('dispatch/index'), meta: { role: ['admin'], title: '定向推单设置', stitle:'设置', noCache: true },
//       children: [{
//         path: '/dispatch/Directional/DriverShipper', icon: 'QQ',name: '绑定车主', component: _import('dispatch/Directional/DriverShipper/index'), meta: { role: ['admin'], title: '绑定车主',stitle: '车主',  noCache: true }
//       },
//       {
//         path: '/dispatch/Directional/DriverPlatform', icon: 'QQ', name: '平台专属', component: _import('dispatch/Directional/DriverPlatform/index'), meta: { role: ['admin'], title: '平台专属', stitle: '平台', noCache: true }
//       }
//     ]
//   }, 
//   {
//     path: '/dispatch/OrderObtain', icon: 'QQ', name: '中单设置', component: _import('dispatch/OrderObtain/index'), meta: { role: ['admin'], title: '中单设置',stitle: '中单',  noCache: true }
//   },

]
}
