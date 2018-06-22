import Layout from '@/views/layout/Layout'
const _import = require('../_import_' + process.env.NODE_ENV)

export default {
  path: '/finance',
  component: Layout,
  redirect: '/finance/transactionCenter',
  name: '财务管理',
  icon: 'caiwu',
  children: [
      { path: '/finance/transactionCenter', icon: 'caiwu', hidden: false, name: '财务中心', component: _import('finance/transactionCenter/index'), meta: { title: '财务中心', noCache: true }},
      { path: '/finance/transactionDetail', icon: 'caiwu', hidden: false, name: '交易明细', component: _import('finance/transactionDetail/index'), meta: { title: '交易明细', noCache: true }}
  ]
}
