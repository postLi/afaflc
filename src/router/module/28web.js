import Layout from '@/views/layout/Layout'
const _import = require('../_import_' + process.env.NODE_ENV)

export default {
  path: '/28WEB',
  component: Layout,
  redirect: '/28WEB/userclass/logistics/index',
  icon: 'baobiao',
  name: '28快运WEB端',
  hidden: false,
  noDropdown: false,
  children: [
    {
      path: '/28WEB/userclass/logistics/index',
      icon: 'baobiao',
      name: '用户发布类',
      component: _import('28WEB/userclass/logistics/index'),
      meta: { role: ['admin'], title: '用户发布类', noCache: true },
      children: [{
        path: '/28WEB/userclass/logistics/index',
        name: '物流专线',
        component: _import('28WEB/userclass/logistics/index'),
        meta: { role: ['admin'], title: '物流专线', noCache: true, code: 'CUSTOM_FEEDBACK_PLATFORM' }
      }, {
        path: '/order/xuqiuku/carInfo/index',
        name: '车源信息',
        component: _import('order/xuqiuku/carInfo/index'),
        meta: { role: ['admin'], title: '车源信息', noCache: true, code: 'CUSTOM_FEEDBACK_PLATFORM' }
      }, {
        path: '/order/xuqiuku/driverInfo/index',
        name: '货源信息',
        component: _import('order/xuqiuku/driverInfo/index'),
        meta: { role: ['admin'], title: '货源信息', noCache: true, code: 'CUSTOM_FEEDBACK_PLATFORM' }
      }, {
        path: '/order/xuqiuku/manageGroup/index',
        name: '网点信息',
        component: _import('order/xuqiuku/manageGroup/index'),
        meta: { role: ['admin'], title: '网点信息', noCache: true, code: 'CUSTOM_FEEDBACK_PLATFORM' }
      }]
    }, {
      path: '/28WEB/garden/index',
      icon: 'baobiao',
      name: '园区管理',
      component: _import('28WEB/garden/index'),
      meta: { role: ['admin'], title: '园区管理', noCache: true }
    }, {
      path: '/28WEB/recommend/index',
      icon: 'baobiao',
      name: '推荐管理',
      component: _import('28WEB/recommend/index'),
      meta: { role: ['admin'], title: '推荐管理', noCache: true },
      children: [{
        path: '/28WEB/recommend/rec/index',
        name: '推荐位管理',
        component: _import('28WEB/recommend/rec/index'),
        meta: { role: ['admin'], title: '推荐位管理', noCache: true, code: 'CUSTOM_FEEDBACK_PLATFORM' }
      }, {
        path: '/28WEB/recommend/line/index',
        name: '专线推荐管理',
        component: _import('28WEB/recommend/line/index'),
        meta: { role: ['admin'], title: '专线推荐管理', noCache: true, code: 'CUSTOM_FEEDBACK_PLATFORM' }
      }]
    }
  ]
}
