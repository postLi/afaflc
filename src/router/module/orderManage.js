import Layout from '@/views/layout/Layout'
const _import = require('../_import_' + process.env.NODE_ENV)

export default {
    path: '/order',
    component: Layout,
    redirect: '/order/tongcheng/waitpayment',
    icon: 'from',
    name: '订单管理',
    noDropdown: true, 
    meta: {
        title: '订单管理', code: 'ORDER'
    },
  children: [
    {
        path: '/order/tongcheng', icon: 'tcdd', name: '同城订单',component: _import('order/index'), meta: { role: ['admin'], title: '同城订单',stitle: '同城',  noCache: true },
        children: [
            {
                path: '/order/tongcheng/waitPointing',name: '待指派', component: _import('order/tongcheng/waitPointing/index'), meta: { role: ['admin'], title: '待指派',stitle: '待指派',  noCache: true }
            },
            {
                path: '/order/tongcheng/waitpayment',name: '待付款', component: _import('order/tongcheng/waitpayment/index'), meta: { role: ['admin'], title: '待付款',stitle: '待付款',  noCache: true }
            },
            {
                path: '/order/tongcheng/toDispatch', name: '派单中', component: _import('order/tongcheng/toDispatch/index'), meta: { role: ['admin'], title: '派单中', stitle: '派单中', noCache: true }
            },
            {
                path: '/order/tongcheng/implementing', name: '进行中', component: _import('order/tongcheng/implementing/index'), meta: { role: ['admin'], title: '进行中', stitle: '进行中', noCache: true }
            },
            {
                path: '/order/tongcheng/complate', name: '已完成', component: _import('order/tongcheng/complate/index'), meta: { role: ['admin'], title: '已完成', stitle: '已完成', noCache: true }
            },
            {
                path: '/order/tongcheng/canceled', name: '已取消', component: _import('order/tongcheng/canceled/index'), meta: { role: ['admin'], title: '已取消', stitle: '已完成', noCache: true }
            },
            {
                path: '/order/tongcheng/allOrderList', name: '全部', component: _import('order/tongcheng/allOrderList/index'), meta: { role: ['admin'], title: '全部', stitle: '全部', noCache: true }
            },
        ]
    },
    {
        path: '/order/lingdan', icon: 'lddingdan', name: '零担订单', component: _import('order/lingdan/index'), meta: { role: ['admin'], title: '零担订单',stitle: '零担',  noCache: true }
      },
    {
        path: '/order/dahuoche', icon: 'dahuochedd', name: '大货车订单', component: _import('order/dahuoche/index'), meta: { role: ['admin'], title: '大货车订单',stitle: '货车',  noCache: true }
    },
    {
        path: '/order/xuqiuku', icon: 'xqk', name: '需求库', component: _import('order/xuqiuku/index'), meta: { role: ['admin'], title: '需求库',stitle: '需求库',  noCache: true },
        children:[
            { 
                path: '/order/xuqiuku/carInfo', 
                hidden: false, 
                name: '车源信息', 
                component: _import('order/xuqiuku/carInfo/index'), 
                meta: { title: '车源信息',stitle: '车源',  noCache: true 
            }},

            { 
                path: '/order/xuqiuku/driverInfo', 
                hidden: false,
                name: '货源信息', 
                component: _import('order/xuqiuku/driverInfo/index'), 
                meta: { title: '货源信息',stitle: '货源',  noCache: true 
            }},

            { 
                path: '/order/xuqiuku/manageGroup', 
                hidden: false,
                name: '网点信息', 
                component: _import('order/xuqiuku/manageGroup/index'), 
                meta: { title: '网点信息',stitle: '网点',  noCache: true 
            }},
        ]
    },
    {
        path: '/order/xiangqing', name: '订单详情',  hidden: true,component: _import('order/xiangqing/index'), meta: { role: ['admin'], title: '订单详情',stitle: '详情',  noCache: false }
    },
    {
        path: '/order/guiji', name: '车辆轨迹回放', component: _import('order/guiji/index'), meta: { role: ['admin'], title: '车辆轨迹回放',stitle: '轨迹',  noCache: false }
    },


]
}
