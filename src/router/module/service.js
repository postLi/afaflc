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
      meta: { title: '客服反馈', noCache: true, code: 'CUSTOM_FEEDBACK' },
      children: [{
        path: '/service/plantService/index',
        name: '平台类',
        component: _import('service/plantService/index'),
        meta: { role: ['admin'], title: '平台类', noCache: true, code: 'CUSTOM_FEEDBACK_PLATFORM' }
      }, {
        path: '/service/couseService/index',
        name: '用户类',
        component: _import('service/couseService/index'),
        meta: { role: ['admin'], title: '用户类', noCache: true, code: 'CUSTOM_FEEDBACK_USER' }
      }]
    }, {
      path: '/service/claim/index',
      icon: 'dahuoche',
      name: '物损理赔',
      component: _import('service/claim/index'),
      meta: { role: ['admin'], title: '物损理赔', stitle: '物损理赔', noCache: true, code: 'CUSTOM_CLAIM' },
      children: [

      ]
    }, {
      path: '/service/dispose/index',
      icon: 'dahuoche',
      name: '投诉处理',
      component: _import('service/dispose/index'),
      meta: { role: ['admin'], title: '投诉处理', stitle: '投诉处理', noCache: true, code: 'CUSTOM_COMPLAIN' },
      children: [

      ]
    }, {
        path: '/service/400Manage/index',
        icon: '400',
        name: '400管理',
        component: _import('service/400Manage/index'),
        meta: { role: ['admin'], title: '400管理', stitle: '400', noCache: true, code: 'CUSTOM_400_MANAGE' },
        children: [
  
        ]
      }
  ]
}
