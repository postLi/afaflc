import Layout from '@/views/layout/Layout'
const _import = require('../_import_' + process.env.NODE_ENV)

export default {
  path: '/marketing',
  component: Layout,
  redirect: '/marketing/carmarkting/carmaid',
  icon: 'baobiao',
  name: '营销管理',
  // hidden: true,
  noDropdown: false,
    meta: {
        title: '营销管理', code: 'MARKETING'
    },
  children: [
    {
      path: '/marketing/carmarkting', 
      icon: 'czyx', 
      name: '车主营销管理', 
      component: _import('marketing/carmarkting/index'), 
      meta: { role: ['admin'], title: '车主营销管理', stitle: '车主', noCache: true , code: 'MARKETING_DRIVER_MANAGE'},
      children: [
            {   
                path: '/marketing/carmarkting/carmaid', 
                name: '抽佣管理', 
                component: _import('marketing/carmarkting/carmaid/index'), 
                meta: { role: ['admin'], title: '抽佣管理', stitle: '抽佣', noCache: true , code: 'MARKETING_DRIVER_MANAGE_COMMISSION_MANAGE'}},
            { 
                path: '/marketing/carmarkting/carOwner', 
                name: '车主奖励', 
                component: _import('marketing/carmarkting/carOwner/index'), 
                meta: { role: ['admin'], title: '车主奖励', stitle: '奖励', noCache: true , code: 'MARKETING_DRIVER_MANAGE_DRIVER_REWARD'}},
            { 
                path: '/marketing/carmarkting/orderFrom', 
                name: '订单达量', 
                component: _import('marketing/carmarkting/orderFrom/index'), 
                meta: { role: ['admin'], title: '订单达量', stitle: '达量', noCache: true , code: 'MARKETING_DRIVER_MANAGE_ORDER_NUM_REWARD'}}
      ]

    },
    {
        path: '/marketing/shippermarkting', 
        icon: 'hzyx', name: '货主营销管理', 
        component: _import('marketing/shippermarkting/index'), 
        meta: { role: ['admin'], title: '货主营销管理', stitle: '货主', noCache: true, code: 'MARKETING_SHIPPER_MANAGE' },
        children: [
            {
            path: '/marketing/shippermarkting/coupon',
            hidden: false,
            name: '优惠券',
            component: _import('marketing/shippermarkting/coupon/index'),
            meta: { title: '优惠券', stitle: '优惠券', noCache: true, code: 'MARKETING_SHIPPER_MANAGE_COUPON_ACTIVITY' }
            },
            {
            path: '/marketing/shippermarkting/couponCash',
            hidden: false,
            name: '优惠金',
            component: _import('marketing/shippermarkting/couponCash/index'),
            meta: { title: '优惠金', stitle: '优惠金', noCache: true , code: 'MARKETING_SHIPPER_MANAGE_PREFERENTIAL'}
            }
        ]

        },
        {
            path: '/marketing/xiaohuocheMJ', 
            icon: 'xiaohuochemj', 
            name: '小货车马甲单', 
            hidden: false, component: _import('marketing/xiaohuocheMJ/index'), 
            meta: { role: ['admin'], title: '小货车马甲单', stitle: '小货车', noCache: true , code: 'MARKETING_SMALL_CAR_MJ'},
            children: [
            {
            path: '/marketing/xiaohuocheMJ/pushsheet',
            hidden: false,
            name: '推送设置',
            component: _import('marketing/xiaohuocheMJ/pushsheet/index'),
            meta: { title: '推送设置', stitle: '推送', noCache: true , code: 'MARKETING_SMALL_CAR_MJ_PUSH_OPTION'}
            },
            {
            path: '/marketing/xiaohuocheMJ/onesource',
            hidden: false, 
            name: '单源配置',
            component: _import('marketing/xiaohuocheMJ/onesource/index'),
            meta: { title: '单源配置', stitle: '单源', noCache: true , code: 'MARKETING_SMALL_CAR_MJ_SOURCE_OPTION'}
            },
            {
                path: '/marketing/xiaohuocheMJ/MjPushLogs',
                hidden: false, name:'推送记录',
                component: _import('marketing/xiaohuocheMJ/MjPushLogs/index'),
                meta: { title: '推送记录', stitle: '记录', noCache: true, code: 'MARKETING_SMALL_CAR_MJ_PUSH_RECORD' }
            },
            {
                path: '/marketing/xiaohuocheMJ/Logs',
                hidden: true, name:'推送记录详情',
                component: _import('marketing/xiaohuocheMJ/MjPushLogs/pushLogs'),
                meta: { title: '推送记录详情', stitle: '详情', noCache: false }
            }
        ]
        },
    {
      path: '/marketing/lingdanMJ', 
      icon: 'lingdanmj', 
      name: '零担马甲单', 
      hidden: false, 
      component: _import('marketing/lingdanMJ/index'), 
      meta: { role: ['admin'], title: '零担马甲单', stitle: '零担', noCache: true, code: 'MARKETING_LTL_MJ' },
      children: [

      ]
    },
    {
      path: '/marketing/operating', 
      icon: 'yunyingSZ', 
      name: '运营收支', 
      hidden: false, component: _import('marketing/operating/index'), 
      meta: { role: ['admin'], title: '运营收支', stitle: '运营', noCache: true, code: 'MARKETING_OPERATION' },
      children: [

      ]
    },
    {   
        path: '/marketing/announcement',
        icon: 'cheliangguanli',
        hidden: false,
        name: '发布公告',
        component: _import('marketing/announcement/index'),
        meta: { title: '发布公告', stitle: '公告', noCache: true , code: ''}
      },
  ]
}
