import Layout from '@/views/layout/Layout'
const _import = require('../_import_' + process.env.NODE_ENV)

export default {
  path: '/finance',
  component: Layout,
  redirect: '/finance/transactionRecharge',
  name: '财务管理',
  icon: 'caiwu',
  children: [
        { path: '/finance/transactionRecharge', icon: 'czmx', hidden: false, name: '充值明细', component: _import('finance/transactionRecharge/index'), meta: { title: '充值明细', noCache: true }},
        { path: '/finance/transactionDetail', icon: 'jymx', hidden: false, name: '交易明细', component: _import('finance/transactionDetail/index'), meta: { title: '交易明细', noCache: true }},
        { 
            path: '/finance/transactionCash', 
            icon: 'txgl', 
            hidden: false, 
            name: '提现管理', 
            component: _import('finance/transactionCash/index'), 
            meta: { title: '提现管理', noCache: true },
            children:[
                { 
                    path: '/finance/transactionCash/cashSet', 
                    hidden: false, 
                    name: '提现配置', 
                    component: _import('finance/transactionCash/cashSet/index'), 
                    meta: { title: '提现配置', stitle: '配置',noCache: true },
                },
                { 
                    path: '/finance/transactionCash/cashAuditing', 
                    hidden: false, 
                    name: '提现审核', 
                    component: _import('finance/transactionCash/cashAuditing/index'), 
                    meta: { title: '提现审核', stitle: '审核',noCache: true },
                }
            ]
        },
        
  ]
}
