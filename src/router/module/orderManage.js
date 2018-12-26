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
        path: '/order/tongcheng', 
        icon: 'tcdd', 
        name: '小货车订单',
        component: _import('order/index'), 
        meta: { role: ['admin'], title: '小货车',stitle: '小货车',  noCache: true, code: 'ORDER_CITY_WIDE_ORDER' },
        children: [
            {
                path: '/order/tongcheng/waitPointing',
                name: '小货车待指派', 
                component: _import('order/tongcheng/waitPointing/index'), 
                meta: { role: ['admin'], title: '待指派',stitle: '待指派',  noCache: true, code: 'ORDER_CITY_WIDE_ORDER_WIAT_ASSIGN' }
            },
            {
                path: '/order/tongcheng/waitpayment',
                name: '小货车待付款', 
                component: _import('order/tongcheng/waitpayment/index'), 
                meta: { role: ['admin'], title: '待付款',stitle: '待付款',  noCache: true, code: 'ORDER_CITY_WIDE_ORDER_WIAT_PAY' }
            },
            {
                path: '/order/tongcheng/toDispatch', 
                name: '小货车派单中', 
                component: _import('order/tongcheng/toDispatch/index'), 
                meta: { role: ['admin'], title: '派单中', stitle: '派单中', noCache: true , code: 'ORDER_CITY_WIDE_ORDER_SENG_ORDER_ING'}
            },
            {
                path: '/order/tongcheng/implementing', 
                name: '小货车进行中', 
                component: _import('order/tongcheng/implementing/index'), 
                meta: { role: ['admin'], title: '进行中', stitle: '进行中', noCache: true, code: 'ORDER_CITY_WIDE_ORDER_ING' }
            },
            {
                path: '/order/tongcheng/complate', 
                name: '小货车已完成', 
                component: _import('order/tongcheng/complate/index'), 
                meta: { role: ['admin'], title: '已完成', stitle: '已完成', noCache: true, code: 'ORDER_CITY_WIDE_ORDER_FINISHED' }
            },
            {
                path: '/order/tongcheng/canceled', 
                name: '小货车已取消', 
                component: _import('order/tongcheng/canceled/index'), 
                meta: { role: ['admin'], title: '已取消', stitle: '已完成', noCache: true, code: 'ORDER_CITY_WIDE_ORDER_CANCLE' }
            },
            {
                path: '/order/tongcheng/allOrderList', 
                name: '小货车全部', 
                component: _import('order/tongcheng/allOrderList/index'), 
                meta: { role: ['admin'], title: '全部', stitle: '全部', noCache: true , code: 'ORDER_CITY_WIDE_ORDER_ALL'}
            },
        ]
    },
    {
        path: '/order/sendlogistics', 
        icon: 'lddingdan', 
        name: '发物流订单', 
        component: _import('order/sendlogistics/index'), 
        meta: { role: ['admin'], title: '发物流',stitle: '发物流',  noCache: true , code: 'ORDER_LTL_ORDER'},
        children: [
            {
                path: '/order/sendlogistics/waitCarriy',
                name: '发物流待承运', 
                component: _import('order/sendlogistics/waitCarriy'), 
                meta: { role: ['admin'], title: '待承运',stitle: '承运',  noCache: true,code: 'ORDER_LTL_ORDER_WAIT' }
            },
            {
                path: '/order/sendlogistics/waitpayment',
                name: '发物流待付款', 
                component: _import('order/sendlogistics/waitpayment'), 
                meta: { role: ['admin'], title: '待付款',stitle: '付款',  noCache: true,code: 'ORDER_LTL_ORDER_UNPAY'}
            },
            {
                path: '/order/sendlogistics/implementing',
                name: '发物流进行中', 
                component: _import('order/sendlogistics/implementing'), 
                meta: { role: ['admin'], title: '进行中',stitle: '进行',  noCache: true,code: 'ORDER_LTL_ORDER_ING' }
            },            
            {
                path: '/order/sendlogistics/complate',
                name: '发物流已完成', 
                component: _import('order/sendlogistics/complate'), 
                meta: { role: ['admin'], title: '已完成',stitle: '完成',  noCache: true,code: 'ORDER_LTL_ORDER_FINISH' }
            },
            {
                path: '/order/sendlogistics/cancel',
                name: '发物流已取消', 
                component: _import('order/sendlogistics/cancel'), 
                meta: { role: ['admin'], title: '已取消',stitle: '取消',  noCache: true,code: 'ORDER_LTL_ORDER_CANCLE' }
            },
            {
                path: '/order/sendlogistics/allsendlogistics',
                name: '发物流全部', 
                component: _import('order/sendlogistics/allsendlogistics'), 
                meta: { role: ['admin'], title: '全部',stitle: '全部',  noCache: true,code: 'ORDER_LTL_ORDER_ALL' }
            },                        
        ]
      },
      {
        path: '/order/dahuoche', 
        icon: 'dahuochedd', 
        name: '大货车订单', 
        component: _import('order/dahuoche/index'), 
        meta: { role: ['admin'], title: '大货车',stitle: '大货车',  noCache: true , code: 'ORDER_BIG_CAR_ORDER'}
     },

    {
        path: '/order/orderDetails', 
        name: '订单详情',  
        hidden: true,
        component: _import('order/orderDetails/index'), 
        meta: { role: ['admin'], title: '订单详情',stitle: '详情',  noCache: false }
    },

    {
        path: '/order/sendlogisticsLog', 
        name: '发物流订单详情',  
        hidden: true,
        component: _import('order/sendlogistics/publice/sendlogisticsLog'), 
        meta: { role: ['admin'], title: '订单详情',stitle: '详情',  noCache: false }
    },    
    {
        path: '/order/guiji',
        icon: 'guijihf', 
        name: '车辆轨迹回放', 
        hidden:true,
        component: _import('order/guiji/index'),
         meta: { role: ['admin'], title: '车辆轨迹回放',stitle: '轨迹',  noCache: false , code: 'ORDER_CAR_TRACK'}
    },


]
}
