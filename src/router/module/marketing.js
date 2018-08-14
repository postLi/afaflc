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
    path: '/marketing/OpenseaRecommend', icon: 'QQ', name: '公海推单', component: _import('marketing/OpenseaRecommend/index'), meta: { role: ['admin'], title: '公海推单',stitle: '公海',  noCache: true }
    },
    {          
        path: '/marketing/Directional', icon: 'QQ', name: '定向推单设置',hidden: false, component: _import('marketing/index'), meta: { role: ['admin'], title: '定向推单设置', stitle:'设置', noCache: true },
            children: [{
            path: '/marketing/Directional/DriverShipper',name: '绑定车主', component: _import('marketing/Directional/DriverShipper/index'), meta: { role: ['admin'], title: '绑定车主',stitle: '车主',  noCache: true }
            },
            {
            path: '/marketing/Directional/DriverPlatform', name: '平台专属', component: _import('marketing/Directional/DriverPlatform/index'), meta: { role: ['admin'], title: '平台专属', stitle: '平台', noCache: true }
            }
        ]
    }, 
    {
        path: '/marketing/OrderObtain', icon: 'QQ', name: '中单设置', component: _import('marketing/OrderObtain/index'), meta: { role: ['admin'], title: '中单设置',stitle: '中单',  noCache: true }
    },  
    { 
        path: '/marketing/pushsheet', icon: 'QQ', hidden: false, name: '推送设置', component: _import('marketing/pushsheet/index'), meta: { title: '推送设置', stitle: '推送',noCache: true },
    },
    { 
        path: '/marketing/onesource', icon: 'QQ', hidden: false, name: '马甲单源', component: _import('marketing/onesource/index'), meta: { title: '马甲单源', stitle: '单源',noCache: true },
    }
  ]
}
