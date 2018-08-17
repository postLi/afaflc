import Layout from '@/views/layout/Layout'
const _import = require('../_import_' + process.env.NODE_ENV)

export default {
  path: '/order',
  component: Layout,
  redirect: '/order/tongcheng/waitpayment',
  icon: 'chengyunshang',
  name: '订单管理',
  noDropdown: true, 
  children: [
    {
        path: '/order/tongcheng', icon: 'QQ', name: '同城订单',component: _import('order/index'), meta: { role: ['admin'], title: '同城订单',stitle: '同城',  noCache: true },
        children: [
            {
                path: '/order/tongcheng/waitPointing', icon: 'QQ',name: '待指派', component: _import('order/tongcheng/waitPointing/index'), meta: { role: ['admin'], title: '待指派',stitle: '待指派',  noCache: true }
            },
            {
                path: '/order/tongcheng/waitpayment', icon: 'QQ',name: '待付款', component: _import('order/tongcheng/waitpayment/index'), meta: { role: ['admin'], title: '待付款',stitle: '待付款',  noCache: true }
            },
            {
                path: '/order/tongcheng/toDispatch', icon: 'QQ', name: '派单中', component: _import('order/tongcheng/toDispatch/index'), meta: { role: ['admin'], title: '派单中', stitle: '派单中', noCache: true }
            },
            {
                path: '/order/tongcheng/implementing', icon: 'QQ', name: '进行中', component: _import('order/tongcheng/implementing/index'), meta: { role: ['admin'], title: '进行中', stitle: '进行中', noCache: true }
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
      {
        path: '/order/dahuoche', icon: 'QQ', name: '大货车', component: _import('order/dahuoche/index'), meta: { role: ['admin'], title: '大货车',stitle: '货车',  noCache: true }
      },
       {
        path: '/order/xuqiuku', icon: 'QQ', name: '需求库', component: _import('order/xuqiuku/index'), meta: { role: ['admin'], title: '需求库',stitle: '需求库',  noCache: true },
        children:[
            { 
                path: '/order/xuqiuku/carInfo', 
                icon: 'QQ', 
                hidden: false, 
                name: '车源信息', 
                component: _import('order/xuqiuku/carInfo/index'), 
                meta: { title: '车源信息',stitle: '车源',  noCache: true 
            }},

            { 
                path: '/order/xuqiuku/driverInfo', 
                icon: 'QQ',
                hidden: false,
                name: '货源信息', 
                component: _import('order/xuqiuku/driverInfo/index'), 
                meta: { title: '货源信息',stitle: '货源',  noCache: true 
            }},
        ]
      },

]
}
