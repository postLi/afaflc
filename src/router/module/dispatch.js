import Layout from '@/views/layout/Layout'
const _import = require('../_import_' + process.env.NODE_ENV)

export default {
  path: '/dispatch',
  component: Layout,
  redirect: '/dispatch/OpenseaRecommend',
  icon: 'chengyunshang',
  name: '调度管理',
  noDropdown: true, 
  hidden:false,
    meta: {
        title: '调度管理', code: 'DISPATCH'
    },
  children: [
    // {
    //   path: '/dispatch/DispatchTrack', icon: 'QQ', hidden:true,name: '调度追踪', component: _import('dispatch/DispatchTrack/index'), meta: { role: ['admin'], title: '调度追踪',stitle: '调度',  noCache: true }
    // },
  {
    path: '/dispatch/OpenseaRecommend', 
    icon: 'ghtd', 
    name: '公海推单', 
    component: _import('dispatch/OpenseaRecommend/index'), 
    meta: { role: ['admin'], title: '公海推单',stitle: '公海',  noCache: true , code: 'DISPATCH_OPENSEA_RECOMMEND'}
  },
  {          
    path: '/dispatch/Directional', 
    icon: 'dxtdsz', 
    name: '定向推单设置',
    hidden: false, 
    component: _import('dispatch/index'), 
    meta: { role: ['admin'], title: '定向推单设置', stitle:'设置', noCache: true, code: 'DISPATCH_ORIENT_RECOMMEND' },
      children: [{
        path: '/dispatch/Directional/DriverShipper',
        name: '绑定车主', 
        component: _import('dispatch/Directional/DriverShipper/index'), 
        meta: { role: ['admin'], title: '绑定车主',stitle: '车主',  noCache: true , code: ''}
      },
      {
        path: '/dispatch/Directional/DriverPlatform', 
        name: '平台专属', 
        component: _import('dispatch/Directional/DriverPlatform/index'), 
        meta: { role: ['admin'], title: '平台专属', stitle: '平台', noCache: true , code: ''}
      }
    ]
  }, 
  {
    path: '/dispatch/OrderObtain', 
    icon: 'zdsz', name: '中单设置', 
    component: _import('dispatch/OrderObtain/index'), 
    meta: { role: ['admin'], title: '中单设置',stitle: '中单',  noCache: true , code: 'DISPATCH_OBTAIN'}
  },
  {
    path: '/dispatch/evaluation', 
    icon: 'zonghe', name: '考核管理', 
    component: _import('dispatch/evaluation/truck/index'), 
    meta: { role: ['admin'], title: '考核管理',stitle: '考核管理',  noCache: true },
    children: [{
      path: '/dispatch/evaluation/truck',
      name: '小货车', 
      component: _import('dispatch/evaluation/truck/index'), 
      meta: { role: ['admin'], title: '小货车',stitle: '货车',  noCache: true }
    }]
  },  

]
}
