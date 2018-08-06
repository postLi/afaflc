import Layout from '@/views/layout/Layout'
const _import = require('../_import_' + process.env.NODE_ENV)

export default {
  path: '/order',
  component: Layout,
  redirect: '/order/tongcheng',
  icon: 'chengyunshang',
  name: '订单管理',
  noDropdown: true, 
  children: [
    {
        path: '/order/tongcheng', icon: 'QQ', name: '同城订单', component: _import('order/index'), meta: { role: ['admin'], title: '同城订单',stitle: '同城',  noCache: true },
        children: [
            {
                path: '/order/tongcheng/waitpayment', icon: 'QQ',name: '待付款', component: _import('order/tongcheng/waitpayment/index'), meta: { role: ['admin'], title: '待付款',stitle: '待付款',  noCache: true }
            },
            {
                path: '/order/tongcheng/toDispatch', icon: 'QQ', name: '派单中', component: _import('order/tongcheng/toDispatch/index'), meta: { role: ['admin'], title: '派单中', stitle: '派单中', noCache: true }
            },
            {
                path: '/order/tongcheng/complate', icon: 'QQ', name: '已完成', component: _import('order/tongcheng/complate/index'), meta: { role: ['admin'], title: '已完成', stitle: '已完成', noCache: true }
            },
            {
                path: '/order/tongcheng/canceled', icon: 'QQ', name: '已取消', component: _import('order/tongcheng/canceled/index'), meta: { role: ['admin'], title: '已取消', stitle: '已完成', noCache: true }
            },
            {
                path: '/order/tongcheng/allOrderList', icon: 'QQ', name: '全部', component: _import('order/tongcheng/allOrderList/index'), meta: { role: ['admin'], title: '全部', stitle: '全部', noCache: true }
            },
        ]
    },
    {
        path: '/order/lingdan', icon: 'QQ', name: '零担订单', component: _import('order/lingdan/index'), meta: { role: ['admin'], title: '零担订单',stitle: '零担',  noCache: true }
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
