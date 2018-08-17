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
  children: [
  {          
        path: '/marketing/carmarkting', icon: 'QQ', name: '车主营销管理', component: _import('marketing/carmarkting/index'), meta: { role: ['admin'], title: '车主营销管理', stitle:'车主', noCache: true },
        children: [
            {path: '/marketing/carmarkting/carmaid', name: '抽佣管理', component: _import('marketing/carmarkting/carmaid/index'), meta: { role: ['admin'], title: '抽佣管理',stitle: '抽佣',  noCache: true }},
            {path: '/marketing/carmarkting/carOwner', name: '车主奖励', component: _import('marketing/carmarkting/carOwner/index'), meta: { role: ['admin'], title: '车主奖励',stitle: '奖励',  noCache: true }},
            {path: '/marketing/carmarkting/orderFrom', name: '车主奖励', component: _import('marketing/carmarkting/carOwner/orderFrom'), meta: { role: ['admin'], title: '订单达量',stitle: '达量',  noCache: true }},  
        ],
        
    } ,
    {
        path: '/marketing/shippermarkting', icon: 'QQ', name: '货主营销管理', component: _import('marketing/shippermarkting/index'), meta: { role: ['admin'], title: '货主营销管理', stitle:'货主', noCache: true },
        children:[
            { 
                path: '/marketing/shippermarkting/coupon', 
                icon: 'QQ', 
                hidden: false, 
                name: '优惠券', 
                component: _import('marketing/shippermarkting/coupon/index'), 
                meta: { title: '优惠券', stitle: '优惠券',noCache: true },
            },
            { 
                path: '/marketing/shippermarkting/couponCash', 
                icon: 'QQ', 
                hidden: false, 
                name: '优惠金', 
                component: _import('marketing/shippermarkting/couponCash/index'), 
                meta: { title: '优惠金', stitle: '优惠金',noCache: true },
            }
        ]

    },
    {          
        path: '/marketing/xiaohuocheMJ', icon: 'QQ', name: '小货车马甲单',hidden: false, component: _import('marketing/xiaohuocheMJ/index'), meta: { role: ['admin'], title: '小货车马甲单', stitle:'小货车', noCache: true },
        children:[
            { 
                path: '/marketing/xiaohuocheMJ/pushsheet', 
                icon: 'QQ', 
                hidden: false, 
                name: '推送设置', 
                component: _import('marketing/xiaohuocheMJ/pushsheet/index'), 
                meta: { title: '推送设置', stitle: '推送',noCache: true },
            },
            { 
                path: '/marketing/xiaohuocheMJ/onesource', 
                icon: 'QQ', 
                hidden: false, name: 
                '单源配置', 
                component: _import('marketing/xiaohuocheMJ/onesource/index'), 
                meta: { title: '单源配置', stitle: '单源',noCache: true },
            }
        ]
      }, 
      {          
        path: '/marketing/lingdanMJ', icon: 'QQ', name: '零担马甲单',hidden: false, component: _import('marketing/lingdanMJ/index'), meta: { role: ['admin'], title: '零担马甲单', stitle:'零担', noCache: true },
        children:[
           
        ]
      }, 
  ]
}
