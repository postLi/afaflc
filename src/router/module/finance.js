import Layout from '@/views/layout/Layout'
const _import = require('../_import_' + process.env.NODE_ENV)

export default {
    path: '/finance',
    component: Layout,
    redirect: '/finance/transactionRecharge',
    name: '财务管理',
    icon: 'caiwu',
    meta: {
        title: '财务管理', code: 'FINANCE'
    },
  children: [
        { path: '/finance/transactionRecharge', 
            icon: 'czmx', 
            hidden: false, 
            name: '充值明细', 
            component: _import('finance/transactionRecharge/index'), 
            meta: { title: '充值明细', noCache: true , code: 'FINANCE_RECHARGE_DETAIL'}},
        { path: '/finance/transactionDetail', 
            icon: 'jymx', 
            hidden: false,
            name: '交易明细', 
            component: _import('finance/transactionDetail/index'), 
            meta: { title: '交易明细', noCache: true , code: 'FINANCE_TRADE_DETAIL'}},
        { 
            path: '/finance/transactionCash', 
            icon: 'txgl', 
            hidden: false, 
            name: '提现管理', 
            component: _import('finance/transactionCash/index'), 
            meta: { title: '提现管理', noCache: true , code: 'FINANCE_WITHDRAW_MANAGE'},
            children:[
                {
                    path: '/finance/transactionCash/cashSet', 
                    hidden: false, 
                    name: '提现配置', 
                    component: _import('finance/transactionCash/cashSet/index'), 
                    meta: { title: '提现配置', stitle: '配置',noCache: true , code: 'FINANCE_WITHDRAW_MANAGE_WITHDRAW_OPTION'},
                },
                { 
                    path: '/finance/transactionCash/cashAuditing', 
                    hidden: false, 
                    name: '提现审核', 
                    component: _import('finance/transactionCash/cashAuditing/index'), 
                    meta: { title: '提现审核', stitle: '审核',noCache: true , code: 'FINANCE_WITHDRAW_MANAGE_WITHDRAW_AUDIT'},
                }
            ]
        },

        {          
            path: '/finance/transactionChinaDoor', 
            icon: 'pingtaiZH', 
            name: '平台账户概况',
            hidden: false, 
            component: _import('finance/transactionChinaDoor/chinaDoor'), 
            meta: { role: ['admin'], title: '平台账户概况', stitle:'平台', noCache: true , code: 'FINANCE_PLATFORM_SURVEY'},
            children:[
               
            ]
          }, 

          {          
            path: '/finance/transactionCar', 
            icon: 'chezhuZH', 
            name: '车主账户概况',
            hidden: false, 
            component: _import('finance/transactionCar/transactionCarWallet/index'), 
            meta: { role: ['admin'], title: '车主账户概况', stitle:'车主', noCache: true , code: 'FINANCE_DRIVER_SURVEY'},
            children:[
               
            ]
          }, 
          {          
            path: '/finance/transactionShipper', 
            icon: 'huozhuZH', 
            name: '货主账户概况',
            hidden: false, 
            component: _import('finance/transactionShipper/transactionShipperWallet/index'), 
            meta: { role: ['admin'], title: '货主账户概况', stitle:'货主', noCache: true , code: 'FINANCE_SHIPPER_SURVEY'},
            children:[
               
            ]
          }, 

  ]
}
