import Layout from '@/views/layout/Layout'
const _import = require('../_import_' + process.env.NODE_ENV)

export default {
  path: '/marketing',
  component: Layout,
  redirect: '/marketing/index',
  icon: 'baobiao',
  name: '营销管理',
  hidden: true,
  noDropdown: false,
  children: [{
    path: '/marketing/index', icon: 'baobiao', name: '报表管理', component: _import('marketing/index'), meta: { role: ['admin'], title: '报表管理', noCache: true }
  }
  ]
}
