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
        { 
            path: '/finance/transactionChinaDoor', 
            icon: 'txgl', 
            hidden: false, 
            name: '安发中国户', 
            component: _import('finance/transactionChinaDoor/index'), 
            meta: { title: '安发中国户', noCache: true },
            children:[
                { 
                    path: '/finance/transactionChinaDoor/cashAccount', 
                    hidden: false, 
                    name: '现金账户交易明细', 
                    component: _import('finance/transactionChinaDoor/cashAccount'), 
                    meta: { title: '现金账户交易明细', stitle: '现金',noCache: true },
                },
                { 
                    path: '/finance/transactionChinaDoor/operatingAccount', 
                    hidden: false, 
                    name: '运营账户交易明细', 
                    component: _import('finance/transactionChinaDoor/operatingAccount'), 
                    meta: { title: '运营账户交易明细', stitle: '运营',noCache: true },
                },
                { 
                    path: '/finance/transactionChinaDoor/chinaDoor', 
                    hidden: false, 
                    name: '中国安发账户概况', 
                    component: _import('finance/transactionChinaDoor/chinaDoor'), 
                    meta: { title: '中国安发账户概况', stitle: '安发',noCache: true },
                }                
            ]
        },        
        { 
            path: '/finance/transactionCar', 
            icon: 'txgl', 
            hidden: false, 
            name: '车主', 
            component: _import('finance/transactionCar/index'), 
            meta: { title: '车主', noCache: true },
            children:[
                { 
                    path: '/finance/transactionCar/transactionCarWallet', 
                    hidden: false, 
                    name: '车主钱包概况', 
                    component: _import('finance/transactionCar/transactionCarWallet/index'), 
                    meta: { title: '车主钱包概况', stitle: '钱包',noCache: true },
                },
                { 
                    path: '/finance/transactionCar/transactionCarDeal', 
                    hidden: false, 
                    name: '车主交易明细', 
                    component: _import('finance/transactionCar/transactionCarDeal/index'), 
                    meta: { title: '车主交易明细', stitle: '交易',noCache: true },
                },            
            ]
        }, 

        { 
            path: '/finance/transactionShipper', 
            icon: 'txgl', 
            hidden: false, 
            name: '货主', 
            component: _import('finance/transactionShipper/index'), 
            meta: { title: '货主', noCache: true },
            children:[
                { 
                    path: '/finance/transactionShipper/transactionShipperWallet', 
                    hidden: false, 
                    name: '货主钱包概况', 
                    component: _import('finance/transactionShipper/transactionShipperWallet/index'), 
                    meta: { title: '货主钱包概况', stitle: '钱包',noCache: true },
                },
                { 
                    path: '/finance/transactionShipper/transactionShipperDeal', 
                    hidden: false, 
                    name: '货主交易明细', 
                    component: _import('finance/transactionShipper/transactionShipperDeal/index'), 
                    meta: { title: '货主交易明细', stitle: '交易',noCache: true },
                },            
            ]
        }, 

  ]
}
