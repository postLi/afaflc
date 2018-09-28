import Layout from '@/views/layout/Layout'
const _import = require('../_import_' + process.env.NODE_ENV)

export default {
  path: '/service',
  component: Layout,
  redirect: '/service/plantService/index',
  name: '客服管理',
  icon: 'kehuguanli',
  hidden: false,
  meta: {
    title: '客服管理', code: 'CUSTOM'
  },
  children: [
    { 
        path: '/service/index', 
        name: '客服反馈', 
        icon: 'zonghe', 
        component: _import('service/index'), 
        meta: { title: '客服反馈', noCache: true , code: 'CUSTOM_FEEDBACK' },
    //   children: [{
    //     path: '/service/index/longtime', name: '延时处理', component: _import('table/index'), meta: { role: ['admin'], title: '延时处理', noCache: true }
    //   },
    //   {
    //     path: '/service/index/longtime2', name: '延时处理2', component: _import('table/index'), meta: { role: ['admin'], title: '延时处理2', noCache: true }
    //   }]
      children: [{
        path: '/service/plantService/index', 
        name: '平台类', 
        component: _import('service/plantService/index'), 
        meta: { role: ['admin'], title: '平台类', noCache: true , code: 'CUSTOM_FEEDBACK_PLATFORM' }
      }, {
        path: '/service/couseService/index', 
        name: '用户类', 
        component: _import('service/couseService/index'), 
        meta: { role: ['admin'], title: '用户类', noCache: true , code: 'CUSTOM_FEEDBACK_USER' }
      }]
    }, {
      path: '/service/claim/index', 
      icon: 'dahuoche', 
      name: '物损理赔', 
      component: _import('service/claim/index'), 
      meta: { role: ['admin'], title: '物损理赔', stitle: '物损理赔', noCache: true , code: '' },
      children: [

      ]
    }, {
      path: '/service/dispose/index', 
      icon: 'dahuoche', 
      name: '投诉处理', 
      component: _import('service/dispose/index'), 
      meta: { role: ['admin'], title: '投诉处理', stitle: '投诉处理', noCache: true , code: '' },
      children: [

      ]
    }
  ]
}
