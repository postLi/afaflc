import Layout from '@/views/layout/Layout'
const _import = require('../_import_' + process.env.NODE_ENV)

export default {
  path: '/28WEB',
  component: Layout,
  redirect: '/28WEB/index',
  icon: 'baobiao',
  name: '28快运WEB端',
  hidden: false,
  noDropdown: false,
  children: [{
    path: '/28WEB/webUser', icon: 'baobiao', name: '用户发布类', component: _import('28WEB/index'), meta:
      { title: '用户发布类', noCache: true },
  }
  ]
}
